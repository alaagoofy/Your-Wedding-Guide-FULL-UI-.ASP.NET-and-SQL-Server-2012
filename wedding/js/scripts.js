/// <reference path="jquery-1.6.4.min.js" />

var boolEsc = false;
var boolEnter = false;
var boolCloseNewsletter = true;
var boolOpenBarid = true;
var boolCloseSendToFriend = true;
$(document).keyup(function (event) {
    //    if (event.which == 13) {
    //        if ($('.emailBackground').length != 0 && $('.emailBackground').is(':visible')) {
    //            if ($('.emailBackground .wrapBarid.part1').is(':visible')) {
    //                showBaridform();
    //                boolEnter = true;
    //            }
    //        }
    //    }
    if (event.which == 27) {
        closeBarid();
        closeMazidDdlMenu();
        closeSearchDdlMenuCollections();
        closeSearchDdlMenuCities();
        closeSendToFriend();

        closeSearchDdlMenuSendTo();
        closeSearchDdlMenuCountries();
        closeSearchDdlMenuCategories();
    }
});

/*
height: The height of the reflection. It can be proportional or fixed. If the value is included between 0 and 1, it is considered as proportional to the image's height (where 1 means 100%). If the value exceeds 1, it is considered as a fixed height, in pixels. Note that the reflection will never be taller than the image, even if this value exceeds the image's height. Default is 1/3 (proportional).
   
opacity: The starting opacity of the reflection (range: 0 to 1). The reflection is shown as an opacity gradient going from this value to 0. Default is 1/2.
*/
function calculPlength() {
    var plength = $('.homeSlider').find('.item.pattern').length;
    var wid = (plength + 1) * 4000;
    $('.jspPane').css({ 'width': wid + 'px' });
    $('.jspPane').find('p').css({ 'width': wid + 'px' });
    $('.jspContainer').css({ 'width': wid + 'px' });
    $('.jspScrollable').css({ 'width': wid + 'px' });
    //$('.jspTrack').css({'width' : wid+'px'}); 
}

$(document).click(function (event) {
    //    if (event.which == 13) {
    //        console.log('a');
    //        if ($('.emailBackground').length != 0 && $('.emailBackground').is(':visible')) {
    //            showBaridform();
    //        }
    //    }
    //    else {
    //       // console.log('b');
    //       // closeBarid();
    //    }
    if (!boolEnter && event.which != 13 && event.which != undefined) {
        closeBarid();
    }
    closeMazidDdlMenu();
    closeSearchDdlMenuCollections();
    closeSearchDdlMenuCities();
    closeSendToFriend();

    closeSearchDdlMenuSendTo();
    closeSearchDdlMenuCountries();
    closeSearchDdlMenuCategories();
});

$(window).resize(function () {
    if ($('.copyrights').length > 0) {
        var leftcop = $('.copyrights').offset().left;
        $('.fixedMod.socialMediaMod').css({ 'right': leftcop + 'px' });
    }

    if ($('.copyrights').length > 0) {
        var leftcop = $('.copyrights').offset().left;
        $('.fixedMod.goTopMod').css({ 'left': leftcop + 'px' });
    }
});

