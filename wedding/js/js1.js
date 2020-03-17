/*
Formalize - version 1.1

Note: This file depends on the jQuery library.
*/

// Module pattern:
// http://yuiblog.com/blog/2007/06/12/module-pattern
var FORMALIZE = (function ($, window, document, undefined) {
    // Private constants.
    var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
    var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
    var IE6 = !!($.browser.msie && parseInt($.browser.version, 10) === 6);
    var IE7 = !!($.browser.msie && parseInt($.browser.version, 10) === 7);

    // Expose innards of FORMALIZE.
    return {
        // FORMALIZE.go
        go: function () {
            for (var i in FORMALIZE.init) {
                FORMALIZE.init[i]();
            }
        },
        // FORMALIZE.init
        init: {
            // FORMALIZE.init.ie6_skin_inputs
            ie6_skin_inputs: function () {
                // Test for Internet Explorer 6.
                if (!IE6 || !$('input, select, textarea').length) {
                    // Exit if the browser is not IE6,
                    // or if no form elements exist.
                    return;
                }

                // For <input type="submit" />, etc.
                var button_regex = /button|submit|reset/;

                // For <input type="text" />, etc.
                var type_regex = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;

                $('input').each(function () {
                    var el = $(this);

                    // Is it a button?
                    if (this.getAttribute('type').match(button_regex)) {
                        el.addClass('ie6-button');

                        /* Is it disabled? */
                        if (this.disabled) {
                            el.addClass('ie6-button-disabled');
                        }
                    }
                    // Or is it a textual input?
                    else if (this.getAttribute('type').match(type_regex)) {
                        el.addClass('ie6-input');

                        /* Is it disabled? */
                        if (this.disabled) {
                            el.addClass('ie6-input-disabled');
                        }
                    }
                });

                $('textarea, select').each(function () {
                    /* Is it disabled? */
                    if (this.disabled) {
                        $(this).addClass('ie6-input-disabled');
                    }
                });
            },
            // FORMALIZE.init.autofocus
            autofocus: function () {
                if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
                    return;
                }

                $(':input[autofocus]:visible:first').focus();
            },
            // FORMALIZE.init.placeholder
            placeholder: function () {
                if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
                    // Exit if placeholder is supported natively,
                    // or if page does not have any placeholder.
                    return;
                }

                FORMALIZE.misc.add_placeholder();

                $(':input[placeholder]').each(function () {
                    var el = $(this);
                    var text = el.attr('placeholder');

                    el.focus(function () {
                        if (el.val() === text) {
                            el.val('').removeClass('placeholder-text');
                        }
                    }).blur(function () {
                        FORMALIZE.misc.add_placeholder();
                    });

                    // Prevent <form> from accidentally
                    // submitting the placeholder text.
                    el.closest('form').submit(function () {
                        if (el.val() === text) {
                            el.val('').removeClass('placeholder-text');
                        }
                    }).bind('reset', function () {
                        setTimeout(FORMALIZE.misc.add_placeholder, 50);
                    });
                });
            }
        },
        // FORMALIZE.misc
        misc: {
            // FORMALIZE.misc.add_placeholder
            add_placeholder: function () {
                if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
                    // Exit if placeholder is supported natively,
                    // or if page does not have any placeholder.
                    return;
                }

                $(':input[placeholder]').each(function () {
                    var el = $(this);
                    var text = el.attr('placeholder');

                    if (!el.val() || el.val() === text) {
                        el.val(text).addClass('placeholder-text');
                    }
                });
            }
        }
    };
    // Alias jQuery, window, document.
})(jQuery, this, this.document);

// Automatically calls all functions in FORMALIZE.init
jQuery(document).ready(function () {
    FORMALIZE.go();
}); ;
/**
* @todo
*/

Drupal.omega = Drupal.omega || {};

(function ($) {
    /**
    * @todo
    */
    var current;
    var previous;

    /**
    * @todo
    */
    var setCurrentLayout = function (index) {
        index = parseInt(index);
        previous = current;
        current = Drupal.settings.omega.layouts.order.hasOwnProperty(index) ? Drupal.settings.omega.layouts.order[index] : 'mobile';

        if (previous != current) {
            $('body').removeClass('responsive-layout-' + previous).addClass('responsive-layout-' + current);
            $.event.trigger('responsivelayout', { from: previous, to: current });
        }
    };

    /**
    * @todo
    */
    Drupal.omega.getCurrentLayout = function () {
        return current;
    };

    /**
    * @todo
    */
    Drupal.omega.getPreviousLayout = function () {
        return previous;
    };

    /**
    * @todo
    */
    Drupal.omega.crappyBrowser = function () {
        return $.browser.msie && parseInt($.browser.version, 10) < 9;
    };

    /**
    * @todo
    */
    Drupal.omega.checkLayout = function (layout) {
        if (Drupal.settings.omega.layouts.queries.hasOwnProperty(layout) && Drupal.settings.omega.layouts.queries[layout]) {
            var output = Drupal.omega.checkQuery(Drupal.settings.omega.layouts.queries[layout]);

            if (!output && layout == Drupal.settings.omega.layouts.primary) {
                var dummy = $('<div id="omega-check-query"></div>').prependTo('body');

                dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
                dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-check-query { z-index: 100; }</style><![endif]-->');

                output = parseInt(dummy.css('z-index')) == 100;

                dummy.remove();
            }

            return output;
        }

        return false;
    };

    /**
    * @todo
    */
    Drupal.omega.checkQuery = function (query) {
        var dummy = $('<div id="omega-check-query"></div>').prependTo('body');

        dummy.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');
        dummy.append('<style media="' + query + '">#omega-check-query { z-index: 100; }</style>');

        var output = parseInt(dummy.css('z-index')) == 100;

        dummy.remove();

        return output;
    };

    /**
    * @todo
    */
    Drupal.behaviors.omegaMediaQueries = {
        attach: function (context) {
            $('body', context).once('omega-mediaqueries', function () {
                var primary = $.inArray(Drupal.settings.omega.layouts.primary, Drupal.settings.omega.layouts.order);
                var dummy = $('<div id="omega-media-query-dummy"></div>').prependTo('body');

                dummy.append('<style media="all">#omega-media-query-dummy { position: relative; z-index: -1; }</style>');
                dummy.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-media-query-dummy { z-index: ' + primary + '; }</style><![endif]-->');

                for (var i in Drupal.settings.omega.layouts.order) {
                    dummy.append('<style media="' + Drupal.settings.omega.layouts.queries[Drupal.settings.omega.layouts.order[i]] + '">#omega-media-query-dummy { z-index: ' + i + '; }</style>');
                }

                $(window).bind('resize.omegamediaqueries', function () {
                    setCurrentLayout(dummy.css('z-index'));
                }).load(function () {
                    $(this).trigger('resize.omegamediaqueries');
                });
            });
        }
    };
})(jQuery); ;
/*
* jQuery FlexSlider v2.1
* http://www.woothemes.com/flexslider/
*
* Copyright 2012 WooThemes
* Free to use under the GPLv2 license.
* http://www.gnu.org/licenses/gpl-2.0.html
*
* Contributing author: Tyler Smith (@mbmufffin)
*/

; (function ($) {

    //FlexSlider: Object Instance
    $.flexslider = function (el, options) {
        var slider = $(el),
        vars = $.extend({}, $.flexslider.defaults, options),
        namespace = vars.namespace,
        touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        eventType = (touch) ? "touchend" : "click",
        vertical = vars.direction === "vertical",
        reverse = vars.reverse,
        carousel = (vars.itemWidth > 0),
        fade = vars.animation === "fade",
        asNav = vars.asNavFor !== "",
        methods = {};

        // Store a reference to the slider object
        $.data(el, "flexslider", slider);

        // Privat slider methods
        methods = {
            init: function () {
                vars.minItems = vars.maxItems = vars.defualtSildes;
                slider.animating = false;
                slider.currentSlide = vars.startAt;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = vars.selector.substr(0, vars.selector.search(' '));
                slider.slides = $(vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                // SYNC:
                slider.syncExists = $(vars.sync).length > 0;
                // SLIDE:
                if (vars.animation === "slide") vars.animation = "swing";
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                // SLIDESHOW:
                slider.manualPause = false;
                // TOUCH/USECSS:
                slider.transitions = !vars.video && !fade && vars.useCSS && (function () {
                    var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props) {
                        if (obj.style[props[i]] !== undefined) {
                            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                } ());
                // CONTROLSCONTAINER:
                if (vars.controlsContainer !== "") slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
                // MANUAL:
                if (vars.manualControls !== "") slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);

                // RANDOMIZE:
                if (vars.randomize) {
                    slider.slides.sort(function () { return (Math.round(Math.random()) - 0.5); });
                    slider.container.empty().append(slider.slides);
                }

                slider.doMath();

                // ASNAV:
                if (asNav) methods.asNav.setup();

                // INIT
                slider.setup("init");

                // CONTROLNAV:
                if (vars.controlNav) methods.controlNav.setup();

                // DIRECTIONNAV:
                if (vars.directionNav) methods.directionNav.setup();

                // KEYBOARD:
                if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
                    $(document).bind('keyup', function (event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            if (jQuery("" + slider.containerSelector + "").parents('#events-albums-slider').attr('id') || jQuery("" + slider.containerSelector + "").parents('.article-flexSlide').attr('class')) {
                                var target = (keycode === 37) ? slider.getTarget('next') :
                           (keycode === 39) ? slider.getTarget('prev') : false;
                                slider.flexAnimate(target, vars.pauseOnAction);
                            }
                            else {
                                var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
                                slider.flexAnimate(target, vars.pauseOnAction);
                            }
                        }
                    });
                }
                // MOUSEWHEEL:
                if (vars.mousewheel) {
                    slider.bind('mousewheel', function (event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                }

                // PAUSEPLAY
                if (vars.pausePlay) methods.pausePlay.setup();

                // SLIDSESHOW
                if (vars.slideshow) {
                    if (vars.pauseOnHover) {
                        slider.hover(function () {
                            if (!slider.manualPlay && !slider.manualPause) slider.pause();
                        }, function () {
                            if (!slider.manualPause && !slider.manualPlay) slider.play();
                        });
                    }
                    // initialize animation
                    (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
                }

                // TOUCH
                if (touch && vars.touch) methods.touch();

                // FADE&&SMOOTHHEIGHT || SLIDE:
                if (!fade || (fade && vars.smoothHeight)) $(window).bind("resize focus", methods.resize);

                slider.resize();
                // API: start() Callback
                setTimeout(function () {
                    vars.start(slider);
                }, 200);
            },
            asNav: {
                setup: function () {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    slider.slides.click(function (e) {
                        e.preventDefault();
                        var $slide = $(this),
                target = $slide.index();
                        if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                            slider.direction = (slider.currentItem < target) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
                        }
                    });
                }
            },
            controlNav: {
                setup: function () {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else { // MANUALCONTROLS:
                        methods.controlNav.setupManual();
                    }
                },
                setupPaging: function () {
                    var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item;

                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');

                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }

                    // CONTROLSCONTAINER:
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();

                    methods.controlNav.active();

                    slider.controlNavScaffold.delegate('a, img', eventType, function (event) {
                        event.preventDefault();
                        var $this = $(this),
                target = slider.controlNav.index($this);

                        if (!$this.hasClass(namespace + 'active')) {
                            slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    // Prevent iOS click event bug
                    if (touch) {
                        slider.controlNavScaffold.delegate('a', "click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                },
                setupManual: function () {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();

                    slider.controlNav.live(eventType, function (event) {
                        event.preventDefault();
                        var $this = $(this),
                target = slider.controlNav.index($this);

                        if (!$this.hasClass(namespace + 'active')) {
                            (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                            slider.flexAnimate(target, vars.pauseOnAction);
                        }
                    });
                    // Prevent iOS click event bug
                    if (touch) {
                        slider.controlNav.live("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                },
                set: function () {
                    var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                },
                active: function () {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                },
                update: function (action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function () {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }

                    methods.directionNav.update();

                    slider.directionNav.bind(eventType, function (event) {
                        event.preventDefault();
                        var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, vars.pauseOnAction);
                    });
                    // Prevent iOS click event bug
                    if (touch) {
                        slider.directionNav.bind("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                },
                update: function () {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass);
                    } else if (!vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
                        } else {
                            slider.directionNav.removeClass(disabledClass);
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass);
                    }
                }
            },
            pausePlay: {
                setup: function () {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }

                    methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');

                    slider.pausePlay.bind(eventType, function (event) {
                        event.preventDefault();
                        if ($(this).hasClass(namespace + 'pause')) {
                            slider.manualPause = true;
                            slider.manualPlay = false;
                            slider.pause();
                        } else {
                            slider.manualPause = false;
                            slider.manualPlay = true;
                            slider.play();
                        }
                    });
                    // Prevent iOS click event bug
                    if (touch) {
                        slider.pausePlay.bind("click touchstart", function (event) {
                            event.preventDefault();
                        });
                    }
                },
                update: function (state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
                }
            },
            touch: function () {
                var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false;

                el.addEventListener('touchstart', onTouchStart, false);
                function onTouchStart(e) {
                    if (slider.animating) {
                        e.preventDefault();
                    } else if (e.touches.length === 1) {
                        slider.pause();
                        // CAROUSEL: 
                        cwidth = (vertical) ? slider.h : slider.w;
                        startT = Number(new Date());
                        // CAROUSEL:
                        offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                     (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                     (carousel && slider.currentSlide === slider.last) ? slider.limit :
                     (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide :
                     (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
                        startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;

                        el.addEventListener('touchmove', onTouchMove, false);
                        el.addEventListener('touchend', onTouchEnd, false);
                    }
                }

                function onTouchMove(e) {
                    dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
                    scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));

                    if (!scrolling || Number(new Date()) - startT > 500) {
                        e.preventDefault();
                        if (!fade && slider.transitions) {
                            if (!vars.animationLoop) {
                                dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                            }
                            slider.setProps(offset + dx, "setTouch");
                        }
                    }
                }

                function onTouchEnd(e) {
                    // finish the touch by undoing the touch session
                    el.removeEventListener('touchmove', onTouchMove, false);

                    if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                        var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                        if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                            slider.flexAnimate(target, vars.pauseOnAction);
                        } else {
                            if (!fade) slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
                        }
                    }
                    el.removeEventListener('touchend', onTouchEnd, false);
                    startX = null;
                    startY = null;
                    dx = null;
                    offset = null;
                }
            },
            resize: function () {
                if (!slider.animating && slider.is(':visible')) {

                    //function for resloution
                    if (jQuery(window).width() <= vars.minResolution) {
                        vars.minItems = vars.maxItems = vars.minSildes;

                    }
                    else if (jQuery(window).width() >= vars.maxResolution) {
                        vars.minItems = vars.maxItems = vars.maxSildes;

                    }
                    else {
                        vars.minItems = vars.maxItems = vars.defualtSildes;

                    }
                    slider.doMath();

                    if (fade) {
                        // SMOOTH HEIGHT:
                        methods.smoothHeight();
                    } else if (carousel) { //CAROUSEL:
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    }
                    else if (vertical) { //VERTICAL:
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        // SMOOTH HEIGHT:
                        if (vars.smoothHeight) methods.smoothHeight();
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function (dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({ "height": slider.slides.eq(slider.animatingTo).height() }, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
                }
            },
            sync: function (action) {
                var $obj = $(vars.sync).data("flexslider"),
            target = slider.animatingTo;

                switch (action) {
                    case "animate": $obj.flexAnimate(target, vars.pauseOnAction, false, true); break;
                    case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
                    case "pause": $obj.pause(); break;
                }
            }
        }

        // public methods
        slider.flexAnimate = function (target, pause, override, withSync, fromNav) {
            if (!vars.albumSlider) {
                if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

                if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                    if (asNav && withSync) {
                        var master = $(vars.asNavFor).data('flexslider');
                        slider.atEnd = target === 0 || target === slider.count - 1;
                        master.flexAnimate(target, true, false, true, fromNav);
                        slider.direction = (slider.currentItem < target) ? "next" : "prev";
                        master.direction = slider.direction;

                        var activeItem = slider.count - target - 1;
                        if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                            slider.currentItem = target;
                            slider.slides.removeClass(namespace + "active-slide").eq(activeItem).addClass(namespace + "active-slide");
                            target = Math.floor(target / slider.visible);
                        } else {
                            slider.currentItem = target;
                            slider.slides.removeClass(namespace + "active-slide").eq(activeItem).addClass(namespace + "active-slide");
                            return false;
                        }
                    }

                    slider.animating = true;
                    slider.animatingTo = target;
                    // API: before() animation Callback
                    vars.before(slider);

                    // SLIDESHOW:
                    if (pause) slider.pause();

                    // SYNC:
                    if (slider.syncExists && !fromNav) methods.sync("animate");

                    // CONTROLNAV
                    if (vars.controlNav) methods.controlNav.active();

                    // !CAROUSEL:
                    // CANDIDATE: slide active class (for add/remove slide)
                    if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

                    // INFINITE LOOP:
                    // CANDIDATE: atEnd
                    slider.atEnd = target === 0 || target === slider.last;

                    // DIRECTIONNAV:
                    if (vars.directionNav) methods.directionNav.update();

                    if (target === slider.last) {
                        // API: end() of cycle Callback
                        vars.end(slider);
                        // SLIDESHOW && !INFINITE LOOP:
                        if (!vars.animationLoop) slider.pause();
                    }

                    // SLIDE:
                    if (!fade) {
                        var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
					  margin, slideString, calcNext;

                        // INFINITE LOOP / REVERSE:
                        if (carousel) {
                            margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
                            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                            //slideString= slideString * -1;
                        } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
                            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                        } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
                            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                        } else {
                            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                        }
                        slider.setProps(slideString, "", vars.animationSpeed);
                        if (slider.transitions) {
                            if (!vars.animationLoop || !slider.atEnd) {
                                slider.animating = false;
                                slider.currentSlide = slider.animatingTo;
                            }
                            slider.container.unbind("webkitTransitionEnd transitionend");
                            slider.container.bind("webkitTransitionEnd transitionend", function () {
                                slider.wrapup(dimension);
                            });
                        } else {
                            slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function () {
                                slider.wrapup(dimension);
                            });
                        }
                    } else { // FADE:
                        if (!touch) {
                            slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
                            slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
                        } else {
                            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
                            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }
                    }
                    // SMOOTH HEIGHT:
                    if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
                }
            } else {
                setTimeout(function () {
                    if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

                    if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                        if (asNav && withSync) {
                            var master = $(vars.asNavFor).data('flexslider');
                            slider.atEnd = target === 0 || target === slider.count - 1;
                            master.flexAnimate(target, true, false, true, fromNav);
                            slider.direction = (slider.currentItem < target) ? "next" : "prev";
                            master.direction = slider.direction;

                            var activeItem = slider.count - target - 1;
                            if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                                slider.currentItem = target;
                                slider.slides.removeClass(namespace + "active-slide").eq(activeItem).addClass(namespace + "active-slide");
                                target = Math.floor(target / slider.visible);
                            } else {
                                slider.currentItem = target;
                                slider.slides.removeClass(namespace + "active-slide").eq(activeItem).addClass(namespace + "active-slide");
                                return false;
                            }
                        }

                        slider.animating = true;
                        slider.animatingTo = target;
                        // API: before() animation Callback
                        vars.before(slider);

                        // SLIDESHOW:
                        if (pause) slider.pause();

                        // SYNC:
                        if (slider.syncExists && !fromNav) methods.sync("animate");

                        // CONTROLNAV
                        if (vars.controlNav) methods.controlNav.active();

                        // !CAROUSEL:
                        // CANDIDATE: slide active class (for add/remove slide)
                        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

                        // INFINITE LOOP:
                        // CANDIDATE: atEnd
                        slider.atEnd = target === 0 || target === slider.last;

                        // DIRECTIONNAV:
                        if (vars.directionNav) methods.directionNav.update();

                        if (target === slider.last) {
                            // API: end() of cycle Callback
                            vars.end(slider);
                            // SLIDESHOW && !INFINITE LOOP:
                            if (!vars.animationLoop) slider.pause();
                        }

                        // SLIDE:
                        if (!fade) {
                            var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
					  margin, slideString, calcNext;

                            // INFINITE LOOP / REVERSE:
                            if (carousel) {
                                margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
                                calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                                slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                                //slideString= slideString * -1;
                            } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
                                slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                            } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
                                slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                            } else {
                                slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                            }
                            slider.setProps(slideString, "", vars.animationSpeed);
                            if (slider.transitions) {
                                if (!vars.animationLoop || !slider.atEnd) {
                                    slider.animating = false;
                                    slider.currentSlide = slider.animatingTo;
                                }
                                slider.container.unbind("webkitTransitionEnd transitionend");
                                slider.container.bind("webkitTransitionEnd transitionend", function () {
                                    slider.wrapup(dimension);
                                });
                            } else {
                                slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function () {
                                    slider.wrapup(dimension);
                                });
                            }
                        } else { // FADE:
                            if (!touch) {
                                slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
                                slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
                            } else {
                                slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
                                slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
                                slider.animating = false;
                                slider.currentSlide = slider.animatingTo;
                            }
                        }
                        // SMOOTH HEIGHT:
                        if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
                    } 
                }, 300);
            }
        }
        slider.wrapup = function (dimension) {
            // SLIDE:
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            // API: after() animation Callback
            vars.after(slider);
        }

        // SLIDESHOW:
        slider.animateSlides = function () {
            if (!slider.animating) slider.flexAnimate(slider.getTarget("next"));
        }
        // SLIDESHOW:
        slider.pause = function () {
            clearInterval(slider.animatedSlides);
            slider.playing = false;
            // PAUSEPLAY:
            if (vars.pausePlay) methods.pausePlay.update("play");
            // SYNC:
            if (slider.syncExists) methods.sync("pause");
        }
        // SLIDESHOW:
        slider.play = function () {
            slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
            slider.playing = true;
            // PAUSEPLAY:
            if (vars.pausePlay) methods.pausePlay.update("pause");
            // SYNC:
            if (slider.syncExists) methods.sync("play");
        }
        slider.canAdvance = function (target, fromNav) {
            // ASNAV:
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
        }
        slider.getTarget = function (dir) {
            slider.direction = dir;
            if (dir === "next") {
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        }

        // SLIDE:
        slider.setProps = function (pos, special, dur) {
            var target = (function () {
                var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function () {
                if (carousel) {
                    return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                } else {
                    switch (special) {
                        case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                        case "setTouch": return (reverse) ? pos : pos;
                        case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                        case "jumpStart": return (reverse) ? slider.count * pos : pos;
                        default: return pos;
                    }
                }
            } ());
                return (posCalc * -1) + "px";
            } ());

            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
            }

            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) slider.container.css(slider.args);
        }

        slider.setup = function (type) {
            // SLIDE:
            if (!fade) {
                var sliderOffset, arr;

                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({ "overflow": "hidden", "position": "relative" }).appendTo(slider).append(slider.container);
                    // INFINITE LOOP:
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    // REVERSE:
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                // INFINITE LOOP && !CAROUSEL:
                if (vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    // clear out old clones
                    if (type !== "init") slider.container.find('.clone').remove();
                    slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
                }
                slider.newSlides = $(vars.selector, slider);

                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                // VERTICAL:
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function () {
                        slider.newSlides.css({ "display": "block" });
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function () {
                        slider.doMath();
                        slider.newSlides.css({ "width": slider.computedW, "float": "left", "display": "block" });
                        // SMOOTH HEIGHT:
                        if (vars.smoothHeight) methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else { // FADE: 
                slider.slides.css({ "width": "100%", "float": "left", "marginRight": "-100%", "position": "relative" });
                if (type === "init") {
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
                    } else {
                        slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2 });
                    }
                }
                // SMOOTH HEIGHT:
                if (vars.smoothHeight) methods.smoothHeight();
            }
            // !CAROUSEL:
            // CANDIDATE: active slide
            if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
        }

        slider.doMath = function () {
            var slide = slider.slides.first(),
          slideMargin = vars.itemMargin,
          minItems = vars.minItems,
          maxItems = vars.maxItems;

            slider.w = slider.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();

            // CAROUSEL:
            if (carousel) {
                slider.itemT = vars.itemWidth + slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems)) / minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems)) / maxItems :
                       (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
                slider.visible = Math.floor(slider.w / (slider.itemW + slideMargin));
                slider.move = (vars.move > 0 && vars.move < slider.visible) ? vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
                slider.last = slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 :
                       (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;

            //alert(slider.attr('class'));
            if (slider.parents('.celebs-flex-slider').attr('class') ||
          slider.parents('.featured-flex-slider').attr('class') ||
          slider.parents('.grouped-flex').attr('class') ||
          slider.parents('.flexSlide').attr('class')) {
                slider.computedW = 302;
            }


            if (slider.parents('.featured-flex-slider').attr('class') || slider.parents('.grouped-flex').attr('class')) {
                if (screen.width >= 1680) {
                    slider.computedW = 636;
                }
            }

            //alert(slider.computedW);
        }

        slider.update = function (pos, action) {
            slider.doMath();

            // update currentSlide and slider.animatingTo if necessary
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }

            // update controlNav
            if (vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            // update directionNav
            if (vars.directionNav) methods.directionNav.update();

        }

        slider.addSlide = function (obj, pos) {
            var $obj = $(obj);

            slider.count += 1;
            slider.last = slider.count - 1;

            // append new slide
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.update(pos, "add");

            // update slider.slides
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            //FlexSlider: added() Callback
            vars.added(slider);
        }
        slider.removeSlide = function (obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

            // update count
            slider.count -= 1;
            slider.last = slider.count - 1;

            // remove slide
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.doMath();
            slider.update(pos, "remove");

            // update slider.slides
            slider.slides = $(vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            // FlexSlider: removed() Callback
            vars.removed(slider);
        }

        //FlexSlider: Initialize
        methods.init();
        methods.resize();
    }

    //FlexSlider: Default Settings
    $.flexslider.defaults = {
        namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
        selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
        animation: "fade",              //String: Select your animation type, "fade" or "slide"
        easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
        reverse: false,                 //{NEW} Boolean: Reverse the animation direction
        animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
        startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow: true,                //Boolean: Animate slider automatically
        slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
        initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
        randomize: false,               //Boolean: Randomize slide order

        // Usability features
        pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

        // Primary Controls
        controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText: "Previous",           //String: Set the text for the "previous" directionNav item
        nextText: "Next",               //String: Set the text for the "next" directionNav item

        // Secondary Navigation
        keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay: false,               //Boolean: Create pause/play dynamic element
        pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
        playText: "Play",               //String: Set the text for the "play" pausePlay item

        // Special properties
        controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
        manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

        // Carousel Options
        itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
        itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
        minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
        maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
        move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
        defualtSildes: 0,                //{NEW} Integer: Number of carousel items that should be visible.
        minResolution: 0, 			//{NEW} Integer: Minimum screen resolution to change number of viewing slides
        minSildes: 0,                    //{NEW} Integer: Minimum number of viewing slides
        maxResolution: 9999, 			//{NEW} Integer: Maximum screen resolution to change number of viewing slides
        maxSildes: 0,                   	//{NEW} Integer: Maximum number of viewing slides
        albumSlider: false, 			//{NEW} Boolean: Check if slider in album page (fixing overflow bug)

        // Callback API
        start: function () { },            //Callback: function(slider) - Fires when the slider loads the first slide
        before: function () { },           //Callback: function(slider) - Fires asynchronously with each slider animation
        after: function () { },            //Callback: function(slider) - Fires after each slider animation completes
        end: function () { },              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
        added: function () { },            //{NEW} Callback: function(slider) - Fires after a slide is added
        removed: function () { }           //{NEW} Callback: function(slider) - Fires after a slide is removed
    }


    //FlexSlider: Plugin Function
    $.fn.flexslider = function (options) {
        if (options === undefined) options = {};

        if (typeof options === "object") {
            return this.each(function () {
                var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

                if ($slides.length === 1) {
                    $slides.fadeIn(400);
                    if (options.start) options.start($this);
                } else if ($this.data('flexslider') === undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            // Helper strings to quickly perform functions on the slider
            var $slider = $(this).data('flexslider');
            switch (options) {
                case "play": $slider.play(); break;
                case "pause": $slider.pause(); break;
                case "next": if ($slider != undefined) { $slider.flexAnimate($slider.getTarget("next"), true) }; break;
                case "prev":
                case "previous": if ($slider != undefined) { $slider.flexAnimate($slider.getTarget("prev"), true); } break;
                default: if (typeof options === "number") $slider.flexAnimate(options, true);
            }
        }
    }

})(jQuery); ;
var runSlider = 1;
var activeSlide = 1;
(function ($) {
    $.fn.extend({
        //pass the options variable to the function
        layalinaSlider: function (options) {
            //Set the default values
            var defaults = {
                width: 972,
                height: 517
            }
            var options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                var margin = o.width - ((parseFloat($(window).width()) - o.width) / 2);

                //set current slide value
                var current = 1;

                //responsive on resize
                $(window).resize(function () {
                    $('#slider-container').css({
                        width: '100%',
                        overflow: 'hidden'
                    });

                    if (parseFloat($(window).width()) >= 1007) {
                        margin = o.width - ((parseFloat($(window).width()) - o.width) / 2);
                        current = $('.current').attr('value');
                        if (!current) {
                            current = 1;
                        }

                        //add styles				
                        $('#slider-container').css({
                            width: '100%',
                            overflow: 'hidden'
                        });

                        var val = -margin - ((current - 1) * o.width);
                        $('#slider').css({
                            left: -val
                        });

                        $('#slider-container .back').css({
                            width: ((parseFloat($(window).width()) - o.width) / 2) + 1
                        });

                        $('#slider-container .next').css({
                            width: ((parseFloat($(window).width()) - o.width) / 2)
                        });

                        $('#slider-container .back-arrow').css({
                            width: ((parseFloat($(window).width()) - o.width) / 2) + 1
                        });

                        $('#slider-container .next-arrow').css({
                            width: ((parseFloat($(window).width()) - o.width) / 2) + 1
                        });

                        if ($(window).width() == '1007') {
                            $('#slider-container .next').css({
                                left: ((parseFloat($(window).width()) - o.width) / 2)
                            });
                        }
                        else {
                            $('#slider-container .next').css({
                                left: 0
                            });
                        }
                    }

                    else {







                        margin = 946;
                        current = $('.current').attr('value');
                        if (!current) {
                            current = 1;
                        }

                        //add styles				
                        $('#slider-container').css({
                            width: '100%',
                            overflow: 'hidden'
                        });

                        var val = -margin - ((current - 1) * o.width);
                        $('#slider').css({
                            left: -val
                        });

                        $('#slider-container .back').css({
                            width: '27px'
                        });

                        $('#slider-container .next').css({
                            width: '27px'
                        });

                        $('#slider-container .back-arrow').css({
                            width: '27px'
                        });

                        $('#slider-container .next-arrow').css({
                            width: '27px'
                        });

                        if ($(window).width() == '1007') {
                            $('#slider-container .next').css({
                                left: ((parseFloat($(window).width()) - o.width) / 2)
                            });
                        }
                        else {
                            $('#slider-container .next').css({
                                left: 0
                            });
                        }









                    }
                });

                if ($('body').css('zoom') == '0.75')
                    margin = o.width - (((parseFloat($(window).width()) * 133.3 / 100) - o.width) / 2);

                //add styles to slides
                $(this).find('li').each(function (i, e) {
                    $(e).addClass('slide-' + i);
                    $(e).attr('value', i);
                });

                //wrap list items with required divs
                $(this).find('ul').wrap('<div id="slider">');
                $('#slider').wrap('<div id="slider-container">');
                $('#slider-container').prepend('<div class="back"><div class="back-arrow">back</div></div>');
                $('#slider-container').append('<div class="next"><div class="next-arrow">next</div></div>');

                //add styles
                var count = $('#slider li').size();
                var container = count * o.width;

                $('#slider li').css({
                    width: o.width,
                    height: o.height,
                    overflow: 'hidden',
                    margin: '0',
                    float: 'right'
                });

                $('#slider-container').css({
                    width: $(window).width(),
                    height: o.height,
                    overflow: 'hidden'
                });

                $('#slider').css({
                    width: container,
                    position: 'relative',
                    left: margin
                });

                $(this).find('ul').css({
                    margin: '0'
                });

                $('#slider-container .back').css({
                    width: ((parseFloat($(window).width()) - o.width) / 2) + 1
                });

                $('#slider-container .next').css({
                    width: ((parseFloat($(window).width()) - o.width) / 2)
                });

                if ($(window).width() == '1007') {
                    $('#slider-container .next').css({
                        left: ((parseFloat($(window).width()) - o.width) / 2)
                    });
                }
                else {
                    $('#slider-container .next').css({
                        left: 0
                    });
                }

                $('#slider-container .back-arrow').css({
                    width: ((parseFloat($(window).width()) - o.width) / 2) + 1
                });

                $('#slider-container .next-arrow').css({
                    width: ((parseFloat($(window).width()) - o.width) / 2)
                    //width: ((parseFloat($(window).width()) - o.width)/2)+1
                });

                //iPad styles
                if ($('body').css('zoom') == '0.75') {
                    $('#slider-container').css({
                        width: $(window).width() * 133.3 / 100
                    });

                    $('#slider-container .back').css({
                        width: (((parseFloat($(window).width()) * 133.3 / 100) - o.width) / 2) + 1
                    });

                    $('#slider-container .next').css({
                        width: (((parseFloat($(window).width()) * 133.3 / 100) - o.width) / 2)
                    });

                    $('#slider-container .back-arrow').css({
                        width: (((parseFloat($(window).width()) * 133.3 / 100) - o.width) / 2) + 1
                    });

                    $('#slider-container .next-arrow').css({
                        width: (((parseFloat($(window).width()) * 133.3 / 100) - o.width) / 2)
                    });
                }


                $('.view-layalina-slider .views-row').show();
                $('.view-layalina-slider .views-row-first').css({
                    width: 'auto',
                    margin: 0
                });




                //go to previous slide
                $(this).find('.back').bind('click', function () {
                    if (document.top_sliding) {
                        return;
                    }

                    //stop video
                    //                        $('.views-field-sm-field-video-link').each(function(i,e){
                    //                            var html = $(e).html();
                    //                            $(e).html(html);
                    //                        });
                    //                        
                    //                        $('.views-field-ss-field-video-embed').each(function(i,e){
                    //                            var html = $(e).html();
                    //                            $(e).html(html);
                    //                        });

                    if (navigator.userAgent.match(/Android/i) ||
                        navigator.userAgent.match(/webOS/i) ||
                        navigator.userAgent.match(/iPad/i) ||
                        navigator.userAgent.match(/iPhone/i) ||
                        navigator.userAgent.match(/iPod/i)
                        ) {

                    }
                    else {
                        $('.video-slide').remove();
                        $('.image_layer').show();
                    }

                    document.top_sliding = true;
                    var parent = $(this).parent();
                    var ul = $(parent).find('ul');
                    var children = $(ul).children();
                    var slider = $("#slider");
                    last = $(children).last();
                    var slide = parseInt($(slider).css('left'));

                    slide = slide - 972;
                    $(ul).prepend(last);
                    $(slider).css('left', slide + 972 + 972);
                    $(slider).animate({ left: slide + 972 }, function () {
                        document.top_sliding = false;
                    });
                    activeSlide--;
                    if (activeSlide == 0) {
                        activeSlide = jQuery('.view-slider #slider ul li').size();
                    }
                    try { sliderAdds(activeSlide); } catch (err) { console.log(err); }
                    //alert(activeSlide);
                });

                //go to next slide
                $(this).find('.next').bind('click', function () {
                    if (document.top_sliding) {
                        return;
                    }

                    //stop video
                    //                        $('.views-field-sm-field-video-link').each(function(i,e){
                    //                            var html = $(e).html();
                    //                            $(e).html(html);
                    //                        });
                    //                        
                    //                        $('.views-field-ss-field-video-embed').each(function(i,e){
                    //                            var html = $(e).html();
                    //                            $(e).html(html);
                    //                        });

                    if (navigator.userAgent.match(/Android/i) ||
                            navigator.userAgent.match(/webOS/i) ||
                            navigator.userAgent.match(/iPad/i) ||
                            navigator.userAgent.match(/iPhone/i) ||
                            navigator.userAgent.match(/iPod/i)
                            ) {

                    }
                    else {
                        $('.video-slide').remove();
                        $('.image_layer').show();
                    }

                    document.top_sliding = true;
                    var parent = $(this).parent();
                    var ul = $(parent).find('ul');
                    var children = $(ul).children();
                    var slider = $("#slider");
                    first = $(children).first();
                    var slide = parseInt($(slider).css('left'));

                    slide = slide + 972;
                    $(ul).append(first);
                    $(slider).css('left', slide - 972 - 972);
                    $(slider).animate({ left: slide - 972 }, function () {
                        document.top_sliding = false;
                    });
                    //to fix slide position
                    activeSlide++;
                    try { sliderAdds(activeSlide); } catch (err) { console.log(err); }

                });




                if (runSlider = 1) {
                    setInterval(function () {
                        //  alert(stopslider);
                        if (stopslider != 1) {
                            if (windowPostion < 517) {
                                $('#slider').parent().find('.next').trigger('click');
                            }
                            stopslider = 0;
                        }
                    }, 10000  /* 10000 ms = 10 sec */
                    );
                }


            });
        }
    });

})(jQuery);



