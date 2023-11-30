import { jwtDecode } from "jwt-decode";
 


interface JWTPayload {
    name: string;
    email: string;
  }

export const getUsernameFromJWT = (): string  => {
  const token = localStorage.getItem('jwt');
  console.log('JWT Token:', token); // Log the token for debugging

  if (token) {
    try {
        const decoded: JWTPayload = jwtDecode<JWTPayload>(token);
        return decoded.name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return "";
    }
  }
  return "";
};

export const getEmailFromJWT = (): string => {
    const token = localStorage.getItem('jwt');
    console.log('JWT Token:', token); // Log the token for debugging
  
    if (token) {
      try {
        const decoded: JWTPayload = jwtDecode<JWTPayload>(token);
        return decoded.email;
      } catch (error) {
        console.error('Error decoding token:', error);
        return "";
      }
    }
    return "";
  };