$(document).ready(function () {
    if ($('.copyrights').length > 0) {
        var leftcop = $('.copyrights').offset().left;
        $('.fixedMod.socialMediaMod').css({ 'right': leftcop + 'px' });
    }

    if ($('.copyrights').length > 0) {
        var leftcop = $('.copyrights').offset().left;
        $('.fixedMod.goTopMod').css({ 'left': leftcop + 'px' });
    }

    $('.wrapDdlSearch.collections').click(function (e) {
        closeSearchDdlMenuCities();
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.divOption').length;
        var vHeight = len * 31;
        $(ob).find('.divOptionWrap').animate({ 'height': vHeight + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.wrapDdlSearch.collections').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#collection').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.collections').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuCollections();
    });

    $('.wrapDdlSearch.cities').click(function (e) {
        closeSearchDdlMenuCollections();
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.divOption').length;
        var vHeight = len * 31;
        $(ob).find('.divOptionWrap').animate({ 'height': vHeight + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.wrapDdlSearch.cities').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#city').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.cities').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuCities();
    });

    $('.iconEnv').click(function (e) {
        e.stopPropagation();
        $('.emailBackground').show();
    });

    /*
    $('.homePid .briefnewsMod6 .picture').not(".cssTweak").mouseover(function () {
    $(this).find('img').stop(true, false).animate({
    width: 243,
    height: 217,
    left: -14,
    top: -12
    }, 77, 'linear');
    });

    $('.homePid .briefnewsMod6 .picture').not(".cssTweak").mouseleave(function () {
    $(this).find('img').stop(true, false).animate({
    width: 223,
    height: 187,
    left: 0,
    top: 0
    }, 77, 'linear');
    });
    */

    /*
    $('.homePid .briefnewsMod3.mod1 .picture').mouseover(function () {
    $(this).find('img').stop(true, false).animate({
    width: 243,
    height: 217,
    left: -14,
    top: -12
    }, 77, 'linear');
    });

    $('.homePid .briefnewsMod3.mod1 .picture').mouseleave(function () {
    $(this).find('img').stop(true, false).animate({
    width: 223,
    height: 187,
    left: 0,
    top: 0
    }, 77, 'linear');
    });*/
    /*
    $('.foodMod .item').mouseover(function () {
    $(this).find('img').stop(true, false).animate({
    width: 331,
    height: 237,
    left: -14,
    top: -12
    }, 77, 'linear');
    });

    $('.foodMod .item').mouseleave(function () {
    $(this).find('img').stop(true, false).animate({
    width: 301,
    height: 216,
    left: 0,
    top: 0
    }, 77, 'linear');
    });
    */

    //    $('.worldEventsMod .imageOver').mouseover(function () {
    //        $(this).find('img').stop(true, false).animate({
    //            width: 155,
    //            height: 217,
    //            left: -14,
    //            top: -12
    //        }, 77, 'linear');
    //    });

    //    $('.worldEventsMod .imageOver').mouseleave(function () {
    //        $(this).find('img').stop(true, false).animate({
    //            width: 131,
    //            height: 197,
    //            left: 0,
    //            top: 0
    //        }, 77, 'linear');
    //    });

    //    $('.fashionItems .fashionItem').mouseover(function () {
    //        $(this).find('img').stop(true, false).animate({
    //            width: 165,
    //            height: 251,
    //            left: -14,
    //            top: -12
    //        }, 77, 'linear');
    //    });

    //    $('.fashionItems .fashionItem').mouseleave(function () {
    //        $(this).find('img').stop(true, false).animate({
    //            width: 157,
    //            height: 241,
    //            left: 0,
    //            top: 0
    //        }, 77, 'linear');
    //    });

    $('.menuPart').find('.category').mouseenter(function () {
        var test = true;
        if ($('.containCategories').length == 0) {
            test = true;
        }
        else {
            $('.containCategories').addClass('opacity');
            $('.containCategories .opac').show();
            if ($(this).hasClass('op2')) {
                test = false;
                $('.containCategories').removeClass('opacity');
                $('.containCategories .opac').hide();
            }
        }
        if (test) {
            var finalHeight = 112;
            $('.menuPart').addClass('open');
            $(this).addClass('op');

            var o = $(this);
            o.find('.categorybg').css({ 'height': 37 + 'px' });

            if (o.find('.categoryLinks').hasClass('bgsmall')) {
                finalHeight = 60;
            }
            if (o.find('.categoryLinks').hasClass('bgbig')) {
                finalHeight = 123;
            }

            //        if (o.find('.categoryLinks').length > 0) {
            //            o.find('.categoryLinks').stop(true, false).animate({ 'height': finalHeight + 'px' }, '300', 'easeInQuart', function () {
            //                o.find('.selectMoreDiv').show();
            //                o.css({ 'zIndex': '5' });
            //            });
            //        }
            if (o.find('.categoryLinks').length > 0) {
                o.find('.categoryLinks').stop(true, true).slideDown('fast', function () {
                    o.find('.selectMoreDiv').show();
                    o.css({ 'zIndex': '5' });
                });
            }
        }
    });

    //    $('.emailBackground').mouseleave(function () {
    //        $('.emailBackground').hide();
    //    });

    $('.menuPart').find('.category').mouseleave(function () {
        $('.containCategories').removeClass('opacity');
        $('.containCategories .opac').hide();
        var o = $(this);
        if (o.find('.categoryLinks').length > 0) {

            $('.menuPart').removeClass('open');
            ////o.find('.categoryLinks').stop(true, false).animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () {
            o.find('.categoryLinks').hide();
            o.find('.categorybg').css({ 'height': 0 + 'px' });
            o.removeClass('op');
            $('.selectMoreDiv').hide();
            $('.category').css({ 'zIndex': '2' });
            ////});

        } else {
            o.find('.categorybg').css({ 'height': 0 + 'px' });
            $('.menuPart').removeClass('open');
            $(this).removeClass('op');
            $('.category').css({ 'zIndex': '2' });
        }
    });

    $('.wrapIcons').find('.icon.iconf').mouseenter(function () {
        $('.icon.iconf').find('.facebookFrameWrap').show();
    });

    $('.selectMoreDiv').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.option').length;
        var vHeight = len * 22;
        $(ob).find('.options').animate({ 'height': vHeight + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.selectMoreDiv').find('.option').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        var myVal = ob.html();
        ob.parents('.selectMoreDiv').find('.originalOption').html("" + myVal);
        closeMazidDdlMenu();
    });

    $('.wrapIcons').find('.icon.iconf').mouseleave(function () {
        $('.icon.iconf').find('.facebookFrameWrap').hide();
    });

    //    $('.slideshow').mouseenter(function () {
    //        $('.slideMod .slider').cycle('pause');
    //    });

    //    $('.slideshow').mouseleave(function () {
    //        $('.slideMod .slider').cycle('resume');
    //    });


    $('.wrapDdlSearch.sendTo').click(function (e) {
        closeSearchDdlMenuCountries();
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.divOption').length;
        var vHeight = len * 31;
        $(ob).find('.divOptionWrap').animate({ 'height': 216 + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.inputItem.sendToF').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#sendTo').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.sendTo').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuSendTo();
    });

    $('.wrapDdlSearch.sendTo').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#sendTo').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.sendTo').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuSendTo();
    });

    $('.wrapDdlSearch.countries').click(function (e) {
        closeSearchDdlMenuSendTo();
        closeSearchDdlMenuCategories();
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.divOption').length;
        var vHeight = len * 31;
        $(ob).find('.divOptionWrap').animate({ 'height': 216 + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.wrapDdlSearch.countries').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#countryId').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.countries').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuCountries();
    });

    $('.wrapDdlSearch.categories').click(function (e) {
        closeSearchDdlMenuCountries();
        e.stopPropagation();
        var ob = $(this);
        var len = $(ob).find('.divOption').length;
        var vHeight = len * 31;
        $(ob).find('.divOptionWrap').animate({ 'height': 216 + 'px' }, '300', 'easeInQuart', function () { });
    });

    $('.wrapDdlSearch.categories').find('.divOption').click(function (e) {
        e.stopPropagation();
        var ob = $(this);
        $('#categoryId').val(ob.attr('value'));
        var myVal = ob.html();
        ob.parents('.wrapDdlSearch.categories').find('.originalOption').html("" + myVal);
        closeSearchDdlMenuCategories();
    });

});

function closeMazidDdlMenu() {
    $('.selectMoreDiv').find('.options').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

///////slide animate left right /////////
//var index_first = 0;
//function slideSmart(obj, slide_width, sliderName) {
//    slide_width = slide_width.replace('px', '');
//    var max_showing = 1; // how many items are visible to the user in the slider
//    var sliderDiv;
//    var parentDiv;
//    var speed = 1000;
//    var easing = 'easeOutQuart';
//    // we have to figure out with container issued the click
//    // sliderDiv : memorizing to slider object from the container of the clicked obj
//    // parentDiv : memorizing parent of the clicked obj
//    if ($(obj).parents('.' + sliderName + '.smartNavMod').length > 0) {
//        sliderDiv = $('.' + sliderName + '.smartNavMod').find(".slider");
//        parentDiv = $(obj).parents('.' + sliderName + '.smartNavMod');
//        $(sliderDiv).css({ 'width': $(sliderDiv).find(".Item").length * slide_width + "px" });
//    }
//    if (sliderName == "featEventMod") {
//        if ($('.featEventMod').hasClass('homep')) {
//            max_showing = 4;
//        }
//        else {
//            max_showing = 2;
//        }
//    }
//    if (sliderName == 'featuredEventsMod') {
//        max_showing = 2;
//    }
//    if (sliderName == "smCcalendar_wrap") {
//        max_showing = 8;
//        speed = 350;
//        easing = 'easeInOutQuart';
//    }
//    if (sliderName == 'calendar_wrap') {
//        max_showing = 19;
//        speed = 350;
//        easing = 'easeInOutQuart';
//    }
//     
//    if (sliderName == 'smCcalendar_wrap11') {
//        max_showing = 11;
//        speed = 350;
//        easing = 'easeInOutQuart';
//    }
//    if (sliderName == 'lifeStyleSlide') {
//        max_showing = 1;
//        easing = 'easeInOutQuart';
//    }
//    if (sliderName == 'resortSlider') {
//        max_showing = 3;
//        speed = 350;
//    }
//    if (sliderName == 'mostMopMoviesSlider') {
//        max_showing = 4;
//    }
//     
//    ////check if there's animation (if yes dont animate)
//    var sliderAnimated = false;
//    $('.slider').each(function () {
//        if ($(this).is(":animated")) {
//            sliderAnimated = true;
//        }
//    });
//    if (!sliderAnimated) {
//        index_first = $(sliderDiv).find(".Item.first").index();
//        if (index_first + max_showing != $(sliderDiv).find('.Item').length) {
//            if ($(obj).hasClass('right')) {
//                if (index_first + max_showing + 1 == $(sliderDiv).find('.Item').length) {
//                    // $(parentDiv).find('.right').css({ display: 'none' });
//                    $(parentDiv).find('.right').removeClass('on');
//                }
//                if ($(sliderDiv).find('.Item').length > 0) {
//                    //$(parentDiv).find('.left').css({ display: 'block' });
//                    $(parentDiv).find('.left').addClass('on');
//                }
//                $(sliderDiv).animate({ left: '-=' + slide_width + 'px' }, speed, easing, function () {
//                    index_first++;
//                    $(sliderDiv).find('.Item').removeClass('first');
//                    $($(sliderDiv).find('.Item')[index_first]).addClass('first');
//                    if ($(sliderDiv).find('.Item.first').index() + max_showing == $(sliderDiv).find('.Item').length) {
//                        // $(parentDiv).find('.right').css({ display: 'none' });
//                        $(parentDiv).find('.right').removeClass('on');
//                    }
//                });
//            }
//        }
//        if ($(obj).hasClass('left') && $(parentDiv).find('.slider').position().left != 0) {
//            if (index_first - 1 == 0) {
//                //$(parentDiv).find('.left').css({ display: 'none' });
//                $(parentDiv).find('.left').removeClass('on');
//            }
//            index_first--;
//            $(sliderDiv).find('.Item').removeClass('first');
//            $($(sliderDiv).find('.Item')[index_first]).addClass('first');
//            if ($(sliderDiv).find('.Item').length > max_showing - 1) {
//                // $(parentDiv).find('.right').css({ display: 'block' });
//                $(parentDiv).find('.right').addClass('on');
//            }
//            $(sliderDiv).animate({ left: '+=' + slide_width + 'px' }, speed, easing, function () {
//                if ($(sliderDiv).position().left == 0) {
//                    //$(parentDiv).find('.left').css({ display: 'none' });
//                    $(parentDiv).find('.left').removeClass('on');
//                }
//            });
//        }
//        if ($(sliderDiv).position().left == 0) {
//            $(sliderDiv).find('.Item').removeClass('first');
//            $($(sliderDiv).find('.Item')[0]).addClass('first');
//        }
//    }
//}

///////end slide animate left right /////////

//function Goto(index) {
//    $('.slideMod .slider').cycle(index);
//    $('.slideMod').find('.circles').find('.circle').removeClass('selected');
//    $('.slideMod').find('.circles').find('.circle').eq(index).addClass('selected');
//}

//function GotoPercent(index) {
//    $('.beautifullMod .slider').cycle(index);
//    $('.beautifullMod').find('circles').find('.circle').removeClass('selected');
//    $('.beautifullMod').find('circles').find('.circle').eq(index).addClass('selected');
//}

$('.listingItemsMod').find('.slider').cycle({
    fx: 'scrollHorz',
    timeout: 0,
    prev: '.arrow.left',
    next: '.arrow.right',
    pause: 1,
    pauseOnPagerHover: 1,
    easing: 'linear',
    activePagerClass: 'selected'
});

$('.slideMod').find('.slider').cycle({
    fx: 'scrollHorz',
    timeout: 4000,
    prev: '.smodArrow.left',
    next: '.smodArrow.right',
    pager: '.slideMod .navigation .circles',
    pause: 1,
    pauseOnPagerHover: 1,
    easing: 'linear',
    activePagerClass: 'selected'
});

//$('.followUsInstaMod').find('.items').cycle({
//    fx: 'scrollHorz',
//    timeout: 4000,
//    pause: 1,
//    pauseOnPagerHover: 1,
//    activePagerClass: 'selected'
//});

//$('.beautifullMod').find('.slider').cycle({
//    fx: 'scrollHorz',
//    timeout: 4000,
//    prev: '.barrow.left',
//    next: '.barrow.right',
//    pager: '.beautifullMod .navigation .circles',
//    pause: 1,
//    pauseOnPagerHover: 1,
//    activePagerClass: 'selected'
//});

$('.sidePart .topTenMod').find('.overflow').cycle({
    fx: 'scrollHorz',
    timeout: 4000,
    prev: '.leftTopArrow,.leftArrow',
    next: '.rightTopArrow,.rightArrow',
    pause: 1,
    pauseOnPagerHover: 1,
    easing: 'linear',
    activePagerClass: 'selected'
});

function showHideStat(othis) {

    var ob = $(othis);
    var h = 100 * $(ob).parents('.wrapQuestItem').find('.items').find('.item').length - 1;

    if ($(ob).parents('.wrapQuestItem').hasClass('open')) {
        $(ob).parents('.wrapQuestItem').find('.items').animate({ height: 0 + 'px' }, '800', 'easeInQuart', function () { });

        $(ob).parents('.wrapQuestItem').removeClass('open');
    }
    else {
        $('.wrapQuestItem').removeClass('open');
        $('.wrapQuestItem').find('.items').animate({ height: 0 + 'px' }, '800', 'easeInQuart', function () { });
        $(ob).parents('.wrapQuestItem').addClass('open');
        $(ob).parents('.wrapQuestItem').find('.items').animate({ height: h + 'px' }, '800', 'easeInQuart', function () { });
    }
}

function closeSendToFriend() {
    if (boolCloseSendToFriend) {
        $('.sendToFriend').hide();
        $('.sendToFriend').find('.btnSend').show();
        $('.sendToFriend').find('.sendLoader').hide();
    }
}
//function sendToFriend(othis) {
//    $(othis).hide();
//    $(othis).parents('.sendToFriend').find('.sendLoader').show();
//    setTimeout(function () {
//        closeSendToFriend($(othis));
//    }, 3000);
//}

function showSendToFriend(event) {
    //event.stopPropagation();
    $('.sendToFriend').show();
}

function openthisTab(othis) {

    $('.officesMod').find('.office').not(othis).find('.wrapTexts').animate({ height: 0 + 'px' }, '800', 'easeInQuart', function () {
        $('.officesMod').find('.office').removeClass('open');
    });

    $(othis).find('.office').addClass('open');

    var ob = $(othis);
    var h = 53 * $(ob).find('.wrapTexts').find('.wrapText').length - 1;
    h = h + 14;

    if ($(ob).hasClass('open')) {
        $(ob).find('.wrapTexts').animate({ height: 0 + 'px' }, '800', 'easeInQuart', function () { $(ob).removeClass('open'); });
    }
    else {

        $(ob).find('.wrapTexts').animate({ height: h + 'px' }, '800', 'easeInQuart', function () { $(ob).addClass('open'); });
    }
}

function showBaridform() {
    if (boolOpenBarid) {
        if ($('#emailAdd').val() != "" && $('#emailAdd').val() != null) {
            if ($('#emailAdd').val() != "") {
                $('#newsletterForm #email').val($('#emailAdd').val());
            }
        }
        $('.wrapBarid.part1').hide();
        $('.wrapBarid.part2').show();
    }
}

//function sendForm(othis) {
//    $('.formLoader').show();
//    setTimeout(function () {
//        $('.asklahaMod').addClass('close');
//        setTimeout(function () {
//            $('.asklahaMod').removeClass('close');
//            $('.formLoader').hide();
//        }, 3000);
//    }, 3000); 
//}
//function returnToPrev(othis) {
//    $('.wrapBarid.part1').show();
//    $('.wrapBarid.part2').hide();
//}
//function sendBaridLaha(othis) {
//    $(othis).parents('.wrapForm').find('.formLoader').show(); setTimeout(function () { $(othis).parents('.wrapForm').find('.formLoader').hide(); }, 3000);
//}

function closeBarid() {
    if (boolCloseNewsletter) {
        $('.emailBackground').hide();
        $('.wrapBarid.part1').show();
        $('.wrapBarid.part2').hide();
    }
}
/**/
function openSelect(othis) {

    var h = 33;
    h = $(othis).find('.divOption').length * 33;
    if ($(othis).find('.divOptionWrap').height() > 33) {
        h = 33;
    }

    $(othis).find('.divOptionWrap').animate({ height: h + 'px' }, '800', 'easeInQuart', function () { });
}

function showThisElt(othis) {

    var myval = $(othis).html();

}
/***/

function closeSearchDdlMenuCollections() {
    $('.wrapDdlSearch.collections').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

function closeSearchDdlMenuCities() {
    $('.wrapDdlSearch.cities').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

function closeSearchDdlMenuCountries() {
    $('.wrapDdlSearch.countries').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

function closeSearchDdlMenuSendTo() {
    $('.wrapDdlSearch.sendTo').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

function closeSearchDdlMenuCategories() {
    $('.wrapDdlSearch.categories').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

//#region Career & Contact & Ask Laha & Newsletter & ShareWithFriend Form
function reset(formId) {
    document.getElementById(formId).reset();
    if (formId.indexOf("newsletter") != -1)
        $('#emailAdd').val('ادخلي بريدك الالكتروني');
    $('.wrapForm .inputItem').removeClass('error');
    $('.wrapForm .inputItem input').removeClass('error');
    $('.inputItem.required').find('.req').show();
}
$(document).ready(function () {
    /// Add Method ///
    // This method to ignore the default value, to be required on submit
    jQuery.validator.addMethod("defaultInvalid", function (value, element) {
        return !(element.value == element.defaultValue);
    });

    jQuery.validator.addMethod("phoneAny", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    });

    // validate signup form on keyup and submit
    $("#careerForm").validate({
        rules: {
            firstName: "required defaultInvalid",
            lastName: "required defaultInvalid",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            firstName: "",
            lastName: "",
            email: ""
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').hide();
            $(element).parents('.inputItem').addClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
            $('body,html').animate({ scrollTop: $($('.inputItem.' + errorClass)[0]).offset().top - 224 });
        },

        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').show();
            $(element).parents('.inputItem').removeClass(errorClass);
        },
        submitHandler: function (form) {
            if ($("#careerForm").valid()) {
                $('.formLoader').show();
                $.post(
                    $('#careerForm').attr('action'),
                    $('#careerForm').serialize(),

                    function (data) {
                        $('.asklahaMod').addClass('close');
                        $('body,html').animate({
                            scrollTop: $('.wrapMessage').parents('.module').offset().top - 224
                        }, 'slow');
                        //$('.btnCancel').click();
                        $('.formLoader').hide();
                        document.getElementById('careerForm').reset();
                        //$('.uploaded').remove();
                        //$('.input_content').removeClass('upload_complete');
                        $('.upload_wrapper').removeClass('hide_uploader_button');
                        $('.progressWrapper').remove();
                        $('#cv_src').val('');
                        setTimeout(function () {
                            $('.asklahaMod').removeClass('close');
                        }, 3000);
                    }
                );
            }
        }
    });

    $("#contactForm").validate({
        rules: {
            firstName: "required defaultInvalid",
            lastName: "required defaultInvalid",
            email: {
                required: true,
                email: true
            },
            sendTo: "required"
        },
        messages: {
            firstName: "",
            lastName: "",
            email: "",
            sendTo: ""
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').hide();
            $(element).parents('.inputItem').addClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
            $('body,html').animate({ scrollTop: $($('.inputItem.' + errorClass)[0]).offset().top - 224 });
        },

        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').show();
            $(element).parents('.inputItem').removeClass(errorClass);
        },
        submitHandler: function (form) {
            if ($("#contactForm").valid()) {
                $('.formLoader').show();
                $.post(
                    $('#contactForm').attr('action'),
                    $('#contactForm').serialize(),

                    function (data) {
                        $('.asklahaMod').addClass('close');
                        $('body,html').animate({
                            scrollTop: $('.wrapMessage').parents('.module').offset().top - 224
                        }, 'slow');
                        //$('.btnCancel').click();
                        $('.formLoader').hide();
                        document.getElementById('contactForm').reset();
                        setTimeout(function () {
                            $('.asklahaMod').removeClass('close');
                        }, 3000);
                    }
                );
            }
        }
    });

    $("#askForm").validate({
        rules: {
            firstName: "required defaultInvalid",
            lastName: "required defaultInvalid",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            firstName: "",
            lastName: "",
            email: ""
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').hide();
            $(element).parents('.inputItem').addClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
            $('body,html').animate({ scrollTop: $($('.inputItem.' + errorClass)[0]).offset().top - 224 });
        },

        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).parents('.inputItem.required').find('.req').show();
            $(element).parents('.inputItem').removeClass(errorClass);
        },
        submitHandler: function (form) {
            if ($("#askForm").valid()) {
                $('.formLoader').show();
                $.post(
                    $('#askForm').attr('action'),
                    $('#askForm').serialize(),

                    function (data) {
                        $('.asklahaMod').addClass('close');
                        $('body,html').animate({
                            scrollTop: $('.wrapMessage').parents('.module').offset().top - 224
                        }, 'slow');
                        $('.formLoader').hide();
                        document.getElementById('askForm').reset();
                        setTimeout(function () {
                            $('.asklahaMod').removeClass('close');
                        }, 3000);
                    }
                );
            }
        }
    });

    //    $("#newsletterForm").validate({
    //        rules: {
    //            name: "required defaultInvalid",
    //            email: {
    //                required: true,
    //                email: true
    //            }
    //        },
    //        messages: {
    //            name: "",
    //            email: ""
    //        },
    //        highlight: function (element, errorClass) {
    //            $(element).addClass(errorClass);
    //            $(element).parents('.inputItem.required').find('.req').hide();
    //            $(element).parents('.inputItem').addClass(errorClass);
    //            $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
    //            //$('body,html').animate({ scrollTop: $($('.inputItem.' + errorClass)[0]).offset().top });
    //        },
    //        unhighlight: function (element, errorClass) {
    //            $(element).removeClass(errorClass);
    //            $(element).parents('.inputItem.required').find('.req').show();
    //            $(element).parents('.inputItem').removeClass(errorClass);
    //        },
    //        submitHandler: function (form) {
    //            if ($("#newsletterForm").valid()) {
    //                boolCloseNewsletter = false;
    //                boolOpenBarid = false;
    //                boolEnter = true;
    //                $('#newsletterForm .formLoader').show();
    //                $.post(
    //                $('#newsletterForm').attr('action'),
    //                $('#newsletterForm').serialize(),
    //                function (data) {
    //                    $('#newsletterForm .btnSend').parents('.wrapForm').find('.formLoader').hide();
    //                    if (data == "success") {
    //                        $('#newsletterForm .messageN').html("معلوماتك موجودة مسبقا، شكراً لك!");
    //                        $('#newsletterForm .messageN').show();
    //                    }
    //                    else if (data == "answer=yes") {
    //                        $('#newsletterForm .messageN').html("لقد تمّ ارسال رسالتك بنجاح، شكراً لك!");
    //                        $('#newsletterForm .messageN').show();
    //                    }
    //                    setTimeout(function () {
    //                        $('#newsletterForm .messageN').hide();
    //                    }, 3000);
    //                    reset('newsletterForm');
    //                    boolCloseNewsletter = true;
    //                    boolOpenBarid = true;
    //                    boolEnter = false;
    //                }
    //            );
    //            }
    //        }
    //    });
    $.validator.addMethod("equalToIgnoreCase", function (value, element, param) {
        return this.optional(element) ||
            (value.toLowerCase() == $(param).val().toLowerCase());
    });

    $("#newsletterUserForm").validate({
        rules: {
            firstName: "required defaultInvalid",
            lastName: "required defaultInvalid",
            email: {
                required: true,
                email: true
            },
            day: "required",
            month: "required",
            year: "required",
            CategoryToRelateTo: "required",
            iAgree: "required",
            userValidation: {
                required: true,
                equalToIgnoreCase: "#lowerCaptchaValidation"
            }
        },
        messages: {
            firstName: "",
            lastName: "",
            email: {
                required: "",
                email: ""
            },
            day: "",
            month: "",
            year: "",
            CategoryToRelateTo: "",
            iAgree: "",
            userValidation: {
                required: "",
                equalToIgnoreCase: ""
            }

        },
        highlight: function (element, errorClass) {
            if ($(element).attr('id') == 'iAgree') {
                $('#newsletter .note .box').css('border-color', '#C80D16');
                $('#newsletter .note .label').css('color', '#C80D16');
            }
            else if ($(element).attr('id') == 'day' || $(element).attr('id') == 'month' || $(element).attr('id') == 'year') {
                $(element).addClass(errorClass);
                $(element).parents('.input2.required').find('.req').hide();
                $(element).parents('.input2').addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
            }
            else if ($(element).attr('id') == 'CategoryToRelateTo') {
                $('#newsletter .options').children().css('color', '#C80D16');
                $('#newsletter .options').find('.label').css('color', '#C80D16');
                $('#newsletter .options .item .box').css('border-color', '#C80D16');
                $('body,html').animate({
                    scrollTop: $('.wrapSpaceMod').parents('.module').offset().top - 224
                });
            }
            else {
                $(element).addClass(errorClass);
                $(element).parents('.inputItem.required').find('.req').hide();
                $(element).parents('.inputItem').addClass(errorClass);
                $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
                if ($('#CategoryToRelateTo').val() != '') {
                    if ($(element).attr('id') != 'userValidation') {
                        $('body,html').animate({ scrollTop: $($('.inputItem.' + errorClass)[0]).offset().top });
                    }
                }
            }
        },

        unhighlight: function (element, errorClass) {
            if ($(element).attr('id') == 'iAgree') {
                $('#newsletter .note .box').css('border-color', '#B6B6B6');
                $('#newsletter .note .label').css('color', '#9F9F9F');
            }
            else if ($(element).attr('id') == 'day' || $(element).attr('id') == 'month' || $(element).attr('id') == 'year') {
                $(element).removeClass(errorClass);
                $(element).parents('.input2.required').find('.req').show();
                $(element).parents('.input2').removeClass(errorClass);
            }
            else if ($(element).attr('id') == 'CategoryToRelateTo') {
                $('#newsletter .options h1').css('color', '#828282');
                $('#newsletter .options .item .label').css('color', '#A0A0A0');
                $('#newsletter .options .item .box').css('border-color', '#B6B6B6');
            }
            else {
                $(element).removeClass(errorClass);
                $(element).parents('.inputItem.required').find('.req').show();
                $(element).parents('.inputItem').removeClass(errorClass);
            }
        },
        submitHandler: function (form) {
            if ($("#newsletterUserForm").valid()) {
                boolCloseNewsletter = false;
                boolOpenBarid = false;
                boolEnter = true;
                $('#newsletterUserForm .loader').show();
                $.post(
                $('#newsletterUserForm').attr('action'),
                $('#newsletterUserForm').serialize(),

                function (data) {
                    $('#newsletterUserForm .loader').hide();
                    if (data == "success") {
                        $('#newsletterUserForm .txDiv').html('<h1 style="margin-top:55px;font-size:23px;color:#0a0605;"> تم إرسال البريد الالكتروني المؤكد لموافقتكم...</h1><h2 style="color:#3f3f3f;font-size:18px;"> لتفعيل خدمة الاشتراك في الرسائل الإخبارية (Newsletter) عبر البريد الالكتروني، الرجاء اتباع التعليمات المذكورة في البريد الالكتروني</h2><div style="border-bottom:1px solid #E0E0E0;height:1px;width:85px;margin-top:25px;margin-bottom:25px;"></div><h2 style="color:#666;font-size:18px;">شكراً على اشتراككم في خدمة الرسائل الإخبارية لموقع <span dir="ltr">Lahamag.com</span></h2>');
                    }
                    else if (data == "answer=yes") {
                        $('#newsletterUserForm .txDiv').html("<h1>شكراً.</h1><h2>لقد تم تسجيلك مسبقأً في مجلتنا الالكترونية.</h2>");
                    }
                    $('body,html').animate({
                        scrollTop: $('.wrapSpaceMod').parents('.module').offset().top - 224
                    }, 'slow');
                    $('#newsletter .inner').hide();
                    $('#newsletter .txDiv').fadeIn();

                    //                    setTimeout(function () {
                    //                        $('#newsletter .inner').fadeIn();
                    //                        $('#newsletter .txDiv').hide();
                    //                    }, 4000);
                    reset('newsletterUserForm');
                    $('#iAgree').val('True');
                    $('#CategoryToRelateTo').val('');
                    $('#newsletter .options .item').find('.arrow').hide();
                    //$('#newsletter .note').find('.arrow').hide();
                    $('.tryAnother').click();
                    boolCloseNewsletter = true;
                    boolOpenBarid = true;
                    boolEnter = false;
                });
            }
        }
    });

    $("#shareWithFriend").validate({
        rules: {
            yourEmail: {
                required: true,
                email: true
            },
            friendEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            yourEmail: "",
            friendEmail: ""
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass);
            $(element).parents('.sendInp').addClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]").remove(errorClass);
        },

        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
            $(element).parents('.sendInp').removeClass(errorClass);
        },
        submitHandler: function (form) {
            if ($("#shareWithFriend").valid()) {
                boolCloseSendToFriend = false;
                $("#shareWithFriend .btnSend").hide();
                $("#shareWithFriend").find('.sendLoader').show();
                $.post(
                $('#shareWithFriend').attr('action'),
                $('#shareWithFriend').serialize(),

                function (data) {
                    $('.sendToFriend').hide();
                    document.getElementById('shareWithFriend').reset();
                    $('.sendToFriend').find('.btnSend').show();
                    $('.sendToFriend').find('.sendLoader').hide();
                    boolCloseSendToFriend = true;
                }
            );
            }
        }
    });
});
//#endregion

