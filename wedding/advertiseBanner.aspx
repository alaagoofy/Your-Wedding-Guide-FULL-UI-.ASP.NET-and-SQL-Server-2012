<%@ Page Language="C#" AutoEventWireup="true" CodeFile="advertiseBanner.aspx.cs" Inherits="rasha" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
    body {margin:0;padding:0}
.slider-wrapper {margin:0;width:700px;height:600px;position:relative}

.nivoSlider {position:relative; }
.nivoSlider img {position:absolute;width:700px;height:600px;display:block}
.nivoSlider a.nivo-imageLink {position:absolute;top:0px;left:0px;width:100%;height:100%;border:0;padding:0;margin:0;z-index:6;display:none;}
.nivo-slice {display:block;position:absolute;z-index:5;height:100%;}
.nivo-box {display:block;position:absolute;z-index:5;}
.nivo-caption {position:absolute;left:0px;bottom:0px;background:#000;color:#fff;opacity:0.8;width:100%;z-index:8;}
.nivo-caption p {padding:5px;margin:0;}
.nivo-caption a {display:inline !important;}
.nivo-html-caption {display:none;}
.nivo-directionNav a {position:absolute;top:45%;z-index:9;cursor:pointer}

.theme-default .nivoSlider {position:relative;background:url('../images/loading.gif') no-repeat 50% 50%;}
.theme-default .nivoSlider img {position:absolute;top:0px;left:0px;display:none}
.theme-default .nivoSlider a {border:0;display:block;}
.theme-default .nivo-controlNav {position:absolute;right:30px;bottom:-30px;display:none}
.theme-default .nivo-controlNav a {display:block;width:19px;height:20px;background:url('../images/bullets.png') no-repeat;text-indent:-9999px;border:0;margin-right:3px;float:left;display:none}
.theme-default .nivo-controlNav a.active {background-position:-19px 0px;}
.theme-default .nivo-directionNav a {display:block;width:30px;height:30px;background:url('../images/arrows.png') no-repeat;text-indent:-9999px;border:0;display:none}
.theme-default a.nivo-nextNav {background-position:-30px 0;right:24px;display:none}
.theme-default a.nivo-prevNav {left:15px;display:none}
.theme-default .nivo-caption {background-color:#fff;width:940px;height:72px;opacity:0.95;line-height:22px;font-size:18px;font-family:Bebas Neue;display:none}

.theme-default .nivo-caption a {border-bottom:1px dotted #fff;display:none}
.theme-default .nivo-caption a:hover {}
    </style>


    <script src="js/jquery-1.6.1.min.js" type="text/javascript"></script>
      
       <script src="js/jquery.nivo.slider.pack.js" type="text/javascript"></script>
      <script type="text/javascript">


          jQuery(window).load(function () {
              jQuery('#slider').nivoSlider({
                  effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
                  slices: 15, // For slice animations
                  boxCols: 8, // For box animations
                  boxRows: 4, // For box animations
                  animSpeed: 500, // Slide transition speed
                  pauseTime: 4000, // How long each slide will show
                  startSlide: 0, // Set starting Slide (0 index)
                  directionNav: true, // Next & Prev navigation
                  directionNavHide: true, // Only show on hover
                  controlNav: true, // 1,2,3... navigation
                  pauseOnHover: true, // Stop animation while hovering
                  manualAdvance: false, // Force manual transitions
                  captionOpacity: 0.8, // Universal caption opacity

                  beforeChange: function () { }, // Triggers before a slide transition
                  afterChange: function () { }, // Triggers after a slide transition
                  slideshowEnd: function () { }, // Triggers after all slides have been shown
                  lastSlide: function () { }, // Triggers when last slide is shown
                  afterLoad: function () { } // Triggers when slider has loaded
              });
          });
		
    </script>
</head>
<body>
    <form id="form1" runat="server">
  <div class="slider-wrapper theme-default">
                        <div id="slider" class="nivoSlider">
                            <img src="images/ahmedelamrouse.jpg" alt="" />
                            <img src="images/rasha2.jpg" alt="" />
                            <img src="images/rasha3.jpg" alt="" />
                          
                        </div>
                    </div>
    </form>
</body>
</html>
