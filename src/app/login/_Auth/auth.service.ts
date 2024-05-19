import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string = '';

    constructor(private secureStorageService: SecureStorageService
    ){}
    
  // Mock authentication check
  isAuthenticated(): boolean {
    return !!this.secureStorageService.getItem('authToken');
  }

  // Generate a random token
  generateRandomToken(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  // Mock login method
  login(randomToken: string) {
    this.secureStorageService.setItem('authToken', randomToken);
  }

  // Mock logout method
  logout() {
    this.secureStorageService.removeItem('authToken');
  }

}
