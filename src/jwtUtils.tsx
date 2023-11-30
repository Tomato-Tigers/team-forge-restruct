const jwt_decode = require('jwt-decode');


interface DecodedToken {
  name: string;
 
}

export const getUsernameFromJWT = (): string | null => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const decoded: DecodedToken = jwt_decode(token);
      return decoded.name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
