<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TestGallery.aspx.cs" Inherits="TestGallery" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <asp:Literal ID="litral_title" runat="server"></asp:Literal>
    <asp:Literal ID="litral_image" runat="server"></asp:Literal>
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
    
    <link href="css/gallery.css" rel="stylesheet" type="text/css" />
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery.noConflict();
        var $j = jQuery;
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
<div class="fullWidth">
    <h1 style="font-weight:normal">
        <a href="Default.aspx" style="color: #F5821E">Home ></a>
        <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton1_Click2">
           <asp:Label ID="Label3" Style="color: #F5821E" runat="server" Text=""></asp:Label>
        </asp:LinkButton>
        
         <asp:Label ID="Label11" runat="server" Text=""></asp:Label>
       
      
    </h1>
   <p></p>
   
    <div style="width: 120px; float: right">
            <div class="favoret" runat="server" id="DivFavorite">
                <h1>
                    <a href="MyFavorites.aspx" class="loveit2" title="View My favorite">
                        <img src="images/loveit.png" alt="" />
                        My favorite </a>
                </h1>
                <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                    <ContentTemplate>
                        <asp:Timer ID="Timer1" Interval="1000" Enabled="true" runat="server">
                        </asp:Timer>
                        <b runat="server" id="getFav"></b>
                    </ContentTemplate>
                </asp:UpdatePanel>
                <span><a href="MyFavorites.aspx">View My favorite</a></span>
                <div class="clr">
                </div>
            </div>
        </div>
    <div class="data">
            <div class="topData">
            </div>
            <div class="middleData">
             
                <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                <div class="clr">
                </div>
            </div>
            <div class="bottomData">
            </div>
        </div>


         <div class="clr"></div>
           <asp:Panel ID="Panal_Videos" runat="server">
            <div class="lastvideo" style="width: 1000px; margin: 15px auto; background: none;">
                <h6>
                    Videos</h6>
                <div id="block_editors_choice" class="block">
                    <div class="content">
                        <ul>
                            <asp:Repeater ID="repeater_videos" runat="server">
                                <ItemTemplate>
                                    <li><a href='<%# "Videos.aspx?ID=" + Eval("ID")%>' title='<%#Eval("Title") %>'>
                                        <img id="Img1" src='<%#Eval("Thumb") %>' runat="server" alt='<%#Eval("Title") %>' /></a>
                                        <b style="height:auto;overflow:visible;line-height:normal">
                                            <%#Eval("Title") %></b> </li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                    </div>
                </div>
            </div>
        </asp:Panel>
        <div class="clr">
        </div>
  <%--  <div style="float: left; width: 100px">
       <asp:Literal ID="Literal2" runat="server"></asp:Literal>
    </div>--%>
 <div style="float: left; width: 400px">
   <!-- AddThis Button BEGIN -->
<div class="addthis_toolbox addthis_default_style ">
<a class="addthis_button_facebook_like" fblikelayout="button_count"></a>
<a class="addthis_button_tweet"></a>
<a class="addthis_button_pinterest_pinit"></a>
<a class="addthis_counter addthis_pill_style"></a>
</div>
<script type="text/javascript">    var addthis_config = { "data_track_addressbar": true };</script>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51113a4238cf7056"></script>
<!-- AddThis Button END -->
    
     </div>
      <div style="margin:0 0 0;float: left; width: 300px">
        <asp:LinkButton ID="LinkButton1" CssClass="favProfile" ToolTip="Add To Your Favorites" runat="server"
            OnClick="LinkButton1_Click">Add to My Favorites</asp:LinkButton>
       


             <asp:Label ID="lbl_msgFav" style="display:block;margin:5px 0 0" runat="server" Text=""></asp:Label>
     </div>
    <div class="clr"></div>
     
    
    <div class="">
  


   <div id="historysub">
                <header class="article-header">


