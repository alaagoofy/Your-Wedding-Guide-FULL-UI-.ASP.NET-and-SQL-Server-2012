<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="_Default" MaintainScrollPositionOnPostback="false" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <link rel="stylesheet" type="text/css" href="css/preview.css"
        media="screen" />
    <style type="text/css">
        .magazine
        {
            display: none;
        }
        .divlogo
        {
            padding-top: 20px;
        }
    </style>
    <link type="text/css" rel="stylesheet" href="css/css4.css"
        media="all" />
    <!--[if (lt IE 9)&(!IEMobile)]>
<link type="text/css" rel="stylesheet" href="css/css5.css" media="all" />
<![endif]-->
    <!--[if gte IE 9]><!-->
    <link type="text/css" rel="stylesheet" href="css/css6.css"
        media="all" />
    <!--<![endif]-->
    <script type="text/javascript" src="js/js2.js"></script>
    <script type="text/javascript" src="js/js1.js"></script>
    <script type="text/javascript">
<!--        //--><![CDATA[//><!--
        jQuery.extend(Drupal.settings, { "basePath": "\/", "pathPrefix": "", "ajaxPageState": { "theme": "layalina", "theme_token": "pYMGQGkywy6wBqEx5RggH6Tcm2rJnGJ4YIhgybccZ3o", "css": { "modules\/system\/system.base.css": 1, "modules\/system\/system.menus.css": 1, "modules\/system\/system.messages.css": 1, "modules\/system\/system.theme.css": 1, "modules\/comment\/comment.css": 1, "sites\/all\/modules\/contrib\/date\/date_api\/date.css": 1, "sites\/all\/modules\/contrib\/date\/date_popup\/themes\/datepicker.1.7.css": 1, "modules\/field\/theme\/field.css": 1, "modules\/node\/node.css": 1, "modules\/search\/search.css": 1, "modules\/user\/user.css": 1, "sites\/all\/modules\/contrib\/views\/css\/views.css": 1, "sites\/all\/modules\/contrib\/ctools\/css\/ctools.css": 1, "sites\/all\/modules\/contrib\/lightbox2\/css\/lightbox.css": 1, "sites\/all\/modules\/contrib\/rate\/rate.css": 1, "sites\/all\/modules\/contrib\/compact_forms\/compact_forms.css": 1, "sites\/all\/modules\/contrib\/webform\/css\/webform.css": 1, "sites\/all\/themes\/omega\/alpha\/css\/alpha-reset.css": 1, "sites\/all\/themes\/omega\/alpha\/css\/alpha-mobile.css": 1, "sites\/all\/themes\/omega\/alpha\/css\/alpha-alpha.css": 1, "sites\/all\/themes\/omega\/omega\/css\/formalize.css": 1, "sites\/all\/themes\/omega\/omega\/css\/omega-text.css": 1, "sites\/all\/themes\/omega\/omega\/css\/omega-branding.css": 1, "sites\/all\/themes\/omega\/omega\/css\/omega-menu.css": 1, "sites\/all\/themes\/omega\/omega\/css\/omega-forms.css": 1, "sites\/all\/themes\/omega\/omega\/css\/omega-visuals.css": 1, "sites\/default\/files\/fontyourface\/font.css": 1, "public:\/\/fontyourface\/local_fonts\/janna_bold-normal-normal\/stylesheet.css": 1, "public:\/\/fontyourface\/local_fonts\/janna_regular-normal-normal\/stylesheet.css": 1, "sites\/all\/themes\/layalina\/css\/global.css": 1, "sites\/all\/themes\/layalina\/css\/jqtransform.css": 1, "sites\/all\/themes\/layalina\/css\/flexslider.css": 1, "ie::normal::sites\/all\/themes\/omega\/alpha\/css\/grid\/alpha_fluid\/normal\/alpha-fluid-normal-12.css": 1, "sites\/all\/themes\/omega\/alpha\/css\/grid\/alpha_fluid\/normal\/alpha-fluid-normal-12.css": 1 }, "js": { "http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.7.1\/jquery.min.js": 1, "misc\/jquery.once.js": 1, "misc\/drupal.js": 1, "misc\/jquery.cookie.js": 1, "misc\/ajax.js": 1, "sites\/all\/modules\/contrib\/lightbox2\/js\/lightbox.js": 1, "sites\/all\/modules\/contrib\/compact_forms\/compact_forms.js": 1, "misc\/progress.js": 1, "sites\/all\/modules\/contrib\/google_analytics\/googleanalytics.js": 1, "sites\/all\/modules\/contrib\/webform\/js\/webform.js": 1, "0": 1, "sites\/all\/modules\/custom\/layalina_misc\/js\/jquery.form.js": 1, "sites\/all\/themes\/omega\/omega\/js\/jquery.formalize.js": 1, "sites\/all\/themes\/omega\/omega\/js\/omega-mediaqueries.js": 1, "sites\/all\/themes\/layalina\/js\/jquery.flexslider.js": 1, "sites\/all\/themes\/layalina\/js\/LayalinaSlide.js": 1, "sites\/all\/themes\/layalina\/js\/jquery.livequery.js": 1, "sites\/all\/themes\/layalina\/js\/layalina_search.js": 1, "sites\/all\/themes\/layalina\/js\/layalina.js": 1, "sites\/all\/themes\/layalina\/js\/jquery.dataTables.min.js": 1, "sites\/all\/themes\/layalina\/js\/layalinaMainMenu.js": 1, "sites\/all\/themes\/layalina\/js\/jquery.jqtransform.js": 1, "sites\/all\/themes\/layalina\/js\/jquery.easing.1.3.js": 1} }, "lightbox2": { "rtl": 0, "file_path": "\/(\\w\\w\/)public:\/", "default_image": "\/sites\/all\/modules\/contrib\/lightbox2\/images\/brokenimage.jpg", "border_size": 10, "font_color": "000", "box_color": "fff", "top_position": "", "overlay_opacity": "0.8", "overlay_color": "000", "disable_close_click": true, "resize_sequence": 0, "resize_speed": 400, "fade_in_speed": 400, "slide_down_speed": 600, "use_alt_layout": false, "disable_resize": false, "disable_zoom": false, "force_show_nav": false, "show_caption": true, "loop_items": false, "node_link_text": "View Image Details", "node_link_target": false, "image_count": "Image !current of !total", "video_count": "Video !current of !total", "page_count": "Page !current of !total", "lite_press_x_close": "press \u003Ca href=\u0022#\u0022 onclick=\u0022hideLightbox(); return FALSE;\u0022\u003E\u003Ckbd\u003Ex\u003C\/kbd\u003E\u003C\/a\u003E to close", "download_link_text": "", "enable_login": false, "enable_contact": false, "keys_close": "c x 27", "keys_previous": "p 37", "keys_next": "n 39", "keys_zoom": "z", "keys_play_pause": "32", "display_image_size": "original", "image_node_sizes": "()", "trigger_lightbox_classes": "", "trigger_lightbox_group_classes": "", "trigger_slideshow_classes": "", "trigger_lightframe_classes": "", "trigger_lightframe_group_classes": "", "custom_class_handler": 0, "custom_trigger_classes": "", "disable_for_gallery_lists": true, "disable_for_acidfree_gallery_lists": true, "enable_acidfree_videos": true, "slideshow_interval": 5000, "slideshow_automatic_start": true, "slideshow_automatic_exit": true, "show_play_pause": true, "pause_on_next_click": false, "pause_on_previous_click": true, "loop_slides": false, "iframe_width": 600, "iframe_height": 400, "iframe_border": 1, "enable_video": false }, "compactForms": { "forms": ["user-login-form", "webform-client-form-3876", "webform-client-form-3881", "webform-client-form-3026"], "stars": 1 }, "ajax": { "edit-webform-ajax-submit-3876": { "callback": "webform_ajax_callback", "wrapper": "webform-ajax-wrapper-3876", "progress": { "message": "", "type": "throbber" }, "event": "mousedown", "keypress": true, "prevent": "click", "url": "\/system\/ajax", "submit": { "_triggering_element_name": "op", "_triggering_element_value": "Submit"} }, "edit-webform-ajax-submit-3881": { "callback": "webform_ajax_callback", "wrapper": "webform-ajax-wrapper-3881", "progress": { "message": "", "type": "throbber" }, "event": "mousedown", "keypress": true, "prevent": "click", "url": "\/system\/ajax", "submit": { "_triggering_element_name": "op", "_triggering_element_value": "Submit"}} }, "googleanalytics": { "trackOutbound": 1, "trackMailto": 1, "trackDownload": 1, "trackDownloadExtensions": "7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip" }, "swfpage2": null, "swfpage3": null, "omega": { "layouts": { "primary": "normal", "order": ["normal"], "queries": { "normal": "all and (min-width: 740px) and (min-device-width: 740px), (max-device-width: 800px) and (min-width: 740px) and (orientation:landscape)"}}} });
        //--><!]]>
    </script>
    <script type="text/javascript">
        $(document).ready(function () {

            var id = '#dialog';

            //Get the screen height and width
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            //Set heigth and width to mask to fill up the whole screen
            $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

            //transition effect		
            $('#mask').fadeIn(1000);
            $('#mask').fadeTo("slow", 0.8);

            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();

            //Set the popup window to center
            $(id).css('top', winH / 2 - $(id).height() / 2);
            $(id).css('left', winW / 2 - $(id).width() / 2);

            //transition effect
            $(id).fadeIn(2000);

            //if close button is clicked
            $('.window .close').click(function (e) {
                //Cancel the link behavior
                e.preventDefault();

                $('#mask').hide();
                $('.window').hide();
            });

            //if mask is clicked
            $('#mask').click(function () {
                $(this).hide();
                $('.window').hide();
            });

        });

    </script>
    <script type="text/javascript">
        $(document).ready(function () {

            var id = '#dialog2';

            //Get the screen height and width
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            //Set heigth and width to mask to fill up the whole screen
            $('#mask2').css({ 'width': maskWidth, 'height': maskHeight });

            //transition effect		
            $('#mask2').fadeIn(1000);
            $('#mask2').fadeTo("slow", 0.8);

            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();

            //Set the popup window to center
            $(id).css('top', winH / 2 - $(id).height() / 2);
            $(id).css('left', winW / 2 - $(id).width() / 2);

            //transition effect
            $(id).fadeIn(2000);

            //if close button is clicked
            $('.window2 .close2').click(function (e) {
                //Cancel the link behavior
                e.preventDefault();

                $('#mask2').hide();
                $('.window2').hide();
            });

            //if mask is clicked
            $('#mask2').click(function () {
                $(this).hide();
                $('.window2').hide();
            });

        });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Banner" runat="Server">
    <asp:Panel ID="Panel1" runat="server">
        <div id="boxes" style="z-index: 9999999999999999 !important">
            <div style="top: 199.5px; left: 551.5px; display: none;" id="dialog" class="window">
                <div class="newsletter">
                    <p>
                        Subscribe to our newsletter to get the latest news & offers right to your inbox.</p>
                    <div class="subscribe-form">
                        <span>
                            <asp:TextBox ID="txt_nameNews" PlaceHolder="Name" runat="server"></asp:TextBox>*
                            <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_nameNews"
                                CssClass="failureNotification" ErrorMessage="" ValidationGroup="LoginUserValidationGroup"></asp:RequiredFieldValidator>
                        </span><span>
                            <asp:TextBox ID="txt_emailNews" PlaceHolder="Email address" runat="server"></asp:TextBox>*
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_emailNews"
                                CssClass="failureNotification" ErrorMessage="" ValidationGroup="LoginUserValidationGroup"></asp:RequiredFieldValidator>
                        </span><span>
                            <asp:TextBox ID="txt_phoneNews" PlaceHolder="Phone (optional)" runat="server"></asp:TextBox></span>
                        <span>
                            <asp:DropDownList ID="DropDownList1" runat="server">
                                <asp:ListItem>Gender</asp:ListItem>
                                <asp:ListItem>Male</asp:ListItem>
                                <asp:ListItem>Female</asp:ListItem>
                            </asp:DropDownList>
                            * </span><span>
                                <asp:TextBox ID="txt_CityNews" PlaceHolder="City" runat="server"></asp:TextBox>*
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_CityNews"
                                    CssClass="failureNotification" ErrorMessage="" ValidationGroup="LoginUserValidationGroup"></asp:RequiredFieldValidator>
                            </span>
                        <div class="clr">
                        </div>
                        <p runat="server" id="lbl_error">
                        </p>
                        <p style="margin: 30px 0 0 0">
                            <asp:Button ID="Button1" ValidationGroup="LoginUserValidationGroup" OnClick="Button2_Click"
                                runat="server" Text="" />
                        </p>
                        <div class="clr">
                        </div>
                    </div>
                </div>
                <a href="#" class="close">&times;</a>
            </div>
            <!-- Mask to cover the whole screen -->
            <div style="width: 1478px; height: 602px; display: none; opacity: 0.8;" id="mask">
            </div>
        </div>
    </asp:Panel>
    <asp:Panel ID="Panel2" runat="server">
        <div id="boxes2">
            <div style="top: 199.5px; left: 551.5px; display: none;" id="dialog2" class="window2">
                <div class="newsletter2">
                    <p>
                        Thank you for Subscribe in your wedding guide</p>
                </div>
                <a href="#" class="close2">&times;</a>
            </div>
            <!-- Mask to cover the whole screen -->
            <div style="width: 1478px; height: 602px; display: none; opacity: 0.8;" id="mask2">
            </div>
        </div>
    </asp:Panel>
    <div class="fullwidthbanner-container">
        <div class="slider-fix">

            <div class="view view-slider view-id-slider view-display-id-slider_block view-dom-id-">
                <div class="view-content">
                    <div class="item-list">
                        <ul>
                            <%--  <li class="views-row views-row-1 views-row-odd views-row-first">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="#">
                                        <div class="view-img">
                                            <img src="images/golden-globe-118201.jpg" alt="" /></div>
                                    </a></span>
                                </div>
                            </li>--%>
                           

                            <li class="views-row views-row-2 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="#">
                                        <div class="view-img">
                                            <img src="images/1.jpg"></div>
                                    </a></span>
                                </div>
                            </li>
                               <li class="views-row views-row-1 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=335">
                                        <div class="view-img">
                                            <img src="images/amany.jpg"></div>
                                    </a></span>
                                </div>
                            </li>


                            <li class="views-row views-row-3 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=53">
                                        <div class="view-img">
                                            <img src="images/celebrities-profiles-117656.jpg" alt="" /></div>
                                    </a></span>
                                </div>
                            </li>

                              <li class="views-row views-row-3 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=30">
                                        <div class="view-img">
                                            <img src="images/rabe3.jpg" alt="" /></div>
                                    </a></span>
                                </div>
                            </li>

                           

                            <%--  <li class="views-row views-row-4 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=87">
                                        <div class="view-img">
                                            <img src="images/makeup-tag-104396.jpg"></div>
                                    </a></span>
                                </div>
                            </li>--%>
                            <li class="views-row views-row-5 views-row-odd">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=27">
                                        <div class="view-img">
                                            <img src="images/magazine.jpg"></div>
                                    </a></span>
                                </div>
                            </li>
                            <li class="views-row views-row-6 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="ShowCategory.aspx?ID=34">
                                        <div class="view-img">
                                            <img src="images/marwan.jpg" alt="" /></div>
                                    </a></span>
                                </div>
                            </li>
                            <%--  <li class="views-row views-row-5 views-row-odd">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="#">
                                        <div class="view-img">
                                            <img src="images/youneed.jpg"></div>
                                    </a></span>
                                </div>
                            </li>
                            <li class="views-row views-row-6 views-row-even">
                                <div class="views-field views-field-nothing">
                                    <span class="field-content"><a href="#">
                                        <div class="view-img">
                                            <img src="images/wedding.jpg"></div>
                                    </a></span>
                                </div>
                            </li>--%>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <header id="section-header" class="section section-header">
  <div id="zone-menu-wrapper" class="zone-wrapper zone-menu-wrapper clearfix">  
  <div id="zone-menu" class="zone zone-menu clearfix container-12">
  
  </div>