//#region Search Go Next and Go Back

function goToSearch(oper) {
    var pageIndex = parseInt($('#pageIndex').val());
    var totalPages = parseInt($('#totalPages').val());
    if (oper == "next") {
        if (pageIndex < totalPages - 1) {
            pageIndex++;
        }
    }
    else {
        if (pageIndex <= totalPages - 1 && pageIndex > 0) {
            pageIndex--;
        }
    }
    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToSearch("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToSearch("prev")');
    }

    $('#pageIndex').val(pageIndex);
    callAjaxGoToSearch();
}

function callAjaxGoToSearchByNumb(pageIndex) {
    $('#pageIndex').val(pageIndex);
    var totalPages = parseInt($('#totalPages').val());

    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToSearch("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToSearch("prev")');
    }

    callAjaxGoToSearch();
}

function callAjaxGoToSearch() {
    $('.articlePaging .loader').show();
    var routeUrl = $('#routeUrl').val();
    var search = $('#mainSearchKey').val();
    var pageIndex = parseInt($('#pageIndex').val());
    var pageSize = parseInt($('#pageSize').val());
    var totalPages = parseInt($('#totalPages').val());
    $('.pages .page').removeClass('selected');
    $('.pages .page').eq(pageIndex).addClass('selected');
    $.ajax({
        url: routeUrl + 'Search/MoreArticlesSearch',
        type: 'POST',
        data: 'pageIndex=' + pageIndex + '&search=' + search,
        success: function (data) {
            $('#moreArticlesSearch').html(data)
            window.location.hash = 'search=' + search + '&page=' + pageIndex;
            $('.articlePaging .loader').hide();
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        }
    });
}
//#endregion