<script src="js/yui.js" type="text/javascript"></script>
<script src="js/carousel_min.js" type="text/javascript"></script>


        <div class="fragment-slideshow">
            <div class="fragment-slideshow-inner">
                <div class="fragment-image-aligned-left">
                    <div class="fragment-image-aligned-left-mediaitem">
                        <div class="fragment-image-aligned-left-mediaitem-object">
                            <asp:Image ID="Image1" runat="server" style="border-width:0px;"></asp:Image>
                                   
                        </div>
                    </div>
                    <div class="clear-div" style="height:10px"></div>

                    <div id="carousel-slideshow" class="carousel-slideshow-component" style="width: 950px; display: block;" >
                       <div class="carousel-prev">
                          <img id="prev-arrow" class="left-button-image" src="images/left-disabled.gif" alt="Previous image"/>
                       </div>
                       <div class="carousel-next">
                          <img id="next-arrow" class="right-button-image" src="images/right-enabled.gif" alt="Next image"/>
                       </div>
                       <div class="carousel-clip-region" style="width:900px">
                            <ul style="position: relative; left: 0px;" class="carousel-list carousel-horizontal" id="lists" runat="server">
    
   
    <%-- <li id="carousel-slideshow-item-1"><a href='<%# "ShowImage.aspx?ID2=" + Eval("ID")+"#historysub" %>'><img id="Img1" src='<%# Eval("Img") %>' runat="server" alt="" /></a></li>--%>





                            </ul>
                         </div> <!-- end / carousel-clip-region -->
                     </div> <!-- end / carousel-slideshow -->
                  </div> <!-- end / fragment-image-aligned-left -->

                
                 <div class="clear-div"></div>
             </div> <!-- end / fragment-slideshow-inner -->
        </div> <!-- end / fragment-slideshow -->


        <asp:Literal ID="scribtss" runat="server"></asp:Literal>


   
      <%--  <script type="text/javascript">
            var media_carousel_slideshow_loadHandler = function (type, args) {
                var start = args[0];
                var last = args[1];
               
                for (var i = start; i <= last; i++) {
                    YAHOO.util.Dom.get(carouselId + '-item-' + i).className = nonSpotlightCssName;
                    YAHOO.util.Event.addListener(carouselId + '-item-' + i, 'click', function (evt) {
                        for (var i = start; i <= last; i++) {
                            YAHOO.util.Dom.get(carouselId + '-item-' + i).className = nonSpotlightCssName;
                        }
                        media_carousel_slideshow.scrollTo(this.index);
                        YAHOO.util.Dom.get(carouselId + '-item-' + this.index).className = spotlightCssName;
                    }, { carousel: carouselId, index: i }, true);
                }
            }
            var media_carousel_slideshow = new YAHOO.extension.Carousel("carousel-slideshow",
            {
                numVisible: 8,
                animationSpeed: 0.25,
                scrollInc: 1,
                navMargin: 25,
                size: 19,
                prevElement: "prev-arrow",
                nextElement: "next-arrow",
                
              
                prevButtonStateHandler: function (type, args) {
                    var enabling = args[0];
                    var leftImage = args[1];
                    if (enabling)
                        leftImage.src = "images/left-enabled.gif";
                    else
                        leftImage.src = "images/left-disabled.gif";
                },
                nextButtonStateHandler: function (type, args) {
                    var enabling = args[0];
                    var rightImage = args[1];
                    if (enabling)
                        rightImage.src = "images/right-enabled.gif";
                    else
                        rightImage.src = "images/right-disabled.gif";
                }
            });
            </script>--%>
            <script type="text/javascript">
                var carouselId = 'carousel-slideshow';
                media_carousel_slideshow.scrollTo(2);
                YAHOO.util.Dom.get('carousel-slideshow-item-2').className = carouselId + '-spotlight';
            </script>
    



                

      </header>
      </div>





   
        <div class="clr">
        </div>
    </div>
     

    <div class="clr">
    </div>
    <div id="Love" class="reveal-modal" style="width: 400px">
      <%--  <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <div class="MailToFriend">
                    <h1 class="Share">
                        Share With a Friend</h1>
                    <p>
                        <label>
                            Your Name</label>
                        <asp:TextBox ID="txt_mailto" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ValidationGroup="a" ControlToValidate="txt_mailto"
                            runat="server" ErrorMessage="*"></asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <label>
                            Message (optional)</label>
                        <asp:TextBox ID="txt_msg" TextMode="MultiLine" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ValidationGroup="a" ControlToValidate="txt_msg"
                            runat="server" ErrorMessage="*"></asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <label>
                            Friend Email:
                        </label>
                        <asp:TextBox ID="txt_mailfriend" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ValidationGroup="a" ControlToValidate="txt_mailfriend"
                            runat="server" ErrorMessage="*"></asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:Label ID="lbl_msg" runat="server" Text=""></asp:Label>
                    </p>
                </div>
                <span>
                    <asp:Button ID="Button1" CssClass="signin" runat="server" Text="Send" ValidationGroup="a"
                        OnClick="btn_save_Click" />
                </span>
            </ContentTemplate>
        </asp:UpdatePanel>--%>
        <a class="close-reveal-modal">&#215;</a>
    </div>
    </div>
    </form>
</body>
</html>
