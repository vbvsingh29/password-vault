import pbkdf2 from "crypto-js/pbkdf2";
import { AES, SHA256, enc } from "crypto-js";

export function hashPassword(password: string) {
  return SHA256(password).toString();
}

export function generateVaultKey({
  email,
  hashedPassword,
  salt,
}: {
  email: string;
  hashedPassword: string;
  salt: string;
}) {
  return pbkdf2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
  }).toString();
}

export function encryptVault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  return AES.encrypt(vault, vaultKey).toString();
}

export function decryptVault({
  vault,
  vaultKey,
}: {
  vault: string;
  vaultKey: string;
}) {
  const bytpes = AES.decrypt(vault, vaultKey);
  const decrypted = bytpes.toString(enc.Utf8);
  try {
    return JSON.parse(decrypted);
  } catch (e: any) {
    return null;
  }
}
