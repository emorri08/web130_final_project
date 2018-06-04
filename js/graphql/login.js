// Elly Boyd & David Holter
// login.js for final project
// global $ JS_PAGE

let loginMutation = `
    mutation AuthenticateUser($email: String!, $password: String!) {
        authenticateUser(email: $email, password: $password) {
            id,
            token
        }
    }`;

$(document).ready(function() {
    //login view
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'login_view') {
        $('#login-button').on('click', (event) => {
            event.preventDefault();
            let username = $('#username').val(),
                password = $('#password').val();
            
            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
                data: JSON.stringify({
                    query: loginMutation,
                    variables: {
                        email: username,
                        password: password
                    }
                }),
                success: (response) => {
                    let user = response.data.authenticateUser;
                    if (user === null) {
                        alert('Login failed! Try again.');
                    } else {
                        console.log(user);
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});