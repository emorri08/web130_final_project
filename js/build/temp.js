// David Holter and Elly Boyd
// articles.js for final project
// global $

let getAllArticles = `
    query AllArticles {
      allArticles {
        id,
        title,
        content
      }
    }
`;

$(document).ready(function () {
    //list view
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: response => {
                let articles = response.data.allArticles;
                console.log(articles);
                let html = '';
                for (let article of articles) {
                    html += `<h2>${article.title}</h2>
                             <p>${article.content}</p>`;
                }
                $('#main-content').html(html);
            },
            contentType: 'application/json'
        });
    }
});

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

$(document).ready(function () {
    //login view
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'login_view') {
        $('#login-button').on('click', event => {
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
                success: response => {
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