function clickBack(current, width, margin, count) {
    // check/modify sliding status 
    if (document.top_sliding == true)
        return current;
    document.top_sliding = true;

    if (current >= 1) {
        current -= 1;
        current_slide = '.slide-' + current;
        jQuery('#slider li').removeClass('current');
        jQuery(current_slide).addClass('current');
        var slide = parseFloat(jQuery('#slider').css('left'));
        if (jQuery('body').css('zoom') == '0.75') {
            slide = slide * 133.3 / 100;
        }
        slide = slide - width;
        jQuery('#slider').animate({ left: slide }, function () { document.top_sliding = false; });
    }
    else {
        var left = -margin + (-width * (count - 2));
        jQuery('#slider li').removeClass('current');
        jQuery('.slide-' + (count - 1)).addClass('current');
        jQuery('#slider').animate({ left: -left, easing: 'linear' }, function () { document.top_sliding = false; });
        current = count - 1;

    }
    return current;
}

function clickNext(current, count, width, margin) {
    // check/modify sliding status 
    if (document.top_sliding == true)
        return current;
    document.top_sliding = true;

    if (current <= (count - 2)) {
        current += 1;
        current_slide = '.slide-' + current;
        jQuery('#slider li').removeClass('current');
        jQuery(current_slide).addClass('current');
        var slide = parseFloat(jQuery('#slider').css('left'));
        if (jQuery('body').css('zoom') == '0.75') {
            slide = slide * 133.3 / 100;
        }
        slide = slide + width;
        jQuery('#slider').animate({ left: slide, easing: 'linear' }, function () { document.top_sliding = false; });
    }
    else {
        jQuery('#slider li').removeClass('current');
        jQuery('.slide-0').addClass('current');
        jQuery('#slider').animate({ left: (margin - width), easing: 'linear' }, function () { document.top_sliding = false; });
        current = 0;
    }
    return current;
}
;
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Dual licensed under the MIT (MIT_LICENSE.txt)
* and GPL Version 2 (GPL_LICENSE.txt) licenses.
*
* Version: 1.1.1
* Requires jQuery 1.3+
* Docs: http://docs.jquery.com/Plugins/livequery
*/

(function ($) {

    $.extend($.fn, {
        livequery: function (type, fn, fn2) {
            var self = this, q;

            // Handle different call patterns
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;

            // See if Live Query already exists
            $.each($.livequery.queries, function (i, query) {
                if (self.selector == query.selector && self.context == query.context &&
type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid))
                // Found the query, exit the each loop
                    return (q = query) && false;
            });

            // Create new Live Query if it wasn't found
            q = q || new $.livequery(this.selector, this.context, type, fn, fn2);

            // Make sure it is running
            q.stopped = false;

            // Run it immediately for the first time
            q.run();

            // Contnue the chain
            return this;
        },

        expire: function (type, fn, fn2) {
            var self = this;

            // Handle different call patterns
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;

            // Find the Live Query based on arguments and stop it
            $.each($.livequery.queries, function (i, query) {
                if (self.selector == query.selector && self.context == query.context &&
(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped)
                    $.livequery.stop(query.id);
            });

            // Continue the chain
            return this;
        }
    });

    $.livequery = function (selector, context, type, fn, fn2) {
        this.selector = selector;
        this.context = context;
        this.type = type;
        this.fn = fn;
        this.fn2 = fn2;
        this.elements = [];
        this.stopped = false;

        // The id is the index of the Live Query in $.livequery.queries
        this.id = $.livequery.queries.push(this) - 1;

        // Mark the functions for matching later on
        fn.$lqguid = fn.$lqguid || $.livequery.guid++;
        if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;

        // Return the Live Query
        return this;
    };

    $.livequery.prototype = {
        stop: function () {
            var query = this;

            if (this.type)
            // Unbind all bound events
                this.elements.unbind(this.type, this.fn);
            else if (this.fn2)
            // Call the second function for all matched elements
                this.elements.each(function (i, el) {
                    query.fn2.apply(el);
                });

            // Clear out matched elements
            this.elements = [];

            // Stop the Live Query from running until restarted
            this.stopped = true;
        },

        run: function () {
            // Short-circuit if stopped
            if (this.stopped) return;
            var query = this;

            var oEls = this.elements,
els = $(this.selector, this.context),
nEls = els.not(oEls);

            // Set elements to the latest set of matched elements
            this.elements = els;

            if (this.type) {
                // Bind events to newly matched elements
                nEls.bind(this.type, this.fn);

                // Unbind events to elements no longer matched
                if (oEls.length > 0)
                    $.each(oEls, function (i, el) {
                        if ($.inArray(el, els) < 0)
                            $.event.remove(el, query.type, query.fn);
                    });
            }
            else {
                // Call the first function for newly matched elements
                nEls.each(function () {
                    query.fn.apply(this);
                });

                // Call the second function for elements no longer matched
                if (this.fn2 && oEls.length > 0)
                    $.each(oEls, function (i, el) {
                        if ($.inArray(el, els) < 0)
                            query.fn2.apply(el);
                    });
            }
        }
    };

    $.extend($.livequery, {
        guid: 0,
        queries: [],
        queue: [],
        running: false,
        timeout: null,

        checkQueue: function () {
            if ($.livequery.running && $.livequery.queue.length) {
                var length = $.livequery.queue.length;
                // Run each Live Query currently in the queue
                while (length--)
                    $.livequery.queries[$.livequery.queue.shift()].run();
            }
        },

        pause: function () {
            // Don't run anymore Live Queries until restarted
            $.livequery.running = false;
        },

        play: function () {
            // Restart Live Queries
            $.livequery.running = true;
            // Request a run of the Live Queries
            $.livequery.run();
        },

        registerPlugin: function () {
            $.each(arguments, function (i, n) {
                // Short-circuit if the method doesn't exist
                if (!$.fn[n]) return;

                // Save a reference to the original method
                var old = $.fn[n];

                // Create a new method
                $.fn[n] = function () {
                    // Call the original method
                    var r = old.apply(this, arguments);

                    // Request a run of the Live Queries
                    $.livequery.run();

                    // Return the original methods result
                    return r;
                }
            });
        },

        run: function (id) {
            if (id != undefined) {
                // Put the particular Live Query in the queue if it doesn't already exist
                if ($.inArray(id, $.livequery.queue) < 0)
                    $.livequery.queue.push(id);
            }
            else
            // Put each Live Query in the queue if it doesn't already exist
                $.each($.livequery.queries, function (id) {
                    if ($.inArray(id, $.livequery.queue) < 0)
                        $.livequery.queue.push(id);
                });

            // Clear timeout if it already exists
            if ($.livequery.timeout) clearTimeout($.livequery.timeout);
            // Create a timeout to check the queue and actually run the Live Queries
            $.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
        },

        stop: function (id) {
            if (id != undefined)
            // Stop are particular Live Query
                $.livequery.queries[id].stop();
            else
            // Stop all Live Queries
                $.each($.livequery.queries, function (id) {
                    $.livequery.queries[id].stop();
                });
        }
    });

    // Register core DOM manipulation methods
    $.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove', 'html');

    // Run Live Queries when the Document is ready
    $(function () { $.livequery.play(); });

})(jQuery);
;
/* 
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/


jQuery(function () {
    try {

        jQuery('#layalina-solr-custom-site-form').live('submit', function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ù„ÙŠØ§Ù„ÙŠÙ†Ø§", false, 'filter=5', search_text);
            return false;
        })


        jQuery('#llayalina-solr-custom-site-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ù„ÙŠØ§Ù„ÙŠÙ†Ø§", false, 'filter=5', search_text);
                return false;
            }

        });


        jQuery('#layalina-solr-custom-search-events-form').submit(function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª", true, 'events', search_text);
            return false;
        })


        jQuery('#layalina-solr-custom-search-events-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª", true, 'events', search_text);
                return false;
            }

        });


        jQuery('#layalina-solr-custom-cp-profile-form').submit(function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†", true, 'celebrities', search_text);
            return false;
        })


        jQuery('#layalina-solr-custom-cp-profile-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†", true, 'celebrities', search_text);
                return false;
            }
        });



        jQuery('#layalina-solr-custom-search-celebrity-form').submit(function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†", true, 'celebrities', search_text);
            return false;
        })

        jQuery('#layalina-solr-custom-search-celebrity-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†", true, 'celebrities', search_text);
                return false;
            }
        });


        jQuery('#layalina-solr-custom-search-fashion-form').submit(function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ù…ÙˆØ¶Ø© ÙˆØ£Ø²ÙŠØ§Ø¡", true, 'fashion', search_text);
            return false;
        })

        jQuery('#layalina-solr-custom-search-fashion-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« ÙÙŠ Ù…ÙˆØ¶Ø© ÙˆØ£Ø²ÙŠØ§Ø¡", true, 'fashion', search_text);
                return false;
            }
        });

        jQuery('#layalina-solr-custom-search-fd-form').submit(function () {
            var search_text = jQuery(this).find('.form-text').val();
            redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…ØµÙ…Ù…ÙˆÙˆ Ø§Ø²ÙŠØ§Ø¡", true, 'fashion', search_text);
            return false;
        })

        jQuery('#layalina-solr-custom-search-fd-form .form-text').keypress(function (e) {
            if (e.which == 13) {
                var search_text = jQuery(this).val();
                redirect("Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…ØµÙ…Ù…ÙˆÙˆ Ø§Ø²ÙŠØ§Ø¡", true, 'fashion', search_text);
                return false;
            }
        });
    }
    catch (e) { }
})


function redirect(verify_text, content_type, query, search_text) {
    try {
        if (search_text != verify_text && search_text.length > 2) {
            if (content_type) {
                search_text = jQuery.trim(search_text);
                search_text = search_text.replace(/ /g, '+');
                window.location = Drupal.settings.basePath + 'custom_search/' + query + '/' + search_text + '/?view=grid';
            } else {
                search_text = jQuery.trim(search_text);
                search_text = search_text.replace(/ /g, '+');
                window.location = Drupal.settings.basePath + 'custom_search/' + search_text + '/?view=grid';

            }
        }
    }
    catch (e) { }
    return false;
};
var hideTooltip = null;
var hideTooltip2 = null;
var pinHideTooltip = null;
var pinHideTooltip2 = null;
var stopslider = 0;
var liteBoxgallery = 0;
var liteBoxkeyboard = 0;
var season = 'all';
var pager = 1;
var filter1 = 0;
var filter2 = 0;
var windowPostion = 0;

(function ($) {
    jQuery(document).ready(function () {




        jQuery('#social-fb').mouseover(function () {
        });
        if (isMobile()) {

            jQuery('.view-display-id-front_events .events-container').scroll(function () {

                if (jQuery(this).scrollLeft() < 15) {
                    lazy_load();
                }
            });




        }

        //alert('zx');
        $('.user-logged-in-container').hover(function () {
            $('.user-logged-in-links-container').slideDown(150);
        },
		function () {

		    $('.user-logged-in-links-container').slideUp(150);

		});

        $('#login-box-fade').click(function () {

            $('.user-login-box').toggle();
        });
        jQuery('.ajax-rate').live('click', function () {
            try {
                var rate_url = $(this).attr('href');
                var rel = $(this);
                jQuery.ajax({
                    url: rate_url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        rel.html(data);
                        rel.attr('title', data);
                        rel.parent().parent().find('.thumbs-num').html(data);
                    }
                })
            }
            catch (err) { }
            return false;
        });


        $('.events-slider-loading').hide();
        //try {hackMsie();} catch(err){}

        try { removeApp(); } catch (err) { console.log(err); }
        //try {ip_targeting();} catch(err){console.log(err);}
        try { events_filteration(); } catch (err) { console.log(err); }
        try { ajaxFilters(); } catch (err) { console.log(err); }
        try { lightboxClose(); } catch (err) { console.log(err); }
        try { activeMenus(); } catch (err) { console.log(err); }
        try { flex_slider(); } catch (err) { console.log(err); }
        try { mediaShare(); } catch (err) { console.log(err); }
        try { searchBoxes(); } catch (err) { console.log(err); }
        try { socialFollow(); } catch (err) { console.log(err); }
        try { transformDropdowns(); } catch (err) { console.log(err); }
        try { groupedElementSlider(); } catch (err) { console.log(err); }
        try { slider302(); } catch (err) { console.log(err); }
        try { responsiveObjects(); } catch (err) { console.log(err); }
        try {
            if (!isMobile()) {
                jQuery('.view-slider').layalinaSlider();
            }
        } catch (err) { }
        try { sticky_navigation(); } catch (err) { console.log(err); }
        try { scrollEvents(); } catch (err) { console.log(err); }
        try { sticky_parts(); } catch (err) { console.log(err); }
        try { albumSlider(); } catch (err) { console.log(err); }
        try { lis_alt(); } catch (err) { console.log(err); }
        try { misc(); } catch (err) { console.log(err); }
        try { media_mac(); } catch (err) { console.log(err); }
        try { $('.featured-slider').append($('#block-block-1')); } catch (err) { console.log(err); }
        try { $('.fashion-slider').append($('#block-block-1')); } catch (err) { console.log(err); }
        try { extendedFooter(); } catch (err) { }
        try { newsLetters_validation(); } catch (err) { console.log(err); }
        try { searchFixes(); } catch (err) { console.log(err); }
        try { window.onload = resizeIframe; } catch (err) { console.log(err); }
        try { hackMsie(); } catch (err) { console.log(err); }
        try { iframe_fixes(); } catch (err) { console.log(err); }
        try { album_slider(); } catch (err) { console.log(err); }
        try { search_filters(); } catch (err) { console.log(err); }
        try { pageInit() } catch (err) { console.log(err); }
        try { addsSystem() } catch (err) { console.log(err); }
        try { moveEventAdd() } catch (err) { console.log(err); }
        try { twitterShortUrl() } catch (err) { console.log(err); }
        try { newIpTarget() } catch (err) { console.log(err); }
        var target = new Array();
        target['abu dhabi'] = 'Ø£Ø¨Ùˆ Ø¸Ø¨ÙŠ';
        target['dubai'] = 'Ø¯Ø¨ÙŠ';
        target['kuwait'] = 'Ø§Ù„ÙƒÙˆÙŠØª';
        target['beirut'] = 'Ø¨ÙŠØ±ÙˆØª';

        var cookie = get_cookie('country_city');

        if (target[cookie] != undefined) {

            var href_11 = jQuery('#menu-item-custom-id-11 a').attr('href') + '/' + target[cookie];
            var href_12 = jQuery('#menu-item-custom-id-12 a').attr('href') + '/' + target[cookie];
            var href_13 = jQuery('#menu-item-custom-id-13 a').attr('href') + '/' + target[cookie];
            var href_14 = jQuery('#menu-item-custom-id-14 a').attr('href') + '/' + target[cookie];
            jQuery('#menu-item-custom-id-11 a').attr('href', href_11);
            jQuery('#menu-item-custom-id-12 a').attr('href', href_12);
            jQuery('#menu-item-custom-id-13 a').attr('href', href_13);
            jQuery('#menu-item-custom-id-14 a').attr('href', href_14);
        }

        //alert(video_510);
        jQuery('.image_layer').click(function () {
            jQuery(this).hide();
            var embedID = jQuery(this).attr('id');
            var embedCode = jQuery.parseJSON(Drupal.settings[embedID]);
            jQuery(this).after(embedCode);
        });

        if (jQuery.browser.msie) {
            jQuery(".fluid_lightbox").attr("style", "width:55% !important");
        }

        /*$('#login-sso').click(function(){
        $(this).append('<iframe src="'+'http://82.212.71.226:7005/layalina_stg/connect/oauthconnector_sso_server'+'"/></iframe>');
        return false;
        });*/

        $('.view-slider .back, .ipad-right-arrow').click(function () {
            $('.view-slider .flexslider').flexslider("previous");
        });

        $('.view-slider .next, .ipad-left-arrow').click(function () {
            $('.view-slider .flexslider').flexslider("next");
        });

        $(window).resize(function () {
            try { groupedElementSlider(); } catch (err) { console.log(err); }
            try { responsiveObjects(); } catch (err) { console.log(err); }
            try { $('.featured-slider').append($('#block-block-1')); } catch (err) { console.log(err); }
            try { media_mac(); } catch (err) { console.log(err); }
        });

    });

})(jQuery);

function pageInit() {
    //Scroll to page top
    if (isMobile()) {
        if (jQuery('body').hasClass('page-ar-Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©')) {
            jQuery('html, body').animate({ scrollLeft: jQuery(window).width() + 'px' }, 'fast');
        } else {
            window.location = '#rt';
        }

    }
}
function addsSystem() {
    //alert('sss');
    //jQuery('#main-add-1').append('ddddddddddddddddddddd');
    if (isMobile()) {
        try { jQuery('#main-add-2').html(jQuery('#addds2')); } catch (err) { };
        try { jQuery('#main-add-1').html(jQuery('#addds1')); } catch (err) { };
    }
    //  jQuery('#main-add-2').html('<script language="JavaScript">var zflag_nid="1424"; var zflag_cid="1724/1723"; var zflag_sid="243"; var zflag_width="972"; var zflag_height="517"; var zflag_sz="72"; var zflag_charset="utf-8"; </script><script language="JavaScript" src="http://c5.zedo.com/jsc/c5/fo.js"></script>');

}
function moveEventAdd() {
    var x = jQuery('.event-add-hidden-content').html();
    try { jQuery('.event-add').html(x); } catch (err) { };
}

function hackMsie() {
    if (jQuery.browser.msie && jQuery.browser.version < 9) {
        //the dam IE 8 styles
        if (jQuery(window).width() >= 1600) {
            jQuery('.slider.responsive').addClass('responsive-ie-1860');
            jQuery('.slider-250.slider.responsive,.view-common.view-id-common.view-display-id-block_1.slider.responsive,.view-id-common.view-display-id-block_2.slider.responsive,.view-celebrity-news-interviews-and-fashion.grouped-elements-slider').addClass('no-left-1860');
            jQuery('.slider-2-rows.responsive').addClass('full-width-ie-1860');
            jQuery('.featured-slider .view-content').addClass('view-content-ie-1860');
            jQuery('.featured-slider').addClass('featured-slider-ie-1860');
            jQuery('.listing.responsive .header-menu-wrapper').addClass('header-menu-wrapper-ie-1860');
            jQuery('.front .view-id-layalina_celebrities.view-display-id-block .ether-next').addClass('ether-next-ie-1860');
            jQuery('.grouped-elements-slider .ether-col').addClass('ether-col-ie-1860');
            jQuery('.grouped-elements-slider .item-grouped-elements').addClass('item-grouped-elements-ie-1860');
            jQuery('.grouped-elements-slider').addClass('grouped-elements-slider-ie-1860');
            jQuery('.fashion-slider').addClass('fashion-slider-ie-1860');
            jQuery('.fashion-slider .view-content').addClass('view-content-ie-1860');

            jQuery('.fashion-slider .three-0-two-block, .fashion-slider .ether-col').addClass('fashion-slider-col-ie-1860');
            jQuery('.featured.responsive').addClass('featured-responsive-ie-1860');
            jQuery('.view-celebrity-news #page-title').addClass('view-celebrity-news-page-title-ie-1860');
            jQuery('.fashion-slider .ether-ctrl-wrap').addClass('fashion-slider-ether-ctrl-wrap-ie-1860');
            jQuery('.view .pager').addClass('pager-ie-1860');
            jQuery('.page-ar-Ù…Ù„ÙØ§Øª-Ø§Ù„Ù…Ø´Ø§Ù‡ÙŠØ± .view .pager').attr('style', 'width: 100%;');
            jQuery('.page-ar-ØµÙˆØ±-ÙˆÙÙŠØ¯ÙŠÙˆ-Ù…Ø´Ø§Ù‡ÙŠØ± .view .pager').attr('style', 'width: 100%;');
            jQuery('.page-ar-Ø­ÙÙ„Ø§Øª-ÙˆÙ…Ù†Ø§Ø³Ø¨Ø§Øª-Ù…Ù†Ø§Ø³Ø¨Ø§Øª .view .pager').attr('style', 'width: 100%;');
            jQuery('.page-ar-ØµÙˆØ±-ÙˆÙÙŠØ¯ÙŠÙˆ-Ù…ÙˆØ¶Ø©-ÙˆØ£Ø²ÙŠØ§Ø¡ .view .pager').attr('style', 'width: 100%;');
            jQuery('.view-celebrity-news .view-header, .view-celebrity-news h1, .search.header-menu-wrapper, #search-page-title, .page-search .pager').addClass('view-header-ie-1860');
            jQuery('.search-grid-container, .search-list-container').addClass('search-grid-container-ie-1860');
            jQuery('.search-list-container .results').addClass('results-ie-1860');

            //inline styles
            jQuery('.fashion-slider .three-0-two-block, .fashion-slider .ether-col').attr('style', 'width: 636px !important;');
            jQuery('.fashion-slider .view-content').attr('style', 'width: 1336px !important;');
            jQuery('.fashion-slider .ether-ctrl-wrap').attr('style', 'width: 1302px !important;');
            jQuery('.responsive.slider-2-rows').attr('style', 'width: 1638px !important;');
            jQuery('.page-ar-Ù…Ø´Ø§Ù‡ÙŠØ±-Ø£Ø®Ø¨Ø§Ø±-Ø§Ù„Ù…Ø´Ø§Ù‡ÙŠØ± .featured-slider .view-content').attr('style', 'width: 1308px !important; margin-right: 10px;');
            jQuery('.page-ar-Ù…ÙˆØ¶Ø©-ÙˆØ£Ø²ÙŠØ§Ø¡-Ù†ØµØ§Ø¦Ø­-Ø§Ù„Ø¬Ù…Ø§Ù„ .fashion-slider .view-content').attr('style', 'width: 1330px !important;');
        }
        if ((jQuery(window).width() > 1024) && (jQuery(window).width() <= 1366)) {
            jQuery('.slider-2-rows.responsive').attr('style', 'width: 970px !important;');
        }
    }
}

function isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPod/i)
                ) {
        return true;
    }
    return false;
}

function sticky_navigation() {

    var is_Album = Drupal.settings.swfalbum;
    if (jQuery('#zone-menu').attr('id')) {
        var menu = jQuery('#zone-menu');
        var pos = menu.offset();
        //var top = pos.top;
        var top = 517;
        if (!jQuery('body').hasClass('page-search')) {
            if (!jQuery('body').hasClass('front')) {

                jQuery('.slider-fix').show();
                jQuery(window).scrollTop(top);


            } 
        }
        if (jQuery('body').hasClass('front')) {
            jQuery('.slider-fix').show();
        }

        jQuery('#region-menu').css({ 'overflow': 'visible' });
        jQuery(window).scroll(function () {

            if (jQuery(this).scrollTop() > top && menu.hasClass('default')) {
                menu.removeClass('default').addClass('fixed').show();
                jQuery('#region-header-first').css('padding-top', '132px');
                //menu.fadeOut(3000,function(){menu.show();});
            }
            else if (jQuery(this).scrollTop() <= top && menu.hasClass('fixed')) {
                menu.removeClass('fixed').addClass('default').show();
                jQuery('#region-header-first').css('padding-top', '35px');
            }
            //for the read more
            if (jQuery(this).scrollTop() > 600) {
                jQuery('.layalina-have-more').hide();

                //jQuery('.layalina-have-more').animate({display:'none'}, 2000);
            }
            windowPostion = jQuery(this).scrollTop();
            //alert(windowPostion);
        });
    }
    if (is_Album) {
        var slider = jQuery('#events-albums-slider');
        jQuery(window).scrollTop(630);
    }
    jQuery('.layalina-have-more').click(function () {
        jQuery("html, body").animate({
            scrollTop: top
        }, 1500);
        //  jQuery(this).hide(); 
        setTimeout(function () {

            jQuery('.layalina-have-more').hide();
            //jQuery(this).hide();
        }, 1500);
    });
}

function sticky_parts() {




    jQuery('#block-block-3').addClass('default');
    jQuery('#block-block-4').addClass('default');

    if (jQuery('body').hasClass('front')) {
        var topSpace = jQuery('#region-postscript-third').offset().top;
        //alert(jQuery(window).height());
        var menu = jQuery('#block-block-3'),
        pos = menu.offset();

        var menu2 = jQuery('#block-block-4'),
        pos2 = menu2.offset();

        jQuery(window).scroll(function () {
            //friends
            if (jQuery(this).scrollTop() > 500 && menu.hasClass('default')) {
                menu.removeClass('default').addClass('fixed2').show();
            }
            else if (jQuery(this).scrollTop() <= 500 && menu.hasClass('fixed2')) {
                menu.removeClass('fixed2').addClass('default').show();
            }

            //go to events


            var movingPoint = jQuery("#block-block-4").offset().top + jQuery("#block-block-4").outerHeight();
            var startPoint = jQuery("#block-system-main-menu").offset().top;

            if (movingPoint >= startPoint) {
                jQuery("#block-block-4").css('opacity', '0');
                jQuery("#block-block-4").css('visibility', 'hidden');
            }
            else {
                jQuery("#block-block-4").css('opacity', '1');
                jQuery("#block-block-4").css('visibility', 'visible');
                if (jQuery(this).scrollTop() > topSpace) {
                    menu2.removeClass('default').removeClass('fixed3').addClass('hidden').show();
                }
                else if (jQuery(this).scrollTop() > 500 && (menu2.hasClass('default') || menu2.hasClass('hidden'))) {
                    menu2.removeClass('default').removeClass('hidden').addClass('fixed3').show();
                }
                else if (jQuery(this).scrollTop() <= 500 && (menu2.hasClass('fixed3') || menu2.hasClass('hidden'))) {
                    menu2.removeClass('fixed3').addClass('default').show();
                }
            }
        });
    }
}

/**fixig the bug where search box does not show any text*/
jQuery(function ($) {
    $('.form-item-search-block-form input[type=text]').blur();
    $('.form-item-search-block-form input[type=text]').attr('title', '');

    $('#block-menu-menu-login li').each(function () {
        $(this).click(function () {
            document.location = $(this).find('a').attr('href');
        });
    });
});

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) {
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}

function eraseCookie(name) {
    setCookie(name, "", -1);
}

function calculateSliderTime() {
    var speed = 0.5;
    var distance = jQuery(".events-container").outerWidth();
    var time = distance / speed;
    return time;
}

function calculateSliderTimeFast() {
    var speed = 3;
    var distance = jQuery(".events-container").outerWidth();
    var time = distance / speed;
    return time;
}