</div>
</header>
    </div>
    <div class="sliderShadow">
    </div>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
   
    <div class="auto" style="overflow:hidden;">
        <div style="height: 280px; width: 700px; float: left; direction: ltr; background: #fff;
            margin-top: 3px">
            <iframe height="280px" scrolling="no" width="700px" src="rasha.aspx"></iframe>
        </div>
        <div style="height: 263px; width: 300px; float: right; overflow: hidden; margin: 4px 0 0 0;">
            <a href="ShowCategory.aspx?ID=133" title="Cairo Marriott Hotel and Omar Khayyam Casino">
                <img src="images/Sofitel.jpg" alt="Cairo Marriott Hotel and Omar Khayyam Casino" /></a>
        </div>
        <%--<div style="height: 263px; width: 300px; float: right; overflow: hidden; margin: 4px 0 0 0;
            border-bottom: 1px solid #AAAAAA">
            <div class="fb-like-box" data-href="http://www.facebook.com/urweddingguide" data-width="300"
                data-show-faces="true" data-stream="false" data-header="true">
            </div>
        </div>--%>
        <div class="clr">
        </div>


        <div class="bodyLeft">
            <div class="Cat">
                <%--     <div class="topCat">
                </div>--%>
                <h1>
                    <a href="#">Categories</a></h1>
                <ul>
                    <asp:Repeater ID="repeater_outCategory" runat="server">
                        <ItemTemplate>
                            <li><a href='<%# "ShowOutCategories.aspx?ID=" + Eval("ID") %>' runat="server" title='<%#Eval("Title") %>'>
                                <%#Eval("Title") %></a></li>
                        </ItemTemplate>
                    </asp:Repeater>
                    <li><a href="OutVideo.aspx" title="Videos">Videos</a></li>
                </ul>
            </div>
            <div class="adverArea">
                   
                  <%--  <a href="ShowCategory.aspx?ID=9" title="Tony Ward Haute Couture" class="georg">
                    <img src="images/tony200.jpg" style="margin: -10px 0 0 0" alt="Tony Ward Haute Couture" /></a>--%>

                    <a href="http://www.facebook.com/Hosam.Saaed.Makeup.Artist" target="_blank" title="Hosam Saeed Make-up Artist" class="georg">
                    <img src="images/hosamsaaed.jpg" style="margin: 8px 0 0 0" alt="Hosam Saeed Make-up Artist" /></a>

                   <a href="ShowCategory.aspx?ID=360" title="Muhammad Khedr Photography" class="georg">
                    <img src="images/said.jpg" style="margin: 8px 0 0 0" alt="Muhammad Khedr Photography" /></a>

                    </div>
            <div class="clr">
            </div>
            <div class="News">
                <h6 style="font: 15px">
                    Latest Updates</h6>
                <ul>
                    <asp:Repeater ID="repeater_news" runat="server">
                        <ItemTemplate>
                            <li><em>
                                <img src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                                <p>
                                    <a href='<%# "ShowCategory.aspx?ID=" + Eval("Items_ID") %>' runat="server">
                                        <%#Eval("Title") %>
                                    </a>
                                </p>
                                <div class="clr">
                                </div>
                            </li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
                <div class="clr">
                </div>
            </div>
            <div class="adverArea">
                <a href="http://www.facebook.com/Wedding.Catalogue" title="Black & White">
                    <img src="images/blackandwhite.jpg" style="margin: 320px 0 0 0" alt="Black & White" /></a>
            </div>
        </div>
        <div class="bodyMiddle">
             <div class="bigArticle">
                <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton1_Click2">
                    <asp:Image ID="img_articles2" runat="server" />
                    <span><strong>
                        <asp:Literal ID="lbl_title2" runat="server"></asp:Literal></strong>
                        <asp:Literal ID="lbl_articles2" runat="server"></asp:Literal>
                    </span>
                </asp:LinkButton>
            </div>
            <div class="clr">
            </div>
            <h6 style="border: none; height: 30px; line-height: 30px">
                Our Beautiful Vendors</h6>
            <ul class="Lastarticles">
                <asp:Repeater ID="Repeater1" runat="server" OnItemDataBound="Repeater3_ItemDataBound">
                    <ItemTemplate>
                        <li><a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>' title='<%#Eval("Title") %>'>
                            <em>
                                <img src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                        </a><span>
                            <asp:Literal ID="Literal1" runat="server" Text='<%#Bind("Title") %>'></asp:Literal></span>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
            <div class="clr">
            </div>
          <div class="bigArticle">
                <asp:LinkButton ID="LinkButton1" runat="server" OnClick="LinkButton1_Click">
                    <asp:Image ID="img_articles1" runat="server" />
                    <span><strong>
                        <asp:Literal ID="lbl_title" runat="server"></asp:Literal></strong>
                        <asp:Literal ID="lbl_articles1" runat="server"></asp:Literal>
                    </span>
                </asp:LinkButton>
            </div>
            <div class="clr">
            </div>
            <div class="adverArea">
                <a href="ShowCategory.aspx?ID=69" title="Flower Power Design" class="flowerPower">
                    <img src="images/flowerPower.jpg" alt="" /></a>
            </div>
            <div class="clr">
            </div>
            <div class="lastvideo" style="background: none; height: 410px;margin-top:5px">
                  <iframe width="500" style="margin-bottom: 15px; margin-left: -3" height="355" src="//www.youtube.com/embed/h4Ul07PHMiU" frameborder="0" allowfullscreen></iframe>
                <div class="clr">
                </div>
            </div>
        </div>

        <div class="bodyRight">
        <div class="adverArea">
            <a href="Advertise.aspx">
                <img src="images/yourweddingguideadvertise.jpg" style="width: 300px; margin: -3px 0 0 0"
                    alt="Your Wedding Guide Advertise" /></a> <a href="ShowCategory.aspx?ID=161" title="Khattab Wedding Invitations">
                        <img src="images/Occasions.jpg" style="margin: 5px 0 0" alt="Khattab Wedding Invitations" /></a>
                        </div>
            <div class="tab-contents">
                <ul>
                    <asp:Repeater ID="repeater_articles" runat="server">
                        <ItemTemplate>
                            <li><em>
                                <img src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                                <p>
                                    <a href='<%# "ShowArticles.aspx?ID=" + Eval("ID") %>' runat="server">
                                        <%#Eval("Title") %></a></p>
                            </li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
                <%-- <a href="#" class="btnTab">More...</a>--%>
                <div class="clr">
                </div>
            </div>
         
         

            <div class="adverArea">
                <a href="ShowCategory.aspx?ID=148" title="Click Image Production" class="clickImage">
                </a>
            </div>


                         <div class="adverArea">
            <a href="ShowCategory.aspx?ID=110" title="Rasha Khalaf Pro. Make-up Artist">
                <img src="images/rasha3.jpg" style="margin: 5px 0 0" alt="Rasha Khalaf Pro. Make-up Artist" /></a>
                </div>

   <div class="adverArea">
                <a href="ShowCategory.aspx?ID=329" title="Body Art Clinic" class="bodyArt">
                </a>
            </div>
         

            <div class="adverArea">
                <a href="ShowCategory.aspx?ID=96" title="Inspiration Interiors" class="">

                      <img src="images/yasserzien.jpg" style="margin: 5px 0 0" alt="Inspiration Interiors" />
                </a>
            </div>

            <div class="Videos">
                <h6 style="font: 12px; text-indent: 5px">
                    <a href="OutVideo.aspx">Videos</a></h6>
                <ul>
                    <asp:Repeater ID="repeater_Videos" runat="server">
                        <ItemTemplate>
                            <li><em>
                                <img id="Img4" src='<%#Eval("Thumb") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                                <p>
                                    <a id="A1" href='<%# "ShowOutVideos.aspx?ID=" + Eval("ID") %>' runat="server">
                                        <%#Eval("Title") %>
                                    </a>
                                </p>
                                <div class="clr">
                                </div>
                            </li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
                <div class="clr">
                </div>
            </div>
        </div>

        <div class="clr">
        </div>
        <div class="bigRuler" style="margin-top: -30px">
        </div>
        <div style="margin: 15px 0 0 8px">
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,24"
                width="998" height="108">
                <param name="movie" value="slogans2.swf" />
                <param name="quality" value="high" />
                <param name="menu" value="false" />
                <!--[if !IE]> <-->
                <object data="slogans2.swf" width="998" height="108" type="application/x-shockwave-flash">
                    <param name="quality" value="high" />
                    <param name="menu" value="false" />
                    <param name="pluginurl" value="http://www.macromedia.com/go/getflashplayer" />
                    FAIL (the browser should render some flash content, not this).
                </object>
                <!--> <![endif]-->
            </object>
        </div>
    </div>
    <div class="bigRuler">
    </div>
    <div style="width: 1051px; margin: 0px 0 15px 15px" class="adverArea">
        <a href="ShowCategory.aspx?ID=104" title="Persan Home Studio">
            <img src="images/persan.jpg" style="display: block;" alt="Persan Home Studio" /></a>
    </div>
    <div class="bigRuler" style="margin-top: -10px">
    </div>
    <div class="auto">
        <div class="subCategories">
            <ul>
                <asp:Repeater ID="repeaterCategoriesnames" runat="server">
                    <ItemTemplate>
                        <li>
                            <div>
                                <a href='<%# "ShowOutCategories.aspx?ID2=" + Eval("ID") %>'><em>
                                    <img src='<%#Eval("Img") %>' alt='<%#Eval("Title") %>' /></em></a> <a href='<%# "ShowOutCategories.aspx?ID2=" + Eval("ID") %>'>
                                        <span>
                                            <%#Eval("Title") %></span></a>
                            </div>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
            <div class="clr">
            </div>
        </div>
        <div class="bigRuler">
        </div>
       <%-- <div style="width: 1039px; margin: 0px 0 15px -17px" class="adverArea">
            <a href="ShowCategory.aspx?ID=40" title="Morocco Spa">
                <img src="images/moroccospa.jpg" style="display: block;" alt="Morocco Spa" /></a>
        </div>--%>
       <%-- <div class="bigRuler">
        </div>--%>
        <div style="width: 1039px; margin: 0px 0 5px -17px" class="adverArea">
            <a href="ShowCategory.aspx?ID=143" title="Elite Interiors">
                <img src="images/elite.jpg" style="display: block;" alt="Elite Interiors" /></a>
        </div>


        <div class="bigRuler">
        </div>
        <div class="adverArea">


       <%--  <div class="Dental">
                <p class="DentalCare">
                <a href="http://www.facebook.com/pages/Care-Dental-Center-Dr-Lamisse-Makhyoun/119243311533248?ref=ts&fref=ts" target="_blank">
                    <img src="images/facebookDental.png" style="margin-bottom:-3px" alt="Visit Care Dental Center Facebook Page" />
                </a>
                <span>
                    <img src="images/dentalLine.png" style="margin-bottom:-3px"" alt="" /></span>

                <a href="http://www.dr-lamisse.com/" target="_blank" title="Visit Care Dental Center Website">
                Website
                </a>
                </p>
                <a href="ShowCategory.aspx?ID=169" class="DentalFace"></a>

                    </div>

                     <div class="bigRuler">
        </div>--%>

            <div style="width: 810px; margin: 5px 0 5px 0; display: inline-block; float: left">
                <iframe style="width: 810px; margin: 0 0 10px 0;" height="600" src="http://www.youtube.com/embed/RKhl2GTtuE4"
                    frameborder="0" allowfullscreen></iframe>
            </div>
            <a href="ShowCategory.aspx?ID=7" title="SAMAH MAHRAN - Haute Couture">
                <img src="images/samah.jpg" style="width: 200px; display: inline-block; float: right;
                    margin: 5px 0 5px 0" alt="SAMAH MAHRAN - Haute Couture" /></a>
            <div class="clr">
            </div>
        </div>
        <div class="bigRuler">
        </div>
       <%-- <div class="subCategories">
            <ul>
                <asp:Repeater ID="repeater_222" runat="server">
                    <ItemTemplate>
                        <li>
                            <div>
                                <a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>'><em>
                                    <img src='<%#Eval("Img") %>' alt='<%#Eval("Title") %>' /></em></a> <a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>'>
                                        <span>
                                            <%#Eval("Title") %></span></a>
                            </div>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
            <div class="clr">
            </div>
        </div>
        <div class="bigRuler">
        </div>--%>
    </div>
    <div class="adverArea">
        <a href="ShowCategory.aspx?ID=71" title="Cover Entertainment">
            <img src="images/coverinter.jpg" style="display: block; margin: 10px 0 10px 25px;
                width: 1039px" alt="Cover Entertainment" /></a>
    </div>
    <div class="bigRuler" style="margin-top: -5px">
    </div>
    <div class="clr">
    </div>
    <div class="auto">
        <a href="ShowCategory.aspx?ID=14">
            <img src="images/nesmahelmy.jpg" style="margin: 10px 0 10px 35px; width: 960px;"
                alt="Nesma Helmy - Haute Couture" /></a>
        <div class="bigRuler">
        </div>
        <div style="margin: 15px 0 0 8px">
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,24"
                width="998" height="108">
                <param name="movie" value="slogans.swf" />
                <param name="quality" value="high" />
                <param name="menu" value="false" />
                <!--[if !IE]> <-->
                <object data="slogans.swf" width="998" height="108" type="application/x-shockwave-flash">
                    <param name="quality" value="high" />
                    <param name="menu" value="false" />
                    <param name="pluginurl" value="http://www.macromedia.com/go/getflashplayer" />
                    FAIL (the browser should render some flash content, not this).
                </object>
                <!--> <![endif]-->
            </object>
        </div>
        <div class="bigRuler">
        </div>
        <a href="ShowCategory.aspx?ID=11">
            <img src="images/Georgead.jpg" style="margin: 10px 0 0 -15px; width: 1047px; display: block"
                alt="George Hobeika Haute Couture" /></a>




                <div class="clr"></div>
                <span class='st_facebook_hcount' displayText='Facebook'></span>
<span class='st_twitter_hcount' displayText='Tweet'></span>
<span class='st_linkedin_hcount' displayText='LinkedIn'></span>
<span class='st_pinterest_hcount' displayText='Pinterest'></span>
    </div>


</asp:Content>
