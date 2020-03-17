<%@ Page Title="News Letter" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Newsletter.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
   <div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
      News Letter
    </h1>
   


                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="txt_name">Name:</asp:Label>
                        <asp:TextBox ID="txt_name" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_name" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Name is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                

                     <p>
                        <asp:Label ID="Label2" runat="server" AssociatedControlID="txt_email">Email:</asp:Label>
                        <asp:TextBox ID="txt_email" CssClass="txtbox" runat="server"></asp:TextBox>
                         <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"  
            ControlToValidate="txt_email" ErrorMessage="Wrong mail" ValidationGroup="LoginUserValidationGroup" >*</asp:RegularExpressionValidator>  
             <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_email" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                   
                       <p>
                           <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
                       </p>

                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" 
                        CommandName="Login" Text="Submit" ValidationGroup="LoginUserValidationGroup" 
                        onclick="LoginButton_Click1"/>
                </div>
         
      
    </div>
    <div class="regInfo">
    <h1>Our News</h1>
    <p>Please Submit Your Info To Get All Website News.</p>
   
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>

