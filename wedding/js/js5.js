// $Id: compact_forms.js,v 1.11 2011/01/09 05:51:15 sun Exp $

(function ($) {

    Drupal.compactForms = {};

    /**
    * Compact Forms jQuery plugin.
    */
    $.fn.compactForm = function (stars) {
        stars = stars || 0;

        this.each(function () {
            $(this).addClass('compact-form').find('label').each(function () {
                var context = this.form;
                var $label = $(this);
                if (!$label.attr('for')) {
                    return;
                }
                var $field = $('#' + $label.attr('for'), context);
                if (!$field.length || !$field.is('input:text,input:password,textarea, input[type=email], input[type=number]')) {
                    return;
                }
                // Store the initial field value, in case the browser is going to
                // automatically fill it in upon focus.
                var initial_value = $field.val();

                if (initial_value != '') {
                    // Firefox doesn't like .hide() here for some reason.
                    $label.css('display', 'none');
                }

                $label.parent().addClass('compact-form-wrapper');
                $label.addClass('compact-form-label');
                $field.addClass('compact-form-field');

                if (stars === 0) {
                    $label.find('.form-required').hide();
                }
                else if (stars === 2) {
                    $label.find('.form-required').insertAfter($field).prepend('&nbsp;');
                }

                $field.focus(function () {
                    // Some browsers (e.g., Firefox) are automatically inserting a stored
                    // username and password into login forms. In case the password field is
                    // manually emptied afterwards, and the user jumps back to the username
                    // field (without changing it), and forth to the password field, then
                    // the browser automatically re-inserts the password again. Therefore,
                    // we also need to test against the initial field value.
                    if ($field.val() === initial_value || $field.val() === '') {
                        $label.fadeOut('fast');
                    }
                });

                $field.blur(function () {
                    if ($field.val() === '') {
                        $label.fadeIn('slow');
                    }
                });

                // Chrome adds passwords after page load, so we need to track changes.
                $field.change(function () {
                    if ($field.get(0) != document.activeElement) {
                        if ($field.val() === '') {
                            $label.fadeIn('fast');
                        }
                        else {
                            $label.css('display', 'none');
                        }
                    }
                });
            });
        });
    };

    /**
    * Attach compact forms behavior to all enabled forms upon page load.
    */
    Drupal.behaviors.compactForms = {
        attach: function (context, settings) {
            if (!settings || !settings.compactForms) {
                return;
            }
            $('#' + settings.compactForms.forms.join(',#'), context).compactForm(settings.compactForms.stars);

            // Safari adds passwords without triggering any event after page load.
            // We therefore need to wait a bit and then check for field values.
            if ($.browser.safari) {
                setTimeout(Drupal.compactForms.fixSafari, 200);
            }
        }
    };

    /**
    * Checks for field values and hides the corresponding label if non-empty.
    *
    * @todo Convert $.fn.compactForm to always use a function like this.
    */
    Drupal.compactForms.fixSafari = function () {
        $('label.compact-form-label').each(function () {
            var $label = $(this);
            var context = this.form;
            if ($('#' + $label.attr('for'), context).val() != '') {
                $label.css('display', 'none');
            }
        });
    }

})(jQuery);
;
(function ($) {

    /**
    * A progressbar object. Initialized with the given id. Must be inserted into
    * the DOM afterwards through progressBar.element.
    *
    * method is the function which will perform the HTTP request to get the
    * progress bar state. Either "GET" or "POST".
    *
    * e.g. pb = new progressBar('myProgressBar');
    *      some_element.appendChild(pb.element);
    */
    Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
        var pb = this;
        this.id = id;
        this.method = method || 'GET';
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;

        // The WAI-ARIA setting aria-live="polite" will announce changes after users
        // have completed their current activity and not interrupt the screen reader.
        this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
        this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
    };

    /**
    * Set the percentage and status message for the progressbar.
    */
    Drupal.progressBar.prototype.setProgress = function (percentage, message) {
        if (percentage >= 0 && percentage <= 100) {
            $('div.filled', this.element).css('width', percentage + '%');
            $('div.percentage', this.element).html(percentage + '%');
        }
        $('div.message', this.element).html(message);
        if (this.updateCallback) {
            this.updateCallback(percentage, message, this);
        }
    };

    /**
    * Start monitoring progress via Ajax.
    */
    Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
        this.delay = delay;
        this.uri = uri;
        this.sendPing();
    };

    /**
    * Stop monitoring progress via Ajax.
    */
    Drupal.progressBar.prototype.stopMonitoring = function () {
        clearTimeout(this.timer);
        // This allows monitoring to be stopped from within the callback.
        this.uri = null;
    };

    /**
    * Request progress data from server.
    */
    Drupal.progressBar.prototype.sendPing = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.uri) {
            var pb = this;
            // When doing a post request, you need non-null data. Otherwise a
            // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
            $.ajax({
                type: this.method,
                url: this.uri,
                data: '',
                dataType: 'json',
                success: function (progress) {
                    // Display errors.
                    if (progress.status == 0) {
                        pb.displayError(progress.data);
                        return;
                    }
                    // Update display.
                    pb.setProgress(progress.percentage, progress.message);
                    // Schedule next timer.
                    pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
                },
                error: function (xmlhttp) {
                    pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
                }
            });
        }
    };

    /**
    * Display errors on the page.
    */
    Drupal.progressBar.prototype.displayError = function (string) {
        var error = $('<div class="messages error"></div>').html(string);
        $(this.element).before(error).hide();

        if (this.errorCallback) {
            this.errorCallback(this);
        }
    };

})(jQuery);
;
(function ($) {

    $(document).ready(function () {

        // Expression to check for absolute internal links.
        var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

        // Attach onclick event to document only and catch clicks on all elements.
        $(document.body).click(function (event) {
            // Catch the closest surrounding link of a clicked element.
            $(event.target).closest("a,area").each(function () {

                var ga = Drupal.settings.googleanalytics;
                // Expression to check for special links like gotwo.module /go/* links.
                var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
                // Expression to check for download links.
                var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

                // Is the clicked URL internal?
                if (isInternal.test(this.href)) {
                    // Skip 'click' tracking, if custom tracking events are bound.
                    if ($(this).is('.colorbox')) {
                        // Do nothing here. The custom event will handle all tracking.
                    }
                    // Is download tracking activated and the file extension configured for download tracking?
                    else if (ga.trackDownload && isDownload.test(this.href)) {
                        // Download link clicked.
                        var extension = isDownload.exec(this.href);
                        _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
                    }
                    else if (isInternalSpecial.test(this.href)) {
                        // Keep the internal URL for Google Analytics website overlay intact.
                        _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
                    }
                }
                else {
                    if (ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
                        // Mailto link clicked.
                        _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
                    }
                    else if (ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
                        if (ga.trackDomainMode == 2 && isCrossDomain($(this).attr('hostname'), ga.trackCrossDomains)) {
                            // Top-level cross domain clicked. document.location is handled by _link internally.
                            event.preventDefault();
                            _gaq.push(["_link", this.href]);
                        }
                        else {
                            // External link clicked.
                            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
                        }
                    }
                }
            });
        });

        // Colorbox: This event triggers when the transition has completed and the
        // newly loaded content has been revealed.
        $(document).bind("cbox_complete", function () {
            var href = $.colorbox.element().attr("href");
            if (href) {
                _gaq.push(["_trackPageview", href.replace(isInternal, '')]);
            }
        });

    });

    /**
    * Check whether the hostname is part of the cross domains or not.
    *
    * @param string hostname
    *   The hostname of the clicked URL.
    * @param array crossDomains
    *   All cross domain hostnames as JS array.
    *
    * @return boolean
    */
    function isCrossDomain(hostname, crossDomains) {
        /**
        * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
        * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
        * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
        *
        * @todo: Remove/Refactor in D8
        */
        if (!crossDomains) {
            return false;
        }
        else {
            return $.inArray(hostname, crossDomains) > -1 ? true : false;
        }
    }

})(jQuery);
;

