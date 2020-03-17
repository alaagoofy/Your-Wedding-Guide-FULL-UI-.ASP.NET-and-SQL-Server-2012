<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Category.aspx.cs" Inherits="Catrgory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">

<div class="fullWidth">
           <%-- <img src="images/ad.gif" style="width: 729px; margin: 0px auto 10px; display: block"
                alt="Alternate Text" />--%>
            <h1>
          <a href="Default.aspx" style="color:#F5821E">Home ></a>    <asp:Label ID="Label1" runat="server" Text=""></asp:Label>  <asp:Label ID="lbl_head" runat="server" Text=""></asp:Label><%-- <a href="#" style="" title="Go to Beauty">NEXT CATEGORY ></a>--%></h1>
            <div class="clr">
            </div>
          

         
            <ul class="Category2" id="container">
                <asp:Repeater ID="Repeater1" runat="server" OnItemDataBound="Repeater1_ItemDataBound">
                <ItemTemplate>
                 <li class="masonryImage">
                 
                 <div class="style"><a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>' title='<%#Eval("Title") %>'>
                  <em>  <img src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                    <span><%#Eval("Title") %></span></a>
                    <a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>' class="loveit2" style="float: right">
                            Photos 
                        <asp:Literal ID="lbl_photos" runat="server"></asp:Literal>
                        </a>
                  
                   
                    <asp:HiddenField ID="HiddenField2" Value='<%#Eval("ID") %>' runat="server" />
                  <asp:HiddenField ID="HiddenField1" Value='<%#Eval("Title") %>' runat="server" />
                  </div>

                       
                </li>
           
                </ItemTemplate>
                </asp:Repeater>
      
            </ul>
          
           <script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript">
</script>
           
         
            <div class="clr">
            </div>
            </div>
       
      
      
</asp:Content>