/******************* Events Slider ***************/
jQuery(window).load(function () {


    if (isMobile()) {
        jQuery('.view-slider .flexslider').flexslider("next");
    }
    //article height issue
    jQuery('.article-flexSlide').each(function (i, e) {
        var articleFlexSlideItemsCount = jQuery(e).find('.slides li').length - 1; // in case of reverse 
        var height = jQuery(e).find('.slides li:eq(' + articleFlexSlideItemsCount + ')').find('.slider-image').height() + jQuery(e).find('.slides li:eq(' + articleFlexSlideItemsCount + ')').find('.slide-text').height();
        jQuery(e).find('.flex-viewport').animate({ height: height }, 500);
        jQuery(e).animate({ height: height }, 500);
    });

    //     var x = jQuery(window).height() - 170;
    //    x += 'px'; 
    var is_Album2 = Drupal.settings.swfalbum;

    var count = jQuery(".layalina-article-page-slider .slides li").length;
    var containerHeight = jQuery('.layalina-article-page-slider .slides li:nth-child(' + count + ')').height();
    jQuery('.layalina-article-page-slider .flex-viewport').css('height', containerHeight);

    //responsive
    jQuery(window).resize(function () {

        jQuery('.view-events-slider .view-content').css({
            width: '100%',
            overflow: 'hidden'
        });

        contWidth = jQuery('.events-container').width();
        contLeft = (contWidth - jQuery(window).width() + 80) * -1;
        jQuery('.events-container').css('left', '-80px');

        margin = parseFloat(jQuery(window).width()) - parseFloat(jQuery('.events-container').width()) - 80;

        if (jQuery('body').css('zoom') == '0.75') {
            contLeft = (contWidth - (jQuery(window).width() * 133.3 / 100) + 80) * -1;
            margin = (parseFloat(jQuery(window).width()) * 133.3 / 100) - parseFloat(jQuery('.events-container').width()) - 80;
        }
        //change the images in ipad




    });
    //end responsive

    calculate_width();
    setTimeout(function () {
        calculate_width();
    }, 2000);



    var margin = parseFloat(jQuery(window).width()) - parseFloat(jQuery('.events-container').width()) - 80;

    if (jQuery('body').css('zoom') == '0.75') {
        var margin = (parseFloat(jQuery(window).width()) * 133.3 / 100) - parseFloat(jQuery('.events-container').width()) - 80;
    }

    eventSilderButtons();


    /***************** End of Events Slider ********************************/
    /******** facebook iframe IE fix*********/
    jQuery('.social.aricle-fb iframe').css('background', 'none');
    jQuery('.social iframe').css({ position: 'relative', bottom: '0px', width: '79px' });
    // alert('ddd');
    //socials

    !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = "//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } } (document, "script", "twitter-wjs");

    (function () {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

    //    jQuery('#events-albums-slider').css('height',jQuery(window).height());

    if (window.innerWidth >= 1600 || isMobile()) {
        jQuery('#events-albums-slider').css('height', '670px');
    }


});


function groupedElementSlider() {
    //    jQuery('.grouped-elements-slider .view-content').gridSlider({
    //        cols: 3,
    //        transition: 'slide', 
    //        scroll_axis: 'z', 
    //        scroll_speed: 1000, 
    //        ctrl_pag: true, 
    //        image_stretch_mode: 'x', 
    //        autoplay_enable: false, 
    //        autoplay_interval: 5, 
    //        align: 'center',
    //        ctrl_arrows:true,
    //        ctrl_always_visible:true
    //    });

    jQuery('.grouped-elements-slider .ether-col').each(function (i, e) {
        var child = jQuery(e).children().attr('class');
        jQuery(e).addClass('item-' + child);
    });


    jQuery('.grouped-elements-slider .item-1, .grouped-elements-slider .item-2, .search-grid-container .views-row-1, .search-grid-container .views-row-2').each(function (i, e) {
        if (jQuery(e).find('img:last').attr('src')) {
            var src = jQuery(e).find('img').attr('src');
            var old = src.split('&preset=');
            //check page resolution
            if (jQuery(window).width() >= 1663) {
                src = old[0] + '&preset=x-large';
                jQuery(e).find('img:last').attr('src', src);
                jQuery(e).css('width', '636');
            }
            else {
                src = old[0] + '&preset=medium';
                jQuery(e).find('img:last').attr('src', src);
                jQuery(e).css('width', '302');
            }
        }
    });

    jQuery('.grouped-elements-slider .item-3, .grouped-elements-slider .item-4').each(function (i, e) {
        if (jQuery(e).find('img:last').attr('src')) {
            var src = jQuery(e).find('img:last').attr('src');
            var old = src.split('&w=');
            src = old[0] + '&w=100&q=75&h=100&zc=1';
            jQuery(e).find('img').attr('src', src);
        }
    });
}

function responsiveObjects() {
    //grouped elements slider
    if (jQuery(window).width() >= 1895) {
        jQuery('.responsive-slider').css('width', '1620px');
    }
    else {
        jQuery('.responsive-slider').css('width', '970px');
    }

    //featured area responsive
    if (jQuery('.featured').hasClass('featured')) {
        // jQuery('#block-block-1').addClass('views-row');
        //jQuery('#block-block-1').addClass('three-0-two-block');
        jQuery('.featured').each(function (i, e) {
            if (screen.width < 1680) {
                //jQuery(e).find('.views-row-2').after(jQuery('#block-block-1')); 
                if (!isMobile()) jQuery(e).css('width', '1002px');
                if (!isMobile()) jQuery('#page-title').css('width', '1002px');
                jQuery('#page-title').css('right', '16px');

            }
            else if (jQuery(window).width() <= 1920) {
                if (jQuery(e).find('.views-row').length > 3) {
                    // jQuery(e).find('.views-row-4').after(jQuery('#block-block-1'));
                    jQuery(e).css('width', '1670px');
                    jQuery('#page-title').css('width', '1670px');
                    jQuery('#page-title').css('right', '16px');

                }
                else {
                    // jQuery(e).find('.views-row-2').after(jQuery('#block-block-1')); 
                    jQuery(e).css('width', '1002px');
                    jQuery('#page-title').css('width', '1002px');
                    jQuery('#page-title').css('right', '16px');
                }

            }
            else {
                if (jQuery(e).find('.views-row').length > 3) {
                    //  jQuery(e).find('.views-row-4').after(jQuery('#block-block-1'));
                    jQuery(e).css('width', '1670px');
                    jQuery('#page-title').css('width', '1670px');
                    jQuery('#page-title').css('right', '16px');
                }
                else {
                    //jQuery(e).find('.views-row-2').after(jQuery('#block-block-1')); 
                    jQuery(e).css('width', '1002px');
                    jQuery('#page-title').css('width', '1002px');
                    jQuery('#page-title').css('right', '16px');
                }
            }
        });
    }


    //fashion pages top slider images
    if (jQuery('.fashion-slider').hasClass('fashion-slider')) {
        jQuery('.fashion-slider .ether-col').each(function (i, e) {
            if (jQuery(e).find('img:last').attr('src')) {
                var src = jQuery(e).find('img:last').attr('src');
                var old = src.split('&preset=');
                //check page resolution
                if (jQuery(window).width() >= 1663) {
                    src = old[0] + '&preset=x-large';
                    jQuery(e).find('img:last').attr('src', src);
                    jQuery(e).css('width', '636');
                }
                else {
                    src = old[0] + '&preset=medium';
                    jQuery(e).find('img:last').attr('src', src);
                    jQuery(e).css('width', '302');
                }
            }
        });
    }
}

function lightboxClose() {
    jQuery(document).bind('keydown', function (e) {
        if (e.which == 27) {
            window.parent.jQuery('#lightbox').trigger('click');
        }
    });

    jQuery('.field-name-lite-box-close').click(function () {
        window.parent.jQuery('#lightbox').trigger('click');
    });

}

function activeMenus() {
    // var pathname = decodeURI(window.location.href);
    // alert(pathname);
    if (Drupal.settings.swfmainactive) {
        jQuery('.view-header .menu .first a').addClass('active');
    }
    jQuery('#block-system-main-menu li.first a').addClass('active2');
    var cc = Drupal.settings.swfpage;
    var cc2 = Drupal.settings.swfpage2;
    var cc3 = Drupal.settings.swfpage3;

    jQuery('.expanded ul li a').each(function (index, e) {
        var n = jQuery(this).attr('href').split("/");
        if (n[4] == cc3) {
            //jQuery(this).addClass('active');
        }
    });
    jQuery('.expanded ul li').each(function (index, e) {
        if (jQuery(this).find('a').hasClass('active')) {
            jQuery(this).parent().parent().parent().find('a').addClass('active');

        }
    });
    jQuery('#block-menu-menu-top-main-menu li a').each(function () {
        var n = jQuery(this).attr('href').split("/");
        if (n[3] == 'all') {
            n[3] = cc;
            var url33 = jQuery(this).attr('href');
            jQuery(this).attr('href', url33.replace("/all/", "/" + cc + "/"));
        }
    });
    jQuery('.view-header .menu li a').each(function () {
        var n = jQuery(this).attr('href').split("/")
        if (n[3] == 'all') {
            n[3] = cc;
            var url33 = jQuery(this).attr('href');
            jQuery(this).attr('href', url33.replace("/all/", "/" + cc + "/"));
        }
    });
    var activeLeafMenu = Drupal.settings.swfterms;
    if (activeLeafMenu) {
        //alert(activeLeafMenu);
        jQuery('ul li:nth-child(' + activeLeafMenu + ')').find('a').addClass('active');
    }

}

function mediaShare() {



    jQuery('.share .icon').click(function () {
        //alert('ddd');
        var url = jQuery(this).parent().find('.g-url').html();
        if (!jQuery(this).parent().find('#google-button').length) {

            //jQuery(this).parent().find('#social-go').append('<div id="google-button"><div class="g-plusone" data-size="medium" data-href="'+url+'"></div></div>'); 
            //jQuery(this).parent().find('#social-go').append('<script type="text/javascript">gapi.plusone.go();</script>');  
        }
        jQuery('.flex-control-nav').css('z-index', '-1');
        jQuery('.flex-next').css('z-index', '-1');
        jQuery('.flex-prev').css('z-index', '-1');
        jQuery('.pin-container').css('z-index', '0');
        jQuery('.pin-container').css('opacity', '0');
        jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
        jQuery('.share .container').css('opacity', '0'); //$('').hide();
        jQuery('.share .container').css('filter', 'alpha(opacity=0)');
        jQuery('.share .container').css('z-index', '10');
        jQuery(this).parents('.share').find('.container').css('opacity', '1'); //$('#' + $(this).attr('rel')).show(); 
        jQuery(this).parents('.share').find('.container').css('filter', 'alpha(opacity=100)');
        jQuery(this).parents('.share').find('.container').css('z-index', '504444');
        jQuery('.ether-ctrl-wrap').css('z-index', '0');
    });



    //    jQuery('.share .icon').mouseover(function() {
    //        
    //        var url = jQuery(this).parent().find('.g-url').html();
    //       // alert(url);
    //        if(!jQuery(this).parent().find('#google-button').length){
    //            
    //            //jQuery(this).parent().find('#social-go').html("zaid");
    //            //alert(jQuery(this).parent().find('#social-go').html());
    //           // jQuery(this).parent().find('#social-go').append(' <div id="google-button"><div class="g-plusone" data-size="medium" data-href="'+url+'"></div></div>'); 
    //            //jQuery(this).parent().find('#social-go').append('<script type="text/javascript">gapi.plusone.go();</script>'); 
    //         //   alert('in');
    //        }    
    //		return false;
    //    });


    //    jQuery('.share-media-slider .icon').mouseover(function() {
    //        //jQuery(this).parent().find('#social-go').append('<script type="text/javascript">(function() {var po = document.createElement(\'script\'); po.type = \'text/javascript\'; po.async = true;po.src = \'https://apis.google.com/js/plusone.js\';var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(po, s);})();</script>');  
    //		return false;
    //    }); 

    jQuery('.share .icon').mouseover(function () {
        jQuery('.flex-control-nav').css('z-index', '-1');
        jQuery('.flex-next').css('z-index', '-1');
        jQuery('.flex-prev').css('z-index', '-1');
        jQuery('.pin-container').css('z-index', '0');
        jQuery('.pin-container').css('opacity', '0');
        jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
        jQuery('.share .container').css('opacity', '0'); //$('').hide();
        jQuery('.share .container').css('filter', 'alpha(opacity=0)');
        jQuery('.share .container').css('z-index', '10');
        jQuery(this).parents('.share').find('.container').css('opacity', '1'); //$('#' + $(this).attr('rel')).show(); 
        jQuery(this).parents('.share').find('.container').css('filter', 'alpha(opacity=100)');
        jQuery(this).parents('.share').find('.container').css('z-index', '504444');
        jQuery('.ether-ctrl-wrap').css('z-index', '0');
        return false;
    });

    jQuery('.share .icon').mouseout(function () {
        clearTimeout(hideTooltip2);
        hideTooltip = setTimeout(function () {
            jQuery('.pin-container').css('z-index', '20');
            jQuery('.share .container').css('opacity', '0');
            jQuery('.share .container').css('filter', 'alpha(opacity=0)');
            jQuery('.share .container').css('z-index', '10');
            jQuery('.ether-ctrl-wrap').css('z-index', '20');
            jQuery('.flex-control-nav').css('z-index', '1');
            jQuery('.flex-next').css('z-index', '1');
            jQuery('.flex-prev').css('z-index', '1');
        }, 2500);

        return false;
    });
    jQuery('.share .container').mouseout(function () {
        clearTimeout(hideTooltip);
        hideTooltip2 = setTimeout(function () {
            jQuery('.share .container').css('opacity', '0');
            jQuery('.share .container').css('filter', 'alpha(opacity=0)');
            jQuery('.flex-control-nav').css('z-index', '1');
            jQuery('.flex-next').css('z-index', '1');
            jQuery('.flex-prev').css('z-index', '1');
        }, 2500);
    });

    jQuery('.share .container').mouseover(function () {
        if (hideTooltip) {
            clearTimeout(hideTooltip);
        }

        if (hideTooltip2) {
            clearTimeout(hideTooltip2);
        }
    });

    jQuery('.pin').mouseover(function () {
        jQuery('.share .container').css('opacity', '0');
        jQuery('.share .container').css('filter', 'alpha(opacity=0)');
        jQuery('.share .container').css('z-index', '10');
        jQuery('.pin-container').css('opacity', '0');
        jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
        jQuery(this).next('.pin-container').css('opacity', '1');
        jQuery(this).next('.pin-container').css('filter', 'alpha(opacity=100)');
    });

    jQuery('.pin').mouseout(function () {
        clearTimeout(pinHideTooltip2);
        pinHideTooltip = setTimeout(function () {
            jQuery('.pin-container').css('opacity', '0');
            jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
        }, 1500);
    });

    jQuery('.pin-container').mouseout(function () {
        clearTimeout(pinHideTooltip);
        pinHideTooltip2 = setTimeout(function () {
            jQuery('.pin-container').css('opacity', '0');
            jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
        }, 1500);
    });

    jQuery('.pin-container').mouseover(function () {
        if (pinHideTooltip) {
            clearTimeout(pinHideTooltip);
        }

        if (pinHideTooltip2) {
            clearTimeout(pinHideTooltip2);
        }
    });

    jQuery('.thumbs').hover(
        function () {
            jQuery('.share .container').css('opacity', '0');
            jQuery('.share .container').css('filter', 'alpha(opacity=0)');
            jQuery('.share .container').css('z-index', '10');
            jQuery('.pin-container').css('opacity', '0');
            jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
            var like = jQuery(this).find('a.ajax-rate').attr('title');
            jQuery('.thumbs-num').css('opacity', '0');
            jQuery('.thumbs-num').css('filter', 'alpha(opacity=0)');
            jQuery(this).next('.thumbs-num').css('opacity', '1');
            jQuery(this).next('.thumbs-num').css('filter', 'alpha(opacity=100)');
            jQuery(this).next('.thumbs-num').html(like);
        },
        function () {
            jQuery('.thumbs-num').css('opacity', '0');
            jQuery('.thumbs-num').css('filter', 'alpha(opacity=0)');
        }
        );

    jQuery('.thumbs-num').hover(
        function () {
            jQuery('.share .container').css('opacity', '0');
            jQuery('.share .container').css('filter', 'alpha(opacity=0)');
            jQuery('.share .container').css('z-index', '10');
            jQuery('.pin-container').css('opacity', '0');
            jQuery('.pin-container').css('filter', 'alpha(opacity=0)');
            var like = jQuery(this).prev('.thumbs').find('a.ajax-rate').attr('title');
            jQuery('.thumbs-num').css('opacity', '0');
            jQuery('.thumbs-num').css('filter', 'alpha(opacity=0)');
            jQuery(this).css('opacity', '1');
            jQuery(this).css('filter', 'alpha(opacity=100)');
            jQuery(this).html(like);
        },
        function () {
            jQuery('.thumbs-num').css('opacity', '0');
            jQuery('.thumbs-num').css('filter', 'alpha(opacity=0)');
        }
        );
}

function searchBoxes() {
    jQuery('#edit-search-block-form--4').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª");
    jQuery('#edit-events-text').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª");
    jQuery('#edit-events-text--2').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª");

    jQuery('#region-menu #block-layalina-solr-custom-search-layalina-site-search-form .form-text').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ù„ÙŠØ§Ù„ÙŠÙ†Ø§");
    jQuery('#edit-fashion-text').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ù…ÙˆØ¶Ø© ÙˆØ£Ø²ÙŠØ§Ø¡");

    jQuery('#edit-celebrity-profile-text, #edit-celebrity-text').attr("value", "Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†");
    jQuery('#edit-search-block-form--6').attr("value", "Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†");
    jQuery('.celebrity-landing-page .view-layalina-celebrities .view-header .form-text').attr("value", "Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†");
    jQuery('.view-id-events_landing_page #region-menu #block-layalina-solr-custom-search-layalina-site-search-form .form-text').attr("value", "Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ù…Ø´Ø§Ù‡ÙŠØ±");

    jQuery('.page-ar-Ø£Ø®Ø¨Ø§Ø±-Ù…ØµÙ…Ù…Ùˆ-Ø§Ù„Ø§Ø²ÙŠØ§Ø¡ .search-form #edit-fd-text').attr("value", "Ø§Ø¨Ø­Ø« ÙÙŠ Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡")



    jQuery('#username').focus(function () {
        jQuery(this).attr('value', '');

    });
    jQuery('#username').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø¥Ø³Ù… Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…');
            return false;
        }
    });

    jQuery('.page-ar-Ø£Ø®Ø¨Ø§Ø±-Ù…ØµÙ…Ù…Ùˆ-Ø§Ù„Ø§Ø²ÙŠØ§Ø¡ .search-form #edit-fd-text').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('.page-ar-Ø£Ø®Ø¨Ø§Ø±-Ù…ØµÙ…Ù…Ùˆ-Ø§Ù„Ø§Ø²ÙŠØ§Ø¡ .search-form #edit-fd-text').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡');
        }
    });

    jQuery('#edit-search-block-form--4').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('#edit-search-block-form--4').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª');
            return false;
        }
    });
    jQuery('#edit-events-text').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('#edit-events-text').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª');
            return false;
        }
    });
    jQuery('#edit-events-text--2').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('#edit-events-text--2').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª');
            return false;
        }
    });
    jQuery('#edit-fashion-text').focus(function () {

        jQuery(this).attr('value', '');

    });

    jQuery('#edit-fashion-text').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', "Ø§Ø¨Ø­Ø« ÙÙŠ Ù…ÙˆØ¶Ø© ÙˆØ£Ø²ÙŠØ§Ø¡");
            return false;
        }
    });
    jQuery('#edit-celebrity-text').focus(function () {

        jQuery(this).attr('value', '');

    });

    jQuery('#edit-celebrity-profile-text, #edit-celebrity-text').focus(function () {
        if (jQuery(this).attr('value') == "Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†") {
            jQuery(this).attr('value', '');
        }
    }).blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', "Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†");
            return false;
        }
    });

    /*************************************/
    jQuery('.view-id-events_landing_page #region-menu #block-layalina-solr-custom-search-layalina-site-search-form .form-text').focus(function () {
        if (jQuery(this).attr('value') == "Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ù…Ø´Ø§Ù‡ÙŠØ±") {
            jQuery(this).attr('value', '');
        }
    }).blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', "Ø§Ø¨Ø­Ø« Ø¹Ù† Ø§Ù„Ù…Ø´Ø§Ù‡ÙŠØ±");
            return false;
        }
    });

    /*************************************/
    jQuery('#region-menu #block-layalina-solr-custom-search-layalina-site-search-form .form-text').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« ÙÙŠ Ù„ÙŠØ§Ù„ÙŠÙ†Ø§') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('#region-menu #block-layalina-solr-custom-search-layalina-site-search-form .form-text').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« ÙÙŠ Ù„ÙŠØ§Ù„ÙŠÙ†Ø§');
            return false;
        }
    });

    /*************************************/
    jQuery('#edit-search-block-form--6').focus(function () {
        if (jQuery(this).attr('value') == 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†') {
            jQuery(this).attr('value', '');
        }
    });

    jQuery('#edit-search-block-form--6').blur(function () {
        if (jQuery(this).attr('value') == '') {
            jQuery(this).attr('value', 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…Ø´Ø§Ù‡ÙŠØ±ØŒ Ù†Ø¬ÙˆÙ…ØŒ ÙÙ†Ø§Ù†ÙŠÙ†');
            return false;
        }
    });

    //search page selected filters
    if (jQuery('body').hasClass('page-custom-search')) {
        var url = window.location.href;
        url = url.split('?filter=');
        var filter = url[1];
        if (filter) {
            jQuery('#search-season-exposed span').text(jQuery('#search-season-exposed li a[value="' + filter + '"]').text());
        }
        else {
            var url = window.location.href;
            url = url.split('?ctype=');
            var filter = url[1];
            if (filter) {
                jQuery('#search-season-exposed span').text(jQuery('#search-season-exposed li a[value="' + filter + '"]').text());
            }
        }

        jQuery('.view-header #layalina-solr-custom-site-form #edit-site-text').val(Drupal.settings.swfpage3);
    }
}

function socialFollow() {
    jQuery('.follow-image').hover(function () {
        jQuery(this).parent().find('.follow-social').css('display', 'block');
    });
    jQuery('.follow-image').mouseleave(function () {
        jQuery(this).parent().find('.follow-social').css('display', 'none');

    });

    jQuery('body').click(function () {
        jQuery('.follow-social').css('display', 'none');
    });
}

function transformDropdowns() {

    jQuery(".events-container .views-row").livequery(function () {
        Lightbox.initList();
        //alert('sd');
    });
    jQuery(".events-container").livequery(function () {
        Lightbox.initList();
        //alert('sd');
    });


    jQuery('.layalina-article-page .node-webform .form-select').each(function (i, e) {
        jQuery(e).find('option:eq(0)').text(jQuery(e).parents('.form-item').find('label').text());
    });

    jQuery('.layalina-article-page .node-webform .form-select.day').find('option:eq(0)').text('Ø§Ù„ÙŠÙˆÙ…');
    jQuery('.layalina-article-page .node-webform .form-select.month').find('option:eq(0)').text('Ø§Ù„Ø´Ù‡Ø±');
    jQuery('.layalina-article-page .node-webform .form-select.year').find('option:eq(0)').text('Ø§Ù„Ø³Ù†Ø©');

    jQuery('.layalina-article-page .node-webform #edit-submitted-event-info-date-and-time-time-hour').find('option:eq(0)').text('Ø§Ù„Ø³Ø§Ø¹Ø©');
    jQuery('.layalina-article-page .node-webform #edit-submitted-event-info-date-and-time-time-minute').find('option:eq(0)').text('Ø§Ù„Ø¯Ù‚ÙŠÙ‚Ø©');




    jQuery("#edit-submitted-city-and-country").livequery(function () {
        jQuery('#edit-submitted-city-and-country option:first').html('Ø§Ù„Ø¨Ù„Ø¯');
        jQuery('#edit-submitted-city-and-country').jqTransSelect({});
    });

    jQuery('#edit-submitted-event-info-time-hour').jqTransSelect({});
    jQuery('#edit-submitted-event-info-time-minute').jqTransSelect({});
    jQuery('#edit-submitted-event-info-best-time-to-call-for-confirmation-hour').jqTransSelect({});
    jQuery('#edit-submitted-event-info-best-time-to-call-for-confirmation-minute').jqTransSelect({});
    jQuery('#edit-submitted-event-info-event-types').jqTransSelect({});

    jQuery('.layalina-article-page .form-select').jqTransSelect({});




    jQuery('.exposed-a').click(function () {
        jQuery('.exposed-filter ul').hide();
        jQuery(this).parent().parent().find('ul').show();
        return false;
    });
    jQuery('.region-inner').click(function () {
        jQuery('.exposed-filter ul').hide();
    });


    //error messages
    jQuery('select').livequery(function () {
        jQuery('select').each(function (i, e) {
            if (jQuery(e).hasClass('error') && jQuery(e).parents('.jqTransformSelectWrapper').attr('class')) {
                jQuery(e).parents('.jqTransformSelectWrapper').find('span').css('border', '2px solid red');
                jQuery(e).parents('.jqTransformSelectWrapper').find('span').css('border-left', 'none');
                jQuery(e).parents('.jqTransformSelectWrapper').find('.jqTransformSelectOpen').css('border', '2px solid red');
                jQuery(e).parents('.jqTransformSelectWrapper').find('.jqTransformSelectOpen').css('border-right', '1px solid #ccc');
            }
        });
    });

    jQuery('select').each(function (i, e) {
        if (jQuery(e).hasClass('error') && jQuery(e).parents('.jqTransformSelectWrapper').attr('class')) {
            jQuery(e).parents('.jqTransformSelectWrapper').find('span').css('border', '2px solid #9E1F63');
            jQuery(e).parents('.jqTransformSelectWrapper').find('span').css('border-left', 'none');
            jQuery(e).parents('.jqTransformSelectWrapper').find('.jqTransformSelectOpen').css('border', '2px solid #9E1F63');
            jQuery(e).parents('.jqTransformSelectWrapper').find('.jqTransformSelectOpen').css('border-right', '1px solid #ccc');
        }
    });

    jQuery('body').click(function () {
        //alert('sss');
        jQuery('.jqTransformSelectWrapper ul').hide();
    });
}

function extendedFooter() {
    jQuery('#block-menu-menu-menu-footer ul.menu li.first a').attr("href", "javascript:void(0)");
    jQuery('#block-menu-menu-menu-footer ul.menu li.first a').click(function () {
        var blockHeight = jQuery('#region-footer-second').height();
        var expanded = jQuery('#block-layalina-misc-layalina-site-map').height() + jQuery('#block-block-8').height() + jQuery('#block-block-7').height() + 154;

        if (blockHeight > 115) {
            jQuery('#block-layalina-misc-layalina-site-map, #block-block-8, #block-block-7').slideUp();
            jQuery('#region-footer-second').animate({
                height: "115px"
            });
        } else {
            jQuery('#block-layalina-misc-layalina-site-map, #block-block-8, #block-block-7').slideDown();
            jQuery('#region-footer-second').animate({
                height: expanded
            });
            jQuery("html, body").animate({
                scrollTop: jQuery(document).height()
            }, "slow");
        }
    });

    jQuery('#block-menu-menu-participation-links .first a').click(function () {
        jQuery('#node-webform-3876').fadeIn();
        jQuery('#node-webform-3881').fadeOut();
        return false;
    });

    jQuery('#block-menu-menu-participation-links .last a').click(function () {
        jQuery('#node-webform-3881').fadeIn();
        jQuery('#node-webform-3876').fadeOut();
        return false;
    });

    jQuery(document).bind('mouseup', function (e) {
        var container = jQuery("#node-webform-3881");
        var container2 = jQuery("#node-webform-3876");

        if (container.has(e.target).length === 0) {
            container.fadeOut();
        }
        if (container2.has(e.target).length === 0) {
            container2.fadeOut();
        }
    });
}

function scrollEvents() {
    jQuery('#block-block-4').click(function () {
        if (jQuery(this).hasClass('default')) {
            jQuery("html, body").animate({
                scrollTop: jQuery("#block-system-main-menu").offset().top - 180
            }, 'slow');
        }
        else {
            jQuery("html, body").animate({
                scrollTop: jQuery("#block-system-main-menu").offset().top - 90
            }, 'slow');
        }

    });
}

function misc() {

    var remove_active = Drupal.settings.swfactive;
    var add_active = Drupal.settings.swfactive1;
    if (remove_active == 'remove') {
        jQuery('#menu-item-custom-id-1 a').removeClass('active');
    }
    if (add_active == '2') {
        jQuery('#menu-item-custom-id-2 a').addClass('active');
    }
    if (add_active == '3') {
        jQuery('#menu-item-custom-id-3 a').addClass('active');
    }
    jQuery('#zone-menu').addClass('default');

    jQuery('.view-slider .view-content').click(function () {
        stopslider = 1;
    });

    jQuery('.events-wrapper-1 .views-row , .events-wrapper-2 .views-row').click(function () {
        jQuery(this).find('.lightbox-processed').trigger('click');
    });

    jQuery("#block-menu-menu-top-main-menu ul.menu:first").append('<img src="' + Drupal.settings.basePath + 'sites/all/themes/layalina/images/main_menu_separator.png" />');
}

function slider302() {
    //    jQuery(".slider .view-content").livequery(function(){
    //    jQuery('.slider .view-content').gridSlider({
    //        cols: 5,
    //        rows: 1,
    //        col_spacing_size: 2, 
    //        scroll_speed: 1000, 
    //        transition: 'slide', 
    //        scroll_axis: 'z', 
    //        ctrl_pag: true, 
    //        image_stretch_mode: 'x', 
    //        autoplay_enable: false, 
    //        autoplay_interval: 5, 
    //        align: 'center',
    //        ctrl_arrows:true,
    //        ctrl_always_visible:true
    //
    //    });
    //    });
    //    
    //    jQuery('.slider-2-rows .view-content').gridSlider({
    //        cols: 4,
    //        rows: 2,
    //        col_spacing_size: 2, 
    //        transition: 'slide', 
    //        scroll_axis: 'z', 
    //        scroll_speed: 1000, 
    //        ctrl_pag: true, 
    //        image_stretch_mode: 'x', 
    //        autoplay_enable: false, 
    //        autoplay_interval: 5, 
    //        align: 'center',
    //        ctrl_arrows:true,
    //        ctrl_always_visible:true
    //
    //    });
}

function albumSlider() {
    var MaxHeight = (screen.height) - 350;
    jQuery('.layalina-gallery').height((screen.height) - 150);

    jQuery('#main-image img').each(function (i, e) {
        jQuery(this).attr('src', (jQuery(this).attr('src').toString().replace('403', MaxHeight)));
    })

    jQuery(window).resize(function () {
        jQuery('.layalina-gallery').height((screen.height) - 150);
        var MaxHeightNew = (screen.height) - 450;
        jQuery('#main-image img').each(function (i, e) {
            jQuery(this).attr('src', (jQuery(this).attr('src').toString().replace(MaxHeight, MaxHeightNew)));
        })
        MaxHeight = MaxHeightNew;
    });
}

function lis_alt() {
    jQuery('li a').each(function (i, e) {
        if (!jQuery(e).parents('.view-slider').attr('class') && !jQuery(e).parents('.flexslider').attr('class')) {
            jQuery(e).attr('alt', jQuery(e).attr('title'));
            jQuery(e).attr('title', '');
        }

        if (jQuery(e).parents('#block-menu-menu-menu-top-main-menu').attr('id')) {
            jQuery(e).attr('title', jQuery(e).text());
        }
    });
}