//#region to go search 

function goSearch() {
    var key = $('#searchKey').val();
    var routeUrl = $('#routeUrl').val();
    if (key == "ابحثي في لها" || key == "") {
        $('#searchKey').val("");
    }
    else {
        window.location = routeUrl + "Search?search=" + key;
    }
}

//#endregion

//#region Submit Form on Enter Press
var test = true;
var submit = true;
$(document).ready(function () {
    $('#careerForm textarea').focus(function () {
        test = false;
    });

    $('#careerForm input').focus(function () {
        test = true;
    });

    $('#careerForm select').focus(function () {
        test = true;
    });

    $('#contactForm textarea').focus(function () {
        test = false;
    });

    $('#contactForm input').focus(function () {
        test = true;
    });

    $('#contactForm select').focus(function () {
        test = true;
    });

    $('#askForm textarea').focus(function () {
        test = false;
    });

    $('#askForm input').focus(function () {
        test = true;
    });

    $('#askForm select').focus(function () {
        test = true;
    });

    $('input#searchKey').focus(function () {
        test = true;
    });

});

function submitFormOnKeyPress() {
    submit = false;
    //event.stopPropagation();
    if ($('.emailBackground').length != 0 && $('.emailBackground').is(':visible')) {
        if ($('.emailBackground .wrapBarid.part1').is(':visible')) {
            showBaridform();
            boolEnter = true;
        }
        if ($('.emailBackground .wrapBarid.part2').is(':visible')) {
            if (test == true) {
                boolCloseNewsletter = false;
                boolOpenBarid = false;
                $("#newsletterForm .btnSend").click();
            }
            else {
            }
        }
    }
    if ($("#careerForm").length != 0) {
        if (test == true) {
            $("#careerForm .btnSend").click();
        }
        else {
        }
    }
    else if ($("#contactForm").length != 0) {
        if (test == true) {
            $("#contactForm .btnSend").click();
        }
        else {
        }
    }
    else if ($("#askForm").length != 0) {
        if (test == true) {
            $("#askForm .btnSend").click();
        }
        else {
        }
    }
    else if ($('.wasfatMod').length != 0) {
        $('.wasfatMod .btnReadmore').click();
    }
    else {
        if (test == true) {
            $(".bgSearch .btnSearch").click();
        }
        else {
        }
    }
    submit = true;
    boolCloseNewsletter = true;
    boolOpenBarid = true;
}

