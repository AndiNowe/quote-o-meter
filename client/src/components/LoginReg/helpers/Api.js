//import local for functions to work
import Local from './Local';

const BASE_URL = 'http://localhost:5000';

class APi {
    //Login a user

    static async loginUser(username, password) {
        //prep URL and options
        let url = `${BASE_URL}/login`
        let body = { username, password };
        let options = {
            method: 'POST',
            headeres: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        //Fetch!
        let response;
        try{
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${ response.status}: ${response.statusText}`;  
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }
        return response;
    }



    //Get all users (for login) as Admin 
    static async getUsers() {
        //prep URLand options
        let url = `${BASE_URL}/users`;
        let options = { method: 'GET' };

        //Fetch!
        let response;
        try{
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }


    //Get data for user with ID 'userId'    
    static async getUser(userId) {
        //prep URL and options
        let url = `$PBASE_URL/users/${userId}`;
        let options = { method: 'GET', headeres: {} };

        //Add JWT token (only if it exists!)
        let token = Local.getToken();
        if (token) {
            options.headers['x-access-token'] = token;
        }

        //Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}` 
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }
        
        return response;

    }



    //General purpose Ge routes for members only
    static async getContent(route) {
        //prep URL and options
        let url = `${BASE_URL}${route}`;
        let options = { method: 'GET', headers: {} };

        //Add JWT token (only if it exists!) in case content is protected
        let token = Local.getToken();
        if (token) {
            options.headers['x-access-token'] = token;
        }

        //Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${ response.statusText}`
            } 
        } catch (err) {
            response = { ok: false, error: err.message };
        }
    
        return response;
    }
}

//Don't forget to export so you can use elsewhere!
export default APi;