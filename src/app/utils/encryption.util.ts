import CryptoJS from "crypto-js";
import { environment } from "../../environments/environment";

const SECRET_KEY = CryptoJS.enc.Hex.parse(
  environment.NEXT_PUBLIC_AES_256_CBC_SECRET_KEY,
);
const IV_LENGTH = Number(environment.NEXT_PUBLIC_AES_256_CBC_IV_LENGTH);

export function encryptPassword(password: string): string {
  if (SECRET_KEY.sigBytes !== 32) {
    throw new Error("Invalid AES-256-CBC key length. Must be 32 bytes.");
  }

  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

  const cipher = CryptoJS.AES.encrypt(password, SECRET_KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const ivHex = iv.toString(CryptoJS.enc.Hex);
  const encryptedHex = cipher.ciphertext.toString(CryptoJS.enc.Hex);

  return ivHex + ":" + encryptedHex;
}
