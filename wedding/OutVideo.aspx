<%@ Page Title="Videos" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="OutVideo.aspx.cs" Inherits="ShowCategory" %>

<%@ Register Namespace="ASPnetControls" Assembly="ASPnetPagerV2_8" TagPrefix="cc" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
    <link href="css/style2.css" rel="stylesheet" type="text/css" />
    <link href="test/grid.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        function scrollTo() {
            return;
        }
    </script>
    <link href="css/LightStyle.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .masonry-brick
        {
            margin: 12px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="Server">
    <div class="fullWidth">
        <h1>
            <a href="Default.aspx" style="color: #418FA5">Home ></a>
          
            <asp:Label ID="Label1" runat="server" Text="Videos"></asp:Label>
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
          
            <ul class="lb-album" id="container">
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                        <li class="masonryImage"><a href='<%# "ShowOutVideos.aspx?ID=" + Eval("ID")%>' runat="server"><em>
                            <img src='<%#Eval("Thumb") %>' alt='<%#Eval("Title") %>' /></em><br /> <%#Eval("Title") %>
                        </a>
                            
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
        </asp:Panel>
      
        <div class="clr">
        </div>
        <script src="test/jquery.wookmark.js" type="text/javascript"></script>
        <script>
            $(function () {

                var $container = $('#container');

                $container.imagesLoaded(function () {
                    $container.masonry({
                        itemSelector: '.masonryImage'
                    });
                });

            });
        </script>
    </div>
   
</asp:Content>