/**
* JavaScript behaviors for the front-end display of webforms.
*/

(function ($) {

    Drupal.behaviors.webform = Drupal.behaviors.webform || {};

    Drupal.behaviors.webform.attach = function (context) {
        // Calendar datepicker behavior.
        Drupal.webform.datepicker(context);
    };

    Drupal.webform = Drupal.webform || {};

    Drupal.webform.datepicker = function (context) {
        $('div.webform-datepicker').each(function () {
            var $webformDatepicker = $(this);
            var $calendar = $webformDatepicker.find('input.webform-calendar');
            var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
            var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
            var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
            // Convert date strings into actual Date objects.
            startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
            endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

            // Ensure that start comes before end for datepicker.
            if (startDate > endDate) {
                var laterDate = startDate;
                startDate = endDate;
                endDate = laterDate;
            }

            var startYear = startDate.getFullYear();
            var endYear = endDate.getFullYear();

            // Set up the jQuery datepicker element.
            $calendar.datepicker({
                dateFormat: 'yy-mm-dd',
                yearRange: startYear + ':' + endYear,
                firstDay: parseInt(firstDay),
                minDate: startDate,
                maxDate: endDate,
                onSelect: function (dateText, inst) {
                    var date = dateText.split('-');
                    $webformDatepicker.find('select.year, input.year').val(+date[0]);
                    $webformDatepicker.find('select.month').val(+date[1]);
                    $webformDatepicker.find('select.day').val(+date[2]);
                },
                beforeShow: function (input, inst) {
                    // Get the select list values.
                    var year = $webformDatepicker.find('select.year, input.year').val();
                    var month = $webformDatepicker.find('select.month').val();
                    var day = $webformDatepicker.find('select.day').val();

                    // If empty, default to the current year/month/day in the popup.
                    var today = new Date();
                    year = year ? year : today.getFullYear();
                    month = month ? month : today.getMonth() + 1;
                    day = day ? day : today.getDate();

                    // Make sure that the default year fits in the available options.
                    year = (year < startYear || year > endYear) ? startYear : year;

                    // jQuery UI Datepicker will read the input field and base its date off
                    // of that, even though in our case the input field is a button.
                    $(input).val(year + '-' + month + '-' + day);
                }
            });

            // Prevent the calendar button from submitting the form.
            $calendar.click(function (event) {
                $(this).focus();
                event.preventDefault();
            });
        });
    }

})(jQuery);
;