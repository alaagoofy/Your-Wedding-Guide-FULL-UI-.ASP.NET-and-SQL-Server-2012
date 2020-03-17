<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Videos.aspx.cs" Inherits="Videos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">

    
    <asp:Literal ID="Literal_image" runat="server"></asp:Literal>



     <link href="css/style2.css" rel="stylesheet" type="text/css" />
 <link href="test/grid.css" rel="stylesheet" type="text/css" />
    <asp:Literal ID="litral_title" runat="server"></asp:Literal>
   
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
 
   <script type="text/javascript">
       function scrollTo() {
           return;
       }
</script>
      <link href="css/LightStyle.css" rel="stylesheet" type="text/css" />
   




</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="Banner" Runat="Server">
</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">

    <asp:Panel ID="panal_ShowVideo" runat="server">
    
<div class="fullWidth">

        <h1>
            <a href="Default.aspx" style="color: #F5821E">Home ></a>
           
              
          
            <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
       
        </h1>

             <div class="sharebuttons" style="width:480px">
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
<script type="text/javascript">    var addthis_config = { "data_track_addressbar": true };</script>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51113a4238cf7056"></script>
<!-- AddThis Button END -->
</div>
      
      
        <div class="clr"></div>


        <div style="width:600px;margin:0 10px 0 0;float:left" class="infoanla">

            <asp:Literal ID="litral_video" runat="server"></asp:Literal>
</div>
  <div style="float:right;width:360px;margin:0 30px 20px 0">
        
            <asp:Literal ID="Literal2" runat="server"></asp:Literal>
        
        </div>

        <div class="clr"></div>

</div>
    </asp:Panel>

    <br /><br />

    <asp:Panel ID="Panal_Videos" runat="server">
    <div class="fullWidth">
      <h6 style="height:35px !important;line-height:35px !important;margin:0 !important;padding:0 !important;font-size:16px !important;font-weight:lighter;border-bottom:1px solid #ccc;color:#418FA5 !important">
                   More Videos</h6>
                   <br />
       <ul class="lb-album" id="container">
                            <asp:Repeater ID="repeater_videos" runat="server">
                                <ItemTemplate>
                                    <li class="masonryImage"><a href='<%# "Videos.aspx?ID=" + Eval("ID")%>' title='<%#Eval("Title") %>'>
                                        <img id="Img1" src='<%#Eval("Thumb") %>' runat="server" alt='<%#Eval("Title") %>' /></a>
                                        <b style="height:auto;overflow:visible;line-height:normal;color:#666;display:block;padding:5px;font-weight:normal">
                                            <%#Eval("Title") %></b> </li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
    </div>


    </asp:Panel>


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
</asp:Content>

