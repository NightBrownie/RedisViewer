import appConstants from '../constants/appConstants'
import configKeys from '../constants/configKeys'

import cryptoHelper from '../helpers/crypto'

const { app } = (require('electron').remote || require('electron'))
const keytar = require('keytar')
const crypto = require('crypto')
const path = require('path')
const fs = (require('electron').remote || require('electron')).require('fs-extra')
const winston = require('winston')
const dotProp = require('dot-prop')

const portableConfigPath = path.join(app.getAppPath(), appConstants.CONFIG_FILE_NAME)
const userDataAppConfigFolder = app.getPath('userData')
const userDataAppEncryptedConfigPath = path.join(userDataAppConfigFolder, appConstants.ENCRYPTED_CONFIG_FILE_NAME)
const userDataAppConfigPath = path.join(userDataAppConfigFolder, appConstants.CONFIG_FILE_NAME)

let configEncryptionPassPhrase
let portable = false
let encrypted = true
let currentConfig

const appName = app.getName()

const initializeConfig = async () => {
  if (!currentConfig) {
    let getConfigResult = await getOrCreateConfig();

    ({ config: currentConfig, portable, encrypted } = getConfigResult)
  }
}

const saveConfig = async () => {
  try {
    let configText = JSON.stringify(currentConfig)

    if (portable) {
      await fs.writeFile(portableConfigPath, configText, appConstants.CONFIG_FILE_TEXT_ENCODING)
    } else if (encrypted) {
      let encryptedConfigText = cryptoHelper.encrypt(configText, configEncryptionPassPhrase)
      await await fs.writeFile(userDataAppEncryptedConfigPath,
        encryptedConfigText, appConstants.CONFIG_FILE_TEXT_ENCODING)
    } else {
      await fs.writeFile(userDataAppConfigPath, configText, appConstants.CONFIG_FILE_TEXT_ENCODING)
    }
  } catch (err) {
    winston.error(`An error occurred during config saving: ${err.message}`)
  }
}

const getOrCreateEncryptionPassPhrase = async () => {
  let currentPassword = null

  try {
    currentPassword = await keytar.getPassword(
      appName,
      appConstants.USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY
    )

    if (!currentPassword) {
      currentPassword = (await await crypto.randomBytes(
        appConstants.CONFIG_ENCRYPTION_PASSPHRASE_LENGTH_BYTES)
      ).toString()

      await keytar.setPassword(
        appName,
        appConstants.USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY,
        currentPassword
      )
    }
  } catch (err) {
    winston.error(`An error occurred during config encryption pass phrase generation: ${err.message}`)
  }

  return currentPassword
}

const getOrCreateConfig = async () => {
  try {
        // check portable mode config
    if (await fs.pathExists(portableConfigPath)) {
      let configText = await fs.readFile(portableConfigPath, appConstants.CONFIG_FILE_TEXT_ENCODING)
      try {
        let config = JSON.parse(configText)
        if (dotProp.get(config, configKeys.APP_PORTABLE_MODE_CONFIG_KEY)) {
          return {
            config,
            portable: true,
            encrypted: false
          }
        }
      } catch (err) {
      }
    }

    if (!configEncryptionPassPhrase) {
      configEncryptionPassPhrase = await getOrCreateEncryptionPassPhrase()
    }

    if (await fs.pathExists(userDataAppEncryptedConfigPath)) {
      let encryptedConfigText = await fs.readFile(userDataAppEncryptedConfigPath,
                appConstants.CONFIG_FILE_TEXT_ENCODING)

      try {
        if (configEncryptionPassPhrase) {
          let decryptedConfigText = cryptoHelper.decrypt(encryptedConfigText, configEncryptionPassPhrase)

          return {
            config: JSON.parse(decryptedConfigText),
            portable: false,
            encrypted: true
          }
        }
      } catch (err) {
      }
    }

    if (fs.existsSync(userDataAppConfigPath)) {
      let configText = fs.readFileSync(userDataAppConfigPath, appConstants.CONFIG_FILE_TEXT_ENCODING)
      try {
        return {
          config: JSON.parse(configText),
          portable: false,
          encrypted: false
        }
      } catch (err) {
      }
    }

    return {
      config: {},
      portable: false,
      encrypted: !!configEncryptionPassPhrase
    }
  } catch (err) {
    winston.error(`An error occurred during reading of config: ${err.message}`)
  }
}

export const setConfigKey = async (key, value) => {
  await initializeConfig()

  dotProp.set(currentConfig, key, value)

  await saveConfig()
}

export const getConfigKey = async (key, defaultValue) => {
  await initializeConfig()

  return dotProp.has(currentConfig, key)
    ? dotProp.get(currentConfig, key)
    : defaultValue
}

export default {
  setConfigKey,
  getConfigKey
}
