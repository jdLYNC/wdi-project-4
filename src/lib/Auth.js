class Auth {
  static currentUser = null;

  static setToken(token) {
    console.log('setting token', token);
    return localStorage.setItem('token', token);
  }

  static setCurrentUser(user) {
    console.log('setting current user', user);
    this.currentUser = user;
  }

  static getCurrentUser() {
    return this.currentUser;
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    this.currentUser = null;
    console.log('unsetting current user', this.currentUser);
    localStorage.removeItem('token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }
}

export default Auth;
