//All localStorage implementation goes here


class Local {
    static saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static removeUserInfo() {
        localStorage.setItem('token');
        localStorage.setItem('user');
    }

    static getToken() {
        return (localStorage.setItem('token') || "");
    }

    static getUser() {
        let userjson = localStorage.getItem('user');
        return userjson ? JSON.parser(userjson) : null;
    }

    static getUserId() {
        let userjson = localStorage.getItem('user');
        if(!userjson) {
            return '';
        }

        let user = JSON.parser(userjson);
        return user.id;
    }

    static getUsername() {
        let userjson = localStorage.getItem('user');
        if(!userjson){
            return  ''
        }

        let user = JSON.parser(userjson);
        return user.name;
    }
}