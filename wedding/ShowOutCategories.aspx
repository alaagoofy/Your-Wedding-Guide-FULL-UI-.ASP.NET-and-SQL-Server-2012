<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="ShowOutCategories.aspx.cs" Inherits="ShowOutCategories" %>

<%@ Register Namespace="ASPnetControls" Assembly="ASPnetPagerV2_8" TagPrefix="cc" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
    <link href="css/style2.css" rel="stylesheet" type="text/css" />
    <link href="test/grid.css" rel="stylesheet" type="text/css" />
    <asp:Literal ID="litral_title" runat="server"></asp:Literal>
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
<asp:Literal ID="litral_image" runat="server"></asp:Literal>


    <script type="text/javascript">
        function scrollTo() {
            return;
        }
    </script>
    <link href="css/LightStyle.css" rel="stylesheet" type="text/css" />
    <link href="css/prettyPhoto.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery.prettyPhoto.js" type="text/javascript"></script>


  <%--  <script type="text/javascript"> 
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

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Banner" runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="Server">
    <div class="fullWidth">
        <%-- <img src="images/ad.gif" style="width: 729px; margin: 0px auto 10px; display: block"
                alt="Alternate Text" />--%>
        <h1>
            <a href="Default.aspx" style="color: #F5821E">Home ></a>
            <asp:LinkButton ID="LinkButton1" runat="server" onclick="LinkButton1_Click">
            <asp:Label ID="Label2" Style="color: #F5821E" runat="server" Text=""></asp:Label>
            </asp:LinkButton>
            
            <asp:Label ID="Label1" Style="color: #a39991" runat="server" Text=""></asp:Label>
        </h1>
        <div class="sharebuttons" style="width: 480px">
            <!-- AddThis Button BEGIN -->
            <div class="addthis_toolbox addthis_default_style ">
                <div>
                    <a class="addthis_button_facebook_like" fblikelayout="button_count"></a>
                </div>
                <div>
                    <a class="addthis_button_tweet"></a>
                </div>
                <div>
                    <a class="addthis_button_pinterest_pinit"></a>
                </div>
                <div>
                    <a class="addthis_counter addthis_pill_style"></a>
                </div>
            </div>
            <script type="text/javascript">                var addthis_config = { "data_track_addressbar": true };</script>
            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51113a4238cf7056"></script>
            <!-- AddThis Button END -->
        </div>
        <div class="clr">
        </div>
        <asp:Panel ID="panal_images" runat="server">
           

     <ul class="lb-album gallery">
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                         <li><a id="A1" href='<%#Eval("Img") %>' rel="prettyPhoto[gallery1]" runat="server">
                           
                                <img src='<%#Eval("Img") %>' alt=""/> </a>
                           
                        </li>
                    </ItemTemplate>
                </asp:Repeater>

            </ul>
          
            
           
       
         <asp:Button ID="ButtonTrigger" runat="server" Text="Show All Images" CssClass="showMore" 
            onclick="Button2_Click"  />  
              <asp:Button ID="ButtonTrigger2" runat="server" Text="Show More" CssClass="showMore" 
            onclick="Button3_Click"  />   
   
        </asp:Panel>
       
        <div class="clr">
        </div>
        <asp:Panel ID="panal_cat" runat="server">
            <ul class="lb-album" id="">
                <asp:Repeater ID="Repeater2" runat="server">
                    <ItemTemplate>
                        <li>
                          
                                <a href='<%# "ShowOutCategories.aspx?ID2=" + Eval("ID") %>' title='<%#Eval("Title") %>'>
                                    <em>
                                        <img id="Img2" src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                                    </a>
                           <span style="display:block;padding:10px 4px 5px">
                                        <%#Eval("Title") %></span>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
        </asp:Panel>
      
      
        <div class="clr">
        </div>
    </div>

   <script type="text/javascript" charset="utf-8">
       $(document).ready(function () {
           $("area[rel^='prettyPhoto']").prettyPhoto();

           $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'light_square', slideshow: 3000, autoplay_slideshow: false });
           $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'fast', slideshow: 10000, hideflash: true });

           $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
               custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
               changepicturecallback: function () { initialize(); }
           });

           $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
               custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
               changepicturecallback: function () { _bsap.exec(); }
           });
       });
			</script>
</asp:Content>
