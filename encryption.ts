// encryption.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my_super_secret_key'; // Cámbiala por una más segura

// Cifrar datos
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Descifrar datos
export function decryptData(encryptedData: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error al descifrar los datos:', error);
    return null;
  }
}
