define(['jcookie'], () => {
    return {
        init: function() {
            //右边栏动画
            const $columnlist = $(".column li");
            const $columnintro = $(".column-intro");
            $columnlist.hover(function() {
                    $columnlist.eq($(this).index()).addClass("activecolor").siblings("li").removeClass("activecolor");
                    $columnlist.eq($(this).index()).find("em").css("color", "#fff");
                    if ($(this).index() - 1 < 0) {
                        $columnintro.eq($(this).index() - 1).hide();
                    }
                    $columnintro.eq($(this).index() - 1).show();
                },
                function() {
                    $columnlist.eq($(this).index()).removeClass("activecolor");
                    $columnlist.eq($(this).index()).find("em").css("color", "red");
                    $columnintro.eq($(this).index() - 1).hide();
                });
            //最下角点击
            const $columnbtn = $(".column-btn");
            $columnbtn.on("click", function() {
                $("html").stop(true).animate({
                    top: 0
                })
            })
            let $sid = location.search.substring(1).split("=")[1];
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                url: "http://10.31.161.111:8080/dashboard/zhe800/php/detail.php",
                data: {
                    sid: $sid
                },
                dataType: "json"
            }).done(function(data) {
                const $left = $('#left');
                const $right = $('#right');
                const $ul = $("#list ul");
                $("#smallpic").attr("src", data.url);
                $(".loadtitle").html(data.title);
                $(".loadpcp").html(data.price);
                $("#bpic").attr("src", data.url);
                let $picurls = data.urls.split(",");
                let strhtml = '';
                $.each($picurls, function(index, value) {
                    strhtml += `
                    <li>
                    <img src="${value}"/>
                    </li>
                    `;
                })
                $ul.html(strhtml);
                $ul.on("click", "li", function() {
                    let $imgurl = $(this).find("img").attr("src");
                    $("#smallpic").attr("src", $imgurl);
                    $("#bpic").attr("src", $imgurl);
                })
                let $num = 6;
                let $lists = $("#list ul li");
                $right.on("click", function() {
                    if ($num < $lists.size()) {
                        $num++;
                        if ($num == $lists.size()) {
                            $right.css("color", "#fff");
                        }
                        $ul.animate({
                            left: -($num - 6) * $lists.eq(0).outerWidth(true)
                        })
                    }

                })
                $left.on("click", function() {
                        if ($num > 6) {
                            $num--;
                            if ($num <= 6) {
                                $left.css("css", "#fff");
                            }
                            $ul.animate({
                                left: -($num - 6) * $lists.eq(0).outerWidth(true)
                            })
                        }
                    })
                    //放大镜
                const $spic = $('#spic');
                const $bpic = $('#bpic');
                const $sf = $('#sf');
                const $bf = $('#bf');
                $sf.width($spic.width() * $bf.width() / $bpic.width());
                $sf.height($spic.height() * $bf.height() / $bpic.height());
                const $bli = $bpic.width() / $spic.width();
                $spic.hover(function() {
                        $sf.css("visibility", "visible");
                        $bf.css("visibility", "visible");
                        $(this).on("mouseover", function(ev) {
                            let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
                            let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
                            if ($leftvalue < 0) {
                                $leftvalue = 0;
                            }
                            if ($leftvalue > $spic.width() - $sf.width()) {
                                $leftvalue = $spic.width() - $sf.width()
                            }
                            if ($topvalue < 0) {
                                $topvalue = 0;
                            }
                            if ($topvalue > $spic.height() - $sf.height()) {
                                $topvalue = $spic.height() - $sf.height()
                            }
                            $sf.css({
                                top: $topvalue,
                                left: $leftvalue
                            })
                            $bpic.css({
                                top: -$topvalue * $bli,
                                left: -$leftvalue * $bli
                            })
                        })
                    },
                    function() {
                        $sf.css("visibility", "hidden");
                        $bf.css("visibility", "hidden");
                    })
            });
            //购物车 
            let arrsid = [];
            let arrnum = [];

            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.p-btn a').on('click', function() {
                getcookietoarray();
                if ($.inArray($sid, arrsid) === -1) {
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {
                    let $index = $.inArray($sid, arrsid);
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }

            });
            getcookietoarray();
            $(".column-top1 em").html(arrsid.length);
        }
    }
});