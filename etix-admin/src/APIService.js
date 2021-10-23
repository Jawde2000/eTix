export default class APIService{
    static LoginUser (email, password) {
        const body = {
            "email" : email,
            "password" : password
        }
        return fetch('http://127.0.0.1:8000/api/users/login/',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}