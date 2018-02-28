require.config({
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min'
    },
    waitSeconds: 20
});

try {
    console.log($)
} catch (e) {
    console.log(e.message)
}

require(
    ['lodash', 'jquery'],
    function () {
        console.log('ready')
        $("body").append("<h1>RequireJS Worked</h1><p>jQuery appended this and Lodash is doing this math: " + _.add(6, 4) + "</p>");
    }
);

setTimeout(() => console.log($), 10000)
