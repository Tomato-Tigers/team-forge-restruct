 
const jwtDecode = require('jwt-decode');


interface DecodedToken {
    id: string;
    name: string;
    email: string;
  }
  

export const getUsernameFromJWT = (): string | null => {
  const token = localStorage.getItem('jwt');
  console.log('JWT Token:', token); // Log the token for debugging

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

export const getEmailFromJWT = (): string | null => {
    const token = localStorage.getItem('jwt');
    console.log('JWT Token:', token); // Log the token for debugging
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.email;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };