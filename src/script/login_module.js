define([], () => {
    return {
        init: function() {
            const $tel = $('#tel');
            const $pwd = $('#pwd');
            const $smt = $('.smt');
            $smt.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.111:8080/dashboard/zhe800/php/login.php',
                    data: {
                        tel: $tel.val(),
                        pwd: $pwd.val()
                    }
                }).done(function(data) {
                    if (!data) {
                        alert('用户名或者密码有误!');
                        $pwd.val('');
                    } else {
                        location.href = 'index.html';
                        $.cookie('loginname', $tel.val());
                    }
                })
            });

        }
    }
})