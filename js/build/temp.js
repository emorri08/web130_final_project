// David Holter and Elly Boyd
// articles.js for final project
/* global $ JS_PAGE Cookies */

let getAllArticles = `
    query AllArticles {
      allArticles {
        id,
        title,
        content
      }
    }
`;

let getArticle = `
    query GetArticle($id: ID) {
        Article(id: $id) {
            title,
            content
        }
    }
`;

let CreateArticle = `
    mutation CreateArticle($authorId: ID!, $title: String!, $content: String!) {
        createArticle(authorId: $authorId, title: $title, content: $content) {
            id,
            title
        }
    }
`;

$(document).ready(function () {
    // List View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: response => {
                let articles = response.data.allArticles;
                let html = '';
                for (let article of articles) {
                    html += `
                        <h2>
                            <a href="article_detail.html#${article.id}">
                                ${article.title}
                            </a>
                        </h2>
                        <p>${article.content}</p>
                    `;
                }
                $('#main-content').html(html);
            },
            contentType: 'application/json'
        });
    }

    // Detail View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'detail_view') {
        let article_id = window.location.hash.substring(1);
        console.log('Article id is? ' + article_id);
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
            data: JSON.stringify({
                query: getArticle,
                variables: {
                    id: article_id
                }
            }),
            success: response => {
                let article = response.data.Article;
                $('#article-title').html(article.title);
                $('#article-content').html(article.content);
            },
            contentType: 'application/json'
        });
    }

    // Form View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'form_view') {
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
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                },
                success: response => {
                    let article = response.data.createArticle;
                    window.location = 'article_detail.html#' + article.id;
                },
                contentType: 'application/json'
            });
        });
    }
});

// David Holter & Elly Boyd
// login.js for final project
// global $ JS_PAGE, Cookies

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
                        alert('Login failed! Please try again.');
                    } else {
                        console.log(user);
                        Cookies.set('authorId', user.id, { expires: 7 });
                        Cookies.set('token', user.token, { expires: 7 });
                        // redirect logged in user to article_form.html
                        window.location = 'article_form.html';
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});

/* global $ */

$(document).ready(function () {
    let menu = $('nav > ul'),
        link = $('#mobileMenu');

    link.on('click', function () {
        if (menu.hasClass('closed')) {
            menu.removeClass('closed');
            menu.addClass('open');
        } else {
            menu.removeClass('open');
            menu.addClass('closed');
        }
    });
});

// flipping gallery plug in code
$(".gallery").flipping_gallery({
    direction: "forward",
    selector: "> a",
    spacing: 15,
    showMaximum: 10,
    enableScroll: true,
    flipDirection: "bottom",
    autoplay: false
});
