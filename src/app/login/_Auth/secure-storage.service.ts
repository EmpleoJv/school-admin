import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  private secretKey = 'my-secret-key'; // Use a more secure key in a real application

  constructor() { }

  private obfuscateKey(key: string): string {
    return btoa(key).split('').reverse().join('');
  }

  private deobfuscateKey(obfuscatedKey: string): string {
    return atob(obfuscatedKey.split('').reverse().join(''));
  }

  private encodeData(data: any): string {
    return btoa(JSON.stringify(data));
  }

  private decodeData(encodedData: string): any {
    return JSON.parse(atob(encodedData));
  }

  setItem(key: string, value: any): void {
    const obfuscatedKey = this.obfuscateKey(key);
    const encodedValue = this.encodeData(value);
    const encryptedValue = CryptoJS.AES.encrypt(encodedValue, this.secretKey).toString();
    localStorage.setItem(obfuscatedKey, encryptedValue);
  }

  getItem(key: string): any {
    const obfuscatedKey = this.obfuscateKey(key);
    const storedValue = localStorage.getItem(obfuscatedKey);
    if (storedValue) {
      const bytes = CryptoJS.AES.decrypt(storedValue, this.secretKey);
      const encodedValue = bytes.toString(CryptoJS.enc.Utf8);
      return this.decodeData(encodedValue);
    }
    return null;
  }

  removeItem(key: string): void {
    const obfuscatedKey = this.obfuscateKey(key);
    localStorage.removeItem(obfuscatedKey);
  }

  clear(): void {
    localStorage.clear();
  }
}
