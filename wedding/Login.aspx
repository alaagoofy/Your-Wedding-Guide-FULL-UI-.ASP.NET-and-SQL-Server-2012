<%@ Page Title="Log In" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Login.aspx.cs" Inherits="Account_Login" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <style type="text/css">
  
    </style>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
 


<div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
       Log-in to your account
    </h1>
   
    <asp:Login ID="LoginUser" runat="server" EnableViewState="false" RenderOuterTable="false">
        <LayoutTemplate>
            <span class="failureNotification">
                <asp:Literal ID="FailureText" runat="server"></asp:Literal>
            </span>
            <asp:ValidationSummary ID="LoginUserValidationSummary" runat="server" CssClass="failureNotification" 
                 ValidationGroup="LoginUserValidationGroup"/>
          
                   
                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">Username:</asp:Label>
                        <asp:TextBox ID="UserName" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                        <asp:TextBox ID="Password" CssClass="txtbox" runat="server" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                             CssClass="failureNotification" ErrorMessage="Password is required." ToolTip="Password is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                   
                        <asp:CheckBox ID="RememberMe" runat="server"/>
                        <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="inline">Keep me logged in</asp:Label>
                    <a href="ForgetPassword.aspx" style="display:inline-block;float:right;text-decoration:underline">Forget Password?</a>
              
              <div class="clr"></div>
              <br />
                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" CommandName="Login" Text="Sign In" ValidationGroup="LoginUserValidationGroup"/>


                </div>
         
        </LayoutTemplate>
    </asp:Login>
    </div>
    <div class="regInfo">
   
  
        <asp:LinkButton ID="LinkButton1" CssClass="facebook_connect" runat="server" 
            onclick="LinkButton1_Click">	</asp:LinkButton>

         
   


    <h1>Or Sign Up</h1>
    <a href="Register.aspx" class="signin" style="margin:10px 0;float:none;text-align:center">Register</a>
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>