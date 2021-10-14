export default class APIService{
    static LoginUser (email, password) {
        const body = {
            "username" : email,
            "password" : password
        }
        return fetch('http://127.0.0.1:8000/auth/',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}