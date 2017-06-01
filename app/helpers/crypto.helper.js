const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

export const encrypt = (text, passPhrase) => {
    let cipher = crypto.createCipher(algorithm, passPhrase)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

export const decrypt = (text, passPhrase) => {
    let decipher = crypto.createDecipher(algorithm, passPhrase)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};
