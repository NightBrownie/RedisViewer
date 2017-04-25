const Config = require("electron-config");
const config = new Config();

export const setConfigKey = (key, value) => config.set(key, value);
export const getConfigKey = (key, defaultValue) => {
    return config.has(key)
        ? config.get(key)
        : defaultValue;
};