function media_mac() {
    // 

    if (screen.width >= 1680) {
        if (jQuery.browser.msie) {
            fix_media();
        }
        if (navigator.userAgent.indexOf('Mac') > 0 && navigator.userAgent.indexOf('Firefox') > 0) {
            fix_media();
        }
        if (navigator.userAgent.indexOf('Mac') > 0 && navigator.userAgent.indexOf('Chrome') > 0) {
            fix_media();
        }
        if (navigator.userAgent.indexOf('Mac') > 0 && navigator.userAgent.indexOf('Safari') > 0) {
            fix_media();
        }

        jQuery('.listing.responsive, .view-layalina-default-sections .view-content, .view-celebrity-news .view-content, .view-celebrity-news #page-title, .search-grid-container, .search-list-container, .flexSlide, .grouped-flex, .featured-flex-slider, .celebs-flex-slider').css('width', '1670px'); ;
        jQuery('.view-celebrity-news .view-header, .search.header-menu-wrapper, #search-page-title, .page-search .pager, .view .pager').css('width', '1638px');
        jQuery('.search-grid-container .results, .featured-flex-slider .view-content, .celebs-flex-slider .view-content').css('width', '1336px');
        jQuery('.view-id-node.view-display-id-page_2 .events-lightbox-slider .flex-caption').css('width', '1000px');
        jQuery('.header-menu-wrapper, .flex-control-nav, .view-layalina-default-sections h1.purple, .view-layalina-default-sections .view-empty').css('width', '1638px');
        jQuery('.grouped-flex .three-0-two-block.item-1, .grouped-flex .three-0-two-block.item-2, .featured-flex-slider .flexslider li.three-0-two-block').css('width', '636px');
        jQuery('.view-celebrity-news .view-header, .view-celebrity-news h1, .view-id-fashion.view-display-id-page_2 #page-title, .view-id-fashion.view-display-id-page_3 #page-title').css('width', '1638px');
        jQuery('.view-id-celebrity_news.view-display-id-page_7 #page-title').css('right', '0');


        //       ie8 fixes
        jQuery('.featured-flex-slider .flex-control-nav, .celebs-flex-slider .flex-control-nav').each(function (i, e) {
            var elementStyle = jQuery(e).attr('style');
            elementStyle += '; width:1306px !important;';
            console.log(elementStyle);
            jQuery(e).attr('style', elementStyle);
        });
    }
    else {
        jQuery('.listing.responsive').css('width', '1002px');
        jQuery('.listing.responsive .header-menu-wrapper').css('width', '970px');
    }
}

function fix_media() {
    jQuery('.grouped-elements-slider .ether-col').css('width', '636px');
    jQuery('.grouped-elements-slider').css('width', '1620px');
    jQuery('.fashion-slider').css('width', '1668px');
    jQuery('fashion-slider .view-content').css('width', '1336px');
    jQuery('.fashion-slider .three-0-two-block').css('width', '636px');
    jQuery('.fashion-slider .ether-col').css('width', '636px');
    jQuery('.listing.responsive').css('width', '1670px');
    jQuery('.listing.responsive .header-menu-wrapper').css('width', '1638px');
    jQuery('.search-grid-container').css('width', '1670px');
    jQuery('.search-list-container').css('width', '1670px');
    jQuery('.search-grid-container .results').css('width', '1336px');
    jQuery('.view-celebrity-news .view-header, .search.header-menu-wrapper, #search-page-title, .page-search .pager').css('width', '1638px');
    jQuery('.view-id-node.view-display-id-page_2 .events-lightbox-slider .flex-caption').css('width', '1000px');
}

//(function() {
//    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
//    po.src = 'https://apis.google.com/js/plusone.js';
//    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
//  })();

function ajaxFilters() {
    //    jQuery('#horscope-exposed li').click(function(){
    //     horosope = jQuery(this).attr('class');
    //     var second_Filter = 'all';
    //     if (second_Filter == 'Ø§Ù„Ù…ØµÙ…Ù…'){
    //     second_Filter = 'all';}
    //     second_Filter = encodeURIComponent(second_Filter);
    //     var url = Drupal.settings.basePath + 'getcelebrities/'+second_Filter+'/'+horosope;
    //     jQuery.ajax({
    //        url: url,
    //        cache: false,
    //        type: 'GET',
    //        success: function(data) {
    //            jQuery('.block-main.block-system-main .content .view').remove();
    //            jQuery('.block-main.block-system-main .content').append(data);
    //        }
    //   })
    //   jQuery(this).parent().parent().find('span').html(jQuery(this).html());    
    //  });


    jQuery('#season-exposed li').click(function () {
        season = jQuery(this).attr('name');
        var second_Filter = jQuery('#cname-exposed span').attr('name');
        /* if (second_Filter == 'Ø§Ù„Ù…ØµÙ…Ù…'){
        second_Filter = 'all';
        }
        if (second_Filter == 'Ø§Ù„ÙƒÙ„'){
        second_Filter = 'all';
        }*/
        //second_Filter = second_Filter.replace(' ','-');
        //alert(second_Filter);
        second_Filter = encodeURIComponent(second_Filter);
        season = encodeURIComponent(season);
        var url = Drupal.settings.basePath + 'getdesigners/' + second_Filter + '/' + season;
        jQuery.ajax({
            url: url,
            cache: false,
            type: 'GET',
            success: function (data) {
                jQuery('.view-display-id-block_4 .view-content').remove();
                jQuery('.view-display-id-block_4 .noresults-content').remove();
                jQuery('.view-display-id-block_4').append(data);
            }
        })
        jQuery(this).parent().parent().find('span').html(jQuery(this).html());
        jQuery(this).parent().parent().find('span').attr('name', (jQuery(this).attr('name')));
    });

    jQuery('#cname-exposed li').click(function () {
        var filter = jQuery(this).attr('name');
        /*if(filter == 'Ø§Ù„ÙƒÙ„'){
        filter = 'all';
        }*/
        filter = encodeURIComponent(filter);
        var url = Drupal.settings.basePath + 'getdesigners/' + filter + '/' + season;
        jQuery.ajax({
            url: url,
            cache: false,
            type: 'GET',
            success: function (data) {
                jQuery('.view-display-id-block_4 .view-content').remove();
                jQuery('.view-display-id-block_4 .noresults-content').remove();
                jQuery('.view-display-id-block_4').append(data);
            }
        })
        jQuery(this).parent().parent().find('span').html(jQuery(this).html());
        jQuery(this).parent().parent().find('span').attr('name', (jQuery(this).attr('name')));
    });
}

function newsLetters_validation() {
    //weekly news
    jQuery('#node-webform-407 .form-submit').click(function () {
        var errors = 0;
        jQuery('.val-error').removeClass('val-error');
        jQuery('.form-text').attr('title', '');
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

        if (jQuery('#edit-submitted-full-name').val() == '' || jQuery("#edit-submitted-full-name").val().length > 50) {
            jQuery('#edit-submitted-full-name').addClass('val-error');
            jQuery('#edit-submitted-full-name').attr('title', 'Please enter your full name');
            errors++;
        }

        if (!pattern.test(jQuery('#edit-submitted-email-adress').val())) {
            jQuery('#edit-submitted-email-adress').addClass('val-error');
            jQuery('#edit-submitted-email-adress').attr('title', 'Please enter a valid email address');
            errors++;
        }

        if (errors > 0) {
            return false;
        }
    });


    //monthly magazine
    jQuery('#node-webform-2 .form-submit').click(function () {
        var errors = 0;
        jQuery('.val-error').removeClass('val-error');
        jQuery('.val-error-drop').removeClass('val-error-drop');
        jQuery('.form-text').attr('title', '');
        jQuery('#webform-component-city-and-country .jqTransformSelectWrapper span').attr('title', '');
        jQuery('#webform-component-city-and-country .jqTransformSelectWrapper a:first').attr('title', '');
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

        if (jQuery('#edit-submitted-full-name--2').val() == '' || jQuery("#edit-submitted-full-name--2").val().length > 50) {
            jQuery('#edit-submitted-full-name--2').addClass('val-error');
            jQuery('#edit-submitted-full-name--2').attr('title', 'Please enter your full name');
            errors++;
        }


        if (!pattern.test(jQuery('#edit-submitted-email-adress--2').val())) {
            jQuery('#edit-submitted-email-adress--2').addClass('val-error');
            jQuery('#edit-submitted-email-adress--2').attr('title', 'Please enter a valid email address');
            errors++;
        }

        if (jQuery('#edit-submitted-phone-number').val() == '') {
            jQuery('#edit-submitted-phone-number').addClass('val-error');
            jQuery('#edit-submitted-phone-number').attr('title', 'Please enter a valid phone number');
            errors++;
        }
        else {
            var regn = /^[0-9]+$/;
            if (regn.test(jQuery('#edit-submitted-phone-number').val()) == false) {
                jQuery('#edit-submitted-phone-number').addClass('val-error');
                jQuery('#edit-submitted-phone-number').attr('title', 'Please enter a valid phone number');
                errors++;
            }
        }

        if (jQuery('#webform-component-city-and-country .jqTransformSelectWrapper span').html() == 'Ø§Ù„Ø¨Ù„Ø¯') {
            jQuery('#webform-component-city-and-country .jqTransformSelectWrapper span').addClass('val-error-drop');
            jQuery('#webform-component-city-and-country .jqTransformSelectWrapper a:first').addClass('val-error-drop');

            jQuery('#webform-component-city-and-country .jqTransformSelectWrapper span').attr('title', 'Please select a country');
            jQuery('#webform-component-city-and-country .jqTransformSelectWrapper a:first').attr('title', 'Please select a country');
        }

        if (errors > 0) {
            return false;
        }
    });


    //events webform dates validation
    jQuery('.view-id-node.view-display-id-page_1 .node-webform #edit-submit').click(function () {

        var month = jQuery('.form-item-submitted-event-info-date-and-time-date-month span').text();
        var day = jQuery('.form-item-submitted-event-info-date-and-time-date-day span').text();
        var year = parseInt(jQuery('.form-item-submitted-event-info-date-and-time-date-year span').text());
        var day_err = 0;
        var thirties = ["Ø£Ø¨Ø±ÙŠÙ„", "ÙŠÙˆÙ†ÙŠÙˆ", "Ø³Ø¨ØªÙ…Ø¨Ø±", "Ù†ÙˆÙÙ…Ø¨Ø±"];
        var thirtyOnes = ["ÙŠÙ†Ø§ÙŠØ±", "Ù…Ø§Ø±Ø³", "Ù…Ø§ÙŠÙˆ", "ÙŠÙˆÙ„ÙŠÙˆ", "Ø£ØºØ³Ø·Ø³", "Ø£ÙƒØªÙˆØ¨Ø±", "Ø¯ÙŠØ³Ù…Ø¨Ø±"];
        if (month == 'ÙØ¨Ø±Ø§ÙŠØ±') {
            if (year % 4 == 0) {
                if (day > 29) {
                    day_err = 1;
                }
            } else {
                if (day > 28) {
                    day_err = 1;
                }
            }
        }
        else {
            if (jQuery.inArray(month, thirties) > -1) {
                if (day > 30) {
                    day_err = 1;
                }
            }

        }
        if (day_err) {
            jQuery('.form-item-submitted-event-info-date-and-time-date-day').find('span').css('border', '2px solid red');
            jQuery('.form-item-submitted-event-info-date-and-time-date-day').find('span').css('border-left', 'none');
            jQuery('.form-item-submitted-event-info-date-and-time-date-day').find('.jqTransformSelectOpen').css('border', '2px solid red');
            jQuery('.form-item-submitted-event-info-date-and-time-date-day').find('.jqTransformSelectOpen').css('border-right', '1px solid #ccc');
            //alert('error');
            return false;
        }
        // return false;
    });

    //terms and conditions validation
    if (jQuery('#webform-component-terms .form-checkbox').hasClass('error')) {
        jQuery('#webform-component-validation').show();
    }
}

function resizeIframe() {
    if (document.getElementById('ifm')) {
        var height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        height -= pageY(document.getElementById('ifm')) + buffer;
        height = (height < 0) ? 0 : height;
        document.getElementById('ifm').style.height = height + 'px';
    }
}

function events_filteration() {
    jQuery('.block-main-menu .menu li a').click(function () {
        // var index2 =  jQuery('.block-main-menu .menu').index(jQuery(this));
        var e = jQuery(this).parent().parent();
        //alert(e.index()); 
        jQuery('#country-exposed.events').find('ul').slideUp();
        pager = 1;
        jQuery('.block-main-menu .menu li a').removeClass('active2');
        jQuery(this).addClass('active2');
        filter1 = e.index();
        //filter1 = filter1.replace(" ","-");
        //filter1 = encodeURIComponent(filter1);
        events_filteration_ajax(filter1, filter2);
        return false;
    });

    jQuery('.exposed-filter.events li').click(function () {
        //filter1 = encodeURIComponent(filter1);
        jQuery('#country-exposed.events').find('ul').slideUp();
        pager = 1;
        //        if(jQuery(this).attr('class')){
        //            filter2 = jQuery(this).html();
        //        filter2 = filter2.replace(" ","-");
        //        }
        //        else{
        //            filter2 = 'all';
        //        }
        filter2 = jQuery(this).attr('class');
        jQuery('.exposed-filter.events span').html(jQuery(this).html());
        events_filteration_ajax(filter1, filter2);
        return false;
    });
}

function events_filteration_ajax(filter1, filter2) {
    var url = Drupal.settings.basePath + 'getcelebrities/' + filter1 + '/' + filter2;
    jQuery.ajax({
        url: url,
        cache: false,
        type: 'GET',
        success: function (data) {
            jQuery('.block-views-front-front-events .content .view').remove();
            jQuery('.block-views-front-front-events .content').append(data);

            calculate_width();
            setTimeout(function () {
                calculate_width();
            }, 2000);

            margin = parseFloat(jQuery(window).width()) - parseFloat(jQuery('.events-container').width()) - 80;

            eventSilderButtons();
            // Lightbox.initList();

            jQuery('.events-wrapper-1 .views-row , .events-wrapper-2 .views-row').click(function () {
                jQuery(this).find('.lightbox-processed').trigger('click');
            });

            moveEventAdd();
        }
    })


}

function eventSilderButtons() {
    jQuery('.nextEvent').mouseenter(function () {
        if (!isMobile()) {
            getMore();
        }
    }).mouseleave(function () {
        if (!isMobile()) {
            jQuery('.events-container').stop(true);
        }
    });

    jQuery('.nextEvent').click(function () {
        if (isMobile()) {
            var newScroll = jQuery('.events-container').scrollLeft() - 400;
            jQuery('.events-container').animate({
                scrollLeft: newScroll
            }, 1000
						);

            return;

        } else {
            jQuery('.events-container').stop(true);
            getMoreFast();
        }
    });

    jQuery('.prevEvent').mouseenter(function () {
        if (!isMobile()) {
            var time = calculateSliderTime();
            jQuery('.events-container').animate({
                left: -80
            }, time);
        }
    }).mouseleave(function () {
        if (!isMobile()) {
            jQuery('.events-container').stop(true);
        }
    });

    jQuery('.prevEvent').click(function () {
        if (isMobile()) {

            var newScroll = jQuery('.events-container').scrollLeft() + 400;
            jQuery('.events-container').animate({
                scrollLeft: newScroll
            }, 1000
                    );
            return;
        }
        else {
            var time = calculateSliderTimeFast();
            jQuery('.events-container').stop(true);
            jQuery('.events-container').animate({
                left: -80,
                easing: 'linear'
            }, time);
        }
    });
}

function searchFixes() {
    if (jQuery('.search-results').attr('class')) {
        jQuery('.search.header-menu-wrapper').prepend(jQuery('form#search-form'));

        if (jQuery('.spelling-suggestions').attr('class')) {
            jQuery('.search.header-menu-wrapper .search-list').after(jQuery('.spelling-suggestions'));
            jQuery('.spelling-suggestions').show();
        }
    }
}


//function ip_targeting(){
//    var country = get_cookie('country_name');
//    if(country){
//        country = country.toLowerCase();
//        country = country.replace(' ','-');
//        var country_string = jQuery('#filter_'+country).html();
//        country = jQuery('#filter_'+country).attr('class');
//        filter1 = 0;
//        filter2 = country;
//        if(country){
//        events_filteration_ajax(filter1,filter2);
//        jQuery('#block-layalina-misc-layalina-events-cities span').html(country_string);
//        }               
//    }   
//}

function lazy_load() {
    var time = new Date().getTime();
    //  alert(time);
    //jQuery('.events-slider-loading').animate({opacity:"toggle"},"fast");
    jQuery('.events-slider-loading').fadeIn("fast");
    var url = Drupal.settings.basePath + 'lazyload/' + pager + '/' + filter1 + '/' + filter2 + '?_=' + time;
    if (pager < 10) {
        jQuery.getJSON(url, function (data) {
            var widthCounter = 0;
            jQuery.each(data, function (index, value) {
                widthCounter++;
                if (index % 2 == 0) {
                    //add in the first row
                    if (isMobile()) {
                        jQuery('.events-wrapper-1').append('<div class="views-row"><div class="views-field views-field-ss-field-image"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" ><img src="' + value.ss_field_image + '"></a></span></div><div class="views-field views-field-label shaded"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" >' + value.label + '</a></span></div><div class="views-field views-field-nothing"><span class="field-content">Ø´Ø§Ù‡Ø¯ ÙƒÙ„ Ø§Ù„ØµÙˆØ± &gt;</span></div>  </div>');
                    } else {
                        jQuery('.events-wrapper-1').append('<div class="views-row"><div class="views-field views-field-ss-field-image"><span class="field-content"><img src="' + value.ss_field_image + '"></span></div><div class="views-field views-field-label shaded"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" rel="lightframe[|width:976px; height:671px; scrolling: no;]">' + value.label + '</a></span></div><div class="views-field views-field-nothing"><span class="field-content">Ø´Ø§Ù‡Ø¯ ÙƒÙ„ Ø§Ù„ØµÙˆØ± &gt;</span></div>  </div>');
                    }

                }
                else {
                    //add in the second row
                    if (isMobile()) {
                        jQuery('.events-wrapper-2').append('<div class="views-row"><div class="views-field views-field-ss-field-image"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" ><img src="' + value.ss_field_image + '"></a></span></div><div class="views-field views-field-label shaded"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" >' + value.label + '</a></span></div><div class="views-field views-field-nothing"><span class="field-content">Ø´Ø§Ù‡Ø¯ ÙƒÙ„ Ø§Ù„ØµÙˆØ± &gt;</span></div>  </div>');
                    }
                    else {
                        jQuery('.events-wrapper-2').append('<div class="views-row"><div class="views-field views-field-ss-field-image"><span class="field-content"><img src="' + value.ss_field_image + '"></span></div><div class="views-field views-field-label shaded"><span class="field-content"><a href="' + Drupal.settings.basePath + 'ar/event-album/' + value.entity_id + '" rel="lightframe[|width:976px; height:671px; scrolling: no;]">' + value.label + '</a></span></div><div class="views-field views-field-nothing"><span class="field-content">Ø´Ø§Ù‡Ø¯ ÙƒÙ„ Ø§Ù„ØµÙˆØ± &gt;</span></div>  </div>');
                    }

                }





            });
            // alert(widthCounter);
            // jQuery('.events-container').refresh();

            if (data.length > 0) {

                var lastWidth = (widthCounter / 16) * 2320;
                var width = pager * 2320 + lastWidth + 190;
                // alert(lastWidth);
                // alert(width);
                jQuery('.events-wrapper-1').css('min-width', width + 'px');
                jQuery('.events-wrapper-2').css('min-width', width + 'px');
                calculate_width();
                setTimeout(function () {
                    calculate_width();
                }, 2000);
            }
            pager++; //alert(pager);


            setTimeout(function () {

                Lightbox.initList();
                //alert('zcsd');
            }, 2000);
            jQuery('.events-wrapper-1 .views-row , .events-wrapper-2 .views-row').click(function () {
                jQuery(this).find('.lightbox-processed').trigger('click');
            });

        });
    }
    setTimeout(function () {
        jQuery('.events-slider-loading').fadeOut("fast");
    }, 4000);
}


function getMore() {
    margin = parseFloat(jQuery(window).width()) - parseFloat(jQuery('.events-container').width()) - 80;
    var time = calculateSliderTime();

    jQuery('.events-container').animate({
        left: -margin
    }, time, function () {//lazy_load();
        getMore();
    });
}

function getMoreFast() {
    margin = parseFloat(jQuery(window).width()) - parseFloat(jQuery('.events-container').width()) - 80;
    var time = calculateSliderTimeFast();

    jQuery('.events-container').animate({
        left: -margin
    }, time, function () { lazy_load(); getMore(); });

}
function twitterShortUrl() {


    //    var username="7awi"; // bit.ly username
    //    var key="R_1d1dbde6060956fc2fc0d58bfbe71d12";
    //    jQuery('#social-tw a').click(function(){
    //        var url = jQuery(this).attr('href');
    //        var title = jQuery(this).attr('value');
    //      title = encodeURIComponent(title);
    //      //alert(url);
    //      //alert(title);
    //        jQuery.ajax({
    //        
    //        url:"http://api.bit.ly/v3/shorten",
    //        data:{
    //            longUrl:url,
    //            apiKey:key,
    //            login:username
    //        },
    //        dataType:"jsonp",
    //        success:function(v)
    //        {
    //           var bit_url=v.data.url;
    //           var tweetUrl = 'https://twitter.com/intent/tweet?text='+title+'-'+bit_url+' @layalina';
    //           //alert(tweetUrl);
    //           window.open(tweetUrl,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    //        }
    //    });
    //    return false;
    //    });

}
function iframe_fixes() {
    jQuery('#events-albums-slider .embedded-video .player').each(function (i, e) {
        jQuery(e).find('iframe').css('z-index', '9999');
        jQuery(e).find('iframe').css('position', 'relative');
    });



    jQuery('#slider').find('iframe').each(function (i, e) {
        var src = jQuery(e).attr('src');
        if (src.indexOf('wmode') == -1 && src.indexOf('youtube') != -1) {
            if (src.indexOf('?') == -1) {
                src = src + '?wmode=transparent';
                jQuery(e).attr('src', src);
            }
            else {
                src = src + '&wmode=transparent';
                jQuery(e).attr('src', src);
            }
        }
    });



    jQuery('.article-body-content').find('iframe').each(function (i, e) {
        var src = jQuery(e).attr('src');
        if (src.indexOf('wmode') == -1 && src.indexOf('youtube') != -1) {
            if (src.indexOf('?') == -1) {
                src = src + '?wmode=transparent';
                jQuery(e).attr('src', src);
            }
            else {
                src = src + '&wmode=transparent';
                jQuery(e).attr('src', src);
            }
        }
    });

    jQuery('#slider1').find('iframe').each(function (i, e) {
        var src = jQuery(e).attr('src');
        if (src.indexOf('wmode') == -1 && src.indexOf('youtube') != -1) {
            if (src.indexOf('?') == -1) {
                src = src + '?wmode=transparent';
                jQuery(e).attr('src', src);
            }
            else {
                src = src + '&wmode=transparent';
                jQuery(e).attr('src', src);
            }
        }
    });
}

function album_slider() {
    var activeSlide = 1;
    jQuery('body').keydown(function (event) {
        if (event.which == 39) {
            //            jQuery('.camera_next').trigger('click');
            //            jQuery('.article-main .ether-next').trigger('click');

        }
    });
    jQuery('body').keydown(function (event) {
        if (event.which == 37) {
            //            jQuery('.camera_prev').trigger('click');
            //            jQuery('.article-main .ether-prev').trigger('click');
        }
    });




    jQuery('.layalina-article-page-slider .slides img').click(function () {
        //alert('clicked');
        jQuery('.article-main .flex-next').trigger('click');
    });
    //    alert('clicked');
    //    jQuery('.events-albums-slider #slider1 li').click(function(){
    //      alert('clicked');
    //        jQuery('.events-albums-slider .flex-next').trigger('click');
    //    }); 

    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        //    jQuery(".cameraContent").swiperight(function() {
        //        jQuery('.camera_next').trigger('click');
        //       //jQuery(document).find('.next').trigger('click');
        //    });
        //    jQuery(".cameraContent").swipeleft(function() {
        //        jQuery('.camera_prev').trigger('click');
        //       //jQuery(document).find('.back').trigger('click');
        //    });


    }



}

function updatesocial(index) {
    jQuery('.socials div').each(function () {
        jQuery(this).removeClass('active');
    });
    setTimeout(function () {
        jQuery('#socialdiv-' + index).addClass('active');
    }, 1000);
}

function flex_slider() {
    jQuery(".flexSlide .flexslider").livequery(function () {
        jQuery('.flexSlide .flexslider').flexslider({
            animation: "slide",
            itemWidth: 302,
            pauseOnAction: true,
            slideshow: false,
            defualtSildes: 3,
            minResolution: 1024,
            minSildes: 3,
            maxResolution: 1659,
            maxSildes: 5,
            reverse: true,
            prevText: '',
            nextText: '',
            animationLoop: true,
            start: function (slider) {
                if (isMobile()) {
                    slider.find('.flex-prev').bind('click', function () {
                        slider.flexslider("prev");
                        return false;
                    });
                }
            }



        });
    });

    jQuery('.featured-flex-slider .view-content, .celebs-flex-slider .view-content').before(jQuery('#block-block-1'));


    jQuery('.grouped-flex .item-1, .grouped-flex .item-2, .featured-flex-slider .three-0-two-block').each(function (i, e) {
        if (jQuery(e).find('img').attr('src')) {
            var src = jQuery(e).find('img:last').attr('src');
            var old = src.split('&preset=');
            //check page resolution
            if (jQuery(window).width() >= 1663) {
                src = old[0] + '&preset=x-large';
                jQuery(e).find('img:last').attr('src', src);
                jQuery(e).css('width', '636');
            }
            else {
                src = old[0] + '&preset=medium';
                jQuery(e).find('img:last').attr('src', src);
                jQuery(e).css('width', '302');
            }
        }
    });

    jQuery('.grouped-flex .item-3, .grouped-flex .item-4').each(function (i, e) {
        if (jQuery(e).find('img:last').attr('src')) {
            var src = jQuery(e).find('img:last').attr('src');
            var old = src.split('&w=');
            src = old[0] + '&w=100&q=75&h=100&zc=1';
            jQuery(e).find('img:last').attr('src', src);
        }
    });

    jQuery('.grouped-flex .flexslider').flexslider({
        animation: "slide",
        itemWidth: 302,
        pauseOnAction: true,
        slideshow: false,
        defualtSildes: 3,
        minResolution: 1025,
        minSildes: 3,
        maxResolution: 1663,
        maxSildes: 3,
        reverse: true,
        prevText: '',
        nextText: '',
        animationLoop: true,
        start: function (slider) {
            if (isMobile()) {
                slider.find('.flex-prev').bind('click', function () {
                    slider.flexslider("prev");
                    return false;
                });
            }
        }
    });


    jQuery('.featured-flex-slider .flexslider').flexslider({
        animation: "slide",
        itemWidth: 302,
        pauseOnAction: true,
        slideshow: false,
        defualtSildes: 2,
        minResolution: 1025,
        minSildes: 2,
        maxResolution: 1663,
        maxSildes: 2,
        reverse: true,
        prevText: '',
        nextText: '',
        animationLoop: true,
        start: function (slider) {
            if (isMobile()) {
                slider.find('.flex-prev').bind('click', function () {
                    slider.flexslider("prev");
                    return false;
                });
            }
        }
    });


    jQuery('.celebs-flex-slider .flexslider').flexslider({
        animation: "slide",
        itemWidth: 302,
        pauseOnAction: true,
        slideshow: false,
        defualtSildes: 2,
        minResolution: 1025,
        minSildes: 2,
        maxResolution: 1659,
        maxSildes: 4,
        reverse: true,
        prevText: '',
        nextText: '',
        animationLoop: true,
        start: function (slider) {
            if (isMobile()) {
                slider.find('.flex-prev').bind('click', function () {
                    slider.flexslider("prev");
                    return false;
                });
            }
        }
    });

    jQuery('.article-flexSlide .flexslider').flexslider({
        animation: "slide",
        itemWidth: 640,
        pauseOnAction: true,
        slideshow: false,
        defualtSildes: 1,
        minResolution: 1024,
        minSildes: 1,
        maxResolution: 1680,
        maxSildes: 1,
        reverse: true,
        prevText: '',
        nextText: '',
        animationLoop: true,
        start: function (slider) {
            if (isMobile()) {
                jQuery('.article-flexSlide .flex-prev').bind('click', function () {
                    jQuery('.article-flexSlide .flexslider').flexslider("prev");
                    return false;
                });
            }
        },
        after: function (slider) {
            //			var currentItem=jQuery('.flexslider').find('.slides').children().eq(slider.currentSlide);
            //                        var count = jQuery(".slides li").length;
            //                        var current = count - slider.currentSlide;
            //                        var containerHeight = jQuery('.slides li:nth-child('+ current +')').height();
            //                        jQuery('.flex-viewport').animate({  
            //                            height:containerHeight
            //                        }, 500);
            var itemsCount = jQuery('.article-flexSlide .flexslider .slides li').length - 1;
            var item = itemsCount - slider.currentSlide; // in case of reverse

            var height = jQuery('.article-flexSlide .flexslider .slides li:eq(' + item + ')').find('.slider-image').height() + jQuery('.article-flexSlide .flexslider .slides li:eq(' + item + ')').find('.slide-text').height();
            jQuery('.article-flexSlide .flexslider .flex-viewport, .article-flexSlide').animate({
                height: height
            }, 500);
        },
        before: function (slider) {
            var count = jQuery(".article-flexSlide .slides li").length;
            var current = count - slider.currentSlide;
            var currentItem = jQuery('.article-flexSlide .slides li:nth-child(' + current + ')');
            if (currentItem.find('iframe').length > 0) {
                //reload iframe to stop video
                var FrameID = currentItem.find('iframe');
                FrameID.each(function () {
                    if (!jQuery(this).parent().hasClass('social')) {
                        jQuery(this).attr('src', jQuery(this).attr('src'));
                    }
                });

            }
        }
    });
    var articleFlexSlideItemsCount = jQuery('.article-flexSlide .flexslider .slides li').length - 1;
    jQuery('.article-flexSlide .flexslider .flex-viewport, .article-flexSlide').height(jQuery('.article-flexSlide .flexslider .slides li:eq(' + articleFlexSlideItemsCount + ')').height());




    //      jQuery('#events-albums-slider .flexslider').flexslider({
    //      animation: "slide",
    //      itemWidth: 640,
    //       defualtSildes: 1,
    //        minResolution: 1024,
    //        minSildes: 1,
    //        maxResolution: 1680,
    //          maxSildes: 1
    //    
    //  });

    jQuery('#events-albums-slider #carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 125,
        itemMargin: 5,
        startAt: 0,
        keyboard: false,
        //    multipleKeyboard: true,
        reverse: true,

        asNavFor: '#events-albums-slider #slider1'
    });


    jQuery('#events-albums-slider #slider1').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        keyboard: true,
        multipleKeyboard: true,
        startAt: 0,
        reverse: true,
        video: true,
        albumSlider: true,
        sync: "#events-albums-slider #carousel",
        after: function (slider) {
            //alert(slider.currentSlide);
            var index = slider.currentSlide + 1;
            window.location = '#' + index;
            jQuery('.flex-caption').show();
        },
        before: function (slider) {
            var count = jQuery("#slider1 .slides li").length;
            var current = slider.currentSlide + 1;
            var currentItem = jQuery('#slider1 .slides li:nth-child(' + current + ')');
            jQuery('.flex-caption').hide();
            if (currentItem.find('iframe').length > 0) {
                //reload iframe to stop video
                var FrameID = currentItem.find('iframe');
                FrameID.each(function () {
                    if (!jQuery(this).parent().hasClass('social')) {
                        jQuery(this).attr('src', jQuery(this).attr('src'));
                    }
                });

            }
        },
        start: function (slider) {
            //			jQuery('#events-albums-slider #slider1').flexslider(jQuery('#slider1 .slides li').length);
            //			jQuery('#events-albums-slider #slider1').flexslider(jQuery('#slider1 .slides li').length -1);
            //			if (jQuery.browser.msie){
            //			setTimeout(function(){
            //			jQuery('#events-albums-slider #slider1').flexslider("previous");
            //			}, 1000);
            //		
            //		}

        }
    });



    //second item issue
    jQuery('#events-albums-slider #slider1 .flex-next').click(function () {
        var pathname = decodeURI(window.location.href);
        if (jQuery.contains(pathname, '#')) {
            var index = pathname.split('#');
            index = parseInt(index[1]);
            if (!index) {
                var index = 1;
                var length = jQuery('#events-albums-slider #slider1 .slides li').length;
                var target = length - index - 1;
                jQuery('#events-albums-slider #carousel .slides li.flex-active-slide').removeClass('flex-active-slide');
                jQuery('#events-albums-slider #carousel .slides li:eq(' + target + ')').addClass('flex-active-slide');
            }
            else if (index && index == 1 || index == 2) {
                var length = jQuery('#events-albums-slider #slider1 .slides li').length;
                var target = length - index - 1;
                jQuery('#events-albums-slider #carousel .slides li.flex-active-slide').removeClass('flex-active-slide');
                jQuery('#events-albums-slider #carousel .slides li:eq(' + target + ')').addClass('flex-active-slide');
            }
        }
    });

    jQuery(document).keydown(function (e) {
        if (e.keyCode == 37 || e.keyCode == 39) {
            var pathname = decodeURI(window.location.href);
            if (jQuery.contains(pathname, '#')) {
                var index = pathname.split('#');
                index = parseInt(index[1]);
                if (!index) {
                    var index = 1;
                    var length = jQuery('#events-albums-slider #slider1 .slides li').length;
                    var target = length - index - 1;
                    jQuery('#events-albums-slider #carousel .slides li.flex-active-slide').removeClass('flex-active-slide');
                    jQuery('#events-albums-slider #carousel .slides li:eq(' + target + ')').addClass('flex-active-slide');
                }
                else if (index && index == 1 || index == 2) {
                    var length = jQuery('#events-albums-slider #slider1 .slides li').length;
                    var target = length - index - 1;
                    jQuery('#events-albums-slider #carousel .slides li.flex-active-slide').removeClass('flex-active-slide');
                    jQuery('#events-albums-slider #carousel .slides li:eq(' + target + ')').addClass('flex-active-slide');
                }
            }
        }
    });


    //make items clickable
    jQuery('#events-albums-slider #slider1 li img').click(function () {
        jQuery('#events-albums-slider #slider1 .flex-next').trigger('click');
    });

    //clicking on thumbs issue
    jQuery('#events-albums-slider #carousel .slides li').click(function () {
        jQuery('#events-albums-slider #carousel .slides li.flex-active-slide').removeClass('flex-active-slide');
        jQuery(this).addClass('flex-active-slide');
        var index = parseInt(jQuery(this).index());
        var length = jQuery('#events-albums-slider #slider1 .slides li').length;
        var target = length - index - 1;
        jQuery('#events-albums-slider #slider1').flexslider(target);
    });

    //fixing the lightbox high resolutions
    //if (jQuery('.view-id-node.view-display-id-page_2').attr('class')){
    //    var length = jQuery('#events-albums-slider #carousel .slides li').length - 1;
    //    setTimeout(function() {
    //        jQuery('#events-albums-slider #carousel .slides li:eq('+length+')').click();
    //    }, 1000);  
    //}



    var pathname = decodeURI(window.location.href);
    if (jQuery.contains(pathname, '?')) {
        var is_Album3 = Drupal.settings.swfalbum;
        if (is_Album3) {
            var childrenCount = jQuery('#carousel .slides').children().length;
            var index = pathname.split('?');
            index = parseInt(index[1]);
            index = childrenCount - index;
            if (index && index > -1) {
                jQuery('#carousel .slides li:eq(' + index + ')').trigger('click');
            } 
        }
    }

    if (jQuery.contains(pathname, '#')) {
        var is_Album3 = Drupal.settings.swfalbum;
        if (is_Album3) {
            var childrenCount = jQuery('#carousel .slides').children().length;
            var index = pathname.split('#');
            index = parseInt(index[1]);
            index = childrenCount - index;
            if (index && index > -1) {
                jQuery('#carousel .slides li:eq(' + index + ')').trigger('click');
            }
        }
    }
    if (isMobile()) {
        jQuery('.view-slider').find('.item-list').addClass('flexslider');
        jQuery('.view-slider').find('ul').addClass('slides');

        jQuery('.view-slider .flexslider').flexslider({
            animation: "slide",
            pauseOnAction: true,
            slideshow: false,
            defualtSildes: 1,
            minResolution: 1024,
            minSildes: 1,
            maxResolution: 1680,
            maxSildes: 1,
            reverse: true,
            prevText: '',
            nextText: '',
            animationLoop: true,
            start: function (slider) {
                jQuery('.view-slider .flexslider').css("opacity", "0");
                jQuery('.view-slider .flexslider').flexslider("next");
                jQuery('.view-slider .flexslider').flexslider("previous");

                setTimeout(function () {
                    jQuery('.view-slider .flexslider').css("opacity", "1");
                }, 1000);

            },
            after: function (slider) {
                //alert(slider.currentSlide);

                //alert(slider.currentSlide);

                // sliderAdds(slider.currentSlide);


                var count = jQuery(".view-slider .flexslider .slides li").length;
                var current = count - slider.currentSlide - 1;
                var currentItem = jQuery('.view-slider .flexslider .slides li:nth-child(' + current + ')');
                if (currentItem.find('.video-slide').length > 0) {
                    jQuery('.ipad-right-arrow, .ipad-left-arrow').animate({
                        opacity: 1
                    }, 500);

                    var FrameID = currentItem.find('iframe');
                    FrameID.css('width', '899px');

                } else {
                    jQuery('.ipad-right-arrow, .ipad-left-arrow').animate({
                        opacity: 0
                    }, 500);


                }
            },
            before: function (slider) {
                var count = jQuery(".view-slider .flexslider .slides li").length;
                var current = count - slider.currentSlide - 1;
                var currentItem = jQuery('.view-slider .flexslider .slides li:nth-child(' + current + ')');
                if (currentItem.find('.video-slide').length > 0) {
                    //reload iframe to stop video
                    var FrameID = currentItem.find('iframe');
                    FrameID.attr('src', FrameID.attr('src'));
                }
            }
        });


        jQuery('.view-slider').append('<div class="ipad-right-arrow"></div>');
        jQuery('.view-slider').append('<div class="ipad-left-arrow"></div>');
        jQuery('.view-slider').prepend('<div class="back"><div class="back-arrow"></div></div>');
        jQuery('.view-slider').append('<div class="next"><div class="next-arrow"></div></div>');
    }


    //fix rtl and floating issue
    jQuery('.flexSlide ul.slides').livequery(function () {
        jQuery('.flexSlide ul.slides').each(function (i, e) {
            if (jQuery(window).width() >= 1663) {
                if (jQuery(e).find('li').size() < 5) {
                    jQuery(e).css('width', jQuery(e).find('li').size() * 334);
                    jQuery(e).css('float', 'right');
                }
            }
            else {
                if (jQuery(e).find('li').size() < 3) {
                    jQuery(e).css('width', jQuery(e).find('li').size() * 334);
                    jQuery(e).css('float', 'right');

                }
            }
        });
    });

    jQuery('.view-id-node.view-display-id-page_1 #events-albums-slider #carousel ul.slides').livequery(function () {
        jQuery('.view-id-node.view-display-id-page_1 #events-albums-slider #carousel ul.slides').each(function (i, e) {
            if (jQuery(e).find('li').size() < 7) {
                jQuery(e).css('width', jQuery(e).find('li').size() * 125);
                jQuery(e).css('float', 'right');
            }
        });
    });
}

