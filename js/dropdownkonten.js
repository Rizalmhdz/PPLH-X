//progressbar
window.onscroll = function() {myFunction()};
function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

//dropdown menu
$(document).ready(function () {
    $(".menu-btn").click(function () {
        if ($(this).siblings(".menu-show").css("display") == "block") {
            $(this).siblings(".menu-show").css("display", "none");
        } else {
            $('.menu-show').css("display", "none");
            $(this).siblings(".menu-show").css("display", "block");
        }
    });

    $("li ul li").click(function () {
        $("li ul li").removeClass("active");
        $(this).addClass("active");
    });

    $('.nav_btn').click(function () {
        $('.mobile_nav_items').toggleClass('active');
    });
});

//dropdown konten
$(document).ready(function () {
    $("#menu-btn").click(function () {
        if ($(this).siblings("#menu-show").css("display") == "block") {
            $(this).siblings("#menu-show").css("display", "none");
        } else {
            $('#menu-show').css("display", "none");
            $(this).siblings("#menu-show").css("display", "block");
        }
    });

    $("li ul li").click(function () {
        $("li ul li").removeClass("active");
        $(this).addClass("active");
    });

    $('.nav_btn').click(function () {
        $('.mobile_nav_items').toggleClass('active');
    });
});

$(document).ready(function () {
    $("#menu-btn1").click(function () {
        if ($(this).siblings("#menu-show1").css("display") == "block") {
            $(this).siblings("#menu-show1").css("display", "none");
        } else {
            $('#menu-show1').css("display", "none");
            $(this).siblings("#menu-show1").css("display", "block");
        }
    });

    $("li ul li").click(function () {
        $("li ul li").removeClass("active");
        $(this).addClass("active");
    });

    $('.nav_btn').click(function () {
        $('.mobile_nav_items').toggleClass('active');
    });
});

$(document).ready(function () {
    $("#menu-btn2").click(function () {
        if ($(this).siblings("#menu-show2").css("display") == "block") {
            $(this).siblings("#menu-show2").css("display", "none");
        } else {
            $('#menu-show2').css("display", "none");
            $(this).siblings("#menu-show2").css("display", "block");
        }
    });
});

$(document).ready(function () {
    $("#menu-btn3").click(function () {
        if ($(this).siblings("#menu-show3").css("display") == "block") {
            $(this).siblings("#menu-show3").css("display", "none");
        } else {
            $('#menu-show3').css("display", "none");
            $(this).siblings("#menu-show3").css("display", "block");
        }
    });
});

$(document).ready(function () {
    $("#menu-btn4").click(function () {
        if ($(this).siblings("#menu-show4").css("display") == "block") {
            $(this).siblings("#menu-show4").css("display", "none");
        } else {
            $('#menu-show4').css("display", "none");
            $(this).siblings("#menu-show4").css("display", "block");
        }
    });
});

$(document).ready(function () {
    $("#menu-btn5").click(function () {
        if ($(this).siblings("#menu-show5").css("display") == "block") {
            $(this).siblings("#menu-show5").css("display", "none");
        } else {
            $('#menu-show5').css("display", "none");
            $(this).siblings("#menu-show5").css("display", "block");
        }
    });
});

$(document).ready(function () {
    $("#menu-btn6").click(function () {
        if ($(this).siblings("#menu-show6").css("display") == "block") {
            $(this).siblings("#menu-show6").css("display", "none");
        } else {
            $('#menu-show6').css("display", "none");
            $(this).siblings("#menu-show6").css("display", "block");
        }
    });
});
