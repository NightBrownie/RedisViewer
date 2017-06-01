import * as appConstants from '../constants/appConstants';
import * as configKeys from '../constants/configKeys';

import * as cryptoHelper from '../helpers/crypto.helper';

const {app} = (require('electron').remote || require('electron'));
const keytar = require('keytar');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const winston = require('winston');
const dotProp = require('dot-prop');

const localConfigPath = path.join(__dirname, appConstants.CONFIG_FILE_NAME);

const userDataAppConfigFolderPath = app.getPath('userData');
const userDataAppEncryptedConfigPath = path.join(userDataAppConfigFolderPath, appConstants.ENCRYPTED_CONFIG_FILE_NAME);
const userDataAppConfigPath = path.join(userDataAppConfigFolderPath, appConstants.CONFIG_FILE_NAME);

let configEncryptionPassPhrase;
let portable: false;
let encrypted: true;
let currentConfig;

const appName = app.getName();

const getOrCreateEncryptionPassPhrase = async() => {
    let currentPassword = null;

    try {
        let currentPassword = await keytar.getPassword(
            appName,
            appConstants.USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY);

        if (!currentPassword) {
            currentPassword = (await await crypto.randomBytes(
                    appConstants.CONFIG_ENCRYPTION_PASSPHRASE_LENGTH_BYTES)
            ).toString();

            await keytar.setPassword(
                appName,
                appConstants.USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY,
                currentPassword
            );
        }
    } catch (ex) {
        winston.error(`An error occurred during config encryption pass phrase generation: ${ex}`);
    }

    return currentPassword;
};

const getOrCreateConfig = async () => {
    try {
        //check portable mode config
        if (fs.existsSync(localConfigPath)) {
            let configText = fs.readFileSync(localConfigPath);
            try {
                let config = JSON.parse(configText);
                if (dotProp.get(config, configKeys.APP_PORTABLE_MODE_CONFIG_KEY)) {
                    return {
                        config,
                        portable: true,
                        encrypted: false
                    };
                }
            } catch (ex) {}
        }

        if (fs.existsSync(userDataAppEncryptedConfigPath)) {
            let encryptedConfigText = fs.readFileSync(userDataAppEncryptedConfigPath);

            try {
                if (!configEncryptionPassPhrase) {
                    configEncryptionPassPhrase = await getOrCreateEncryptionPassPhrase();
                }

                if (configEncryptionPassPhrase) {
                    let decryptedConfigText = cryptoHelper.decrypt(encryptedConfigText, encryptionKey);

                    return {
                        config : JSON.parse(decryptedConfigText),
                        portable: false,
                        encrypted: true
                    };
                }
            } catch (ex) {}
        }

        if (fs.existsSync(userDataAppConfigPath)) {
            let configText = fs.readFileSync(userDataAppConfigPath);
            try {
                return {
                    config: JSON.parse(configText),
                    portable: false,
                    encrypted: false
                };
            } catch (ex) {}
        }

        return {
            config: {},
            portable: false,
            encrypted: !!configEncryptionPassPhrase
        };
    } catch (ex) {
        winston.error(`An error occurred during reading of config: ${ex}`);
    }
};

export const setConfigKey = async (key, value) => {
    if (!currentConfig) {
        let getConfigResult = await getOrCreateConfig();

        ({config:currentConfig, portable, encrypted} = getConfigResult);
    }

    if (portable) {

    } else if (encrypted) {

    } else {

    }
};

export const getConfigKey = async (key, defaultValue) => {
    if (!currentConfig) {
        let getConfigResult = await getOrCreateConfig();

        ({config:currentConfig, portable, encrypted} = getConfigResult);
    }

    return dotProp.has(currentConfig, key)
        ? dotProp.get(currentConfig, key)
        : defaultValue;
};
