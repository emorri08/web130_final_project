let getAllArticles = '
    query AllArticle {
        allArticles {
            id, 
            title,
            content
        }
    }
';

$(document).ready(function()) {
    $.post(
        'https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
        JSon.stringify({
             query: getAllArticles
        }),
        (response) => {
            console.log(response);
        }
    );
});