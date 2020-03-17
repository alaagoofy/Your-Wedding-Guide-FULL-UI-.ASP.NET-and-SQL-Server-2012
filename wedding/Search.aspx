<%@ Page Title="Search" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Search.aspx.cs" Inherits="Catrgory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
<link href="css/style2.css" rel="stylesheet" type="text/css" />
    <link href="test/grid.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">

<div class="fullWidth">
           <%-- <img src="images/ad.gif" style="width: 729px; margin: 0px auto 10px; display: block"
                alt="Alternate Text" />--%>
            <h1>
          <a href="Default.aspx" style="color:#418FA5">Home ></a>  Search</h1>
            <div class="clr">
            </div>
          
          <p>
              <asp:Label ID="Label1" style="color:Red" runat="server" Text=""></asp:Label></p>
         
            <ul class="Category2" id="container">
                <asp:Repeater ID="Repeater1" runat="server" OnItemDataBound="Repeater1_ItemDataBound">
                <ItemTemplate>
                 <li class="masonryImage"><div class="style"><a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>' title='<%#Eval("Title") %>'>
                  <em>  <img src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                    <span><%#Eval("Title") %></span></a>
                  
                  
                   
                    <asp:HiddenField ID="HiddenField2" Value='<%#Eval("ID") %>' runat="server" />
                  <asp:HiddenField ID="HiddenField1" Value='<%#Eval("Title") %>' runat="server" />
                  </div>

                         <div id='<%#Eval("ID") %>' class="reveal-modal">
                <h1 class="Share">
                    <%#Eval("Title") %></h1>
                <div>
                    <img id="Img1" src='<%#Eval("Img") %>' runat="server" style="float: right; width: 130px; border: 1px solid #222;
                        background: #fff; padding: 6px" alt="Heba Edris" />
                    <div style="float: left; width: 350px">
                   
                        <asp:Literal ID="Literal1" runat="server" Text='<%#Eval("Body") %>'></asp:Literal>

                      
                         <br /> <br />
                        <a name="fb_share" type="button" share_url='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>'></a><br />
                        <br />
                        <asp:Literal ID="Literal2" runat="server"></asp:Literal>
                      <%--  <div class="fb-like" data-href="http://yourwedding-guide.com/" data-send="false"
                            data-width="350" data-show-faces="true">--%>
                        </div>
                        <div class="clr">
                        </div>
                    </div>
                    <a class="close-reveal-modal">&#215;</a>
                </div>
                </li>
            
                </ItemTemplate>
                </asp:Repeater>
      
            </ul>
              <script src="test/jquery.wookmark.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {

                var $container = $('#container');

                $container.imagesLoaded(function () {
                    $container.masonry({
                        itemSelector: '.masonryImage'
                    });
                });

            });
        </script>
           <script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript">
</script>
           
         
            <div class="clr">
            </div>
            </div>
       
      
      
</asp:Content>