document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        if (submit) {
            submitFormOnKeyPress();
            boolEnter = false;
        }
    }
};

$(document).ready(function () {
    $('#searchKey').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".bgSearch .btnSearch").click();
        }
    });
});
//#endregion

////#region jUploader
/////////////////////////////////////////////////////////////////////////
//////////////////////////////  jUploader  //////////////////////////////
/////////////////////////////////////////////////////////////////////////
////TODO: jUploader: sorting of files
////TODO: jUploader: show file icon in case it is not an image with thumbnail
//(function ($) {
//    $.fn.jUploader = function (options) {
//        // build main options before element iteration
//        var opts = $.extend({}, $.fn.jUploader.defaults, options);
//        //#region Global Variables
//        //#endregion
//        //#region Functions
//        //#endregion
//        this.each(function () {
//            var swf = new SWFUpload(opts);
//            $(this).data('uploader', swf);
//            // Call the user custom handler
//            if (typeof opts.onInit == 'function') {
//                opts.onInit.call(this);
//            }
//        });
//    };
//})(jQuery);
//$.fn.jUploader.defaults = {
//    upload_url: "",
//    flash_url: "",
//    file_size_limit: "102400", // 100MB - overridden by html helper, dont bother changing it
//    file_types: "*.*", // overridden by html helper, dont bother changing it
//    file_types_description: "Files",
//    file_upload_limit: "",
//    // Event Handler Settings (all my handlers are in the Handler.js file)
//    file_dialog_start_handler: fileDialogStart,
//    file_queued_handler: fileQueued,
//    file_queue_error_handler: fileQueueError,
//    file_dialog_complete_handler: fileDialogComplete,
//    upload_start_handler: uploadStart,
//    upload_progress_handler: uploadProgress,
//    upload_error_handler: uploadError,
//    upload_success_handler: uploadSuccess,
//    upload_complete_handler: uploadComplete,
//    custom_settings: {
//        progressTarget: "divUploader",
//        hiddenFieldId: "imgSrc",
//        cancelButtonId: "btnCancel1",
//        getImageFrom: "/",
//        deleteImage: "/",
//        editImage: "/",
//        folderLocation: '/'
//    },
//    button_placeholder_id: "divImgSrc",
//    button_image_url: "",
//    button_width: 104,
//    button_height: 25,
//    ///Callback functions
//    onInit: null
//};
//function fileDialogStartfront() {
//    // Calculate the number of allowed uploads remaining
//    var uploads_remaining = this.getStats().files_queued;
//    numberOfUploadedFiles = 0;
//    if ($('#' + this.customSettings.hiddenFieldId).length != 0) {
//        var filesInHiddenField = $('#' + this.customSettings.hiddenFieldId).val().split(',');
//        for (i = 0; i < filesInHiddenField.length; i++) {
//            if ('' != filesInHiddenField[i])
//                numberOfUploadedFiles++;
//        }
//    }
//    var stats = this.getStats();
//    stats.successful_uploads = numberOfUploadedFiles;
//    this.setStats(stats);
//    this.setFileQueueLimit(this.settings.file_upload_limit - (numberOfUploadedFiles + uploads_remaining));
//}
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
////#endregion

