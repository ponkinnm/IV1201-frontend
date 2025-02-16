import { jwtDecode } from 'jwt-decode';

interface DecodedToken{
    exp: number,
}

/* Check if a user is authenticated, handles all login and logout logic*/
export const isAuthenticated = (): boolean => {
    const token = sessionStorage.getItem("jwt")

    //Check if there is a token in session storage.
    if(!token){
        return false;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        //Check token expiration.
        if(decodedToken.exp > currentTime){
            return true;
        } else{
            sessionStorage.removeItem('jwt');
            return false;
        }
    } catch (error) {
        //Remove token if error occurs.
        sessionStorage.removeItem('jwt');
        return false;
    }
};

export const logout = (): void => {
    sessionStorage.removeItem('jwt');
};