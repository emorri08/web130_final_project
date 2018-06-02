let getAllArticles = '
    query AllArticles {
        allArticles {
            id,
            title,
            content
        }
    }
';

$(document).ready(function() {
    $.post('https://api.graph.cool/simple/v1/cjhjt273h019p0170q9p730ti',
        JSON.stringify({
        query: getAllArticles
        }),
        (response) => {
        console.log(response);
        }
        );
});