//#region Add Opinion
function addOpinion(obj) {
    $('.wrapOpinion .loader').show();
    var routeUrl = $('#routeUrl').val();
    var ArticleID = parseInt($('#ArticleID').val());
    $.ajax({
        url: routeUrl + 'Details/Opinions',
        type: 'POST',
        data: 'id=' + ArticleID + '&opinion=' + obj,
        success: function (data) {
            //            if (data == "success") {
            //                var number = parseInt($('.wrapOpinion .allOp .number.' + obj).html());
            //                var totalNumber = parseInt($('.articlePortraitMod .bgOpinion .nb').html());
            //                $('.wrapOpinion .allOp .number.' + obj).html((number + 1));
            //                $('.articlePortraitMod .bgOpinion .nb').html((totalNumber + 1));
            //            }
            //            else {
            //                alert('failed');
            //            }
            $('#allOpinions').html(data);
            $('.wrapOpinion .loader').hide();
        }
    });
}
//#endregion

//#region Add Horoscope Opinion
function addHoroscopeOpinion(obj) {
    $('.wrapOpinion .loader').show();
    var routeUrl = $('#routeUrl').val();
    var horoscopeDetailId = parseInt($('#horoscopeDetailId').val());
    $.ajax({
        url: routeUrl + 'Horoscope/HoroscopeOpinions',
        type: 'POST',
        data: 'id=' + horoscopeDetailId + '&opinion=' + obj,
        success: function (data) {
            //            if (data == "success") {
            //                var number = parseInt($('.wrapOpinion .allOp .number.' + obj).html());
            //                var totalNumber = parseInt($('.articlePortraitMod .bgOpinion .nb').html());
            //                $('.wrapOpinion .allOp .number.' + obj).html((number + 1));
            //                $('.articlePortraitMod .bgOpinion .nb').html((totalNumber + 1));
            //            }
            //            else {
            //                alert('failed');
            //            }
            $('#allOpinions').html(data);
            $('.wrapOpinion .loader').hide();
        }
    });
}
//#endregion

//#region Voting
function addVote(questionId, answerId) {
    var winner = parseInt($('#winner' + questionId).val());
    var resultCount = parseInt($('#totalAnswers' + questionId).val());
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Statistics/SaveStat',
        type: 'POST',
        data: 'questionId=' + questionId + '&answerId=' + answerId,
        success: function (data) {
            //$('#vote_'+questionId).html(data);
            resultCount++;
            $(this).find('.voteNb').removeClass('imp');
            $('#vote_' + questionId + ' .item').each(function () {
                var answerNb = parseInt($(this).find('.voteNb').html());

                if ($(this).attr('id') == 'answer' + answerId) {
                    answerNb++;
                    $(this).find('.voteNb').html(answerNb);
                    $(this).find('.round input').attr('checked', 'checked');
                }
                var percent = (100.0 * ((answerNb / resultCount)));
                var imp = (winner == answerNb) ? "imp" : "";
                $(this).find('.voteNb').addClass(imp);
                $(this).find('.percent .percentRoll').css('width', percent + '%');
                $(this).find('img').removeAttr('onclick');
                $(this).find('.info .text').removeAttr('onclick');
                $(this).find('.round input').removeAttr('onclick');
                $(this).find('.round input').attr('disabled', 'disabled');
            });

        }
    });
}

