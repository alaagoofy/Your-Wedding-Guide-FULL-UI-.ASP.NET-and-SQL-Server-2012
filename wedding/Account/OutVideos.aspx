<%@ Page Title="Out Videos" Language="C#" MasterPageFile="~/Account/MasterPage.master" AutoEventWireup="true"
    CodeFile="OutVideos.aspx.cs" Inherits="Account_OutVideos" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <link rel="stylesheet" type="text/css" href="../scripts/uniform/css/uniform.aristo.css">
    <script src="../scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../scripts/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../scripts/touchPunch/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
    <script src="../scripts/uitotop/js/jquery.ui.totop.js" type="text/javascript"></script>
    <script src="../scripts/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../scripts/autogrow/jquery.autogrowtextarea.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/livequery/jquery.livequery.js"></script>
    <script type="text/javascript" src="../scripts/MaxMin/maxmin_ui.js"></script>
    <script type="text/javascript" src="../scripts/MaxMin/maxmin_forms.js"></script>
    <style type="text/css">
        #MainContent_ContentPlaceHolder1_txt_msg
        {
            width: 380px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <h1>
        Insert or Edit Vidoes of Category
    </h1>
    <p>
        <label>
            Video Name:</label>
        <asp:TextBox ID="txt_Title" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_Title"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>
    <p>
        <asp:Label ID="Label1" runat="server" AssociatedControlID="upload_image">Video Thumb:</asp:Label>
        <strong style="float: right; width: 130px; display: inline-block; margin: 0 177px 0 0">
            <asp:FileUpload ID="upload_image" CssClass="uniform" runat="server" />
        </strong>
    </p>
    <p>
        <label>
            Video Link:</label>
        <asp:TextBox ID="txt_link" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_link"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>
    <p>
        <label>
            Video Ifrmae:</label>
        <asp:TextBox ID="txt_iframe" TextMode="MultiLine" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_iframe"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>
    <p>
        <asp:Image ID="image_thumb" Width="167px" runat="server" />
    </p>
    <div>
        <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
        <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
    </div>
    <div>
        <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click"
            Text="Add" ValidationGroup="LoginUserValidationGroup" />
    </div>
    <%-- <div>
                <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click" Text="Add" ValidationGroup="LoginUserValidationGroup" />
            </div>--%>
    <asp:GridView ID="grid_Display" runat="server" CssClass="static" AutoGenerateColumns="False"
        DataKeyNames="ID" GridLines="Horizontal" OnPageIndexChanging="grid_Display_PageIndexChanging"
        OnRowEditing="grid_Display_RowEditing" OnRowDataBound="grid_Display_RowDataBound"
        OnRowDeleting="grid_Display_RowDeleting" AllowPaging="True" PageSize="135" BackColor="White"
        BorderColor="#336666" BorderWidth="3px" CellPadding="4" Width="480px">
        <Columns>
            <%-- <asp:BoundField DataField="Title"  HeaderText="Title" />--%>
            <asp:TemplateField>
                <ItemTemplate>
                    <td>
                       <%# Eval("Title") %>
                    </td>
                    <td>
                        <asp:Image ID="image_thumb" ImageUrl='<%# "~/" + Eval("Thumb") %>' Width="80px"
                            runat="server" />
                    </td>
                  
                    <td>
                        <asp:LinkButton ID="btn_delete" runat="server" CommandArgument='<%#Eval("ID") %>'
                            CommandName="Delete"><img src="../images/DeleteRed.png" alt="Delete Red" /></asp:LinkButton>
                    </td>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:CommandField ShowCancelButton="False" ShowEditButton="True" />
        </Columns>
        <FooterStyle BackColor="White" ForeColor="#333333" />
        <HeaderStyle BackColor="#336666" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#336666" ForeColor="White" HorizontalAlign="Center" />
        <RowStyle BackColor="White" ForeColor="#333333" />
        <SelectedRowStyle BackColor="#339966" Font-Bold="True" ForeColor="White" />
        <SortedAscendingCellStyle BackColor="#F7F7F7" />
        <SortedAscendingHeaderStyle BackColor="#487575" />
        <SortedDescendingCellStyle BackColor="#E5E5E5" />
        <SortedDescendingHeaderStyle BackColor="#275353" />
    </asp:GridView>
</asp:Content>
