define(['jlazyload'], () => {
    return {
        init: function() {
            const $update = $(".updated-main");
            const $lunbo = $(".sidebar-c");
            const $lunbopic = $(".sidebar-c .sidebarpic li");
            const $btnlist = $(".sidebar-c ol li");
            const $sidelist = $(".sidebar-l ul .sidebar-li");
            const $sidebarcl = $(".sidebar-cl");
            const $cartlist = $(".cartlist");
            const $suspend = $(".suspend");
            let $num = 0;
            let $timer = null;
            $.ajax({
                url: "http://10.31.161.111:8080/dashboard/zhe800/php/listdata.php",
                dataType: 'json'
            }).done(function(date) {
                let $strhtml = '';
                $.each(date, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                            <img class = "lazy" data-original="${value.url}" width="283" height="283"/>
                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                            </a>
                        </li>
                    `;
                });
                $update.html($strhtml);
                $(function() {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });
            })
            $btnlist.on("mouseover", function() {
                $num = $(this).index();
                tablunbo();
            })
            $timer = setInterval(function() {
                $num++;
                if ($num > $lunbopic.length - 1) {
                    $num = 0;
                }
                tablunbo();

            }, 2000);
            $lunbo.hover(function() {
                clearInterval($timer);
            }, function() {
                $timer = setInterval(function() {
                    $num++;
                    if ($num > $lunbopic.length - 1) {
                        $num = 0;
                    }
                    tablunbo();
                }, 2000);
            })

            function tablunbo() {
                $btnlist.eq($num).addClass("active").siblings("li").removeClass("active");
                $lunbopic.eq($num).stop(true).animate({
                    opacity: 1
                }).siblings().stop(true).animate({
                    opacity: 0
                })
            }
            $sidelist.hover(function() {
                $sidebarcl.show();
                $cartlist.eq($(this).index()).show().siblings().hide();
            }, function() {
                $sidebarcl.hide();
            })
            $sidebarcl.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });

            //顶部悬浮
            $(window).on("scroll", () => {
                    let $scrolltop = $(window).scrollTop();
                    if ($scrolltop >= 400) {
                        $suspend.stop(true).animate({
                            top: 0
                        })

                    } else {
                        $suspend.stop(true).animate({
                            top: -82
                        })
                    }
                })
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

        }
    }
});