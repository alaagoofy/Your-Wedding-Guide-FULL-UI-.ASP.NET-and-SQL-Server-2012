<%@ Page Title="Order Now" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Order.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
   <div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
       Order Your Copy Now, Only 40 L.E
    </h1>
   


                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="txt_name">Name:</asp:Label>
                        <asp:TextBox ID="txt_name" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_name" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Name is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label1" runat="server" AssociatedControlID="txt_address">Address:</asp:Label>
                        <asp:TextBox ID="txt_address" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_address" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Address is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label2" runat="server" AssociatedControlID="txt_email">Email:</asp:Label>
                        <asp:TextBox ID="txt_email" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_email" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Email is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label3" runat="server" AssociatedControlID="txt_phone">Phone:</asp:Label>
                        <asp:TextBox ID="txt_phone" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txt_phone" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Phone is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                     <p>
                        <asp:Label ID="Label4" runat="server" AssociatedControlID="txt_message">Message:</asp:Label>
                        <asp:TextBox ID="txt_message" CssClass="txtbox" TextMode="MultiLine" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_message" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Message is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                  <p>
                      <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label>
                  </p>
                       

                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" 
                        CommandName="Login" Text="Submit" ValidationGroup="LoginUserValidationGroup" 
                        onclick="LoginButton_Click1"/>
                </div>
         
      
    </div>
    <div class="regInfo">
    <h1>The Catalogue</h1>
    <p>600 pages including wedding & engagement dresses, makeup artist, hair dresser , wedding planners, flowers arrangement, video, photographers, furniture, home accessories, hotels & resorts,,,, and more,,, ONLY 40LE.</p>
    
        <img src="images/yourweddingcatalog.png" style="width:179px;display:block;margin:10px auto" alt="your wedding guide catalog" />
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>

