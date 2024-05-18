import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string = '';

    constructor(){}
    
  // Mock authentication check
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
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
    localStorage.setItem('authToken', randomToken);
  }

  // Mock logout method
  logout() {
    localStorage.removeItem('authToken');
  }

}
