/**
 * Auth is used to handle user authentication. 
 * 
 * When the client recieves a jwt-token it can be saved in session storage by calling login().
 * When the user logs out the token is removed by calling logout().
 * The validity of a token can be checked by calling isAuthenticated().
 * 
 **/
import { jwtDecode } from 'jwt-decode';

interface DecodedToken{
    exp: number,
}

interface AuthResponse {
    token: string;
  }

/**
 * Check if a user is authenticated by looking in session storage for a valid jwt-token.
 * 
 * @returns {boolean} true if a valid token is found in the session, otherwise false.
 * **/
export const isAuthenticated = (): boolean => {
    const token = sessionStorage.getItem("jwt")

    //Check if there is a token in session storage.
    if(!token){
        return false;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        //Check if token has expired.
        if(decodedToken.exp > currentTime){
            return true;
        } else{
            //Remove token if the validity of it could not be verified.
            sessionStorage.removeItem("jwt");
            return false;
        }
    } catch (error) {
        //Remove token if an error occurs.
        sessionStorage.removeItem("jwt");
        return false;
    }
};

/**
 * Save a valid jwt-token in session storage when user logs in.
 * @param token A jwt-token.
 **/
export const login = (token: AuthResponse): void => {
    sessionStorage.setItem("jwt", JSON.stringify(token));
}

/**
 * Remove a jwt-token when user logs out.
 **/
export const logout = (): void => {
    sessionStorage.removeItem("jwt");
};