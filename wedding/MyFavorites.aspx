<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="MyFavorites.aspx.cs" Inherits="MyFavorites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
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
    <style type="text/css">
    .fullWidth {min-height:600px}
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Banner" Runat="Server">
</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">
<div class="fullWidth">
<h1>
  Hello  <asp:Label ID="Label1" runat="server" Text=""></asp:Label>  <!-- AddThis Button BEGIN -->

</h1>
 <div class="favoret" style="width:150px">
                <h1>
                    <a href="MyFavorites.aspx" class="loveit2" title="View My favorite">
                        <img src="images/loveit.png" alt="" />
                        My favorite </a>
                </h1>
               <asp:UpdatePanel ID="UpdatePanel2" runat="server">
       <ContentTemplate>
           <asp:Timer ID="Timer1" Interval="1000" Enabled="true" runat="server">
           </asp:Timer> <b runat="server" id="getFav"></b> 
              </ContentTemplate>
       </asp:UpdatePanel>
           <span><a href="MyFavorites.aspx">View My favorite</a></span>
                <div class="clr">
                </div>
            </div>
            <div class="clr">
            </div>
   
       
        

   	<ul class="lb-album" id="container">
     <asp:Repeater ID="Repeater1" runat="server" OnItemCommand="Repeater1_OnItemCommand">
       <ItemTemplate>
    <li class="masonryImage">
     
     <a id="A1" href='<%# "ShowImage.aspx?ID2=" + Eval("Image_ID")%>' runat="server">
                  <em>  <img src='<%#Eval("Img") %>' alt="Your Weddig Guide Catalog" /></em>
         <asp:LinkButton ID="LinkButton1" ToolTip="Remove Image From Youe Favorite" CommandName="Delete" CommandArgument='<%#Eval("ID") %>' runat="server">
         <img src="images/DeleteRed.png" style="width:auto !important;height:auto !important;margin-top:7px !important" alt="Delete Red" />
         </asp:LinkButton>
                  </a>

                
                </li>

                  </ItemTemplate>
       </asp:Repeater>

					
				</ul>    
                
            
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

