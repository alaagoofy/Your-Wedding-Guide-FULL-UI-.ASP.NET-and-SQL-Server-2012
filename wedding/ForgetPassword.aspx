<%@ Page Title="Forget Password" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ForgetPassword.aspx.cs" Inherits="ForgetPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Banner" Runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">
    <div class="fullWidth">

<div class="log">

    <asp:Panel ID="Panel1" runat="server">
    <h1>Trouble Accessing Your Account?</h1>
    <p>Forgot your password? Enter your login email .</p>
    <p>
We will send you an email with a link to reset your password.</p>
   
<p>
<label>Email Address:</label>
    <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
</p>
 <p>
    <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label></p>

<div>
    <asp:Button ID="Button1" runat="server" CssClass="signin" Text="Send" onclick="Button1_Click" />
</div>
<div class="clr"></div>
    </asp:Panel>



    <asp:Panel ID="Panel2" runat="server">
    <h1>Change Password Now</h1>
   
<p>
<label>Enter New Password:</label>
    <asp:TextBox ID="txt_pass" runat="server"></asp:TextBox>
</p>
 <p>
    <asp:Label ID="Label1" runat="server" Text=""></asp:Label></p>

<div>
    <asp:Button ID="Button2" runat="server" CssClass="signin" Text="Change" onclick="Button2_Click" />
</div>
<div class="clr"></div>
    </asp:Panel>


</div>
 

</div>
</asp:Content>