function addLeftVote(questionId, answerId) {
    var winner = parseInt($('#winner' + questionId).val());
    var resultCount = parseInt($('#totalAnswers' + questionId).val());
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Shared/Save',
        type: 'POST',
        data: 'questionId=' + questionId + '&answerId=' + answerId,
        success: function (data) {
            //$('#vote_' + questionId).html(data);
            resultCount++;
            $(this).find('.voteNb').removeClass('imp');
            $('#vote_' + questionId + ' .item').each(function () {
                var answerNb = parseInt($(this).find('.voteNb').html());

                if ($(this).attr('id') == 'answer' + answerId) {
                    answerNb++;
                    $(this).find('.voteNb').html(answerNb);
                    $(this).find('.round input').attr('checked', 'checked');
                }
                var percent = (100.0 * ((answerNb / resultCount)));
                var imp = (winner == answerNb) ? "imp" : "";
                $(this).find('.voteNb').addClass(imp);
                $(this).find('.percent .percentRoll').css('width', percent + '%');
                $(this).find('img').removeAttr('onclick');
                $(this).find('.info .text').removeAttr('onclick');
                $(this).find('.round input').removeAttr('onclick');
                $(this).find('.round input').attr('disabled', 'disabled');
            });
            $('.beautifullMod').find('.slider').cycle('resume');
        }
    });
}
//#endregion

//#region Add View Counter
function addViewCounter() {
    var articleID = $('#ArticleID').val();
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Details/AddViewCounter',
        type: 'POST',
        data: 'articleID=' + articleID,
        success: function (data) { }
    });
}
//#endregion

//#region FB SHARE

function facebookShare(linkUrl, title) {
    if (title == '' || title == undefined)
        title = encodeURIComponent(document.title);
    var path = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(linkUrl) + '&t=' + encodeURIComponent(title);
    var popUp = window.open(path, 'facebookshare', 'height=600,width=700,resizable=1');
}

//#endregion

//#region Tweet Share

function tweetPopup(imageUrl, title, text, linkUrl) {
    // if (isLatin()) {
    // linkUrl = linkUrl.replace(/ /g, "_");
    // } else {
    // linkUrl = linkUrl.substring(0, linkUrl.indexOf(linkUrl.match(/[^\u0000-\u007f]/)[0])) + 'share';
    // }
    //if (text.length > 120) {
    //    text = text.substring(0, 117) + '...';
    //}
    if (title == '' || title == undefined)
        title = encodeURIComponent(document.title);
    var data = "counturl=" + linkUrl + "&text=" + title + "&original_referer=" + window.location.href
        + "&priority=1&related=LahaMagonline&url=" + linkUrl + "&via=LahaMagonline";
    var path = "http://twitter.com/share?" + data;
    var popUp = window.open(path, 'tweet', 'height=450,width=550,resizable=1');
    var pollTimer = window.setInterval(function () {
        if (popUp.closed || popUp == null) {
            window.clearInterval(pollTimer);
        }
    }, 200);
}

//#endregion

//#region Recipes Go Next and Go Back

function goToRecipes(oper) {
    var pageIndex = parseInt($('#pageIndex').val());
    var totalPages = parseInt($('#totalPages').val());
    if (oper == "next") {
        if (pageIndex < totalPages - 1) {
            pageIndex++;
        }
    }
    else {
        if (pageIndex <= totalPages - 1 && pageIndex > 0) {
            pageIndex--;
        }
    }
    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToRecipes("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToRecipes("prev")');
    }

    $('#pageIndex').val(pageIndex);
    callAjaxGoToRecipes();
}

function callAjaxGoToRecipesByNumb(pageIndex) {
    $('#pageIndex').val(pageIndex);
    var totalPages = parseInt($('#totalPages').val());

    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToRecipes("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToRecipes("prev")');
    }

    callAjaxGoToRecipes();
}

function callAjaxGoToRecipes() {
    $('.articlePaging .loader').show();
    var routeUrl = $('#routeUrl').val();
    var component1 = $('#component1').val();
    var component2 = $('#component2').val();
    var component3 = $('#component3').val();
    var component4 = $('#component4').val();
    var pageIndex = parseInt($('#pageIndex').val());
    var pageSize = parseInt($('#pageSize').val());
    var totalPages = parseInt($('#totalPages').val());
    $('.pages .page').removeClass('selected');
    $('.pages .page').eq(pageIndex).addClass('selected');
    $.ajax({
        url: routeUrl + 'Recipes/MoreRecipes',
        type: 'POST',
        data: 'pageIndex=' + pageIndex + '&component1=' + component1 + '&component2=' + component2 +
        '&component3=' + component3 + '&component4=' + component4,
        success: function (data) {
            $('#moreArticlesRecipes').html(data);
            var dataHash = '';
            if (component1 != "") {
                dataHash += '&component1=' + component1;
            }
            if (component2 != "") {
                dataHash += '&component2=' + component2;
            }
            if (component3 != "") {
                dataHash += '&component3=' + component3;
            }
            if (component4 != "") {
                dataHash += '&component4=' + component4;
            }
            window.location.hash = 'page=' + pageIndex + data;
            $('.articlePaging .loader').hide();
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        }
    });
}
//#endregion

//#region to go recipes 

function goRecipes() {
    var component1 = $('#component1').val();
    var component2 = $('#component2').val();
    var component3 = $('#component3').val();
    var component4 = $('#component4').val();
    var routeUrl = $('#routeUrl').val();
    var data = '';
    if (component1.indexOf("مكون") != -1 && component2.indexOf("مكون") != -1 && component3.indexOf("مكون") != -1 && component4.indexOf("مكون") != -1) {
        $('.plzFillComp').show();
        $($('.wasfatMod .ingrediants .ingrediant')[0]).addClass('selected');
    }
    else {
        if (component1.indexOf("مكون") != -1) {
            component1 = "";
        }
        else {
            data += '&component1=' + component1;
        }
        if (component2.indexOf("مكون") != -1) {
            component2 = "";
        }
        else {
            data += '&component2=' + component2;
        }
        if (component3.indexOf("مكون") != -1) {
            component3 = "";
        }
        else {
            data += '&component3=' + component3;
        }
        if (component4.indexOf("مكون") != -1) {
            component4 = "";
        }
        else {
            data += '&component4=' + component4;
        }
        window.location = routeUrl + "Recipes?a" + data;
    }
}

//#endregion

//#region Types Go Next and Go Back

function goToTypes(oper) {
    var pageIndex = parseInt($('#pageIndex').val());
    var totalPages = parseInt($('#totalPages').val());
    if (oper == "next") {
        if (pageIndex < totalPages - 1) {
            pageIndex++;
        }
    }
    else {
        if (pageIndex <= totalPages - 1 && pageIndex > 0) {
            pageIndex--;
        }
    }
    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToTypes("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToTypes("prev")');
    }

    $('#pageIndex').val(pageIndex);
    callAjaxGoToTypes();
}

function callAjaxGoToTypesByNumb(pageIndex) {
    $('#pageIndex').val(pageIndex);
    var totalPages = parseInt($('#totalPages').val());

    if (pageIndex == totalPages - 1) {
        $('.articlePaging .next').addClass('off');
        $('.articlePaging .next').removeAttr('onclick');
    }
    else {
        $('.articlePaging .next').removeClass('off');
        $('.articlePaging .next').attr('onclick', 'goToTypes("next")');
    }
    if (pageIndex == 0) {
        $('.articlePaging .previous').addClass('off');
        $('.articlePaging .previous').removeAttr('onclick');
    }
    else {
        $('.articlePaging .previous').removeClass('off');
        $('.articlePaging .previous').attr('onclick', 'goToTypes("prev")');
    }

    callAjaxGoToTypes();
}

