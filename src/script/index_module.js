define(['jlazyload'], () => {
    return {
        init: function() {
            const $update = $(".updated-main");
            $.ajax({
                url: "http://10.31.161.111:8080/dashboard/zhe800/php/listdata.php",
                dataType: 'json'
            }).done(function(date) {
                let $strhtml = '';
                $.each(date, function(index, value) {
                    console.log(value);
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
                console.log($strhtml);
                $update.html($strhtml);
                $(function() {
                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    });
                });
            })

        }
    }
});