define([], () => {
    return {
        init: function() {
            const $form = $('#form1');
            const $tel = $('[name=tel]');
            const $password = $('[name=password]')
            const $confpwd = $('[name=confirmpwd]');
            const $checkbox = $('[name=checkbox]')
            const $span = $('#form1 span');
            let $telflag = true;
            let $pwdflag = true;
            let $conflag = true;
            let $checkflag = true;
            $tel.on('focus', function() {
                $span.eq(0).html('注册请用常用的手机号').css('color', '#333');
            })
            $tel.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $span.eq(0).html("√").css('color', 'green');
                        $telflag = true;
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.111:8080/dashboard/zhe800/php/reg.php',
                            data: {
                                tel: $tel.val()
                            }
                        }).done(function(data) {
                            if (!data) {
                                $span.eq(0).html('√').css('color', 'green');
                            } else {
                                $span.eq(0).html('该用户已存在').css('color', 'red');
                                $telflag = false;
                            }
                        })
                    } else {
                        $span.eq(0).html("手机号码格式错误").css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $span.eq(0).html("请输入手机号").css('color', 'red');
                    $telflag = false;
                }
            })

            $password.on('focus', function() {
                $span.eq(1).html("6-24位数字，字母或半角符号").css('color', '#ccc');
            })
            $password.on('input', function() {
                let $value = $(this).val();
                if ($value.length >= 6 && $value.length < +24) {

                    let $regnum = /\d+/;
                    let $reguppcase = /[A-Z]+/;
                    let $reglowercase = /[a-z]+/;
                    let $other = /[\W_]+/;
                    let $count = 0;
                    if ($regnum.test($value)) {
                        $count++;
                    }
                    if ($reguppcase.test($value)) {
                        $count++;
                    }
                    if ($reglowercase.test($value)) {
                        $count++;
                    }
                    if ($other.test($value)) {
                        $count++;
                    }
                    switch ($count) {
                        case 1:
                            $span.eq(1).html("弱").css('color', 'red');
                            $pwdflag = false;
                            break;
                        case 2:
                        case 3:
                            $span.eq(1).html("中").css('color', 'green');
                            $pwdflag = true;
                            break;
                        case 4:
                            $span.eq(1).html("强").css('color', 'green');
                            $pwdflag = true;
                            break;
                    }
                } else {
                    $span.eq(1).html("输入密码长度有误").css('color', 'red');
                    $pwdflag = false;

                }

            });
            $password.on('blur', function() {
                let $value = $(this).val();
                if ($value == '') {
                    $span.eq(1).html('密码不能为空').css('color', 'red');
                    $pwdflag = false;
                }
            })

            $confpwd.on('focus', function() {
                $span.eq(2).html('请再次输入密码').css('color', '#ccc');
            })
            $confpwd.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    if ($value === $password.val()) {
                        $span.eq(2).html('√').css('color', 'green');
                        $conflag = true;
                    } else {
                        $span.eq(2).html('两次密码不一致').css('color', 'red');
                        $conflag = false;
                    }
                } else {
                    $span.eq(2).html('确认密码不能为空').css('color', 'red');
                    $conflag = false;
                }
            })
            $checkbox.on('click', function() {
                if ($(this).prop('checked')) {
                    $checkflag = true;
                    $span.eq(3).html('');
                } else {
                    $span.eq(3).html("请确认你已看过并同意用户协议").css('color', 'red');
                    $checkflag = false;
                }
            })


            $form.on('submit', function() {
                if ($tel.val() === '') {
                    $span.eq(0).html("手机号码格式错误").css('color', 'red');
                    $telflag = false;
                }

                if ($password.val() === '') {
                    $span.eq(1).html("请输入密码").css('color', 'red');
                    $pwdflag = false;
                }
                if ($confpwd.val() === '') {
                    $span.eq(2).html("确认密码不能为空").css('color', 'red');
                    $conflag = false;
                }
                if (!$telflag || !$pwdflag || !$conflag || !$checkflag) {
                    return false;
                }
            })
        }
    }
})