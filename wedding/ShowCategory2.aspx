<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="ShowCategory2.aspx.cs" Inherits="ShowCategory" %>

<%@ Register Namespace="ASPnetControls" Assembly="ASPnetPagerV2_8" TagPrefix="cc" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
    <link href="css/style2.css" rel="stylesheet" type="text/css" />
    <link href="test/grid.css" rel="stylesheet" type="text/css" />
    <asp:Literal ID="litral_image" runat="server"></asp:Literal>
    <asp:Literal ID="litral_title" runat="server"></asp:Literal>
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
  
    <link href="css/LightStyle.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .masonry-brick
        {
            margin: 12px !important;
        }
       .middleData li {display:list-item;list-style-position:inside;padding-left:40px}
       
    
.Progress 
{
   margin:10px auto;
    width:300px;
    height:50px;
    text-align:center;
   
        }
    </style>
  
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="Server">
    <div class="fullWidth">
        <h1>
            <a href="Default.aspx" style="color: #F5821E">Home ></a>
            <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton2_Click">
                <asp:Label ID="Label2" Style="color: #F5821E" runat="server" Text=""></asp:Label>
            </asp:LinkButton>
            <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
        </h1>
       
        <div style="width: 120px; float: right">
            <div class="favoret" runat="server" id="DivFavorite">
                <h1>
                    <a href="MyFavorites.aspx" class="loveit2" title="View My favorite">
                        <img src="images/loveit.png" alt="" />
                        My favorite </a>
                </h1>
                <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                    <ContentTemplate>
                       
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
             
                <asp:Literal ID="Literal2" runat="server"></asp:Literal>
                <div class="clr">
                </div>
            </div>
            <div class="bottomData">
            </div>
        </div>
        <div class="clr">
        </div>
        <asp:Panel ID="Panal_Videos" runat="server">
            <div class="">
                <h6 style="height:35px !important;line-height:35px !important;margin:0 !important;padding:0 !important;font-size:16px !important;font-weight:lighter;border-bottom:1px solid #ccc;color:#418FA5 !important">
                    Videos</h6>
              <br />
                   
                        <ul class="lb-album" >
                            <asp:Repeater ID="repeater_videos" runat="server">
                                <ItemTemplate>
                                    <li class="masonryImage"><a href='<%# "Videos.aspx?ID=" + Eval("ID")%>' title='<%#Eval("Title") %>'>
                                        <img id="Img1" src='<%#Eval("Thumb") %>' runat="server" alt='<%#Eval("Title") %>' /></a>
                                        <b style="height:auto;overflow:visible;line-height:normal;color:#666;display:block;padding:5px;font-weight:normal">
                                            <%#Eval("Title") %></b> </li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                      <div class="clr">
        </div>
               
            </div>
        </asp:Panel>
        <div class="clr">
        </div>
        <br /><br />
         <div class="sharebuttons" style="width: 480px;float:none !important">
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

          <br /><br />
      
        <asp:Panel ID="panal_images" runat="server">
            <h6 class="titles">
                Photos</h6>


                 <script src="test/jquery.wookmark.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {

                var $container = $('.container');

                $container.imagesLoaded(function () {
                    $container.masonry({
                        itemSelector: '.masonryImage'
                    });
                });

            });
        </script>

              
               

    <asp:UpdatePanel ID="UpdatePanel3" runat="server">
    <ContentTemplate>
  
     <ul class="lb-album">
                <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                        <li class=""><a id="A1" href='<%# "ShowImage.aspx?ID2=" + Eval("ID")%>' runat="server"><em>
                            <img src='<%#Eval("Img") %>' alt="Your Weddig Guide Catalog" /></em> <%--<span>Code # 0<%#  Eval("ID")%></span>--%>
                        </a>
                           
                        </li>
                    </ItemTemplate>
                </asp:Repeater>

            </ul>
          
            
              <asp:UpdateProgress ID="UpdateProgress1" runat="server" AssociatedUpdatePanelID="UpdatePanel3" >
    <ProgressTemplate>
       
    <div id="dvProgress" runat="server" class="Progress">
         Please Wait...   <asp:Image ID="Image2" runat="server"
                       ImageUrl="loader.gif"  /> 
        </div>
    </ProgressTemplate>
    </asp:UpdateProgress>
       
         <asp:Button ID="ButtonTrigger" runat="server" Text="Show More" CssClass="showMore" 
            onclick="Button2_Click"  />   
    </ContentTemplate>
  
    </asp:UpdatePanel>
   
  



         



          
        </asp:Panel>
      


  








        <div class="clr">
        </div>
       
    </div>
  
</asp:Content>
