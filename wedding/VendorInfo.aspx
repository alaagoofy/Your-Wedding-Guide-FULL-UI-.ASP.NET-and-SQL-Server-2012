<%@ Page Title="Edit Your Data" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeFile="VendorInfo.aspx.cs" Inherits="VendorInfo" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
    <link rel="stylesheet" type="text/css" href="scripts/uniform/css/uniform.aristo.css"/>
    <script src="ckeditor/ckeditor.js" type="text/javascript"></script>
    <script src="scripts/jquery.min.js" type="text/javascript"></script>
    <script src="scripts/jquery-ui.min.js" type="text/javascript"></script>
    <script src="scripts/touchPunch/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
    <script src="scripts/uitotop/js/jquery.ui.totop.js" type="text/javascript"></script>
    <script src="scripts/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="scripts/autogrow/jquery.autogrowtextarea.js" type="text/javascript"></script>
    <script type="text/javascript" src="scripts/livequery/jquery.livequery.js"></script>
    <script type="text/javascript" src="scripts/MaxMin/maxmin_ui.js"></script>
    <script type="text/javascript" src="scripts/MaxMin/maxmin_forms.js"></script>
    <style type="text/css">
        #MainContent_ContentPlaceHolder1_txt_msg
        {
            width: 380px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Banner" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="Server">

        <div class="log">
         <h1>
                Manage your account
            </h1>
         <ul style="width:300px;margin:auto">
                <li><a href="VendorInfo.aspx" class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Info</a></li>
                <li><a href="VendorsData.aspx" class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Photos</a></li>
            </ul>
            <div class="clr"></div>
           
            <p>
                <label>
                     Name:</label>
                <asp:TextBox ID="txt_Title" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_Title"
                    CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
            </p>
            <p>
                <asp:Label ID="Label1" runat="server" AssociatedControlID="upload_image">Choose Album Cover:</asp:Label>
                <strong style="float: right; width: 130px; display: inline-block; margin: 0 177px 0 0">
                    <asp:FileUpload ID="upload_image" CssClass="uniform" runat="server" />
                </strong>
            </p>
            <p><label>Cover: </label>
                <asp:Image ID="image_thumb" Width="167px" runat="server" />
            </p>
            <p>
                <label>
                     Info:</label>
                <textarea id="txt_msg" runat="server" class="ckeditor" cols="10" name="editor1" rows="1"></textarea>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_msg"
                    ErrorMessage="*" ValidationGroup="a">*</asp:RequiredFieldValidator>
            </p>
            <div>
                <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
                <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
            </div>
            <div>
                <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click"
                    Text="Save" ValidationGroup="LoginUserValidationGroup" />
            </div>
            <div class="clr">
            </div>
        </div>
       
</asp:Content>