function callAjaxGoToTypes() {
    $('.articlePaging .loader').show();
    var routeUrl = $('#routeUrl').val();
    var type = $('#type').val();
    var pageIndex = parseInt($('#pageIndex').val());
    var pageSize = parseInt($('#pageSize').val());
    var totalPages = parseInt($('#totalPages').val());
    $('.pages .page').removeClass('selected');
    $('.pages .page').eq(pageIndex).addClass('selected');
    $.ajax({
        url: routeUrl + 'Types/MoreTypes',
        type: 'POST',
        data: 'pageIndex=' + pageIndex + '&type=' + type,
        success: function (data) {
            $('#moreArticlesTypes').html(data);
            window.location.hash = 'page=' + pageIndex + '&type=' + type;
            $('.articlePaging .loader').hide();
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        }
    });
}
//#endregion

//#region Print
function PopupPrint(data) {
    var routeUrl = $('#routeUrl').val();
    var mywindow = window.open('', 'print_window', 'height=400,width=980');
    mywindow.document.write('<html><head><title>' + $('title').html() + '</title>');
    mywindow.document.write('</head><body id="printWindow" style="direction:rtl;">');
    //mywindow.document.write("<img src='" + $(data).attr("src") + "' />");
    mywindow.document.write('<link href="' + routeUrl + 'Content/css/styles.css" rel="stylesheet" type="text/css" />');
    //mywindow.document.write('<link href="' + routeUrl + 'Content/css/HelveticaNeue/fonts.css" rel="stylesheet" type="text/css" />');
    //mywindow.document.write('<link href="' + routeUrl + 'Content/css/gest/fonts.css" rel="stylesheet" type="text/css" />');
    var src = $('.genrightMod').html();
    var srcTitle = $('.pageTitle').html();
    mywindow.document.write('<div class="pageTitle aPortraitMod">' + srcTitle + '</div>');
    mywindow.document.write('<div class="module adjustSpacing wrapLeftRight" style="letter-spacing:normal;word-spacing:normal;">' + src + '</div>');
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    //mywindow.print();
    mywindow.scrollTo(0, 0);
    mywindow.focus();
    mywindow.print();

    mywindow.close();
    return true;
    ////window.print();
}

/*function printDiv() {
var divToPrint = document.getElementById('div_to_print');
var routeURL = document.getElementById("routeUrl").value;
var newWin = window.open('', 'Print-Window', 'width=864,height=788');
newWin.document.open();
newWin.document.write('<html><head><link href=' + routeURL + 'Content/styles.css rel=stylesheet type=text/css /></head><body id=bag class= subpage><div class= printedpage><div id=div_to_print class= myTable>' + divToPrint.innerHTML + '</div></div></body></html>');
newWin.print();
}*/

//#endregion

//#region Search Fashion Show
function SearchFashion() {
    var collection = $('#collection').val();
    var city = $('#city').val();
    var routeUrl = $('#routeUrl').val();
    if (collection != '' && city != '')
        window.location = routeUrl + 'Category/FashionShow/?collection=' + collection + '&city=' + city;
    else if (collection != '') {
        window.location = routeUrl + 'Category/FashionShow/?collection=' + collection;
    }
    else if (city != '') {
        window.location = routeUrl + 'Category/FashionShow/?city=' + city;
    }
    else {
        window.location = routeUrl + 'Category/FashionShow/';
    }
}
//#endregion

//#region Collection Go Next and Go Back

function goToCollection(oper) {
    var nextCollectionId = parseInt($('#nextCollectionId').val());
    var prevCollectionId = parseInt($('#prevCollectionId').val());
    if (oper == "next") {
        callAjaxGoToCollections(nextCollectionId);
    }
    else {
        callAjaxGoToCollections(prevCollectionId);
    }
}

function callAjaxGoToCollections(collectionId) {
    $('.borderArrow .loader').show();
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Category/allFashionShows/' + collectionId,
        type: 'POST',
        data: '',
        success: function (data) {
            $('#allFashionShows').html(data);
            if ($(".scroll4").length > 0) {
                $(".scroll4").mCustomScrollbar();
            }
            //window.location.hash = 'collection=' + collectionId;
            $('.borderArrow .loader').hide();
        }
    });
}
//#endregion

//#region Get Text Pagination with pagebreaks
function goToText(pageIndex) {
    $('.articlePaging .loader').show();
    var id = $('#ArticleID').val();
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Details/Text',
        type: 'POST',
        data: 'id=' + id + '&pageIndex=' + pageIndex,
        success: function (data) {
            $('.articlePortraitMod .articleDesc').html(data);
            $('.articlePaging .loader').hide();
            //            var hashCode = window.location.hash; //#picId=6
            //            var hashToTake = '';
            //            if (hashCode != "" && hashCode != null) {
            //                hashToTake = hashCode.split('#')[1];
            //            }
            //            window.location.hash = 'page=' + pageIndex + '&' + hashToTake;
            $('body,html').animate({
                scrollTop: $('.articlePortraitMod .articleDesc').offset().top - 224
            });
        }
    });
}
//#endregion

function closeSearchDdlMenuCollections() {
    $('.wrapDdlSearch.collections').find('.divOptionWrap').animate({ 'height': 0 + 'px' }, '300', 'easeInQuart', function () { });
}

function attacMobile() {
    (function (a) {
        if (/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(a)
    ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {

            $('.header .fixed').addClass('mobile');
        }

        else {
            $('.header .fixed').removeClass('mobile');
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
}

function beautifulMod() {
    var routeUrl = $('#routeUrl').val();
    $.ajax({
        url: routeUrl + 'Shared/beautifullMod',
        type: 'POST',
        data: '',
        success: function (data) {
            $('.beautifullMod').html(data);
            $($('.beautifullMod')[0]).removeClass('beautifullMod');
        }
    });
}

$(document).ready(function () {
    //beautifulMod();
});

$(document).ready(function () {
    // for swipe on ipad
    $('.listingItemsMod').find('.slider').touchwipe({
        wipeLeft: function () {
            $('.listingItemsMod').find('.slider').cycle("prev");
        },
        wipeRight: function () {
            $('.listingItemsMod').find('.slider').cycle("next");
        }
    });
    $('.slideMod').find('.slider').touchwipe({
        wipeLeft: function () {
            $('.slideMod').find('.slider').cycle("prev");
        },
        wipeRight: function () {
            $('.slideMod').find('.slider').cycle("next");
        }
    });
    $('.sidePart .topTenMod').find('.overflow').touchwipe({
        wipeLeft: function () {
            $('.sidePart .topTenMod').find('.overflow').cycle("prev");
        },
        wipeRight: function () {
            $('.sidePart .topTenMod').find('.overflow').cycle("next");
        }
    });
});

function goTop() {
    $('body,html').animate({
        scrollTop: 0
    });
}

/*$(document).ready(function () {
$('.statisticsMod .item .picture').mouseenter(function () {
var answerId = $(this).parents('.item').attr('id').split('answer')[1];
$('.statisticsMod .item .picture').addClass('opacity');
$(this).removeClass('opacity');
$($(this).parent().find('.arrow')).show();
$('#bigImage' + answerId).show();
});
$('.statisticsMod .item .picture').mouseleave(function () {
var answerId = $(this).parents('.item').attr('id').split('answer')[1];
$('.statisticsMod .item .picture').removeClass('opacity');
$($(this).parent().find('.arrow')).hide();
$('#bigImage' + answerId).hide();
});
});*/

function onmouseenterImg(obj) {
    //    var answerId = $(obj).parents('.item').attr('id').split('answer')[1];
    //    $('.statisticsMod .item .picture').addClass('opacity');
    //    $(obj).removeClass('opacity');
    //    $($(obj).parent().find('.arrow')).show();
    //    $('#bigImage' + answerId).show();
}

function onmouseleaveImg(obj) {
    //    var answerId = $(obj).parents('.item').attr('id').split('answer')[1];
    //    $('.statisticsMod .item .picture').removeClass('opacity');
    //    $('.statisticsMod .item .arrow').hide();
    //    $('#bigImage' + answerId).hide();
}