require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
    },
    shim: {
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        },
        'jcookie': {
            deps: ['jquery'],
            exports: 'jcookie'
        }
    }
});

require(['jquery'], () => {
    let $modulepage = $('#currentpage').attr('data-origin');
    require([$modulepage], function(modulepage) {
        modulepage.init();
    });
});