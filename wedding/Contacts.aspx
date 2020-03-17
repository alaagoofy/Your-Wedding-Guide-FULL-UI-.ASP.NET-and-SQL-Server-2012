<%@ Page Title="Contact Us" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Contacts.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
   <div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
       Contact Us
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
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_phone" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Message is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                  <p>
                      <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label>
                  </p>
                       

                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" CommandName="Login" onclick="LoginButton_Click1" Text="Submit" ValidationGroup="LoginUserValidationGroup"/>
                </div>
         
      
    </div>
    <div class="regInfo">
    <h1>Our Location</h1>
    <p>Visit Us Now</p>
    <iframe style="width:195px;display:block;margin:10px auto" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=19+makkah+St.,+Mohandseen,+Giza+Egypt&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=58.858685,114.169922&amp;ie=UTF8&amp;hq=19+makkah+St.,+Mohandseen,&amp;hnear=Giza,+Al+Omraneyah,+Giza,+Egypt&amp;t=m&amp;z=12&amp;iwloc=A&amp;cid=14498541149884667712&amp;ll=30.009072,31.176857&amp;output=embed"></iframe>
      
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>

