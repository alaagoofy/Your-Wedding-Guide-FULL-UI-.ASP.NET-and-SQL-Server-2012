<%@ Page Title="Advertise" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Advertise.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
   <div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
       Advertise
    </h1>
   
    <p>
                      <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label>
                  </p>

                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="txt_businessName">Business name:</asp:Label>
                        <asp:TextBox ID="txt_businessName" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_businessName" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label1" runat="server" AssociatedControlID="txt_Services">Services:</asp:Label>
                        <asp:TextBox ID="txt_Services" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_Services" 
                             CssClass="failureNotification" 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label2" runat="server" AssociatedControlID="txt_name">Full name:</asp:Label>
                        <asp:TextBox ID="txt_name" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_name" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label3" runat="server" AssociatedControlID="txt_phone">Phone number:</asp:Label>
                        <asp:TextBox ID="txt_phone" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txt_phone" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                     <p>
                        <asp:Label ID="Label4" runat="server" AssociatedControlID="txt_Address">Address:</asp:Label>
                        <asp:TextBox ID="txt_Address" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_Address" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                    <p>
                        <asp:Label ID="Label5" runat="server" AssociatedControlID="txt_Address">Email address:</asp:Label>
                        <asp:TextBox ID="txt_mail" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txt_mail" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                    <p>
                        <asp:Label ID="Label6" runat="server" AssociatedControlID="txt_website">Website:</asp:Label>
                        <asp:TextBox ID="txt_website" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txt_website" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                    <p>
                        <asp:Label ID="Label7" runat="server" AssociatedControlID="txt_message">Messages:</asp:Label>
                        <asp:TextBox ID="txt_message" CssClass="txtbox" TextMode="MultiLine" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txt_message" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                 
                       

                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" 
                        CommandName="Login" Text="Submit" ValidationGroup="LoginUserValidationGroup" 
                        onclick="LoginButton_Click1"/>
                </div>
         
      
    </div>
    <div class="regInfo">
    <h1>The Catalogue</h1>
    <p>Your Wedding Guide offers a full spectrum of media solutions with the 
right mix of opportunities that
accurately targets your message, generates demand and delivers 
measurable results.</p>
<p>
We publish your Ad on our website & <a href="http://www.facebook.com/urweddingguide" class="ankor" title="Visit Facebook Pgae" target="_blank">Facebook page</a> that puts you 
directly in front of your customers.
</p>
    
        <img src="images/yourweddingcatalog.png" style="width:179px;display:block;margin:10px auto" alt="your wedding guide catalog" />
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>

