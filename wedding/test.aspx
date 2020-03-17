<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

        <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://www.yourwedding-guide.com/reveal.css" />
    <link rel="shortcut icon" href="http://www.yourwedding-guide.com/wb.ico" />
    <link rel="icon" href="http://www.yourwedding-guide.com/wb.ico" type="image/x-icon" />
    <link rel="alternate" type="application/rss+xml" title="Your Wedding Guide RSS" href="/rss.aspx" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.js?ver=3.4.2'></script>
    <script type="text/javascript">
        jQuery.noConflict();
        var $j = jQuery;
    </script>
    <script type='text/javascript'>
        $(window).bind("load", function () {
            // animasikan nilai top saat halaman telah selesai dimuat
            $('#kotak-pesan').animate({ top: "90px" }, 1000, "easeOutBounce");
            // hilangkan kotak pesan saat tombol (x) diklik
            $('a.close').click(function () {
                $(this).parent().slideUp(800, "easeOutBounce");
                return false;
            });
        });
    </script>
    <script type="text/javascript" src="http://www.yourwedding-guide.com/jquery.reveal.js"></script>
    <script src="http://www.yourwedding-guide.com/js/jquery.min.js" type="text/javascript"></script>
    <script src="http://www.yourwedding-guide.com/js/jquery.easing.js" type="text/javascript"></script>
    <style type="text/css">
        #slide_top
        {
            background: url(images/top_slide.png) no-repeat 21px 24px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            bottom: 10px;
            display: none;
            opacity: 0.5;
            position: fixed;
            right: 10px;
            z-index: 998;
            height: 50px;
            width: 50px;
            text-indent: -9999px;
            -webkit-transition: opacity .2s ease-in-out;
            -moz-transition: opacity .2s ease-in-out;
            -ms-transition: opacity .2s ease-in-out;
            -o-transition: opacity .2s ease-in-out;
            transition: opacity .2s ease-in-out;
        }
        
        #slide_top:hover
        {
            opacity: 1;
        }
        #slide_top
        {
            background-color: #F7B103;
        }
        .stArrow {display:none !important}
    </style>
    <script type="text/javascript">
        function scrollTo() {
            return;
        }
    </script>
    <%--<script type="text/javascript"> 
<!--
    //Disable right click script III- By Renigade (renigade@mediaone.net) 
    //For full source code, visit http://www.dynamicdrive.com 
    var message = "Sorry, right-click has been disabled";
    /////////////////////////////////// 
    function clickIE() { if (document.all) { (message); return false; } }
    function clickNS(e) {
        if
(document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) { (message); return false; } 
        } 
    }
    if (document.layers)
    { document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS; }
    else { document.onmouseup = clickNS; document.oncontextmenu = clickIE; }
    document.oncontextmenu = new Function("return false") 
// --> 
</SCRIPT> 


<script type="text/javascript">

    var message = "Sorry, that function is disabled.\n\n";
    message += "This page is copyrighted, and ";
    message += "all content is protected.";

    function click(e) {
        if (document.all) {
            if (event.button == 2) {
                alert(message);
                return false;
            }
        }
        if (document.layers) {
            if (e.which == 3) {
                alert(message);
                return false;
            }
        }
    }

    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
    }
    document.onmousedown = click; 

</script> --%>
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-35676258-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>

      <script type="text/javascript" src="js/jquery.orbit-1.2.3.min.js"></script>
   <script type="text/javascript" src="js/snow.js"></script>
       <script id="reklam5" type="text/javascript" src="js/custom1.js?module=index"></script>

</head>
<body style="background:#000;position:relative;height:100%">
    <form id="form1" runat="server">
    <div style="position:absolute;top:0">

         <div id="imageMapWrapper"></div>
    </div>
  
    </form>
</body>
</html>
