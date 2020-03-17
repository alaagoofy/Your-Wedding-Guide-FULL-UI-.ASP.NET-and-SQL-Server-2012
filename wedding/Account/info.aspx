<%@ Page Title="" Language="C#" MasterPageFile="~/Account/MasterPage.master" AutoEventWireup="true" CodeFile="info.aspx.cs" Inherits="Account_info" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<h1>Website Details</h1>
<p>
<label>Subscriber: </label>
    <asp:Label ID="lbl_subscriber" runat="server" Text=""></asp:Label>

</p>

<p>
<label>website Users: </label>
    <asp:Label ID="lbl_users" runat="server" Text=""></asp:Label>

</p>

<p>
<label>Facebook Users: </label>
    <asp:Label ID="lbl_fbusers" runat="server" Text=""></asp:Label>
</p>

<p>
<label>Users Favorites: </label>
    <asp:Label ID="lbl_favorites" runat="server" Text=""></asp:Label>
</p>

<p>
<label>Number of Vendors : </label>
    <asp:Label ID="lbl_vendors" runat="server" Text=""></asp:Label>
</p>

<p>
<label>Number of Vendors Images: </label>
    <asp:Label ID="lbl_images" runat="server" Text=""></asp:Label>
</p>

<p>
<label>Number of Categories Images: </label>
    <asp:Label ID="lbl_Imagecategoires" runat="server" Text=""></asp:Label>
</p>




</asp:Content>

