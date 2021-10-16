

class APIService {
    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/api/users/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'is_vendor': true,
                'is_customer': false,
                'is_staff': false,
                'is_superuser': false,
              },
              body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
}

export default APIService;