$(document).ready(function () {
    var library = new Reklam5();
    library.init();
})

$(window).resize(function () {
    Reklam5();
});

var defaultPosition;
$(window).load(function () {
    defaultPosition = 0;
    if ($("header nav a").hasClass("active")) { defaultPosition = (parseInt($("header nav a.active span").offset().left) + parseInt($("header nav a.active").width())) + 16; }

    $(".menuhover").animate({ "width": parseInt(defaultPosition) + "px" }, 0);
});

function Reklam5() {

    var year = new Date();
    $(".year").text(year.getFullYear());

    $("header nav span").hover(function () {
        var lastElementPos = $("header nav li:last-child").offset();
        var add = 0;
        var pos = $(this).offset();
        if (pos.left == lastElementPos.left) { add = 35; }
        $(".menuhover").stop().animate({
            width: ((parseInt(pos.left) + parseInt($(this).closest("a").width())) + 16 + add) + 'px'
        }, 500, 'easeOutSine');
    });

    $("header").mouseleave(function () {
        $(".menuhover").stop().animate({
            width: defaultPosition + 'px'
        }, 700, 'easeInSine');
    });

    $("#up-btn").click(function () {
        $.scrollTo("#main", 1000);
    });
}

Reklam5.prototype.init = function () {
    var module = this.getModul().module.split(',');

    for (var i = 0; i < module.length; i++) {
        this.runModule(module[i]);
    }
};

Reklam5.prototype.getModul = function () {
    var scripts = document.getElementById('reklam5');
    var queryString = scripts.src.replace(/^[^\?]+\??/, '');

    var Params = new Object();
    if (!queryString) return Params;

    var Pairs = queryString.split(/[;&]/);

    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');

        if (!KeyVal || KeyVal.length != 2)
            continue;

        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
};

Reklam5.prototype.runModule = function (module) {
    switch (module) {
        case "index":
            this.OngoingProject();
            this.OrbitSlider();
            //$("#logo").css({"width":"36%"});
            $(".picture .shadow").click(function () {
                var url = $(this).parent(".picture").find(".active").attr("href");
                window.location.href = url;
            });
            initialiseSnow();
            //this.AudioPlayer();
            break;
        case "WhoAreWe":
            this.WhoAreWe();
            $(window).resize(function () {
                Reklam5.prototype.WhoAreWe();
            });
            break;
        case "Works":
            this.Works();
            break;
        case "WorkDetail":
            this.WorkDetail();
            break;
        case "Contact":
            this.Contact();
            break;
        case "Clients":
            //this.Pixastic();
            break;
    }
}

//----E-Mail Control----//
function ePostaKont(eposta) {
    var duzenli = new RegExp(/^[a-z]{1}[\d\w\.-]+@[\d\w-]{3,}\.[\w]{2,3}(\.\w{2})?$/);
    return duzenli.test(eposta);
}
//----/E-Mail Control----//

function Count(text, long) {
    var maxlength = new Number(long); // Change number to your max length.
    if (text.value.length > maxlength) {
        text.value = text.value.substring(0, maxlength);
        //document.getElementById("char").innerHTML = '0';
        return false;
    } else {
        //document.getElementById("char").innerHTML = long - text.value.length;
    }
}

//----Is Numeric?----//
function fn_validateNumeric(thi) {
    if (((event.keyCode < 48) || (event.keyCode > 57)) && (event.keyCode != 46))
        event.returnValue = false;
    if (event.keyCode == 46 && instr(thi.value, ".") >= 0)
        event.returnValue = false;
}
//----/Is Numeric?----//

Reklam5.prototype.OngoingProject = function () {
    $(".project .info .infowrap").eq(0).addClass("active");
    $(".project .picture a").eq(0).addClass("active");

    var size = $(".project .info .infowrap").size() - 1;
    var index = 0;
    $(".slide-button .prev").click(function () {

        if (index > 0 && index <= size) {
            $(".project .info").find(".active").stop().fadeTo(500, 0, function () {
                $(this).removeClass("active");
            });

            $(".project .info .infowrap").eq(index - 1).stop().fadeTo(500, 1, function () {
                $(this).addClass("active");
                index--;
            });

            $(".project .picture").find(".active").find("img").stop().fadeTo(700, 0, function () {
                $(this).closest("a").removeClass("active");
            });
            $(".project .picture a").eq(index - 1).find("img").stop().fadeTo(500, 1, function () {
                $(this).closest("a").addClass("active");
            });
        }
    });

    $(".slide-button .next").click(function () {

        if (index < size && size >= 0) {
            $(".project .info").find(".active").stop().fadeTo(500, 0, function () {
                $(this).removeClass("active");
            });

            $(".project .info .infowrap").eq(index + 1).stop().fadeTo(500, 1, function () {
                $(this).addClass("active");
                index++;
            });

            $(".project .picture").find(".active").find("img").stop().fadeTo(700, 0, function () {
                $(this).closest("a").removeClass("active");
            });
            $(".project .picture a").eq(index + 1).find("img").stop().fadeTo(500, 1, function () {
                $(this).closest("a").addClass("active");
            });
        }
    });
}

Reklam5.prototype.OrbitSlider = function () {
    $('#slider').orbit({
        animation: 'fade',
        bullets: true,
        directionalNav: false,
        afterSlideChange: function () {
            var colour = $(this).attr("data-colour");
            if (colour != "undefined") {
                $("header nav a").animate({ color: '' + colour + '' }, 300);
            } else { $("header nav a").animate({ color: '#eed0d0' }, 300); }
        }
    });
}