function search_filters() {
    if (jQuery('body').hasClass('page-search')) {
        var pathname = window.location.href;
        if (pathname.indexOf("f[1]") != -1) {
            var filter = pathname.split('f[1]');
            filter = filter[1];
            jQuery('#search-season-exposed li a').each(function (i, e) {
                var url = jQuery(e).attr('href');
                if (url.indexOf("f[1]") != -1) {
                    url = url.split('f[1]');
                    url = url[1];
                    if (filter == url) {
                        jQuery('#search-season-exposed span').text(jQuery(e).text());
                    }
                }
            });
        }
    }
}

function calculate_width() {
    var width = 0;
    jQuery('.events-wrapper-1 .views-row').each(function (i, e) {
        width += parseFloat(jQuery(e).width()) + 5;
    });

    jQuery('.events-wrapper-1').css('width', width + 6);

    var width2 = 0;
    jQuery('.events-wrapper-2 .views-row').each(function (i, e) {
        width2 += parseFloat(jQuery(e).width()) + 5;
    });
    jQuery('.events-wrapper-2').css('width', width2 + 6);

    var contWidth = 0;
    if (width > width2) {
        contWidth = width;
    }
    else {
        contWidth = width2;
    }

    jQuery('.events-container').css('width', contWidth);
}
function removeApp() {


    jQuery('.fb_close').click(function () {
        jQuery('#block-layalina-fb-actions-layalina-facebook-actions').slideUp(1500);
        setTimeout(function () {
            jQuery('#block-layalina-fb-actions-layalina-facebook-actions').html(' ');
        }, 1500);
        var username = get_cookie("fbApp");
        if (username != null && username != "") {
            //alert("Welcome again " + username);
        }
        else {
            setCookie("fbApp", 'deleted', 7);
        }
    });
}
function newIpTarget() {
    var target = new Array();
    target['abu dhabi'] = 'Ø£Ø¨Ùˆ Ø¸Ø¨ÙŠ';
    target['dubai'] = 'Ø¯Ø¨ÙŠ';
    target['kuwait'] = 'Ø§Ù„ÙƒÙˆÙŠØª';
    target['beirut'] = 'Ø¨ÙŠØ±ÙˆØª';
    var indexes = new Array();
    indexes = ['abu dhabi', 'dubai', 'kuwait', 'beirut'];
    var cookie = get_cookie('country_city');
    if (target[cookie] != undefined) {
        // alert(target);
        jQuery('#block-menu-menu-menu-top-main-menu .menu .expanded:nth-child(3) li a').each(function () {
            var href = jQuery(this).attr('href') + '/' + target[cookie];
            jQuery(this).attr('href', href);
        });
        var index = indexes.indexOf(cookie) + 2;
        jQuery('#block-layalina-misc-layalina-events-cities #country-exposed ul li:nth-child(' + index + ')').trigger('click');
    }
}
function getScript(url, success) {
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0],
            done = false;
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}
function sliderAdds(slide) {
    var slides = jQuery('.view-slider ul:first li').size() - jQuery('.view-slider ul:first .clone').size();
    //alert(slides);
    slide = slide % slides;
    if (slide == 3 || slide == 6) {
        if (slide == 3) {
            var strFrameName = ("add-" + (new Date()).getTime());
            var jFrame = jQuery('<iframe src="http://c5.zedo.com/jsc/c5/ff2.html?n=1424;c=1724/1723;s=243;d=47;w=972;h=517" frameborder=0 marginheight=0 marginwidth=0 scrolling="no" allowTransparency="true" width=972 height=517></iframe>');
            jFrame
            .css("width", "100%")
            .css("height", "517")
            .css('overflow', 'hidden')
            .appendTo(jQuery('#main-add-1'))
            ;
            var objFrame = window.frames[strFrameName];
            if (objFrame != undefined) {
                var objDoc = objFrame.document;
                objDoc.open();
                objDoc.close();
                objFrame.focus();
            }
        }
        else {
            var strFrameName = ("add-" + (new Date()).getTime());
            var jFrame = jQuery('<iframe src="http://c5.zedo.com/jsc/c5/ff2.html?n=1424;c=1724/1723;s=243;d=72;w=972;h=517" frameborder=0 marginheight=0 marginwidth=0 scrolling="no" allowTransparency="true" width=972 height=517></iframe>');
            jFrame
            .css("width", "100%")
            .css("height", "517")
            .css('overflow', 'hidden')
            .appendTo(jQuery('#main-add-2'))
            ;
            var objFrame = window.frames[strFrameName];
            if (objFrame != undefined) {
                var objDoc = objFrame.document;
                objDoc.open();
                objDoc.close();
                objFrame.focus();
            }

        }
    }
    else {
        jQuery('.slider-add').find('iframe').remove();
    }
}
;
/*
* File:        jquery.dataTables.min.js
* Version:     1.9.2
* Author:      Allan Jardine (www.sprymedia.co.uk)
* Info:        www.datatables.net
* 
* Copyright 2008-2012 Allan Jardine, all rights reserved.
*
* This source file is free software, under either the GPL v2 license or a
* BSD style license, available at:
*   http://datatables.net/license_gpl2
*   http://datatables.net/license_bsd
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
*/
(function (i, V, l, n) {
    var j = function (e) {
        function o(a, b) {
            var c = j.defaults.columns, d = a.aoColumns.length, c = i.extend({}, j.models.oColumn, c, { sSortingClass: a.oClasses.sSortable, sSortingClassJUI: a.oClasses.sSortJUI, nTh: b ? b : l.createElement("th"), sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "", aDataSort: c.aDataSort ? c.aDataSort : [d], mDataProp: c.mDataProp ? c.oDefaults : d }); a.aoColumns.push(c); if (a.aoPreSearchCols[d] === n || null === a.aoPreSearchCols[d]) a.aoPreSearchCols[d] = i.extend({}, j.models.oSearch); else if (c = a.aoPreSearchCols[d],
c.bRegex === n && (c.bRegex = !0), c.bSmart === n && (c.bSmart = !0), c.bCaseInsensitive === n) c.bCaseInsensitive = !0; r(a, d, null)
        } function r(a, b, c) {
            b = a.aoColumns[b]; c !== n && null !== c && (c.sType !== n && (b.sType = c.sType, b._bAutoType = !1), i.extend(b, c), p(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== n && (b.aDataSort = [c.iDataSort]), p(b, c, "aDataSort")); b.fnGetData = W(b.mDataProp); b.fnSetData = ta(b.mDataProp); a.oFeatures.bSort || (b.bSortable = !1); !b.bSortable || -1 == i.inArray("asc", b.asSorting) && -1 == i.inArray("desc", b.asSorting) ? (b.sSortingClass =
a.oClasses.sSortableNone, b.sSortingClassJUI = "") : b.bSortable || -1 == i.inArray("asc", b.asSorting) && -1 == i.inArray("desc", b.asSorting) ? (b.sSortingClass = a.oClasses.sSortable, b.sSortingClassJUI = a.oClasses.sSortJUI) : -1 != i.inArray("asc", b.asSorting) && -1 == i.inArray("desc", b.asSorting) ? (b.sSortingClass = a.oClasses.sSortableAsc, b.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed) : -1 == i.inArray("asc", b.asSorting) && -1 != i.inArray("desc", b.asSorting) && (b.sSortingClass = a.oClasses.sSortableDesc, b.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed)
        }
        function k(a) { if (!1 === a.oFeatures.bAutoWidth) return !1; ba(a); for (var b = 0, c = a.aoColumns.length; b < c; b++) a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth } function G(a, b) { for (var c = -1, d = 0; d < a.aoColumns.length; d++) if (!0 === a.aoColumns[d].bVisible && c++, c == b) return d; return null } function t(a, b) { for (var c = -1, d = 0; d < a.aoColumns.length; d++) if (!0 === a.aoColumns[d].bVisible && c++, d == b) return !0 === a.aoColumns[d].bVisible ? c : null; return null } function v(a) {
            for (var b = 0, c = 0; c < a.aoColumns.length; c++) !0 === a.aoColumns[c].bVisible &&
b++; return b
        } function z(a) { for (var b = j.ext.aTypes, c = b.length, d = 0; d < c; d++) { var g = b[d](a); if (null !== g) return g } return "string" } function D(a, b) { for (var c = b.split(","), d = [], g = 0, f = a.aoColumns.length; g < f; g++) for (var h = 0; h < f; h++) if (a.aoColumns[g].sName == c[h]) { d.push(h); break } return d } function x(a) { for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++) b += a.aoColumns[c].sName + ","; return b.length == d ? "" : b.slice(0, -1) } function J(a, b, c, d) {
            var g, f, h, e, s; if (b) for (g = b.length - 1; 0 <= g; g--) {
                var m = b[g].aTargets; i.isArray(m) ||
E(a, 1, "aTargets must be an array of targets, not a " + typeof m); f = 0; for (h = m.length; f < h; f++) if ("number" === typeof m[f] && 0 <= m[f]) { for (; a.aoColumns.length <= m[f]; ) o(a); d(m[f], b[g]) } else if ("number" === typeof m[f] && 0 > m[f]) d(a.aoColumns.length + m[f], b[g]); else if ("string" === typeof m[f]) { e = 0; for (s = a.aoColumns.length; e < s; e++) ("_all" == m[f] || i(a.aoColumns[e].nTh).hasClass(m[f])) && d(e, b[g]) } 
            } if (c) { g = 0; for (a = c.length; g < a; g++) d(g, c[g]) } 
        } function H(a, b) {
            var c; c = i.isArray(b) ? b.slice() : i.extend(!0, {}, b); var d = a.aoData.length,
g = i.extend(!0, {}, j.models.oRow); g._aData = c; a.aoData.push(g); for (var f, g = 0, h = a.aoColumns.length; g < h; g++) c = a.aoColumns[g], "function" === typeof c.fnRender && c.bUseRendered && null !== c.mDataProp ? I(a, d, g, R(a, d, g)) : I(a, d, g, w(a, d, g)), c._bAutoType && "string" != c.sType && (f = w(a, d, g, "type"), null !== f && "" !== f && (f = z(f), null === c.sType ? c.sType = f : c.sType != f && "html" != c.sType && (c.sType = "string"))); a.aiDisplayMaster.push(d); a.oFeatures.bDeferRender || ca(a, d); return d
        } function ua(a) {
            var b, c, d, g, f, h, e, s, m; if (a.bDeferLoading ||
null === a.sAjaxSource) { e = a.nTBody.childNodes; b = 0; for (c = e.length; b < c; b++) if ("TR" == e[b].nodeName.toUpperCase()) { s = a.aoData.length; e[b]._DT_RowIndex = s; a.aoData.push(i.extend(!0, {}, j.models.oRow, { nTr: e[b] })); a.aiDisplayMaster.push(s); h = e[b].childNodes; d = f = 0; for (g = h.length; d < g; d++) if (m = h[d].nodeName.toUpperCase(), "TD" == m || "TH" == m) I(a, s, f, i.trim(h[d].innerHTML)), f++ } } e = S(a); h = []; b = 0; for (c = e.length; b < c; b++) {
                d = 0; for (g = e[b].childNodes.length; d < g; d++) f = e[b].childNodes[d], m = f.nodeName.toUpperCase(), ("TD" == m ||
"TH" == m) && h.push(f)
            } g = 0; for (e = a.aoColumns.length; g < e; g++) {
                m = a.aoColumns[g]; null === m.sTitle && (m.sTitle = m.nTh.innerHTML); f = m._bAutoType; s = "function" === typeof m.fnRender; var o = null !== m.sClass, k = m.bVisible, n, r; if (f || s || o || !k) {
                    b = 0; for (c = a.aoData.length; b < c; b++) d = a.aoData[b], n = h[b * e + g], f && "string" != m.sType && (r = w(a, b, g, "type"), "" !== r && (r = z(r), null === m.sType ? m.sType = r : m.sType != r && "html" != m.sType && (m.sType = "string"))), "function" === typeof m.mDataProp && (n.innerHTML = w(a, b, g, "display")), s && (r = R(a, b, g), n.innerHTML =
r, m.bUseRendered && I(a, b, g, r)), o && (n.className += " " + m.sClass), k ? d._anHidden[g] = null : (d._anHidden[g] = n, n.parentNode.removeChild(n)), m.fnCreatedCell && m.fnCreatedCell.call(a.oInstance, n, w(a, b, g, "display"), d._aData, b, g)
                } 
            } if (0 !== a.aoRowCreatedCallback.length) { b = 0; for (c = a.aoData.length; b < c; b++) d = a.aoData[b], C(a, "aoRowCreatedCallback", null, [d.nTr, d._aData, b]) } 
        } function K(a, b) { return b._DT_RowIndex !== n ? b._DT_RowIndex : null } function da(a, b, c) {
            for (var b = L(a, b), d = 0, a = a.aoColumns.length; d < a; d++) if (b[d] === c) return d;
            return -1
        } function X(a, b, c) { for (var d = [], g = 0, f = a.aoColumns.length; g < f; g++) d.push(w(a, b, g, c)); return d } function w(a, b, c, d) {
            var g = a.aoColumns[c]; if ((c = g.fnGetData(a.aoData[b]._aData, d)) === n) return a.iDrawError != a.iDraw && null === g.sDefaultContent && (E(a, 0, "Requested unknown parameter " + ("function" == typeof g.mDataProp ? "{mDataprop function}" : "'" + g.mDataProp + "'") + " from the data source for row " + b), a.iDrawError = a.iDraw), g.sDefaultContent; if (null === c && null !== g.sDefaultContent) c = g.sDefaultContent; else if ("function" ===
typeof c) return c(); return "display" == d && null === c ? "" : c
        } function I(a, b, c, d) { a.aoColumns[c].fnSetData(a.aoData[b]._aData, d) } function W(a) { if (null === a) return function () { return null }; if ("function" === typeof a) return function (b, d) { return a(b, d) }; if ("string" === typeof a && -1 != a.indexOf(".")) { var b = a.split("."); return function (a) { for (var d = 0, g = b.length; d < g; d++) if (a = a[b[d]], a === n) return n; return a } } return function (b) { return b[a] } } function ta(a) {
            if (null === a) return function () { }; if ("function" === typeof a) return function (b,
d) { a(b, "set", d) }; if ("string" === typeof a && -1 != a.indexOf(".")) { var b = a.split("."); return function (a, d) { for (var g = 0, f = b.length - 1; g < f; g++) a[b[g]] === n && (a[b[g]] = {}), a = a[b[g]]; a[b[b.length - 1]] = d } } return function (b, d) { b[a] = d } 
        } function Y(a) { for (var b = [], c = a.aoData.length, d = 0; d < c; d++) b.push(a.aoData[d]._aData); return b } function ea(a) { a.aoData.splice(0, a.aoData.length); a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length); a.aiDisplay.splice(0, a.aiDisplay.length); A(a) } function fa(a, b) {
            for (var c = -1, d = 0, g = a.length; d <
g; d++) a[d] == b ? c = d : a[d] > b && a[d]--; -1 != c && a.splice(c, 1)
        } function R(a, b, c) { var d = a.aoColumns[c]; return d.fnRender({ iDataRow: b, iDataColumn: c, oSettings: a, aData: a.aoData[b]._aData, mDataProp: d.mDataProp }, w(a, b, c, "display")) } function ca(a, b) {
            var c = a.aoData[b], d; if (null === c.nTr) {
                c.nTr = l.createElement("tr"); c.nTr._DT_RowIndex = b; c._aData.DT_RowId && (c.nTr.id = c._aData.DT_RowId); c._aData.DT_RowClass && i(c.nTr).addClass(c._aData.DT_RowClass); for (var g = 0, f = a.aoColumns.length; g < f; g++) {
                    var h = a.aoColumns[g]; d = l.createElement(h.sCellType);
                    d.innerHTML = "function" === typeof h.fnRender && (!h.bUseRendered || null === h.mDataProp) ? R(a, b, g) : w(a, b, g, "display"); null !== h.sClass && (d.className = h.sClass); h.bVisible ? (c.nTr.appendChild(d), c._anHidden[g] = null) : c._anHidden[g] = d; h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, d, w(a, b, g, "display"), c._aData, b, g)
                } C(a, "aoRowCreatedCallback", null, [c.nTr, c._aData, b])
            } 
        } function va(a) {
            var b, c, d; if (0 !== a.nTHead.getElementsByTagName("th").length) {
                b = 0; for (d = a.aoColumns.length; b < d; b++) if (c = a.aoColumns[b].nTh, c.setAttribute("role",
"columnheader"), a.aoColumns[b].bSortable && (c.setAttribute("tabindex", a.iTabIndex), c.setAttribute("aria-controls", a.sTableId)), null !== a.aoColumns[b].sClass && i(c).addClass(a.aoColumns[b].sClass), a.aoColumns[b].sTitle != c.innerHTML) c.innerHTML = a.aoColumns[b].sTitle
            } else {
                var g = l.createElement("tr"); b = 0; for (d = a.aoColumns.length; b < d; b++) c = a.aoColumns[b].nTh, c.innerHTML = a.aoColumns[b].sTitle, c.setAttribute("tabindex", "0"), null !== a.aoColumns[b].sClass && i(c).addClass(a.aoColumns[b].sClass), g.appendChild(c);
                i(a.nTHead).html("")[0].appendChild(g); T(a.aoHeader, a.nTHead)
            } i(a.nTHead).children("tr").attr("role", "row"); if (a.bJUI) { b = 0; for (d = a.aoColumns.length; b < d; b++) { c = a.aoColumns[b].nTh; g = l.createElement("div"); g.className = a.oClasses.sSortJUIWrapper; i(c).contents().appendTo(g); var f = l.createElement("span"); f.className = a.oClasses.sSortIcon; g.appendChild(f); c.appendChild(g) } } if (a.oFeatures.bSort) for (b = 0; b < a.aoColumns.length; b++) !1 !== a.aoColumns[b].bSortable ? ga(a, a.aoColumns[b].nTh, b) : i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
            "" !== a.oClasses.sFooterTH && i(a.nTFoot).children("tr").children("th").addClass(a.oClasses.sFooterTH); if (null !== a.nTFoot) { c = O(a, null, a.aoFooter); b = 0; for (d = a.aoColumns.length; b < d; b++) c[b] && (a.aoColumns[b].nTf = c[b], a.aoColumns[b].sClass && i(c[b]).addClass(a.aoColumns[b].sClass)) } 
        } function U(a, b, c) {
            var d, g, f, h = [], e = [], i = a.aoColumns.length, m; c === n && (c = !1); d = 0; for (g = b.length; d < g; d++) { h[d] = b[d].slice(); h[d].nTr = b[d].nTr; for (f = i - 1; 0 <= f; f--) !a.aoColumns[f].bVisible && !c && h[d].splice(f, 1); e.push([]) } d = 0; for (g =
h.length; d < g; d++) { if (a = h[d].nTr) for (; f = a.firstChild; ) a.removeChild(f); f = 0; for (b = h[d].length; f < b; f++) if (m = i = 1, e[d][f] === n) { a.appendChild(h[d][f].cell); for (e[d][f] = 1; h[d + i] !== n && h[d][f].cell == h[d + i][f].cell; ) e[d + i][f] = 1, i++; for (; h[d][f + m] !== n && h[d][f].cell == h[d][f + m].cell; ) { for (c = 0; c < i; c++) e[d + c][f + m] = 1; m++ } h[d][f].cell.rowSpan = i; h[d][f].cell.colSpan = m } } 
        } function y(a) {
            var b = C(a, "aoPreDrawCallback", "preDraw", [a]); if (-1 !== i.inArray(!1, b)) F(a, !1); else {
                var c, d, b = [], g = 0, f = a.asStripeClasses.length; c = a.aoOpenRows.length;
                a.bDrawing = !0; a.iInitDisplayStart !== n && -1 != a.iInitDisplayStart && (a._iDisplayStart = a.oFeatures.bServerSide ? a.iInitDisplayStart : a.iInitDisplayStart >= a.fnRecordsDisplay() ? 0 : a.iInitDisplayStart, a.iInitDisplayStart = -1, A(a)); if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++; else if (a.oFeatures.bServerSide) { if (!a.bDestroying && !wa(a)) return } else a.iDraw++; if (0 !== a.aiDisplay.length) {
                    var h = a._iDisplayStart; d = a._iDisplayEnd; a.oFeatures.bServerSide && (h = 0, d = a.aoData.length); for (; h < d; h++) {
                        var e = a.aoData[a.aiDisplay[h]];
                        null === e.nTr && ca(a, a.aiDisplay[h]); var s = e.nTr; if (0 !== f) { var m = a.asStripeClasses[g % f]; e._sRowStripe != m && (i(s).removeClass(e._sRowStripe).addClass(m), e._sRowStripe = m) } C(a, "aoRowCallback", null, [s, a.aoData[a.aiDisplay[h]]._aData, g, h]); b.push(s); g++; if (0 !== c) for (e = 0; e < c; e++) if (s == a.aoOpenRows[e].nParent) { b.push(a.aoOpenRows[e].nTr); break } 
                    } 
                } else b[0] = l.createElement("tr"), a.asStripeClasses[0] && (b[0].className = a.asStripeClasses[0]), c = a.oLanguage, f = c.sZeroRecords, 1 == a.iDraw && null !== a.sAjaxSource && !a.oFeatures.bServerSide ?
f = c.sLoadingRecords : c.sEmptyTable && 0 === a.fnRecordsTotal() && (f = c.sEmptyTable), c = l.createElement("td"), c.setAttribute("valign", "top"), c.colSpan = v(a), c.className = a.oClasses.sRowEmpty, c.innerHTML = ha(a, f), b[g].appendChild(c); C(a, "aoHeaderCallback", "header", [i(a.nTHead).children("tr")[0], Y(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]); C(a, "aoFooterCallback", "footer", [i(a.nTFoot).children("tr")[0], Y(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]); g = l.createDocumentFragment(); c = l.createDocumentFragment();
                if (a.nTBody) { f = a.nTBody.parentNode; c.appendChild(a.nTBody); if (!a.oScroll.bInfinite || !a._bInitComplete || a.bSorted || a.bFiltered) for (; c = a.nTBody.firstChild; ) a.nTBody.removeChild(c); c = 0; for (d = b.length; c < d; c++) g.appendChild(b[c]); a.nTBody.appendChild(g); null !== f && f.appendChild(a.nTBody) } C(a, "aoDrawCallback", "draw", [a]); a.bSorted = !1; a.bFiltered = !1; a.bDrawing = !1; a.oFeatures.bServerSide && (F(a, !1), a._bInitComplete || Z(a))
            } 
        } function $(a) {
            a.oFeatures.bSort ? P(a, a.oPreviousSearch) : a.oFeatures.bFilter ? M(a, a.oPreviousSearch) :
(A(a), y(a))
        } function xa(a) {
            var b = i("<div></div>")[0]; a.nTable.parentNode.insertBefore(b, a.nTable); a.nTableWrapper = i('<div id="' + a.sTableId + '_wrapper" class="' + a.oClasses.sWrapper + '" role="grid"></div>')[0]; a.nTableReinsertBefore = a.nTable.nextSibling; for (var c = a.nTableWrapper, d = a.sDom.split(""), g, f, h, e, s, m, o, k = 0; k < d.length; k++) {
                f = 0; h = d[k]; if ("<" == h) {
                    e = i("<div></div>")[0]; s = d[k + 1]; if ("'" == s || '"' == s) {
                        m = ""; for (o = 2; d[k + o] != s; ) m += d[k + o], o++; "H" == m ? m = a.oClasses.sJUIHeader : "F" == m && (m = a.oClasses.sJUIFooter);
-1 != m.indexOf(".") ? (s = m.split("."), e.id = s[0].substr(1, s[0].length - 1), e.className = s[1]) : "#" == m.charAt(0) ? e.id = m.substr(1, m.length - 1) : e.className = m; k += o
                    } c.appendChild(e); c = e
                } else if (">" == h) c = c.parentNode; else if ("l" == h && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) g = ya(a), f = 1; else if ("f" == h && a.oFeatures.bFilter) g = za(a), f = 1; else if ("r" == h && a.oFeatures.bProcessing) g = Aa(a), f = 1; else if ("t" == h) g = Ba(a), f = 1; else if ("i" == h && a.oFeatures.bInfo) g = Ca(a), f = 1; else if ("p" == h && a.oFeatures.bPaginate) g = Da(a), f = 1;
                else if (0 !== j.ext.aoFeatures.length) { e = j.ext.aoFeatures; o = 0; for (s = e.length; o < s; o++) if (h == e[o].cFeature) { (g = e[o].fnInit(a)) && (f = 1); break } } 1 == f && null !== g && ("object" !== typeof a.aanFeatures[h] && (a.aanFeatures[h] = []), a.aanFeatures[h].push(g), c.appendChild(g))
            } b.parentNode.replaceChild(a.nTableWrapper, b)
        } function T(a, b) {
            var c = i(b).children("tr"), d, g, f, h, e, s, m, j; a.splice(0, a.length); g = 0; for (s = c.length; g < s; g++) a.push([]); g = 0; for (s = c.length; g < s; g++) {
                f = 0; for (m = c[g].childNodes.length; f < m; f++) if (d = c[g].childNodes[f],
"TD" == d.nodeName.toUpperCase() || "TH" == d.nodeName.toUpperCase()) { var o = 1 * d.getAttribute("colspan"), k = 1 * d.getAttribute("rowspan"), o = !o || 0 === o || 1 === o ? 1 : o, k = !k || 0 === k || 1 === k ? 1 : k; for (h = 0; a[g][h]; ) h++; j = h; for (e = 0; e < o; e++) for (h = 0; h < k; h++) a[g + h][j + e] = { cell: d, unique: 1 == o ? !0 : !1 }, a[g + h].nTr = c[g] } 
            } 
        } function O(a, b, c) { var d = []; c || (c = a.aoHeader, b && (c = [], T(c, b))); for (var b = 0, g = c.length; b < g; b++) for (var f = 0, h = c[b].length; f < h; f++) if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell; return d } function wa(a) {
            if (a.bAjaxDataGet) {
                a.iDraw++;
                F(a, !0); var b = Ea(a); ia(a, b); a.fnServerData.call(a.oInstance, a.sAjaxSource, b, function (b) { Fa(a, b) }, a); return !1
            } return !0
        } function Ea(a) {
            var b = a.aoColumns.length, c = [], d, g, f, h; c.push({ name: "sEcho", value: a.iDraw }); c.push({ name: "iColumns", value: b }); c.push({ name: "sColumns", value: x(a) }); c.push({ name: "iDisplayStart", value: a._iDisplayStart }); c.push({ name: "iDisplayLength", value: !1 !== a.oFeatures.bPaginate ? a._iDisplayLength : -1 }); for (f = 0; f < b; f++) d = a.aoColumns[f].mDataProp, c.push({ name: "mDataProp_" + f, value: "function" ===
typeof d ? "function" : d
            }); if (!1 !== a.oFeatures.bFilter) { c.push({ name: "sSearch", value: a.oPreviousSearch.sSearch }); c.push({ name: "bRegex", value: a.oPreviousSearch.bRegex }); for (f = 0; f < b; f++) c.push({ name: "sSearch_" + f, value: a.aoPreSearchCols[f].sSearch }), c.push({ name: "bRegex_" + f, value: a.aoPreSearchCols[f].bRegex }), c.push({ name: "bSearchable_" + f, value: a.aoColumns[f].bSearchable }) } if (!1 !== a.oFeatures.bSort) {
                var e = 0; d = null !== a.aaSortingFixed ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice(); for (f = 0; f < d.length; f++) {
                    g =
a.aoColumns[d[f][0]].aDataSort; for (h = 0; h < g.length; h++) c.push({ name: "iSortCol_" + e, value: g[h] }), c.push({ name: "sSortDir_" + e, value: d[f][1] }), e++
                } c.push({ name: "iSortingCols", value: e }); for (f = 0; f < b; f++) c.push({ name: "bSortable_" + f, value: a.aoColumns[f].bSortable })
            } return c
        } function ia(a, b) { C(a, "aoServerParams", "serverParams", [b]) } function Fa(a, b) {
            if (b.sEcho !== n) { if (1 * b.sEcho < a.iDraw) return; a.iDraw = 1 * b.sEcho } (!a.oScroll.bInfinite || a.oScroll.bInfinite && (a.bSorted || a.bFiltered)) && ea(a); a._iRecordsTotal = parseInt(b.iTotalRecords,
10); a._iRecordsDisplay = parseInt(b.iTotalDisplayRecords, 10); var c = x(a), c = b.sColumns !== n && "" !== c && b.sColumns != c, d; c && (d = D(a, b.sColumns)); for (var g = W(a.sAjaxDataProp)(b), f = 0, h = g.length; f < h; f++) if (c) { for (var e = [], i = 0, m = a.aoColumns.length; i < m; i++) e.push(g[f][d[i]]); H(a, e) } else H(a, g[f]); a.aiDisplay = a.aiDisplayMaster.slice(); a.bAjaxDataGet = !1; y(a); a.bAjaxDataGet = !0; F(a, !1)
        } function za(a) {
            var b = a.oPreviousSearch, c = a.oLanguage.sSearch, c = -1 !== c.indexOf("_INPUT_") ? c.replace("_INPUT_", '<input type="text" />') :
"" === c ? '<input type="text" />' : c + ' <input type="text" />', d = l.createElement("div"); d.className = a.oClasses.sFilter; d.innerHTML = "<label>" + c + "</label>"; a.aanFeatures.f || (d.id = a.sTableId + "_filter"); c = i('input[type="text"]', d); d._DT_Input = c[0]; c.val(b.sSearch.replace('"', "&quot;")); c.bind("keyup.DT", function () {
    for (var c = a.aanFeatures.f, d = this.value === "" ? "" : this.value, h = 0, e = c.length; h < e; h++) c[h] != i(this).parents("div.dataTables_filter")[0] && i(c[h]._DT_Input).val(d); d != b.sSearch && M(a, { sSearch: d, bRegex: b.bRegex,
        bSmart: b.bSmart, bCaseInsensitive: b.bCaseInsensitive
    })
}); c.attr("aria-controls", a.sTableId).bind("keypress.DT", function (a) { if (a.keyCode == 13) return false }); return d
        } function M(a, b, c) {
            var d = a.oPreviousSearch, g = a.aoPreSearchCols, f = function (a) { d.sSearch = a.sSearch; d.bRegex = a.bRegex; d.bSmart = a.bSmart; d.bCaseInsensitive = a.bCaseInsensitive }; if (a.oFeatures.bServerSide) f(b); else {
                Ga(a, b.sSearch, c, b.bRegex, b.bSmart, b.bCaseInsensitive); f(b); for (b = 0; b < a.aoPreSearchCols.length; b++) Ha(a, g[b].sSearch, b, g[b].bRegex,
g[b].bSmart, g[b].bCaseInsensitive); Ia(a)
            } a.bFiltered = !0; i(a.oInstance).trigger("filter", a); a._iDisplayStart = 0; A(a); y(a); ja(a, 0)
        } function Ia(a) { for (var b = j.ext.afnFiltering, c = 0, d = b.length; c < d; c++) for (var g = 0, f = 0, h = a.aiDisplay.length; f < h; f++) { var e = a.aiDisplay[f - g]; b[c](a, X(a, e, "filter"), e) || (a.aiDisplay.splice(f - g, 1), g++) } } function Ha(a, b, c, d, g, f) {
            if ("" !== b) for (var h = 0, b = ka(b, d, g, f), d = a.aiDisplay.length - 1; 0 <= d; d--) g = la(w(a, a.aiDisplay[d], c, "filter"), a.aoColumns[c].sType), b.test(g) || (a.aiDisplay.splice(d,
1), h++)
        } function Ga(a, b, c, d, g, f) {
            d = ka(b, d, g, f); g = a.oPreviousSearch; c || (c = 0); 0 !== j.ext.afnFiltering.length && (c = 1); if (0 >= b.length) a.aiDisplay.splice(0, a.aiDisplay.length), a.aiDisplay = a.aiDisplayMaster.slice(); else if (a.aiDisplay.length == a.aiDisplayMaster.length || g.sSearch.length > b.length || 1 == c || 0 !== b.indexOf(g.sSearch)) { a.aiDisplay.splice(0, a.aiDisplay.length); ja(a, 1); for (b = 0; b < a.aiDisplayMaster.length; b++) d.test(a.asDataSearch[b]) && a.aiDisplay.push(a.aiDisplayMaster[b]) } else for (b = c = 0; b < a.asDataSearch.length; b++) d.test(a.asDataSearch[b]) ||
(a.aiDisplay.splice(b - c, 1), c++)
        } function ja(a, b) { if (!a.oFeatures.bServerSide) { a.asDataSearch.splice(0, a.asDataSearch.length); for (var c = b && 1 === b ? a.aiDisplayMaster : a.aiDisplay, d = 0, g = c.length; d < g; d++) a.asDataSearch[d] = ma(a, X(a, c[d], "filter")) } } function ma(a, b) {
            var c = ""; a.__nTmpFilter === n && (a.__nTmpFilter = l.createElement("div")); for (var d = a.__nTmpFilter, g = 0, f = a.aoColumns.length; g < f; g++) a.aoColumns[g].bSearchable && (c += la(b[g], a.aoColumns[g].sType) + "  "); -1 !== c.indexOf("&") && (d.innerHTML = c, c = d.textContent ?
d.textContent : d.innerText, c = c.replace(/\n/g, " ").replace(/\r/g, "")); return c
        } function ka(a, b, c, d) { if (c) return a = b ? a.split(" ") : na(a).split(" "), a = "^(?=.*?" + a.join(")(?=.*?") + ").*$", RegExp(a, d ? "i" : ""); a = b ? a : na(a); return RegExp(a, d ? "i" : "") } function la(a, b) { return "function" === typeof j.ext.ofnSearch[b] ? j.ext.ofnSearch[b](a) : null === a ? "" : "html" == b ? a.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "") : "string" === typeof a ? a.replace(/[\r\n]/g, " ") : a } function na(a) {
            return a.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)",
"g"), "\\$1")
        } function Ca(a) { var b = l.createElement("div"); b.className = a.oClasses.sInfo; a.aanFeatures.i || (a.aoDrawCallback.push({ fn: Ja, sName: "information" }), b.id = a.sTableId + "_info"); a.nTable.setAttribute("aria-describedby", a.sTableId + "_info"); return b } function Ja(a) {
            if (a.oFeatures.bInfo && 0 !== a.aanFeatures.i.length) {
                var b = a.oLanguage, c = a._iDisplayStart + 1, d = a.fnDisplayEnd(), g = a.fnRecordsTotal(), f = a.fnRecordsDisplay(), h; h = 0 === f && f == g ? b.sInfoEmpty : 0 === f ? b.sInfoEmpty + " " + b.sInfoFiltered : f == g ? b.sInfo : b.sInfo +
" " + b.sInfoFiltered; h += b.sInfoPostFix; h = ha(a, h); null !== b.fnInfoCallback && (h = b.fnInfoCallback.call(a.oInstance, a, c, d, g, f, h)); a = a.aanFeatures.i; b = 0; for (c = a.length; b < c; b++) i(a[b]).html(h)
            } 
        } function ha(a, b) {
            var c = a.fnFormatNumber(a._iDisplayStart + 1), d = a.fnDisplayEnd(), d = a.fnFormatNumber(d), g = a.fnRecordsDisplay(), g = a.fnFormatNumber(g), f = a.fnRecordsTotal(), f = a.fnFormatNumber(f); a.oScroll.bInfinite && (c = a.fnFormatNumber(1)); return b.replace("_START_", c).replace("_END_", d).replace("_TOTAL_", g).replace("_MAX_",
f)
        } function aa(a) {
            var b, c, d = a.iInitDisplayStart; if (!1 === a.bInitialised) setTimeout(function () { aa(a) }, 200); else {
                xa(a); va(a); U(a, a.aoHeader); a.nTFoot && U(a, a.aoFooter); F(a, !0); a.oFeatures.bAutoWidth && ba(a); b = 0; for (c = a.aoColumns.length; b < c; b++) null !== a.aoColumns[b].sWidth && (a.aoColumns[b].nTh.style.width = q(a.aoColumns[b].sWidth)); a.oFeatures.bSort ? P(a) : a.oFeatures.bFilter ? M(a, a.oPreviousSearch) : (a.aiDisplay = a.aiDisplayMaster.slice(), A(a), y(a)); null !== a.sAjaxSource && !a.oFeatures.bServerSide ? (c = [], ia(a,
c), a.fnServerData.call(a.oInstance, a.sAjaxSource, c, function (c) { var f = a.sAjaxDataProp !== "" ? W(a.sAjaxDataProp)(c) : c; for (b = 0; b < f.length; b++) H(a, f[b]); a.iInitDisplayStart = d; if (a.oFeatures.bSort) P(a); else { a.aiDisplay = a.aiDisplayMaster.slice(); A(a); y(a) } F(a, false); Z(a, c) }, a)) : a.oFeatures.bServerSide || (F(a, !1), Z(a))
            } 
        } function Z(a, b) { a._bInitComplete = !0; C(a, "aoInitComplete", "init", [a, b]) } function oa(a) {
            var b = j.defaults.oLanguage; !a.sEmptyTable && (a.sZeroRecords && "No data available in table" === b.sEmptyTable) &&
p(a, a, "sZeroRecords", "sEmptyTable"); !a.sLoadingRecords && (a.sZeroRecords && "Loading..." === b.sLoadingRecords) && p(a, a, "sZeroRecords", "sLoadingRecords")
        } function ya(a) {
            if (a.oScroll.bInfinite) return null; var b = '<select size="1" ' + ('name="' + a.sTableId + '_length"') + ">", c, d, g = a.aLengthMenu; if (2 == g.length && "object" === typeof g[0] && "object" === typeof g[1]) { c = 0; for (d = g[0].length; c < d; c++) b += '<option value="' + g[0][c] + '">' + g[1][c] + "</option>" } else { c = 0; for (d = g.length; c < d; c++) b += '<option value="' + g[c] + '">' + g[c] + "</option>" } b +=
"</select>"; g = l.createElement("div"); a.aanFeatures.l || (g.id = a.sTableId + "_length"); g.className = a.oClasses.sLength; g.innerHTML = "<label>" + a.oLanguage.sLengthMenu.replace("_MENU_", b) + "</label>"; i('select option[value="' + a._iDisplayLength + '"]', g).attr("selected", !0); i("select", g).bind("change.DT", function () {
    var b = i(this).val(), g = a.aanFeatures.l; c = 0; for (d = g.length; c < d; c++) g[c] != this.parentNode && i("select", g[c]).val(b); a._iDisplayLength = parseInt(b, 10); A(a); if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
        a._iDisplayStart =
a.fnDisplayEnd() - a._iDisplayLength; if (a._iDisplayStart < 0) a._iDisplayStart = 0
    } if (a._iDisplayLength == -1) a._iDisplayStart = 0; y(a)
}); i("select", g).attr("aria-controls", a.sTableId); return g
        } function A(a) { a._iDisplayEnd = !1 === a.oFeatures.bPaginate ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length || -1 == a._iDisplayLength ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength } function Da(a) {
            if (a.oScroll.bInfinite) return null; var b = l.createElement("div"); b.className = a.oClasses.sPaging + a.sPaginationType;
            j.ext.oPagination[a.sPaginationType].fnInit(a, b, function (a) { A(a); y(a) }); a.aanFeatures.p || a.aoDrawCallback.push({ fn: function (a) { j.ext.oPagination[a.sPaginationType].fnUpdate(a, function (a) { A(a); y(a) }) }, sName: "pagination" }); return b
        } function pa(a, b) {
            var c = a._iDisplayStart; if ("number" === typeof b) a._iDisplayStart = b * a._iDisplayLength, a._iDisplayStart > a.fnRecordsDisplay() && (a._iDisplayStart = 0); else if ("first" == b) a._iDisplayStart = 0; else if ("previous" == b) a._iDisplayStart = 0 <= a._iDisplayLength ? a._iDisplayStart -
a._iDisplayLength : 0, 0 > a._iDisplayStart && (a._iDisplayStart = 0); else if ("next" == b) 0 <= a._iDisplayLength ? a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay() && (a._iDisplayStart += a._iDisplayLength) : a._iDisplayStart = 0; else if ("last" == b) if (0 <= a._iDisplayLength) { var d = parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1; a._iDisplayStart = (d - 1) * a._iDisplayLength } else a._iDisplayStart = 0; else E(a, 0, "Unknown paging action: " + b); i(a.oInstance).trigger("page", a); return c != a._iDisplayStart
        } function Aa(a) {
            var b =
l.createElement("div"); a.aanFeatures.r || (b.id = a.sTableId + "_processing"); b.innerHTML = a.oLanguage.sProcessing; b.className = a.oClasses.sProcessing; a.nTable.parentNode.insertBefore(b, a.nTable); return b
        } function F(a, b) { if (a.oFeatures.bProcessing) for (var c = a.aanFeatures.r, d = 0, g = c.length; d < g; d++) c[d].style.visibility = b ? "visible" : "hidden"; i(a.oInstance).trigger("processing", [a, b]) } function Ba(a) {
            if ("" === a.oScroll.sX && "" === a.oScroll.sY) return a.nTable; var b = l.createElement("div"), c = l.createElement("div"), d =
l.createElement("div"), g = l.createElement("div"), f = l.createElement("div"), h = l.createElement("div"), e = a.nTable.cloneNode(!1), j = a.nTable.cloneNode(!1), m = a.nTable.getElementsByTagName("thead")[0], o = 0 === a.nTable.getElementsByTagName("tfoot").length ? null : a.nTable.getElementsByTagName("tfoot")[0], k = a.oClasses; c.appendChild(d); f.appendChild(h); g.appendChild(a.nTable); b.appendChild(c); b.appendChild(g); d.appendChild(e); e.appendChild(m); null !== o && (b.appendChild(f), h.appendChild(j), j.appendChild(o)); b.className =
k.sScrollWrapper; c.className = k.sScrollHead; d.className = k.sScrollHeadInner; g.className = k.sScrollBody; f.className = k.sScrollFoot; h.className = k.sScrollFootInner; a.oScroll.bAutoCss && (c.style.overflow = "hidden", c.style.position = "relative", f.style.overflow = "hidden", g.style.overflow = "auto"); c.style.border = "0"; c.style.width = "100%"; f.style.border = "0"; d.style.width = "" !== a.oScroll.sXInner ? a.oScroll.sXInner : "100%"; e.removeAttribute("id"); e.style.marginLeft = "0"; a.nTable.style.marginLeft = "0"; null !== o && (j.removeAttribute("id"),
j.style.marginLeft = "0"); d = i(a.nTable).children("caption"); 0 < d.length && (d = d[0], "top" === d._captionSide ? e.appendChild(d) : "bottom" === d._captionSide && o && j.appendChild(d)); "" !== a.oScroll.sX && (c.style.width = q(a.oScroll.sX), g.style.width = q(a.oScroll.sX), null !== o && (f.style.width = q(a.oScroll.sX)), i(g).scroll(function () { c.scrollLeft = this.scrollLeft; if (o !== null) f.scrollLeft = this.scrollLeft })); "" !== a.oScroll.sY && (g.style.height = q(a.oScroll.sY)); a.aoDrawCallback.push({ fn: Ka, sName: "scrolling" }); a.oScroll.bInfinite &&
i(g).scroll(function () { if (!a.bDrawing && i(this).scrollTop() !== 0 && i(this).scrollTop() + i(this).height() > i(a.nTable).height() - a.oScroll.iLoadGap && a.fnDisplayEnd() < a.fnRecordsDisplay()) { pa(a, "next"); A(a); y(a) } }); a.nScrollHead = c; a.nScrollFoot = f; return b
        } function Ka(a) {
            var b = a.nScrollHead.getElementsByTagName("div")[0], c = b.getElementsByTagName("table")[0], d = a.nTable.parentNode, g, f, h, e, j, m, o, k, n = [], r = null !== a.nTFoot ? a.nScrollFoot.getElementsByTagName("div")[0] : null, p = null !== a.nTFoot ? r.getElementsByTagName("table")[0] :
null, l = i.browser.msie && 7 >= i.browser.version; i(a.nTable).children("thead, tfoot").remove(); h = i(a.nTHead).clone()[0]; a.nTable.insertBefore(h, a.nTable.childNodes[0]); null !== a.nTFoot && (j = i(a.nTFoot).clone()[0], a.nTable.insertBefore(j, a.nTable.childNodes[1])); "" === a.oScroll.sX && (d.style.width = "100%", b.parentNode.style.width = "100%"); var t = O(a, h); g = 0; for (f = t.length; g < f; g++) o = G(a, g), t[g].style.width = a.aoColumns[o].sWidth; null !== a.nTFoot && N(function (a) { a.style.width = "" }, j.getElementsByTagName("tr")); a.oScroll.bCollapse &&
"" !== a.oScroll.sY && (d.style.height = d.offsetHeight + a.nTHead.offsetHeight + "px"); g = i(a.nTable).outerWidth(); if ("" === a.oScroll.sX) { if (a.nTable.style.width = "100%", l && (i("tbody", d).height() > d.offsetHeight || "scroll" == i(d).css("overflow-y"))) a.nTable.style.width = q(i(a.nTable).outerWidth() - a.oScroll.iBarWidth) } else "" !== a.oScroll.sXInner ? a.nTable.style.width = q(a.oScroll.sXInner) : g == i(d).width() && i(d).height() < i(a.nTable).height() ? (a.nTable.style.width = q(g - a.oScroll.iBarWidth), i(a.nTable).outerWidth() > g - a.oScroll.iBarWidth &&
(a.nTable.style.width = q(g))) : a.nTable.style.width = q(g); g = i(a.nTable).outerWidth(); f = a.nTHead.getElementsByTagName("tr"); h = h.getElementsByTagName("tr"); N(function (a, b) { m = a.style; m.paddingTop = "0"; m.paddingBottom = "0"; m.borderTopWidth = "0"; m.borderBottomWidth = "0"; m.height = 0; k = i(a).width(); b.style.width = q(k); n.push(k) }, h, f); i(h).height(0); null !== a.nTFoot && (e = j.getElementsByTagName("tr"), j = a.nTFoot.getElementsByTagName("tr"), N(function (a, b) {
    m = a.style; m.paddingTop = "0"; m.paddingBottom = "0"; m.borderTopWidth =
"0"; m.borderBottomWidth = "0"; m.height = 0; k = i(a).width(); b.style.width = q(k); n.push(k)
}, e, j), i(e).height(0)); N(function (a) { a.innerHTML = ""; a.style.width = q(n.shift()) }, h); null !== a.nTFoot && N(function (a) { a.innerHTML = ""; a.style.width = q(n.shift()) }, e); if (i(a.nTable).outerWidth() < g) {
                e = d.scrollHeight > d.offsetHeight || "scroll" == i(d).css("overflow-y") ? g + a.oScroll.iBarWidth : g; if (l && (d.scrollHeight > d.offsetHeight || "scroll" == i(d).css("overflow-y"))) a.nTable.style.width = q(e - a.oScroll.iBarWidth); d.style.width = q(e); b.parentNode.style.width =
q(e); null !== a.nTFoot && (r.parentNode.style.width = q(e)); "" === a.oScroll.sX ? E(a, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.") : "" !== a.oScroll.sXInner && E(a, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")
            } else d.style.width = q("100%"), b.parentNode.style.width = q("100%"), null !== a.nTFoot && (r.parentNode.style.width =
q("100%")); "" === a.oScroll.sY && l && (d.style.height = q(a.nTable.offsetHeight + a.oScroll.iBarWidth)); "" !== a.oScroll.sY && a.oScroll.bCollapse && (d.style.height = q(a.oScroll.sY), l = "" !== a.oScroll.sX && a.nTable.offsetWidth > d.offsetWidth ? a.oScroll.iBarWidth : 0, a.nTable.offsetHeight < d.offsetHeight && (d.style.height = q(a.nTable.offsetHeight + l))); l = i(a.nTable).outerWidth(); c.style.width = q(l); b.style.width = q(l); c = i(a.nTable).height() > d.clientHeight || "scroll" == i(d).css("overflow-y"); b.style.paddingRight = c ? a.oScroll.iBarWidth +
"px" : "0px"; null !== a.nTFoot && (p.style.width = q(l), r.style.width = q(l), r.style.paddingRight = c ? a.oScroll.iBarWidth + "px" : "0px"); i(d).scroll(); if (a.bSorted || a.bFiltered) d.scrollTop = 0
        } function N(a, b, c) { for (var d = 0, g = b.length; d < g; d++) for (var f = 0, h = b[d].childNodes.length; f < h; f++) 1 == b[d].childNodes[f].nodeType && (c ? a(b[d].childNodes[f], c[d].childNodes[f]) : a(b[d].childNodes[f])) } function La(a, b) {
            if (!a || null === a || "" === a) return 0; b || (b = l.getElementsByTagName("body")[0]); var c, d = l.createElement("div"); d.style.width =
q(a); b.appendChild(d); c = d.offsetWidth; b.removeChild(d); return c
        } function ba(a) {
            var b = 0, c, d = 0, g = a.aoColumns.length, f, h = i("th", a.nTHead), e = a.nTable.getAttribute("width"); for (f = 0; f < g; f++) a.aoColumns[f].bVisible && (d++, null !== a.aoColumns[f].sWidth && (c = La(a.aoColumns[f].sWidthOrig, a.nTable.parentNode), null !== c && (a.aoColumns[f].sWidth = q(c)), b++)); if (g == h.length && 0 === b && d == g && "" === a.oScroll.sX && "" === a.oScroll.sY) for (f = 0; f < a.aoColumns.length; f++) c = i(h[f]).width(), null !== c && (a.aoColumns[f].sWidth = q(c)); else {
                b =
a.nTable.cloneNode(!1); f = a.nTHead.cloneNode(!0); d = l.createElement("tbody"); c = l.createElement("tr"); b.removeAttribute("id"); b.appendChild(f); null !== a.nTFoot && (b.appendChild(a.nTFoot.cloneNode(!0)), N(function (a) { a.style.width = "" }, b.getElementsByTagName("tr"))); b.appendChild(d); d.appendChild(c); d = i("thead th", b); 0 === d.length && (d = i("tbody tr:eq(0)>td", b)); h = O(a, f); for (f = d = 0; f < g; f++) {
                    var j = a.aoColumns[f]; j.bVisible && null !== j.sWidthOrig && "" !== j.sWidthOrig ? h[f - d].style.width = q(j.sWidthOrig) : j.bVisible ? h[f -
d].style.width = "" : d++
                } for (f = 0; f < g; f++) a.aoColumns[f].bVisible && (d = Ma(a, f), null !== d && (d = d.cloneNode(!0), "" !== a.aoColumns[f].sContentPadding && (d.innerHTML += a.aoColumns[f].sContentPadding), c.appendChild(d))); g = a.nTable.parentNode; g.appendChild(b); "" !== a.oScroll.sX && "" !== a.oScroll.sXInner ? b.style.width = q(a.oScroll.sXInner) : "" !== a.oScroll.sX ? (b.style.width = "", i(b).width() < g.offsetWidth && (b.style.width = q(g.offsetWidth))) : "" !== a.oScroll.sY ? b.style.width = q(g.offsetWidth) : e && (b.style.width = q(e)); b.style.visibility =
"hidden"; Na(a, b); g = i("tbody tr:eq(0)", b).children(); 0 === g.length && (g = O(a, i("thead", b)[0])); if ("" !== a.oScroll.sX) { for (f = d = c = 0; f < a.aoColumns.length; f++) a.aoColumns[f].bVisible && (c = null === a.aoColumns[f].sWidthOrig ? c + i(g[d]).outerWidth() : c + (parseInt(a.aoColumns[f].sWidth.replace("px", ""), 10) + (i(g[d]).outerWidth() - i(g[d]).width())), d++); b.style.width = q(c); a.nTable.style.width = q(c) } for (f = d = 0; f < a.aoColumns.length; f++) a.aoColumns[f].bVisible && (c = i(g[d]).width(), null !== c && 0 < c && (a.aoColumns[f].sWidth = q(c)),
d++); g = i(b).css("width"); a.nTable.style.width = -1 !== g.indexOf("%") ? g : q(i(b).outerWidth()); b.parentNode.removeChild(b)
            } e && (a.nTable.style.width = q(e))
        } function Na(a, b) { "" === a.oScroll.sX && "" !== a.oScroll.sY ? (i(b).width(), b.style.width = q(i(b).outerWidth() - a.oScroll.iBarWidth)) : "" !== a.oScroll.sX && (b.style.width = q(i(b).outerWidth())) } function Ma(a, b) { var c = Oa(a, b); if (0 > c) return null; if (null === a.aoData[c].nTr) { var d = l.createElement("td"); d.innerHTML = w(a, c, b, ""); return d } return L(a, c)[b] } function Oa(a, b) {
            for (var c =
-1, d = -1, g = 0; g < a.aoData.length; g++) { var f = w(a, g, b, "display") + "", f = f.replace(/<.*?>/g, ""); f.length > c && (c = f.length, d = g) } return d
        } function q(a) { if (null === a) return "0px"; if ("number" == typeof a) return 0 > a ? "0px" : a + "px"; var b = a.charCodeAt(a.length - 1); return 48 > b || 57 < b ? a : a + "px" } function Pa() {
            var a = l.createElement("p"), b = a.style; b.width = "100%"; b.height = "200px"; b.padding = "0px"; var c = l.createElement("div"), b = c.style; b.position = "absolute"; b.top = "0px"; b.left = "0px"; b.visibility = "hidden"; b.width = "200px"; b.height = "150px";
            b.padding = "0px"; b.overflow = "hidden"; c.appendChild(a); l.body.appendChild(c); b = a.offsetWidth; c.style.overflow = "scroll"; a = a.offsetWidth; b == a && (a = c.clientWidth); l.body.removeChild(c); return b - a
        } function P(a, b) {
            var c, d, g, f, h, e, o = [], m = [], k = j.ext.oSort, r = a.aoData, l = a.aoColumns, p = a.oLanguage.oAria; if (!a.oFeatures.bServerSide && (0 !== a.aaSorting.length || null !== a.aaSortingFixed)) {
                o = null !== a.aaSortingFixed ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice(); for (c = 0; c < o.length; c++) if (d = o[c][0], g = t(a, d), f =
a.aoColumns[d].sSortDataType, j.ext.afnSortData[f]) if (h = j.ext.afnSortData[f].call(a.oInstance, a, d, g), h.length === r.length) { g = 0; for (f = r.length; g < f; g++) I(a, g, d, h[g]) } else E(a, 0, "Returned data sort array (col " + d + ") is the wrong length"); c = 0; for (d = a.aiDisplayMaster.length; c < d; c++) m[a.aiDisplayMaster[c]] = c; var q = o.length, G; c = 0; for (d = r.length; c < d; c++) for (g = 0; g < q; g++) {
                    G = l[o[g][0]].aDataSort; h = 0; for (e = G.length; h < e; h++) f = l[G[h]].sType, f = k[(f ? f : "string") + "-pre"], r[c]._aSortData[G[h]] = f ? f(w(a, c, G[h], "sort")) :
w(a, c, G[h], "sort")
                } a.aiDisplayMaster.sort(function (a, b) { var c, d, g, f, h; for (c = 0; c < q; c++) { h = l[o[c][0]].aDataSort; d = 0; for (g = h.length; d < g; d++) if (f = l[h[d]].sType, f = k[(f ? f : "string") + "-" + o[c][1]](r[a]._aSortData[h[d]], r[b]._aSortData[h[d]]), 0 !== f) return f } return k["numeric-asc"](m[a], m[b]) })
            } (b === n || b) && !a.oFeatures.bDeferRender && Q(a); c = 0; for (d = a.aoColumns.length; c < d; c++) f = l[c].sTitle.replace(/<.*?>/g, ""), g = l[c].nTh, g.removeAttribute("aria-sort"), g.removeAttribute("aria-label"), l[c].bSortable ? 0 < o.length &&
o[0][0] == c ? (g.setAttribute("aria-sort", "asc" == o[0][1] ? "ascending" : "descending"), g.setAttribute("aria-label", f + ("asc" == (l[c].asSorting[o[0][2] + 1] ? l[c].asSorting[o[0][2] + 1] : l[c].asSorting[0]) ? p.sSortAscending : p.sSortDescending))) : g.setAttribute("aria-label", f + ("asc" == l[c].asSorting[0] ? p.sSortAscending : p.sSortDescending)) : g.setAttribute("aria-label", f); a.bSorted = !0; i(a.oInstance).trigger("sort", a); a.oFeatures.bFilter ? M(a, a.oPreviousSearch, 1) : (a.aiDisplay = a.aiDisplayMaster.slice(), a._iDisplayStart = 0,
A(a), y(a))
        } function ga(a, b, c, d) {
            Qa(b, {}, function (b) {
                if (!1 !== a.aoColumns[c].bSortable) {
                    var f = function () {
                        var d, f; if (b.shiftKey) { for (var e = !1, i = 0; i < a.aaSorting.length; i++) if (a.aaSorting[i][0] == c) { e = !0; d = a.aaSorting[i][0]; f = a.aaSorting[i][2] + 1; a.aoColumns[d].asSorting[f] ? (a.aaSorting[i][1] = a.aoColumns[d].asSorting[f], a.aaSorting[i][2] = f) : a.aaSorting.splice(i, 1); break } !1 === e && a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0]) } else 1 == a.aaSorting.length && a.aaSorting[0][0] == c ? (d = a.aaSorting[0][0], f = a.aaSorting[0][2] +
1, a.aoColumns[d].asSorting[f] || (f = 0), a.aaSorting[0][1] = a.aoColumns[d].asSorting[f], a.aaSorting[0][2] = f) : (a.aaSorting.splice(0, a.aaSorting.length), a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])); P(a)
                    }; a.oFeatures.bProcessing ? (F(a, !0), setTimeout(function () { f(); a.oFeatures.bServerSide || F(a, !1) }, 0)) : f(); "function" == typeof d && d(a)
                } 
            })
        } function Q(a) {
            var b, c, d, g, f, h = a.aoColumns.length, e = a.oClasses; for (b = 0; b < h; b++) a.aoColumns[b].bSortable && i(a.aoColumns[b].nTh).removeClass(e.sSortAsc + " " + e.sSortDesc +
" " + a.aoColumns[b].sSortingClass); g = null !== a.aaSortingFixed ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice(); for (b = 0; b < a.aoColumns.length; b++) if (a.aoColumns[b].bSortable) {
                f = a.aoColumns[b].sSortingClass; d = -1; for (c = 0; c < g.length; c++) if (g[c][0] == b) { f = "asc" == g[c][1] ? e.sSortAsc : e.sSortDesc; d = c; break } i(a.aoColumns[b].nTh).addClass(f); a.bJUI && (c = i("span." + e.sSortIcon, a.aoColumns[b].nTh), c.removeClass(e.sSortJUIAsc + " " + e.sSortJUIDesc + " " + e.sSortJUI + " " + e.sSortJUIAscAllowed + " " + e.sSortJUIDescAllowed),
c.addClass(-1 == d ? a.aoColumns[b].sSortingClassJUI : "asc" == g[d][1] ? e.sSortJUIAsc : e.sSortJUIDesc))
            } else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass); f = e.sSortColumn; if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
                d = L(a); if (a.oFeatures.bDeferRender) i(d).removeClass(f + "1 " + f + "2 " + f + "3"); else if (d.length >= h) for (b = 0; b < h; b++) if (-1 != d[b].className.indexOf(f + "1")) { c = 0; for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(f + "1", "")) } else if (-1 != d[b].className.indexOf(f +
"2")) { c = 0; for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(f + "2", "")) } else if (-1 != d[b].className.indexOf(f + "3")) { c = 0; for (a = d.length / h; c < a; c++) d[h * c + b].className = i.trim(d[h * c + b].className.replace(" " + f + "3", "")) } var e = 1, j; for (b = 0; b < g.length; b++) { j = parseInt(g[b][0], 10); c = 0; for (a = d.length / h; c < a; c++) d[h * c + j].className += " " + f + e; 3 > e && e++ } 
            } 
        } function qa(a) {
            if (a.oFeatures.bStateSave && !a.bDestroying) {
                var b, c; b = a.oScroll.bInfinite; var d = { iCreate: (new Date).getTime(), iStart: b ? 0 : a._iDisplayStart,
                    iEnd: b ? a._iDisplayLength : a._iDisplayEnd, iLength: a._iDisplayLength, aaSorting: i.extend(!0, [], a.aaSorting), oSearch: i.extend(!0, {}, a.oPreviousSearch), aoSearchCols: i.extend(!0, [], a.aoPreSearchCols), abVisCols: []
                }; b = 0; for (c = a.aoColumns.length; b < c; b++) d.abVisCols.push(a.aoColumns[b].bVisible); C(a, "aoStateSaveParams", "stateSaveParams", [a, d]); a.fnStateSave.call(a.oInstance, a, d)
            } 
        } function Ra(a, b) {
            if (a.oFeatures.bStateSave) {
                var c = a.fnStateLoad.call(a.oInstance, a); if (c) {
                    var d = C(a, "aoStateLoadParams", "stateLoadParams",
[a, c]); if (-1 === i.inArray(!1, d)) { a.oLoadedState = i.extend(!0, {}, c); a._iDisplayStart = c.iStart; a.iInitDisplayStart = c.iStart; a._iDisplayEnd = c.iEnd; a._iDisplayLength = c.iLength; a.aaSorting = c.aaSorting.slice(); a.saved_aaSorting = c.aaSorting.slice(); i.extend(a.oPreviousSearch, c.oSearch); i.extend(!0, a.aoPreSearchCols, c.aoSearchCols); b.saved_aoColumns = []; for (d = 0; d < c.abVisCols.length; d++) b.saved_aoColumns[d] = {}, b.saved_aoColumns[d].bVisible = c.abVisCols[d]; C(a, "aoStateLoaded", "stateLoaded", [a, c]) } 
                } 
            } 
        } function Sa(a) {
            for (var b =
V.location.pathname.split("/"), a = a + "_" + b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=", b = l.cookie.split(";"), c = 0; c < b.length; c++) { for (var d = b[c]; " " == d.charAt(0); ) d = d.substring(1, d.length); if (0 === d.indexOf(a)) return decodeURIComponent(d.substring(a.length, d.length)) } return null
        } function u(a) { for (var b = 0; b < j.settings.length; b++) if (j.settings[b].nTable === a) return j.settings[b]; return null } function S(a) { for (var b = [], a = a.aoData, c = 0, d = a.length; c < d; c++) null !== a[c].nTr && b.push(a[c].nTr); return b } function L(a,
b) { var c = [], d, g, f, e, i, j; g = 0; var o = a.aoData.length; b !== n && (g = b, o = b + 1); for (f = g; f < o; f++) if (j = a.aoData[f], null !== j.nTr) { g = []; e = 0; for (i = j.nTr.childNodes.length; e < i; e++) d = j.nTr.childNodes[e].nodeName.toLowerCase(), ("td" == d || "th" == d) && g.push(j.nTr.childNodes[e]); e = d = 0; for (i = a.aoColumns.length; e < i; e++) a.aoColumns[e].bVisible ? c.push(g[e - d]) : (c.push(j._anHidden[e]), d++) } return c } function E(a, b, c) {
    a = null === a ? "DataTables warning: " + c : "DataTables warning (table id = '" + a.sTableId + "'): " + c; if (0 === b) if ("alert" ==
j.ext.sErrMode) alert(a); else throw Error(a); else V.console && console.log && console.log(a)
} function p(a, b, c, d) { d === n && (d = c); b[c] !== n && (a[d] = b[c]) } function Ta(a, b) { for (var c in b) b.hasOwnProperty(c) && ("object" === typeof e[c] && !1 === i.isArray(b[c]) ? i.extend(!0, a[c], b[c]) : a[c] = b[c]); return a } function Qa(a, b, c) { i(a).bind("click.DT", b, function (b) { a.blur(); c(b) }).bind("keypress.DT", b, function (a) { 13 === a.which && c(a) }).bind("selectstart.DT", function () { return !1 }) } function B(a, b, c, d) { c && a[b].push({ fn: c, sName: d }) }
        function C(a, b, c, d) { for (var b = a[b], g = [], f = b.length - 1; 0 <= f; f--) g.push(b[f].fn.apply(a.oInstance, d)); null !== c && i(a.oInstance).trigger(c, d); return g } function Ua(a) { return function () { var b = [u(this[j.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments)); return j.ext.oApi[a].apply(this, b) } } var Va = V.JSON ? JSON.stringify : function (a) {
            var b = typeof a; if ("object" !== b || null === a) return "string" === b && (a = '"' + a + '"'), a + ""; var c, d, g = [], f = i.isArray(a); for (c in a) d = a[c], b = typeof d, "string" === b ? d = '"' + d + '"' : "object" ===
b && null !== d && (d = Va(d)), g.push((f ? "" : '"' + c + '":') + d); return (f ? "[" : "{") + g + (f ? "]" : "}")
        }; this.$ = function (a, b) {
            var c, d, g = [], f; d = u(this[j.ext.iApiIndex]); var e = d.aoData, o = d.aiDisplay, k = d.aiDisplayMaster; b || (b = {}); b = i.extend({}, { filter: "none", order: "current", page: "all" }, b); if ("current" == b.page) { c = d._iDisplayStart; for (d = d.fnDisplayEnd(); c < d; c++) (f = e[o[c]].nTr) && g.push(f) } else if ("current" == b.order && "none" == b.filter) { c = 0; for (d = k.length; c < d; c++) (f = e[k[c]].nTr) && g.push(f) } else if ("current" == b.order && "applied" ==
b.filter) { c = 0; for (d = o.length; c < d; c++) (f = e[o[c]].nTr) && g.push(f) } else if ("original" == b.order && "none" == b.filter) { c = 0; for (d = e.length; c < d; c++) (f = e[c].nTr) && g.push(f) } else if ("original" == b.order && "applied" == b.filter) { c = 0; for (d = e.length; c < d; c++) f = e[c].nTr, -1 !== i.inArray(c, o) && f && g.push(f) } else E(d, 1, "Unknown selection options"); g = i(g); c = g.filter(a); g = g.find(a); return i([].concat(i.makeArray(c), i.makeArray(g)))
        }; this._ = function (a, b) {
            var c = [], d, g, e = this.$(a, b); d = 0; for (g = e.length; d < g; d++) c.push(this.fnGetData(e[d]));
            return c
        }; this.fnAddData = function (a, b) { if (0 === a.length) return []; var c = [], d, g = u(this[j.ext.iApiIndex]); if ("object" === typeof a[0] && null !== a[0]) for (var e = 0; e < a.length; e++) { d = H(g, a[e]); if (-1 == d) return c; c.push(d) } else { d = H(g, a); if (-1 == d) return c; c.push(d) } g.aiDisplay = g.aiDisplayMaster.slice(); (b === n || b) && $(g); return c }; this.fnAdjustColumnSizing = function (a) { var b = u(this[j.ext.iApiIndex]); k(b); a === n || a ? this.fnDraw(!1) : ("" !== b.oScroll.sX || "" !== b.oScroll.sY) && this.oApi._fnScrollDraw(b) }; this.fnClearTable =
function (a) { var b = u(this[j.ext.iApiIndex]); ea(b); (a === n || a) && y(b) }; this.fnClose = function (a) { for (var b = u(this[j.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent == a) return (a = b.aoOpenRows[c].nTr.parentNode) && a.removeChild(b.aoOpenRows[c].nTr), b.aoOpenRows.splice(c, 1), 0; return 1 }; this.fnDeleteRow = function (a, b, c) {
    var d = u(this[j.ext.iApiIndex]), g, e, a = "object" === typeof a ? K(d, a) : a, h = d.aoData.splice(a, 1); g = 0; for (e = d.aoData.length; g < e; g++) null !== d.aoData[g].nTr && (d.aoData[g].nTr._DT_RowIndex =
g); g = i.inArray(a, d.aiDisplay); d.asDataSearch.splice(g, 1); fa(d.aiDisplayMaster, a); fa(d.aiDisplay, a); "function" === typeof b && b.call(this, d, h); d._iDisplayStart >= d.fnRecordsDisplay() && (d._iDisplayStart -= d._iDisplayLength, 0 > d._iDisplayStart && (d._iDisplayStart = 0)); if (c === n || c) A(d), y(d); return h
}; this.fnDestroy = function (a) {
    var b = u(this[j.ext.iApiIndex]), c = b.nTableWrapper.parentNode, d = b.nTBody, g, e, a = a === n ? !1 : !0; b.bDestroying = !0; C(b, "aoDestroyCallback", "destroy", [b]); g = 0; for (e = b.aoColumns.length; g < e; g++) !1 ===
b.aoColumns[g].bVisible && this.fnSetColumnVis(g, !0); i(b.nTableWrapper).find("*").andSelf().unbind(".DT"); i("tbody>tr>td." + b.oClasses.sRowEmpty, b.nTable).parent().remove(); b.nTable != b.nTHead.parentNode && (i(b.nTable).children("thead").remove(), b.nTable.appendChild(b.nTHead)); b.nTFoot && b.nTable != b.nTFoot.parentNode && (i(b.nTable).children("tfoot").remove(), b.nTable.appendChild(b.nTFoot)); b.nTable.parentNode.removeChild(b.nTable); i(b.nTableWrapper).remove(); b.aaSorting = []; b.aaSortingFixed = []; Q(b); i(S(b)).removeClass(b.asStripeClasses.join(" "));
    i("th, td", b.nTHead).removeClass([b.oClasses.sSortable, b.oClasses.sSortableAsc, b.oClasses.sSortableDesc, b.oClasses.sSortableNone].join(" ")); b.bJUI && (i("th span." + b.oClasses.sSortIcon + ", td span." + b.oClasses.sSortIcon, b.nTHead).remove(), i("th, td", b.nTHead).each(function () { var a = i("div." + b.oClasses.sSortJUIWrapper, this), c = a.contents(); i(this).append(c); a.remove() })); !a && b.nTableReinsertBefore ? c.insertBefore(b.nTable, b.nTableReinsertBefore) : a || c.appendChild(b.nTable); g = 0; for (e = b.aoData.length; g < e; g++) null !==
b.aoData[g].nTr && d.appendChild(b.aoData[g].nTr); !0 === b.oFeatures.bAutoWidth && (b.nTable.style.width = q(b.sDestroyWidth)); i(d).children("tr:even").addClass(b.asDestroyStripes[0]); i(d).children("tr:odd").addClass(b.asDestroyStripes[1]); g = 0; for (e = j.settings.length; g < e; g++) j.settings[g] == b && j.settings.splice(g, 1); b = null
}; this.fnDraw = function (a) { var b = u(this[j.ext.iApiIndex]); !1 === a ? (A(b), y(b)) : $(b) }; this.fnFilter = function (a, b, c, d, e, f) {
    var h = u(this[j.ext.iApiIndex]); if (h.oFeatures.bFilter) {
        if (c === n || null ===
c) c = !1; if (d === n || null === d) d = !0; if (e === n || null === e) e = !0; if (f === n || null === f) f = !0; if (b === n || null === b) { if (M(h, { sSearch: a + "", bRegex: c, bSmart: d, bCaseInsensitive: f }, 1), e && h.aanFeatures.f) { b = h.aanFeatures.f; c = 0; for (d = b.length; c < d; c++) i(b[c]._DT_Input).val(a) } } else i.extend(h.aoPreSearchCols[b], { sSearch: a + "", bRegex: c, bSmart: d, bCaseInsensitive: f }), M(h, h.oPreviousSearch, 1)
    } 
}; this.fnGetData = function (a, b) {
    var c = u(this[j.ext.iApiIndex]); if (a !== n) {
        var d = a; if ("object" === typeof a) {
            var e = a.nodeName.toLowerCase(); "tr" ===
e ? d = K(c, a) : "td" === e && (d = K(c, a.parentNode), b = da(c, d, a))
        } return b !== n ? w(c, d, b, "") : c.aoData[d] !== n ? c.aoData[d]._aData : null
    } return Y(c)
}; this.fnGetNodes = function (a) { var b = u(this[j.ext.iApiIndex]); return a !== n ? b.aoData[a] !== n ? b.aoData[a].nTr : null : S(b) }; this.fnGetPosition = function (a) { var b = u(this[j.ext.iApiIndex]), c = a.nodeName.toUpperCase(); return "TR" == c ? K(b, a) : "TD" == c || "TH" == c ? (c = K(b, a.parentNode), a = da(b, c, a), [c, t(b, a), a]) : null }; this.fnIsOpen = function (a) {
    for (var b = u(this[j.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent ==
a) return !0; return !1
}; this.fnOpen = function (a, b, c) { var d = u(this[j.ext.iApiIndex]), e = S(d); if (-1 !== i.inArray(a, e)) { this.fnClose(a); var e = l.createElement("tr"), f = l.createElement("td"); e.appendChild(f); f.className = c; f.colSpan = v(d); "string" === typeof b ? f.innerHTML = b : i(f).html(b); b = i("tr", d.nTBody); -1 != i.inArray(a, b) && i(e).insertAfter(a); d.aoOpenRows.push({ nTr: e, nParent: a }); return e } }; this.fnPageChange = function (a, b) { var c = u(this[j.ext.iApiIndex]); pa(c, a); A(c); (b === n || b) && y(c) }; this.fnSetColumnVis = function (a,
b, c) {
    var d = u(this[j.ext.iApiIndex]), e, f, h = d.aoColumns, i = d.aoData, o, m; if (h[a].bVisible != b) {
        if (b) { for (e = f = 0; e < a; e++) h[e].bVisible && f++; m = f >= v(d); if (!m) for (e = a; e < h.length; e++) if (h[e].bVisible) { o = e; break } e = 0; for (f = i.length; e < f; e++) null !== i[e].nTr && (m ? i[e].nTr.appendChild(i[e]._anHidden[a]) : i[e].nTr.insertBefore(i[e]._anHidden[a], L(d, e)[o])) } else { e = 0; for (f = i.length; e < f; e++) null !== i[e].nTr && (o = L(d, e)[a], i[e]._anHidden[a] = o, o.parentNode.removeChild(o)) } h[a].bVisible = b; U(d, d.aoHeader); d.nTFoot && U(d, d.aoFooter);
        e = 0; for (f = d.aoOpenRows.length; e < f; e++) d.aoOpenRows[e].nTr.colSpan = v(d); if (c === n || c) k(d), y(d); qa(d)
    } 
}; this.fnSettings = function () { return u(this[j.ext.iApiIndex]) }; this.fnSort = function (a) { var b = u(this[j.ext.iApiIndex]); b.aaSorting = a; P(b) }; this.fnSortListener = function (a, b, c) { ga(u(this[j.ext.iApiIndex]), a, b, c) }; this.fnUpdate = function (a, b, c, d, e) {
    var f = u(this[j.ext.iApiIndex]), b = "object" === typeof b ? K(f, b) : b; if (f.__fnUpdateDeep === n && i.isArray(a) && "object" === typeof a) {
        f.aoData[b]._aData = a.slice(); f.__fnUpdateDeep =
!0; for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(w(f, b, c), b, c, !1, !1); f.__fnUpdateDeep = n
    } else if (f.__fnUpdateDeep === n && null !== a && "object" === typeof a) { f.aoData[b]._aData = i.extend(!0, {}, a); f.__fnUpdateDeep = !0; for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(w(f, b, c), b, c, !1, !1); f.__fnUpdateDeep = n } else { I(f, b, c, a); var a = w(f, b, c, "display"), h = f.aoColumns[c]; null !== h.fnRender && (a = R(f, b, c), h.bUseRendered && I(f, b, c, a)); null !== f.aoData[b].nTr && (L(f, b)[c].innerHTML = a) } c = i.inArray(b, f.aiDisplay); f.asDataSearch[c] =
ma(f, X(f, b, "filter")); (e === n || e) && k(f); (d === n || d) && $(f); return 0
}; this.fnVersionCheck = j.ext.fnVersionCheck; this.oApi = { _fnExternApiFunc: Ua, _fnInitialise: aa, _fnInitComplete: Z, _fnLanguageCompat: oa, _fnAddColumn: o, _fnColumnOptions: r, _fnAddData: H, _fnCreateTr: ca, _fnGatherData: ua, _fnBuildHead: va, _fnDrawHead: U, _fnDraw: y, _fnReDraw: $, _fnAjaxUpdate: wa, _fnAjaxParameters: Ea, _fnAjaxUpdateDraw: Fa, _fnServerParams: ia, _fnAddOptionsHtml: xa, _fnFeatureHtmlTable: Ba, _fnScrollDraw: Ka, _fnAdjustColumnSizing: k, _fnFeatureHtmlFilter: za,
    _fnFilterComplete: M, _fnFilterCustom: Ia, _fnFilterColumn: Ha, _fnFilter: Ga, _fnBuildSearchArray: ja, _fnBuildSearchRow: ma, _fnFilterCreateSearch: ka, _fnDataToSearch: la, _fnSort: P, _fnSortAttachListener: ga, _fnSortingClasses: Q, _fnFeatureHtmlPaginate: Da, _fnPageChange: pa, _fnFeatureHtmlInfo: Ca, _fnUpdateInfo: Ja, _fnFeatureHtmlLength: ya, _fnFeatureHtmlProcessing: Aa, _fnProcessingDisplay: F, _fnVisibleToColumnIndex: G, _fnColumnIndexToVisible: t, _fnNodeToDataIndex: K, _fnVisbleColumns: v, _fnCalculateEnd: A, _fnConvertToWidth: La,
    _fnCalculateColumnWidths: ba, _fnScrollingWidthAdjust: Na, _fnGetWidestNode: Ma, _fnGetMaxLenString: Oa, _fnStringToCss: q, _fnDetectType: z, _fnSettingsFromNode: u, _fnGetDataMaster: Y, _fnGetTrNodes: S, _fnGetTdNodes: L, _fnEscapeRegex: na, _fnDeleteIndex: fa, _fnReOrderIndex: D, _fnColumnOrdering: x, _fnLog: E, _fnClearTable: ea, _fnSaveState: qa, _fnLoadState: Ra, _fnCreateCookie: function (a, b, c, d, e) {
        var f = new Date; f.setTime(f.getTime() + 1E3 * c); var c = V.location.pathname.split("/"), a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase(),
h; null !== e ? (h = "function" === typeof i.parseJSON ? i.parseJSON(b) : eval("(" + b + ")"), b = e(a, h, f.toGMTString(), c.join("/") + "/")) : b = a + "=" + encodeURIComponent(b) + "; expires=" + f.toGMTString() + "; path=" + c.join("/") + "/"; e = ""; f = 9999999999999; if (4096 < (null !== Sa(a) ? l.cookie.length : b.length + l.cookie.length) + 10) {
            for (var a = l.cookie.split(";"), o = 0, j = a.length; o < j; o++) if (-1 != a[o].indexOf(d)) { var k = a[o].split("="); try { h = eval("(" + decodeURIComponent(k[1]) + ")") } catch (r) { continue } h.iCreate && h.iCreate < f && (e = k[0], f = h.iCreate) } "" !==
e && (l.cookie = e + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("/") + "/")
        } l.cookie = b
    }, _fnReadCookie: Sa, _fnDetectHeader: T, _fnGetUniqueThs: O, _fnScrollBarWidth: Pa, _fnApplyToChildren: N, _fnMap: p, _fnGetRowData: X, _fnGetCellData: w, _fnSetCellData: I, _fnGetObjectDataFn: W, _fnSetObjectDataFn: ta, _fnApplyColumnDefs: J, _fnBindAction: Qa, _fnExtend: Ta, _fnCallbackReg: B, _fnCallbackFire: C, _fnJsonString: Va, _fnRender: R, _fnNodeToColumnIndex: da, _fnInfoMacros: ha
}; i.extend(j.ext.oApi, this.oApi); for (var ra in j.ext.oApi) ra &&
(this[ra] = Ua(ra)); var sa = this; return this.each(function () {
    var a = 0, b, c, d; c = this.getAttribute("id"); var g = !1, f = !1; if ("table" != this.nodeName.toLowerCase()) E(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName); else {
        a = 0; for (b = j.settings.length; a < b; a++) {
            if (j.settings[a].nTable == this) {
                if (e === n || e.bRetrieve) return j.settings[a].oInstance; if (e.bDestroy) { j.settings[a].oInstance.fnDestroy(); break } else {
                    E(j.settings[a], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy");
                    return
                } 
            } if (j.settings[a].sTableId == this.id) { j.settings.splice(a, 1); break } 
        } if (null === c || "" === c) this.id = c = "DataTables_Table_" + j.ext._oExternConfig.iNextUnique++; var h = i.extend(!0, {}, j.models.oSettings, { nTable: this, oApi: sa.oApi, oInit: e, sDestroyWidth: i(this).width(), sInstance: c, sTableId: c }); j.settings.push(h); h.oInstance = 1 === sa.length ? sa : i(this).dataTable(); e || (e = {}); e.oLanguage && oa(e.oLanguage); e = Ta(i.extend(!0, {}, j.defaults), e); p(h.oFeatures, e, "bPaginate"); p(h.oFeatures, e, "bLengthChange"); p(h.oFeatures,
e, "bFilter"); p(h.oFeatures, e, "bSort"); p(h.oFeatures, e, "bInfo"); p(h.oFeatures, e, "bProcessing"); p(h.oFeatures, e, "bAutoWidth"); p(h.oFeatures, e, "bSortClasses"); p(h.oFeatures, e, "bServerSide"); p(h.oFeatures, e, "bDeferRender"); p(h.oScroll, e, "sScrollX", "sX"); p(h.oScroll, e, "sScrollXInner", "sXInner"); p(h.oScroll, e, "sScrollY", "sY"); p(h.oScroll, e, "bScrollCollapse", "bCollapse"); p(h.oScroll, e, "bScrollInfinite", "bInfinite"); p(h.oScroll, e, "iScrollLoadGap", "iLoadGap"); p(h.oScroll, e, "bScrollAutoCss", "bAutoCss"); p(h,
e, "asStripeClasses"); p(h, e, "asStripClasses", "asStripeClasses"); p(h, e, "fnServerData"); p(h, e, "fnFormatNumber"); p(h, e, "sServerMethod"); p(h, e, "aaSorting"); p(h, e, "aaSortingFixed"); p(h, e, "aLengthMenu"); p(h, e, "sPaginationType"); p(h, e, "sAjaxSource"); p(h, e, "sAjaxDataProp"); p(h, e, "iCookieDuration"); p(h, e, "sCookiePrefix"); p(h, e, "sDom"); p(h, e, "bSortCellsTop"); p(h, e, "iTabIndex"); p(h, e, "oSearch", "oPreviousSearch"); p(h, e, "aoSearchCols", "aoPreSearchCols"); p(h, e, "iDisplayLength", "_iDisplayLength"); p(h, e, "bJQueryUI",
"bJUI"); p(h, e, "fnCookieCallback"); p(h, e, "fnStateLoad"); p(h, e, "fnStateSave"); p(h.oLanguage, e, "fnInfoCallback"); B(h, "aoDrawCallback", e.fnDrawCallback, "user"); B(h, "aoServerParams", e.fnServerParams, "user"); B(h, "aoStateSaveParams", e.fnStateSaveParams, "user"); B(h, "aoStateLoadParams", e.fnStateLoadParams, "user"); B(h, "aoStateLoaded", e.fnStateLoaded, "user"); B(h, "aoRowCallback", e.fnRowCallback, "user"); B(h, "aoRowCreatedCallback", e.fnCreatedRow, "user"); B(h, "aoHeaderCallback", e.fnHeaderCallback, "user"); B(h, "aoFooterCallback",
e.fnFooterCallback, "user"); B(h, "aoInitComplete", e.fnInitComplete, "user"); B(h, "aoPreDrawCallback", e.fnPreDrawCallback, "user"); h.oFeatures.bServerSide && h.oFeatures.bSort && h.oFeatures.bSortClasses ? B(h, "aoDrawCallback", Q, "server_side_sort_classes") : h.oFeatures.bDeferRender && B(h, "aoDrawCallback", Q, "defer_sort_classes"); e.bJQueryUI ? (i.extend(h.oClasses, j.ext.oJUIClasses), e.sDom === j.defaults.sDom && "lfrtip" === j.defaults.sDom && (h.sDom = '<"H"lfr>t<"F"ip>')) : i.extend(h.oClasses, j.ext.oStdClasses); i(this).addClass(h.oClasses.sTable);
        if ("" !== h.oScroll.sX || "" !== h.oScroll.sY) h.oScroll.iBarWidth = Pa(); h.iInitDisplayStart === n && (h.iInitDisplayStart = e.iDisplayStart, h._iDisplayStart = e.iDisplayStart); e.bStateSave && (h.oFeatures.bStateSave = !0, Ra(h, e), B(h, "aoDrawCallback", qa, "state_save")); null !== e.iDeferLoading && (h.bDeferLoading = !0, a = i.isArray(e.iDeferLoading), h._iRecordsDisplay = a ? e.iDeferLoading[0] : e.iDeferLoading, h._iRecordsTotal = a ? e.iDeferLoading[1] : e.iDeferLoading); null !== e.aaData && (f = !0); "" !== e.oLanguage.sUrl ? (h.oLanguage.sUrl = e.oLanguage.sUrl,
i.getJSON(h.oLanguage.sUrl, null, function (a) { oa(a); i.extend(true, h.oLanguage, e.oLanguage, a); aa(h) }), g = !0) : i.extend(!0, h.oLanguage, e.oLanguage); null === e.asStripeClasses && (h.asStripeClasses = [h.oClasses.sStripeOdd, h.oClasses.sStripeEven]); c = !1; d = i(this).children("tbody").children("tr"); a = 0; for (b = h.asStripeClasses.length; a < b; a++) if (d.filter(":lt(2)").hasClass(h.asStripeClasses[a])) { c = !0; break } c && (h.asDestroyStripes = ["", ""], i(d[0]).hasClass(h.oClasses.sStripeOdd) && (h.asDestroyStripes[0] += h.oClasses.sStripeOdd +
" "), i(d[0]).hasClass(h.oClasses.sStripeEven) && (h.asDestroyStripes[0] += h.oClasses.sStripeEven), i(d[1]).hasClass(h.oClasses.sStripeOdd) && (h.asDestroyStripes[1] += h.oClasses.sStripeOdd + " "), i(d[1]).hasClass(h.oClasses.sStripeEven) && (h.asDestroyStripes[1] += h.oClasses.sStripeEven), d.removeClass(h.asStripeClasses.join(" "))); c = []; a = this.getElementsByTagName("thead"); 0 !== a.length && (T(h.aoHeader, a[0]), c = O(h)); if (null === e.aoColumns) { d = []; a = 0; for (b = c.length; a < b; a++) d.push(null) } else d = e.aoColumns; a = 0; for (b =
d.length; a < b; a++) e.saved_aoColumns !== n && e.saved_aoColumns.length == b && (null === d[a] && (d[a] = {}), d[a].bVisible = e.saved_aoColumns[a].bVisible), o(h, c ? c[a] : null); J(h, e.aoColumnDefs, d, function (a, b) { r(h, a, b) }); a = 0; for (b = h.aaSorting.length; a < b; a++) {
            h.aaSorting[a][0] >= h.aoColumns.length && (h.aaSorting[a][0] = 0); var k = h.aoColumns[h.aaSorting[a][0]]; h.aaSorting[a][2] === n && (h.aaSorting[a][2] = 0); e.aaSorting === n && h.saved_aaSorting === n && (h.aaSorting[a][1] = k.asSorting[0]); c = 0; for (d = k.asSorting.length; c < d; c++) if (h.aaSorting[a][1] ==
k.asSorting[c]) { h.aaSorting[a][2] = c; break } 
        } Q(h); a = i(this).children("caption").each(function () { this._captionSide = i(this).css("caption-side") }); b = i(this).children("thead"); 0 === b.length && (b = [l.createElement("thead")], this.appendChild(b[0])); h.nTHead = b[0]; b = i(this).children("tbody"); 0 === b.length && (b = [l.createElement("tbody")], this.appendChild(b[0])); h.nTBody = b[0]; h.nTBody.setAttribute("role", "alert"); h.nTBody.setAttribute("aria-live", "polite"); h.nTBody.setAttribute("aria-relevant", "all"); b = i(this).children("tfoot");
        if (0 === b.length && 0 < a.length && ("" !== h.oScroll.sX || "" !== h.oScroll.sY)) b = [l.createElement("tfoot")], this.appendChild(b[0]); 0 < b.length && (h.nTFoot = b[0], T(h.aoFooter, h.nTFoot)); if (f) for (a = 0; a < e.aaData.length; a++) H(h, e.aaData[a]); else ua(h); h.aiDisplay = h.aiDisplayMaster.slice(); h.bInitialised = !0; !1 === g && aa(h)
    } 
})
    }; j.fnVersionCheck = function (e) {
        for (var i = function (e, i) { for (; e.length < i; ) e += "0"; return e }, r = j.ext.sVersion.split("."), e = e.split("."), k = "", n = "", l = 0, v = e.length; l < v; l++) k += i(r[l], 3), n += i(e[l], 3); return parseInt(k,
10) >= parseInt(n, 10)
    }; j.fnIsDataTable = function (e) { for (var i = j.settings, r = 0; r < i.length; r++) if (i[r].nTable === e || i[r].nScrollHead === e || i[r].nScrollFoot === e) return !0; return !1 }; j.fnTables = function (e) { var o = []; jQuery.each(j.settings, function (j, k) { (!e || !0 === e && i(k.nTable).is(":visible")) && o.push(k.nTable) }); return o }; j.version = "1.9.2"; j.settings = []; j.models = {}; j.models.ext = { afnFiltering: [], afnSortData: [], aoFeatures: [], aTypes: [], fnVersionCheck: j.fnVersionCheck, iApiIndex: 0, ofnSearch: {}, oApi: {}, oStdClasses: {},
        oJUIClasses: {}, oPagination: {}, oSort: {}, sVersion: j.version, sErrMode: "alert", _oExternConfig: { iNextUnique: 0}
    }; j.models.oSearch = { bCaseInsensitive: !0, sSearch: "", bRegex: !1, bSmart: !0 }; j.models.oRow = { nTr: null, _aData: [], _aSortData: [], _anHidden: [], _sRowStripe: "" }; j.models.oColumn = { aDataSort: null, asSorting: null, bSearchable: null, bSortable: null, bUseRendered: null, bVisible: null, _bAutoType: !0, fnCreatedCell: null, fnGetData: null, fnRender: null, fnSetData: null, mDataProp: null, nTh: null, nTf: null, sClass: null, sContentPadding: null,
        sDefaultContent: null, sName: null, sSortDataType: "std", sSortingClass: null, sSortingClassJUI: null, sTitle: null, sType: null, sWidth: null, sWidthOrig: null
    }; j.defaults = { aaData: null, aaSorting: [[0, "asc"]], aaSortingFixed: null, aLengthMenu: [10, 25, 50, 100], aoColumns: null, aoColumnDefs: null, aoSearchCols: [], asStripeClasses: null, bAutoWidth: !0, bDeferRender: !1, bDestroy: !1, bFilter: !0, bInfo: !0, bJQueryUI: !1, bLengthChange: !0, bPaginate: !0, bProcessing: !1, bRetrieve: !1, bScrollAutoCss: !0, bScrollCollapse: !1, bScrollInfinite: !1, bServerSide: !1,
        bSort: !0, bSortCellsTop: !1, bSortClasses: !0, bStateSave: !1, fnCookieCallback: null, fnCreatedRow: null, fnDrawCallback: null, fnFooterCallback: null, fnFormatNumber: function (e) { if (1E3 > e) return e; for (var i = e + "", e = i.split(""), j = "", i = i.length, k = 0; k < i; k++) 0 === k % 3 && 0 !== k && (j = this.oLanguage.sInfoThousands + j), j = e[i - k - 1] + j; return j }, fnHeaderCallback: null, fnInfoCallback: null, fnInitComplete: null, fnPreDrawCallback: null, fnRowCallback: null, fnServerData: function (e, j, n, k) {
            k.jqXHR = i.ajax({ url: e, data: j, success: function (e) {
                i(k.oInstance).trigger("xhr",
k); n(e)
            }, dataType: "json", cache: !1, type: k.sServerMethod, error: function (e, i) { "parsererror" == i && k.oApi._fnLog(k, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.") } 
            })
        }, fnServerParams: null, fnStateLoad: function (e) { var e = this.oApi._fnReadCookie(e.sCookiePrefix + e.sInstance), j; try { j = "function" === typeof i.parseJSON ? i.parseJSON(e) : eval("(" + e + ")") } catch (n) { j = null } return j }, fnStateLoadParams: null, fnStateLoaded: null, fnStateSave: function (e, i) {
            this.oApi._fnCreateCookie(e.sCookiePrefix +
e.sInstance, this.oApi._fnJsonString(i), e.iCookieDuration, e.sCookiePrefix, e.fnCookieCallback)
        }, fnStateSaveParams: null, iCookieDuration: 7200, iDeferLoading: null, iDisplayLength: 10, iDisplayStart: 0, iScrollLoadGap: 100, iTabIndex: 0, oLanguage: { oAria: { sSortAscending: ": activate to sort column ascending", sSortDescending: ": activate to sort column descending" }, oPaginate: { sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous" }, sEmptyTable: "No data available in table", sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries", sInfoFiltered: "(filtered from _MAX_ total entries)", sInfoPostFix: "", sInfoThousands: ",", sLengthMenu: "Show _MENU_ entries", sLoadingRecords: "Loading...", sProcessing: "Processing...", sSearch: "Search:", sUrl: "", sZeroRecords: "No matching records found"
        }, oSearch: i.extend({}, j.models.oSearch), sAjaxDataProp: "aaData", sAjaxSource: null, sCookiePrefix: "SpryMedia_DataTables_", sDom: "lfrtip", sPaginationType: "two_button", sScrollX: "", sScrollXInner: "", sScrollY: "", sServerMethod: "GET"
    };
    j.defaults.columns = { aDataSort: null, asSorting: ["asc", "desc"], bSearchable: !0, bSortable: !0, bUseRendered: !0, bVisible: !0, fnCreatedCell: null, fnRender: null, iDataSort: -1, mDataProp: null, sCellType: "td", sClass: "", sContentPadding: "", sDefaultContent: null, sName: "", sSortDataType: "std", sTitle: null, sType: null, sWidth: null }; j.models.oSettings = { oFeatures: { bAutoWidth: null, bDeferRender: null, bFilter: null, bInfo: null, bLengthChange: null, bPaginate: null, bProcessing: null, bServerSide: null, bSort: null, bSortClasses: null, bStateSave: null },
        oScroll: { bAutoCss: null, bCollapse: null, bInfinite: null, iBarWidth: 0, iLoadGap: null, sX: null, sXInner: null, sY: null }, oLanguage: { fnInfoCallback: null }, aanFeatures: [], aoData: [], aiDisplay: [], aiDisplayMaster: [], aoColumns: [], aoHeader: [], aoFooter: [], asDataSearch: [], oPreviousSearch: {}, aoPreSearchCols: [], aaSorting: null, aaSortingFixed: null, asStripeClasses: null, asDestroyStripes: [], sDestroyWidth: 0, aoRowCallback: [], aoHeaderCallback: [], aoFooterCallback: [], aoDrawCallback: [], aoRowCreatedCallback: [], aoPreDrawCallback: [],
        aoInitComplete: [], aoStateSaveParams: [], aoStateLoadParams: [], aoStateLoaded: [], sTableId: "", nTable: null, nTHead: null, nTFoot: null, nTBody: null, nTableWrapper: null, bDeferLoading: !1, bInitialised: !1, aoOpenRows: [], sDom: null, sPaginationType: "two_button", iCookieDuration: 0, sCookiePrefix: "", fnCookieCallback: null, aoStateSave: [], aoStateLoad: [], oLoadedState: null, sAjaxSource: null, sAjaxDataProp: null, bAjaxDataGet: !0, jqXHR: null, fnServerData: null, aoServerParams: [], sServerMethod: null, fnFormatNumber: null, aLengthMenu: null,
        iDraw: 0, bDrawing: !1, iDrawError: -1, _iDisplayLength: 10, _iDisplayStart: 0, _iDisplayEnd: 10, _iRecordsTotal: 0, _iRecordsDisplay: 0, bJUI: null, oClasses: {}, bFiltered: !1, bSorted: !1, bSortCellsTop: null, oInit: null, aoDestroyCallback: [], fnRecordsTotal: function () { return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length }, fnRecordsDisplay: function () { return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length }, fnDisplayEnd: function () {
            return this.oFeatures.bServerSide ?
!1 === this.oFeatures.bPaginate || -1 == this._iDisplayLength ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
        }, oInstance: null, sInstance: null, iTabIndex: 0, nScrollHead: null, nScrollFoot: null
    }; j.ext = i.extend(!0, {}, j.models.ext); i.extend(j.ext.oStdClasses, { sTable: "dataTable", sPagePrevEnabled: "paginate_enabled_previous", sPagePrevDisabled: "paginate_disabled_previous", sPageNextEnabled: "paginate_enabled_next", sPageNextDisabled: "paginate_disabled_next",
        sPageJUINext: "", sPageJUIPrev: "", sPageButton: "paginate_button", sPageButtonActive: "paginate_active", sPageButtonStaticDisabled: "paginate_button paginate_button_disabled", sPageFirst: "first", sPagePrevious: "previous", sPageNext: "next", sPageLast: "last", sStripeOdd: "odd", sStripeEven: "even", sRowEmpty: "dataTables_empty", sWrapper: "dataTables_wrapper", sFilter: "dataTables_filter", sInfo: "dataTables_info", sPaging: "dataTables_paginate paging_", sLength: "dataTables_length", sProcessing: "dataTables_processing", sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc", sSortable: "sorting", sSortableAsc: "sorting_asc_disabled", sSortableDesc: "sorting_desc_disabled", sSortableNone: "sorting_disabled", sSortColumn: "sorting_", sSortJUIAsc: "", sSortJUIDesc: "", sSortJUI: "", sSortJUIAscAllowed: "", sSortJUIDescAllowed: "", sSortJUIWrapper: "", sSortIcon: "", sScrollWrapper: "dataTables_scroll", sScrollHead: "dataTables_scrollHead", sScrollHeadInner: "dataTables_scrollHeadInner", sScrollBody: "dataTables_scrollBody", sScrollFoot: "dataTables_scrollFoot", sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: "", sJUIHeader: "", sJUIFooter: ""
    }); i.extend(j.ext.oJUIClasses, j.ext.oStdClasses, { sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left", sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled", sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right", sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled", sPageJUINext: "ui-icon ui-icon-circle-arrow-e", sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
        sPageButton: "fg-button ui-button ui-state-default", sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled", sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled", sPageFirst: "first ui-corner-tl ui-corner-bl", sPageLast: "last ui-corner-tr ui-corner-br", sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_", sSortAsc: "ui-state-default", sSortDesc: "ui-state-default", sSortable: "ui-state-default", sSortableAsc: "ui-state-default",
        sSortableDesc: "ui-state-default", sSortableNone: "ui-state-default", sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n", sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s", sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s", sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n", sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s", sSortJUIWrapper: "DataTables_sort_wrapper", sSortIcon: "DataTables_sort_icon", sScrollHead: "dataTables_scrollHead ui-state-default", sScrollFoot: "dataTables_scrollFoot ui-state-default",
        sFooterTH: "ui-state-default", sJUIHeader: "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix", sJUIFooter: "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
    }); i.extend(j.ext.oPagination, { two_button: { fnInit: function (e, j, n) {
        var k = e.oLanguage.oPaginate, l = function (i) { e.oApi._fnPageChange(e, i.data.action) && n(e) }, k = !e.bJUI ? '<a class="' + e.oClasses.sPagePrevDisabled + '" tabindex="' + e.iTabIndex + '" role="button">' + k.sPrevious + '</a><a class="' +
e.oClasses.sPageNextDisabled + '" tabindex="' + e.iTabIndex + '" role="button">' + k.sNext + "</a>" : '<a class="' + e.oClasses.sPagePrevDisabled + '" tabindex="' + e.iTabIndex + '" role="button"><span class="' + e.oClasses.sPageJUIPrev + '"></span></a><a class="' + e.oClasses.sPageNextDisabled + '" tabindex="' + e.iTabIndex + '" role="button"><span class="' + e.oClasses.sPageJUINext + '"></span></a>'; i(j).append(k); var t = i("a", j), k = t[0], t = t[1]; e.oApi._fnBindAction(k, { action: "previous" }, l); e.oApi._fnBindAction(t, { action: "next" }, l);
        e.aanFeatures.p || (j.id = e.sTableId + "_paginate", k.id = e.sTableId + "_previous", t.id = e.sTableId + "_next", k.setAttribute("aria-controls", e.sTableId), t.setAttribute("aria-controls", e.sTableId))
    }, fnUpdate: function (e) { if (e.aanFeatures.p) for (var i = e.oClasses, j = e.aanFeatures.p, k = 0, n = j.length; k < n; k++) 0 !== j[k].childNodes.length && (j[k].childNodes[0].className = 0 === e._iDisplayStart ? i.sPagePrevDisabled : i.sPagePrevEnabled, j[k].childNodes[1].className = e.fnDisplayEnd() == e.fnRecordsDisplay() ? i.sPageNextDisabled : i.sPageNextEnabled) } 
    },
        iFullNumbersShowPages: 5, full_numbers: { fnInit: function (e, j, n) {
            var k = e.oLanguage.oPaginate, l = e.oClasses, t = function (i) { e.oApi._fnPageChange(e, i.data.action) && n(e) }; i(j).append('<a  tabindex="' + e.iTabIndex + '" class="' + l.sPageButton + " " + l.sPageFirst + '">' + k.sFirst + '</a><a  tabindex="' + e.iTabIndex + '" class="' + l.sPageButton + " " + l.sPagePrevious + '">' + k.sPrevious + '</a><span></span><a tabindex="' + e.iTabIndex + '" class="' + l.sPageButton + " " + l.sPageNext + '">' + k.sNext + '</a><a tabindex="' + e.iTabIndex + '" class="' + l.sPageButton +
" " + l.sPageLast + '">' + k.sLast + "</a>"); var v = i("a", j), k = v[0], l = v[1], z = v[2], v = v[3]; e.oApi._fnBindAction(k, { action: "first" }, t); e.oApi._fnBindAction(l, { action: "previous" }, t); e.oApi._fnBindAction(z, { action: "next" }, t); e.oApi._fnBindAction(v, { action: "last" }, t); e.aanFeatures.p || (j.id = e.sTableId + "_paginate", k.id = e.sTableId + "_first", l.id = e.sTableId + "_previous", z.id = e.sTableId + "_next", v.id = e.sTableId + "_last")
        }, fnUpdate: function (e, o) {
            if (e.aanFeatures.p) {
                var l = j.ext.oPagination.iFullNumbersShowPages, k = Math.floor(l /
2), n = Math.ceil(e.fnRecordsDisplay() / e._iDisplayLength), t = Math.ceil(e._iDisplayStart / e._iDisplayLength) + 1, v = "", z, D = e.oClasses, x, J = e.aanFeatures.p, H = function (i) { e.oApi._fnBindAction(this, { page: i + z - 1 }, function (i) { e.oApi._fnPageChange(e, i.data.page); o(e); i.preventDefault() }) }; -1 === e._iDisplayLength ? t = k = z = 1 : n < l ? (z = 1, k = n) : t <= k ? (z = 1, k = l) : t >= n - k ? (z = n - l + 1, k = n) : (z = t - Math.ceil(l / 2) + 1, k = z + l - 1); for (l = z; l <= k; l++) v += t !== l ? '<a tabindex="' + e.iTabIndex + '" class="' + D.sPageButton + '">' + e.fnFormatNumber(l) + "</a>" : '<a tabindex="' +
e.iTabIndex + '" class="' + D.sPageButtonActive + '">' + e.fnFormatNumber(l) + "</a>"; l = 0; for (k = J.length; l < k; l++) 0 !== J[l].childNodes.length && (i("span:eq(0)", J[l]).html(v).children("a").each(H), x = J[l].getElementsByTagName("a"), x = [x[0], x[1], x[x.length - 2], x[x.length - 1]], i(x).removeClass(D.sPageButton + " " + D.sPageButtonActive + " " + D.sPageButtonStaticDisabled), i([x[0], x[1]]).addClass(1 == t ? D.sPageButtonStaticDisabled : D.sPageButton), i([x[2], x[3]]).addClass(0 === n || t === n || -1 === e._iDisplayLength ? D.sPageButtonStaticDisabled :
D.sPageButton))
            } 
        } 
        }
    }); i.extend(j.ext.oSort, { "string-pre": function (e) { "string" != typeof e && (e = null !== e && e.toString ? e.toString() : ""); return e.toLowerCase() }, "string-asc": function (e, i) { return e < i ? -1 : e > i ? 1 : 0 }, "string-desc": function (e, i) { return e < i ? 1 : e > i ? -1 : 0 }, "html-pre": function (e) { return e.replace(/<.*?>/g, "").toLowerCase() }, "html-asc": function (e, i) { return e < i ? -1 : e > i ? 1 : 0 }, "html-desc": function (e, i) { return e < i ? 1 : e > i ? -1 : 0 }, "date-pre": function (e) {
        e = Date.parse(e); if (isNaN(e) || "" === e) e = Date.parse("01/01/1970 00:00:00");
        return e
    }, "date-asc": function (e, i) { return e - i }, "date-desc": function (e, i) { return i - e }, "numeric-pre": function (e) { return "-" == e || "" === e ? 0 : 1 * e }, "numeric-asc": function (e, i) { return e - i }, "numeric-desc": function (e, i) { return i - e } 
    }); i.extend(j.ext.aTypes, [function (e) {
        if ("number" === typeof e) return "numeric"; if ("string" !== typeof e) return null; var i, j = !1; i = e.charAt(0); if (-1 == "0123456789-".indexOf(i)) return null; for (var k = 1; k < e.length; k++) {
            i = e.charAt(k); if (-1 == "0123456789.".indexOf(i)) return null; if ("." == i) {
                if (j) return null;
                j = !0
            } 
        } return "numeric"
    }, function (e) { var i = Date.parse(e); return null !== i && !isNaN(i) || "string" === typeof e && 0 === e.length ? "date" : null }, function (e) { return "string" === typeof e && -1 != e.indexOf("<") && -1 != e.indexOf(">") ? "html" : null } ]); i.fn.DataTable = j; i.fn.dataTable = j; i.fn.dataTableSettings = j.settings; i.fn.dataTableExt = j.ext
})(jQuery, window, document, void 0);
;
(function ($) {
    $(document).ready(function () {
        $("#block-menu-menu-menu-top-main-menu ul").find('ul').addClass('child').css({
            display: "none"
        });
        /* jQuery('#block-menu-menu-top-main-menu li').hover(
        function () {
        //show its submenu
        var width = jQuery(window).width();
        var thisList = jQuery(this);
        var rightPosition = (width - thisList.offset().left) - thisList.width() + "px";
                
        jQuery(this).find('ul').css({
        'right': rightPosition
        }).slideDown(100); 

        }, 
        function () {
        //hide its submenu
        jQuery(this).children("ul:eq(0)").slideUp(100);			
        }
        ); */


        $('#block-menu-menu-menu-top-main-menu li').hover(function () {
            clearTimeout($.data(this, 'timer'));
            $('ul', this).stop(true, true).slideDown(150);
        },
		function () {
		    $.data(this, 'timer', setTimeout($.proxy(function () {
		        $('ul', this).stop(true, true).slideUp(150);
		    }, this), 200));
		});


    });
})(jQuery);
;
/*
*
* jqTransform
* by mathieu vilaplana mvilaplana@dfc-e.com
* Designer ghyslain armand garmand@dfc-e.com
*
*
* Version 1.0 25.09.08
* Version 1.1 06.08.09
* Add event click on Checkbox and Radio
* Auto calculate the size of a select element
* Can now, disabled the elements
* Correct bug in ff if click on select (overflow=hidden)
* No need any more preloading !!
* 
******************************************** */

(function ($) {
    var defaultOptions = { preloadImg: true };
    var jqTransformImgPreloaded = false;

    var jqTransformPreloadHoverFocusImg = function (strImgUrl) {
        //guillemets to remove for ie
        strImgUrl = strImgUrl.replace(/^url\((.*)\)/, '$1').replace(/^\"(.*)\"$/, '$1');
        var imgHover = new Image();
        imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/, '-hover.$1');
        var imgFocus = new Image();
        imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/, '-focus.$1');
    };


    /***************************
    Labels
    ***************************/
    var jqTransformGetLabel = function (objfield) {
        var selfForm = $(objfield.get(0).form);
        var oLabel = objfield.next();
        if (!oLabel.is('label')) {
            oLabel = objfield.prev();
            if (oLabel.is('label')) {
                var inputname = objfield.attr('id');
                if (inputname) {
                    oLabel = selfForm.find('label[for="' + inputname + '"]');
                }
            }
        }
        if (oLabel.is('label')) { return oLabel.css('cursor', 'pointer'); }
        return false;
    };

    /* Hide all open selects */
    var jqTransformHideSelect = function (oTarget) {
        var ulVisible = $('.jqTransformSelectWrapper ul:visible');
        ulVisible.each(function () {
            var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
            //do not hide if click on the label object associated to the select
            if (!(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0))) { $(this).hide(); }
        });
    };
    /* Check for an external click */
    var jqTransformCheckExternalClick = function (event) {
        if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
    };

    /* Apply document listener */
    var jqTransformAddDocumentListener = function () {
        $(document).mousedown(jqTransformCheckExternalClick);
    };

    /* Add a new handler for the reset action */
    var jqTransformReset = function (f) {
        var sel;
        $('.jqTransformSelectWrapper select', f).each(function () { sel = (this.selectedIndex < 0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function () { $('a:eq(' + sel + ')', this).click(); }); });
        $('a.jqTransformCheckbox, a.jqTransformRadio', f).removeClass('jqTransformChecked');
        $('input:checkbox, input:radio', f).each(function () { if (this.checked) { $('a', $(this).parent()).addClass('jqTransformChecked'); } });
    };

    /***************************
    Buttons
    ***************************/
    $.fn.jqTransInputButton = function () {
        return this.each(function () {
            var newBtn = $('<button id="' + this.id + '" name="' + this.name + '" type="' + this.type + '" class="' + this.className + ' jqTransformButton"><span><span>' + $(this).attr('value') + '</span></span>')
				.hover(function () { newBtn.addClass('jqTransformButton_hover'); }, function () { newBtn.removeClass('jqTransformButton_hover') })
				.mousedown(function () { newBtn.addClass('jqTransformButton_click') })
				.mouseup(function () { newBtn.removeClass('jqTransformButton_click') })
			;
            $(this).replaceWith(newBtn);
        });
    };

    /***************************
    Text Fields 
    ***************************/
    $.fn.jqTransInputText = function () {
        return this.each(function () {
            var $input = $(this);

            if ($input.hasClass('jqtranformdone') || !$input.is('input')) { return; }
            $input.addClass('jqtranformdone');

            var oLabel = jqTransformGetLabel($(this));
            oLabel && oLabel.bind('click', function () { $input.focus(); });

            var inputSize = $input.width();
            if ($input.attr('size')) {
                inputSize = $input.attr('size') * 10;
                $input.css('width', inputSize);
            }

            $input.addClass("jqTransformInput").wrap('<div class="jqTransformInputWrapper"><div class="jqTransformInputInner"><div></div></div></div>');
            var $wrapper = $input.parent().parent().parent();
            $wrapper.css("width", inputSize + 10);
            $input
				.focus(function () { $wrapper.addClass("jqTransformInputWrapper_focus"); })
				.blur(function () { $wrapper.removeClass("jqTransformInputWrapper_focus"); })
				.hover(function () { $wrapper.addClass("jqTransformInputWrapper_hover"); }, function () { $wrapper.removeClass("jqTransformInputWrapper_hover"); })
			;

            /* If this is safari we need to add an extra class */
            $.browser.safari && $wrapper.addClass('jqTransformSafari');
            $.browser.safari && $input.css('width', $wrapper.width() + 16);
            this.wrapper = $wrapper;

        });
    };

    /***************************
    Check Boxes 
    ***************************/
    $.fn.jqTransCheckBox = function () {
        return this.each(function () {
            if ($(this).hasClass('jqTransformHidden')) { return; }

            var $input = $(this);
            var inputSelf = this;

            //set the click on the label
            var oLabel = jqTransformGetLabel($input);
            oLabel && oLabel.click(function () { aLink.trigger('click'); });

            var aLink = $('<a href="#" class="jqTransformCheckbox"></a>');
            //wrap and add the link
            $input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper"></span>').parent().prepend(aLink);
            //on change, change the class of the link
            $input.change(function () {
                this.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
                return true;
            });
            // Click Handler, trigger the click and change event on the input
            aLink.click(function () {
                //do nothing if the original input is disabled
                if ($input.attr('disabled')) { return false; }
                //trigger the envents on the input object
                $input.trigger('click').trigger("change");
                return false;
            });

            // set the default state
            this.checked && aLink.addClass('jqTransformChecked');
        });
    };
    /***************************
    Radio Buttons 
    ***************************/
    $.fn.jqTransRadio = function () {
        return this.each(function () {
            if ($(this).hasClass('jqTransformHidden')) { return; }

            var $input = $(this);
            var inputSelf = this;

            oLabel = jqTransformGetLabel($input);
            oLabel && oLabel.click(function () { aLink.trigger('click'); });

            var aLink = $('<a href="#" class="jqTransformRadio" rel="' + this.name + '"></a>');
            $input.addClass('jqTransformHidden').wrap('<span class="jqTransformRadioWrapper"></span>').parent().prepend(aLink);

            $input.change(function () {
                inputSelf.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
                return true;
            });
            // Click Handler
            aLink.click(function () {
                if ($input.attr('disabled')) { return false; }
                $input.trigger('click').trigger('change');

                // uncheck all others of same name input radio elements
                $('input[name="' + $input.attr('name') + '"]', inputSelf.form).not($input).each(function () {
                    $(this).attr('type') == 'radio' && $(this).trigger('change');
                });

                return false;
            });
            // set the default state
            inputSelf.checked && aLink.addClass('jqTransformChecked');
        });
    };

    /***************************
    TextArea 
    ***************************/
    $.fn.jqTransTextarea = function () {
        return this.each(function () {
            var textarea = $(this);

            if (textarea.hasClass('jqtransformdone')) { return; }
            textarea.addClass('jqtransformdone');

            oLabel = jqTransformGetLabel(textarea);
            oLabel && oLabel.click(function () { textarea.focus(); });

            var strTable = '<table cellspacing="0" cellpadding="0" border="0" class="jqTransformTextarea">';
            strTable += '<tr><td id="jqTransformTextarea-tl"></td><td id="jqTransformTextarea-tm"></td><td id="jqTransformTextarea-tr"></td></tr>';
            strTable += '<tr><td id="jqTransformTextarea-ml">&nbsp;</td><td id="jqTransformTextarea-mm"><div></div></td><td id="jqTransformTextarea-mr">&nbsp;</td></tr>';
            strTable += '<tr><td id="jqTransformTextarea-bl"></td><td id="jqTransformTextarea-bm"></td><td id="jqTransformTextarea-br"></td></tr>';
            strTable += '</table>';
            var oTable = $(strTable)
					.insertAfter(textarea)
					.hover(function () {
					    !oTable.hasClass('jqTransformTextarea-focus') && oTable.addClass('jqTransformTextarea-hover');
					}, function () {
					    oTable.removeClass('jqTransformTextarea-hover');
					})
				;

            textarea
				.focus(function () { oTable.removeClass('jqTransformTextarea-hover').addClass('jqTransformTextarea-focus'); })
				.blur(function () { oTable.removeClass('jqTransformTextarea-focus'); })
				.appendTo($('#jqTransformTextarea-mm div', oTable))
			;
            this.oTable = oTable;
            if ($.browser.safari) {
                $('#jqTransformTextarea-mm', oTable)
					.addClass('jqTransformSafariTextarea')
					.find('div')
						.css('height', textarea.height())
						.css('width', textarea.width())
				;
            }
        });
    };

    /***************************
    Select 
    ***************************/
    $.fn.jqTransSelect = function () {
        return this.each(function (index) {
            var $select = $(this);

            if ($select.hasClass('jqTransformHidden')) { return; }
            if ($select.attr('multiple')) { return; }

            var oLabel = jqTransformGetLabel($select);
            /* First thing we do is Wrap it */
            var $wrapper = $select
				.addClass('jqTransformHidden')
				.wrap('<div class="jqTransformSelectWrapper"></div>')
				.parent()
				.css({ zIndex: 10 - index })
			;

            /* Now add the html for the select */
            $wrapper.prepend('<div><span></span><a href="#" class="jqTransformSelectOpen"></a></div><ul></ul>');
            var $ul = $('ul', $wrapper).css('width', $select.width()).hide();
            /* Now we add the options */
            $('option', this).each(function (i) {
                var oLi = $('<li><a href="#" index="' + i + '">' + $(this).html() + '</a></li>');
                $ul.append(oLi);
            });

            /* Add click handler to the a */
            $ul.find('a').click(function () {
                $('a.selected', $wrapper).removeClass('selected');
                $(this).addClass('selected');
                /* Fire the onchange event */
                if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
                $select[0].selectedIndex = $(this).attr('index');
                $('span:eq(0)', $wrapper).html($(this).html());
                $ul.hide();
                return false;
            });
            /* Set the default */
            $('a:eq(' + this.selectedIndex + ')', $ul).click();
            $('span:first', $wrapper).click(function () { $("a.jqTransformSelectOpen", $wrapper).trigger('click'); });
            oLabel && oLabel.click(function () { $("a.jqTransformSelectOpen", $wrapper).trigger('click'); });
            this.oLabel = oLabel;

            /* Apply the click handler to the Open */
            var oLinkOpen = $('a.jqTransformSelectOpen', $wrapper)
				.click(function () {
				    //Check if box is already open to still allow toggle, but close all other selects
				    if ($ul.css('display') == 'none') { jqTransformHideSelect(); }
				    if ($select.attr('disabled')) { return false; }

				    $ul.slideToggle('fast', function () {
				        var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
				        $ul.animate({ scrollTop: offSet });
				    });
				    return false;
				})
			;

            // Set the new width
            var iSelectWidth = $select.outerWidth();
            var oSpan = $('span:first', $wrapper);
            var newWidth = (iSelectWidth > oSpan.innerWidth()) ? iSelectWidth + oLinkOpen.outerWidth() : $wrapper.width();
            $wrapper.css('width', newWidth);
            $ul.css('width', newWidth - 2);
            oSpan.css({ width: iSelectWidth });

            // Calculate the height if necessary, less elements that the default height
            //show the ul to calculate the block, if ul is not displayed li height value is 0
            $ul.css({ display: 'block', visibility: 'hidden' });
            var iSelectHeight = ($('li', $ul).length) * ($('li:first', $ul).height()); //+1 else bug ff
            (iSelectHeight < $ul.height()) && $ul.css({ height: iSelectHeight, 'overflow': 'hidden' }); //hidden else bug with ff
            $ul.css({ display: 'none', visibility: 'visible' });

        });
    };
    $.fn.jqTransform = function (options) {
        var opt = $.extend({}, defaultOptions, options);

        /* each form */
        return this.each(function () {
            var selfForm = $(this);
            if (selfForm.hasClass('jqtransformdone')) { return; }
            selfForm.addClass('jqtransformdone');

            $('input:submit, input:reset, input[type="button"]', this).jqTransInputButton();
            $('input:text, input:password', this).jqTransInputText();
            $('input:checkbox', this).jqTransCheckBox();
            $('input:radio', this).jqTransRadio();
            $('textarea', this).jqTransTextarea();

            if ($('select', this).jqTransSelect().length > 0) { jqTransformAddDocumentListener(); }
            selfForm.bind('reset', function () { var action = function () { jqTransformReset(this); }; window.setTimeout(action, 10); });

            //preloading dont needed anymore since normal, focus and hover image are the same one
            /*if(opt.preloadImg && !jqTransformImgPreloaded){
            jqTransformImgPreloaded = true;
            var oInputText = $('input:text:first', selfForm);
            if(oInputText.length > 0){
            //pour ie on eleve les ""
            var strWrapperImgUrl = oInputText.get(0).wrapper.css('background-image');
            jqTransformPreloadHoverFocusImg(strWrapperImgUrl);					
            var strInnerImgUrl = $('div.jqTransformInputInner',$(oInputText.get(0).wrapper)).css('background-image');
            jqTransformPreloadHoverFocusImg(strInnerImgUrl);
            }
				
            var oTextarea = $('textarea',selfForm);
            if(oTextarea.length > 0){
            var oTable = oTextarea.get(0).oTable;
            $('td',oTable).each(function(){
            var strImgBack = $(this).css('background-image');
            jqTransformPreloadHoverFocusImg(strImgBack);
            });
            }
            }*/


        }); /* End Form each */

    }; /* End the Plugin */

})(jQuery);
;
/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*
* Uses the built in easing capabilities added In jQuery 1.1
* to offer multiple easing options
*
* TERMS OF USE - jQuery Easing
* 
* Open source under the BSD License. 
* 
* Copyright Ã‚Å  2008 George McGinley Smith
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
* Redistributions of source code must retain the above copyright notice, this list of 
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list 
* of conditions and the following disclaimer in the documentation and/or other materials 
* provided with the distribution.
* 
* Neither the name of the author nor the names of contributors may be used to endorse 
* or promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
* OF THE POSSIBILITY OF SUCH DAMAGE. 
*
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
*
* TERMS OF USE - EASING EQUATIONS
* 
* Open source under the BSD License. 
* 
* Copyright Ã‚Å  2001 Robert Penner
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
* Redistributions of source code must retain the above copyright notice, this list of 
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list 
* of conditions and the following disclaimer in the documentation and/or other materials 
* provided with the distribution.
* 
* Neither the name of the author nor the names of contributors may be used to endorse 
* or promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
* OF THE POSSIBILITY OF SUCH DAMAGE. 
*
*/
;