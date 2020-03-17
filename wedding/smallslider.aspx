<%@ Page Language="C#" AutoEventWireup="true" CodeFile="smallslider.aspx.cs" Inherits="smallslider" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>

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

<style type="text/css">
body {
font-family:verdana;
font-size:15px;
}

a {color:#333; text-decoration:none}
a:hover {color:#ccc; text-decoration:none}

#mask {
  position:absolute;
  left:0;
  top:0;
  z-index:9000;
  background-color:#000;
  display:none;
}  
#boxes .window {
  position:absolute;
  left:0;
  top:0;
  width:514px;
  height:514px;
  display:none;
  z-index:9999;
  padding:20px;background:url(images/newsletter.png) no-repeat center
}
#boxes #dialog {
  width:514px; 
  height:514px;
  padding:10px;

}
.newsletter {height:350px;width:314px;margin:80px auto 0;}
.newsletter h3 {color:#a39991;font-size:22px;margin-bottom:15px}
.newsletter p {color:#fff;font-size:17px;text-align:center;}
.newsletter span {width:250px;height:27px;margin:20px auto 0;display:block}
.newsletter span input {margin:0;padding:0;background:url(images/newsletterinput.png) no-repeat center;width:250px;height:27px;line-height:27px;border:none;text-indent:8px}
.newsletter p input {margin:0 auto;padding:0;background:url(images/newsletterbtn.png) no-repeat center;width:136px;height:27px;line-height:38px;border:none;cursor:pointer;}
.newsletter p input:hover {margin:1px 0 0 0}
.clr {clear:both}
.newsletter select {-webkit-appearance: button;-webkit-border-radius: 7px;-webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-padding-end: 20px;-webkit-padding-start: 2px;-webkit-user-select: none;background-image: url(images/dropArrow.png);
    -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);background-position: center right;background-repeat: no-repeat;
  border: 1px solid #AAA;color: #A9A9A9;font-size: inherit;margin: 0;overflow: hidden;text-overflow: ellipsis
  ;white-space: nowrap;width:250px;height:27px;font-size:14px}

.close {color:#fff;position:absolute;right:0;top:0;background:#a39991;width:40px;height:40px;-webkit-border-radius:25px;-moz-border-radius:20px;border-radius:20px;text-align:center;line-height:40px;font-size:22px}

    </style>
</head>
<body onload='$("a.fancybox").trigger("click");'>
    <form id="form1" runat="server">

   

<h2><a href="http://www.queness.com/">Simple jQuery Modal Window Examples from Queness WebBlog</a></h2>
<div style="font-size: 10px; color: rgb(204, 204, 204);">Except where otherwise noted, content on this site is licensed under a Creative Commons Attribution 3.0 License.</div>

<div id="boxes">
<div style="top: 199.5px; left: 551.5px; display: none;" id="dialog" class="window">


  <div class="newsletter">
      
      <p>Subscribe to our newsletter to get the latest scoop right to your inbox.</p>
  
    <div class="subscribe-form">
      <span>
      <asp:TextBox ID="TextBox1" PlaceHolder="Name" runat="server"></asp:TextBox></span>

      <span><asp:TextBox ID="TextBox2" PlaceHolder="Email address" runat="server"></asp:TextBox></span>

      <span>
      <asp:TextBox ID="TextBox3" PlaceHolder="Name" runat="server"></asp:TextBox></span>

      <span><asp:TextBox ID="TextBox4" PlaceHolder="Email address" runat="server"></asp:TextBox></span>

<span>
          <asp:DropDownList ID="DropDownList1" runat="server">
          <asp:ListItem>Gender</asp:ListItem>
          <asp:ListItem>Male</asp:ListItem>
          <asp:ListItem>Female</asp:ListItem>
          </asp:DropDownList>  </span>

      <span><asp:TextBox ID="TextBox6" PlaceHolder="Email address" runat="server"></asp:TextBox></span>

      <div class="clr"></div>
     <p style="margin:30px 0 0 0">
     
          <asp:Button ID="Button1" runat="server" Text="" />
     </p>
     <div class="clr"></div>
    </div>
    
  </div>
<a href="#" class="close">&times;</a>
</div>
<!-- Mask to cover the whole screen -->
<div style="width: 1478px; height: 602px; display: none; opacity: 0.8;" id="mask"></div>
</div>








    </form>
</body>
</html>
