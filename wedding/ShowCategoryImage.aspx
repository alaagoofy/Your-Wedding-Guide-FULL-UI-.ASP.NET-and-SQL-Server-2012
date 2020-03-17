<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="ShowCategoryImage.aspx.cs" Inherits="ShowImage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
     <asp:Literal ID="litral_title" runat="server"></asp:Literal>
    <asp:Literal ID="litral_image" runat="server"></asp:Literal>
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
     <link href="css/style2.css" rel="stylesheet" type="text/css" />
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="Server">

<div class="fullWidth">
    <h1 style="font-weight:normal">
        <a href="Default.aspx" style="color: #F5821E">Home ></a>
        <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton1_Click2">
            <asp:Label ID="Label11" Style="color: #F5821E" runat="server" Text=""></asp:Label>
        </asp:LinkButton>
        <asp:Label ID="Label3" runat="server" Text=""></asp:Label> - 
        
        <asp:LinkButton ID="LinkButton3" Style="color:#F5821E" runat="server" 
            onclick="LinkButton3_Click">Back to Album</asp:LinkButton>
      
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
  


  <%-- <div style="float: left; width: 100px">
   <asp:Literal ID="Literal1" runat="server"></asp:Literal>
   </div>--%>
    <div style="float: left; width: 700px">
       
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
   
   
    <div class="clr"></div>
     
    
    <div class="ShowImage">
    <table style="margin:auto;text-align:center">
    <tr align="center">
     <td align="center"><asp:Literal ID="Prev" runat="server"></asp:Literal></td>
    <td align="center">
     
        <asp:Image ID="Image1" style="" runat="server" />
        
    </td>
     <td align="center"><asp:Literal ID="Next" runat="server"></asp:Literal></td>
    </tr>
    
    </table>

   
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
</asp:Content>