Reklam5.prototype.WhoAreWe = function () {
    $(".member .namebg").fadeTo(0, 0.1);
    $(".member-detail-wrap").css({ "width": $("#teammembers .wrapper").offset().left + $("#teammembers .wrapper").width() + "px" });

    $("#teammembers .member a").click(function () {
        var link = $(this);
        var member = $(this).attr("data-key");

        $("#teammembers .member a").find(".front").css({ "display": "block" });
        $("#teammembers .member a").find(".back").css({ "display": "none" });
        $("#teammembers .member a").find(".tbg").css({ "display": "none" });

        link.find(".front").css({ "display": "none" });
        link.find(".back").css({ "display": "block" });
        link.find(".tbg").css({ "display": "block" });

        if ($(".member-detail").hasClass("active")) {

            $(".member-detail.active").closest(".member-detail-wrap").slideUp(300);

            $(".member-detail.active").stop().delay(100).animate({
                height: 'hide'
            }, 300, 'easeInQuart', function () {
                $(this).removeClass("active");

                $("#" + member).closest(".member-detail-wrap").stop().delay(150).slideDown(500);
                $("#" + member).stop().delay(150).animate({
                    height: 'show'
                }, 500, 'easeOutQuart', function () {
                    $("#" + member).addClass("active");
                    $.scrollTo($('*[data-key="' + member + '"]').closest(".member"), 600);
                    link.find(".front").css({ "display": "none" });
                    link.find(".back").css({ "display": "block" });
                    link.find(".tbg").css({ "display": "block" });
                });
            });
        } else {
            $("#" + member).closest(".member-detail-wrap").stop().slideDown(500);

            $("#" + member).stop().animate({
                height: 'show'
            }, 500, 'easeOutQuart', function () {
                $("#" + member).addClass("active");
                $.scrollTo($('*[data-key="' + member + '"]').closest(".member"), 600);
            });
        }
    });

    $(".member-detail .close").click(function () {
        $(this).closest(".member-detail-wrap").slideUp(500);
        $(this).closest(".active").animate({
            height: 'hide'
        }, 500, function () {
            $(this).removeClass("active");
            $("#teammembers .member a").find(".front").css({ "display": "block" });
            $("#teammembers .member a").find(".back").css({ "display": "none" });
            $("#teammembers .member a").find(".tbg").css({ "display": "none" });
        });
    });
}

Reklam5.prototype.Works = function () {
    var TotalPortfolio = $(".portfolio li").size();
    $(".portfolio li").each(function () {
        $(this).css({ "z-index": TotalPortfolio - 1 });
        TotalPortfolio--;
    });
}

Reklam5.prototype.WorkDetail = function () {

    $(window).scroll(function () {
        var windowHeight = $(this).height();
        var scrollTop = $(this).scrollTop();

        if (windowHeight < scrollTop) { $("#up-btn").fadeIn(200); }
        else { $("#up-btn").stop().fadeOut(200); }
    });

}

Reklam5.prototype.Contact = function () {

    $('.txt-input').focus(function () {
        inputTxt = $(this).val();
        if ($(this).val() == inputTxt || $(this).text() == inputTxt) {
            $(this).attr("value", "");
            $(this).text("");
        }
    }).blur(function () {
        if ($(this).val() == "" || $(this).text() == "") {
            $(this).attr("value", inputTxt);
            $(this).text(inputTxt);
        }
    });

    $("#btnSubmit").click(function () {
        var name = $("#txtName").val();
        var email = $("#txtEmail").val();
        var phone = $("#txtPhone").val();
        var message = $("#txtMessage").val();

        if (name == "" || !ePostaKont(email) || message == "") {

            return false;
        } else {

            var param = "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message;
            var req_url = "../SendMail.ashx";

            $("#btnSubmit").hide();
            $("#loading").show();

            $.ajax({
                type: 'POST',
                url: req_url,
                data: param,
                success: function (ajaxCevap) {
                    if (ajaxCevap.indexOf('success') != -1) {
                        $("#loading").hide();
                        $("#success").fadeIn(300);
                        $(".txt-input").val("");
                        $(".txt-input").text("");
                    } else {
                        $("#loading").hide();
                        $("#error").fadeIn(300);
                        $(".btnsubmit").addClass("btn-error");
                    }
                }
            });
        }
    });
}

Reklam5.prototype.Pixastic = function () {
    var array = new Array();

    $(".hi-icon").each(function () {
        array.push($(this).find("img"));
        $(this).find("img").pixastic("desaturate", { average: false });
    });

    $(".hi-icon").hover(function () {
        $(this).html(array[$(this).index()]);
    }, function () {
        $(this).find("img").pixastic("desaturate", { average: false });
    });
}

Reklam5.prototype.AudioPlayer = function () {

    var urls = new Array();
    urls[0] = '/App_Themes/Default/images/wind.mp3';
    var next = 0;

    function loadPlayer() {
        var audioPlayer = new Audio();
        audioPlayer.controls = "controls";
        audioPlayer.addEventListener('ended', nextSong, false);
        audioPlayer.addEventListener('error', errorFallback, true);
        document.getElementById("player").appendChild(audioPlayer);
        nextSong();
    }



    function nextSong() {
        if (urls[next] != undefined) {
            var audioPlayer = document.getElementsByTagName('audio')[0];
            if (audioPlayer != undefined) {
                audioPlayer.src = urls[next];
                audioPlayer.load();
                audioPlayer.play();
                next++;
            } else {
                loadPlayer();
            }
        } else {
            // alert('the end!');
        }
    }
    function errorFallback() {
        nextSong();
    }
    function playPause() {
        var audioPlayer = document.getElementsByTagName('audio')[0];
        if (audioPlayer != undefined) {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        } else {
            loadPlayer();
        }
    }
    function pickSong(num) {
        next = num;
        nextSong();
    }



    playPause();
}
