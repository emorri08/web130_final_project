// David Holter and Elly Boyd
// articles.js for final project
/*global $*/
/*global JS_PAGE Cookies */

let getAllArticles = `
    query AllArticles {
      allArticles {
        id,
        title,
        content
      }
    }
`;

let CreateArticle = `
    mutation CreateArticle($authorId: ID!, $title: String!, $content; String!) {
        createArticle(authorId: $authorId, title: $title, content: $content) {
            id, 
            title
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

    //Form View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'article_form') {
        $('#save-article-button').on('click', event => {
            event.preventDefault();
            let title = $('#title').val(),
                content = $('#content').val(),
                authorId = Cookies.get('authorId');

            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
                data: JSON.stringify({
                    query: CreateArticle,
                    variables: {
                        title: title,
                        content: content,
                        authorId: authorId
                    }
                }),
                header: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                },

                success: response => {
                    let articles = response.data;
                    console.log(articles);
                },
                contentType: 'application/json'
            });
        });
    }
});

// Elly Boyd & David Holter
// login.js for final project
/*global $, JS_PAGE, Cookies*/

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
                        Cookies.set('authorId', user.id, { expires: 7 });
                        Cookies.set('token', user.token, { expires: 7 });
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});
