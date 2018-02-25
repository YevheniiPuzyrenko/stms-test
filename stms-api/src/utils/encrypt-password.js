import crypto from 'crypto';

export default function encryptPassword(password) {
  const cipher = crypto.createCipher('aes-128-cbc', 'myawesomesecret');
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  
  return encryptedPassword;
}
