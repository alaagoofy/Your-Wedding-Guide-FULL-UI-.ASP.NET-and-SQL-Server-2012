<%@ Page Title="Create a New Account" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="Register.aspx.cs" Inherits="Account_Login" Debug="true" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
   
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
<div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
    <h1>
                        Create a New Account
                    </h1>
   
     <asp:CreateUserWizard ID="RegisterUser" runat="server" EnableViewState="false" OnCreatedUser="RegisterUser_CreatedUser">
        <LayoutTemplate>
            <asp:PlaceHolder ID="wizardStepPlaceholder" runat="server"></asp:PlaceHolder>
            <asp:PlaceHolder ID="navigationPlaceholder" runat="server"></asp:PlaceHolder>
        </LayoutTemplate>
        <WizardSteps>
            <asp:CreateUserWizardStep ID="RegisterUserWizardStep" runat="server">
                <ContentTemplate>
                   
                   
                 
                    <span class="failureNotification">
                        <asp:Literal ID="ErrorMessage" runat="server"></asp:Literal>
                    </span>
                    <asp:ValidationSummary ID="RegisterUserValidationSummary" runat="server" CssClass="failureNotification" 
                         ValidationGroup="RegisterUserValidationGroup"/>
                         <p
                             <asp:Label ID="Error" runat="server" Text=""></asp:Label>
                         
                         </p>

                           
                            <p>
                                <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">User Name:</asp:Label>
                                <asp:TextBox ID="UserName" runat="server" CssClass="textEntry"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" 
                                     CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required." 
                                     ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                            </p>
                            <p>
                                <asp:Label ID="EmailLabel" runat="server" AssociatedControlID="Email">E-mail:</asp:Label>
                                <asp:TextBox ID="Email" runat="server" CssClass="textEntry"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email" 
                                     CssClass="failureNotification" ErrorMessage="E-mail is required." ToolTip="E-mail is required." 
                                     ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                            </p>
                            <p>
                                <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                                <asp:TextBox ID="Password" PlaceHolder="minimum 6 characters " runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" 
                                     CssClass="failureNotification" ErrorMessage="Password is required." ToolTip="Password is required." 
                                     ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                            </p>
                            <p>
                                <asp:Label ID="ConfirmPasswordLabel" runat="server" AssociatedControlID="ConfirmPassword">Confirm Password:</asp:Label>
                                <asp:TextBox ID="ConfirmPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                                <asp:RequiredFieldValidator ControlToValidate="ConfirmPassword" CssClass="failureNotification" Display="Dynamic" 
                                     ErrorMessage="Confirm Password is required." ID="ConfirmPasswordRequired" runat="server" 
                                     ToolTip="Confirm Password is required." ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword" 
                                     CssClass="failureNotification" Display="Dynamic" ErrorMessage="The Password and Confirmation Password must match."
                                     ValidationGroup="RegisterUserValidationGroup">*</asp:CompareValidator>
                            </p>
                             <p>
                                <asp:Label ID="Label3" runat="server" AssociatedControlID="txt_mobile">Mobile: <b>(Optional)</b></asp:Label>
                                <asp:TextBox ID="txt_mobile" runat="server" CssClass="textEntry"></asp:TextBox>
                              
                            </p>
                             <p>
                                <asp:Label ID="Label4" runat="server" AssociatedControlID="txt_address">Address: <b>(Optional)</b></asp:Label>
                                <asp:TextBox ID="txt_address" runat="server" CssClass="textEntry"></asp:TextBox>
                              
                            </p>
                            
                          
                            <div class="clr"></div>
                        
                        <div>
                            <asp:Button ID="CreateUserButton" runat="server" CssClass="signin" CommandName="MoveNext" Text="Sign Up" 
                                 ValidationGroup="RegisterUserValidationGroup"/>
                        </div>
                    
                </ContentTemplate>
                <CustomNavigationTemplate>
                </CustomNavigationTemplate>
            </asp:CreateUserWizardStep>
        </WizardSteps>
    </asp:CreateUserWizard>
    </div>
    <div class="regInfo">
   
    
        <asp:LinkButton ID="LinkButton1" CssClass="facebook_connect" runat="server" 
            onclick="LinkButton1_Click">	</asp:LinkButton>
                        <br />
                        <p>You Can Access to</p>

    <ol>
    <li>Dress, Cake, Flower Photos.</li>
    <li>Wedding & Engagement Dresses.</li>
    <li>Makeup Artist, Hair Dresses.</li>
    <li>Video,Photographers, Furniture</li>
    <li>Home Accessories, Hotels & Resorts. </li>
    </ol>
  
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

    <%--<div class="auto">
    <img src="images/about.jpg" style="margin:50px auto 0;width:647px;display:block" alt="Alternate Text" />
    </div>--%>
</asp:Content>