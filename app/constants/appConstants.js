/* Configuration */
export const CONFIG_FILE_TEXT_ENCODING = 'utf8'
export const CONFIG_FILE_NAME = 'RedisViewer.config.json'
export const ENCRYPTED_CONFIG_FILE_NAME = CONFIG_FILE_NAME + '.enc'

/* Encryption */
export const USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY = 'ConfigEncryptionPassphrase'
export const CONFIG_ENCRYPTION_PASSPHRASE_LENGTH_BYTES = 32

/* Server settings */
export const DEFAULT_SERVER_CONFIG_LIST = []

/* Server list */
export const ROOT_FOLDER_NAME = 'Servers'

/* Output format */
export const JSON_FORMAT_LEADING_SPACE = 2
export const KEY_DATA_LAST_UPDATE_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

export default {
  CONFIG_FILE_TEXT_ENCODING,
  CONFIG_FILE_NAME,
  ENCRYPTED_CONFIG_FILE_NAME,

  USER_KEY_STORAGE_CONFIG_ENCRYPTION_PASSPHRASE_KEY,
  CONFIG_ENCRYPTION_PASSPHRASE_LENGTH_BYTES,

  DEFAULT_SERVER_CONFIG_LIST,

  ROOT_FOLDER_NAME,

  JSON_FORMAT_LEADING_SPACE,
  KEY_DATA_LAST_UPDATE_DATE_FORMAT
}
