export function generateToken(): string {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 9; i++) {
      token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
  }
