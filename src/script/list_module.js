define(['pagination', 'jlazyload', 'jcookie'], function() {
    return {
        init: function() {
            const $list = $('.list ul');
            let $array_default = [];
            let $array = [];
            let $prev = [];
            let $next = [];
            $.ajax({
                url: 'http://10.31.161.111:8080/dashboard/zhe800/php/pagelist.php',
                dataType: 'json'
            }).done(function(datalist) {
                data = datalist.pagedata;
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                <p>${value.title}</p>
                                <span>￥${value.price}</span>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                $("img.lazy").lazyload({ effect: "fadeIn" });

                $('.list li').each(function(index, element) {
                    $array_default[index] = $(this);
                    $array[index] = $(this);
                });
                $('.page').pagination({
                    pageCount: datalist.pageno,
                    jump: true,
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent());
                        $.ajax({
                            url: 'http://10.31.161.111:8080/dashboard/zhe800/php/pagelist.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata;
                            let $strhtml = '';
                            $.each(data, function(index, value) {
                                $strhtml += `
                                        <li>
                                            <a href="detail.html?sid=${value.sid}">
                                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                                <p>${value.title}</p>
                                                <span>￥${value.price}</span>
                                            </a>
                                        </li>
                                    `;
                            });
                            $list.html($strhtml);
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                            $('.list li').each(function(index, element) {
                                $array_default[index] = $(this);
                                $array[index] = $(this);
                            });
                        });
                    }
                });
                $('button').eq(0).on('click', function() {
                    $.each($array_default, function(index, value) {
                        $list.append(value);
                    });
                });
                $('button').eq(1).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1));
                            $next = parseFloat($array[j + 1].find('span').html().substring(1));
                            if ($prev > $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });

                $('button').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1));
                            $next = parseFloat($array[j + 1].find('span').html().substring(1));
                            if ($prev < $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });
                let arrsid = [];
                let arrnum = [];

                function getcookietoarray() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(',');
                        arrnum = $.cookie('cookienum').split(',');
                    } else {
                        arrsid = [];
                        arrnum = [];
                    }
                }
                getcookietoarray();
                $(".column-top1 em").html(arrsid.length);
            });
            const $columnbtn = $(".column-btn");
            $(window).on("scroll", () => {
                let $scrolltop = $(window).scrollTop();
                if ($scrolltop >= 400) {
                    $columnbtn.show();
                } else {
                    $columnbtn.hide();
                }
            });
            $columnbtn.on("click", function() {
                $("html").stop(true).animate({
                    top: 0
                })
            });
        }
    }
});