<%@ Page Title="" Language="C#" MasterPageFile="~/Account/MasterPage.master" AutoEventWireup="true"
    CodeFile="NewsLetter.aspx.cs" Inherits="Account_NewsLetter" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <style type="text/css">
    td,th {border-right:1px solid #ccc;border-bottom:1px solid #ccc;padding:10px;text-align:center}
    .loginDivT {display:none}
    .loginDivB {display:none}
   .loginDiv {background:none;width:900px}
    .regInfo {display:none}
    .log {background:none;width:900px}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

 <p>
        <label>
            Name:</label>
        <asp:TextBox ID="txt_Name" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_Name"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>

     <p>
        <label>
            Email:</label>
        <asp:TextBox ID="txt_email" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_email"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>

     <p>
        <label>
            Phone:</label>
        <asp:TextBox ID="txt_phone" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_phone"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>

     <p>
        <label>
            Gender:</label>
        <asp:TextBox ID="txt_Gender" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txt_Gender"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>

     <p>
        <label>
            City:</label>
        <asp:TextBox ID="txt_city" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_city"
            CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
    </p>

    

<div>
        <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
        <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
    </div>

      <div>
        <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click"
            Text="Add" ValidationGroup="LoginUserValidationGroup" />
    </div>


    <div>
    <asp:GridView ID="grid_Display" runat="server" CssClass="static" AutoGenerateColumns="False"
        DataKeyNames="ID" GridLines="Vertical" OnPageIndexChanging="grid_Display_PageIndexChanging"
        OnRowEditing="grid_Display_RowEditing" OnRowDataBound="grid_Display_RowDataBound"
        OnRowDeleting="grid_Display_RowDeleting" AllowPaging="True" PageSize="100" BackColor="White"
        BorderColor="#999999" BorderWidth="1px" CellPadding="3" Width="900px" 
            BorderStyle="Solid" ForeColor="Black">
        <AlternatingRowStyle BackColor="#CCCCCC" />
        <Columns>
            <%-- <asp:BoundField DataField="Title"  HeaderText="Title" />--%>
            <asp:TemplateField HeaderText="Name">
                <ItemTemplate>
                        <%# Eval("Name") %>
                </ItemTemplate>
            </asp:TemplateField>

            <asp:TemplateField HeaderText="Email">
            <ItemTemplate>
            <%# Eval("Email") %>
            </ItemTemplate>
            </asp:TemplateField>

            <asp:TemplateField HeaderText="Phone">
            <ItemTemplate>
            <%# Eval("Phone") %>
            </ItemTemplate>
            </asp:TemplateField>

            <asp:TemplateField HeaderText="Gender">
            <ItemTemplate>
            <%# Eval("Gender") %>
            </ItemTemplate>
            </asp:TemplateField>

             <asp:TemplateField HeaderText="City">
            <ItemTemplate>
            <%# Eval("City") %>
            </ItemTemplate>
            </asp:TemplateField>

             <asp:TemplateField HeaderText="Delete">
            <ItemTemplate>
            <asp:LinkButton ID="btn_delete" runat="server" CommandArgument='<%#Eval("ID") %>'
                            CommandName="Delete"><img src="../images/DeleteRed.png" alt="Delete Red" /></asp:LinkButton>
            </ItemTemplate>
            </asp:TemplateField>

            <asp:CommandField ShowCancelButton="False" ShowEditButton="True" HeaderText="Edit" />
        </Columns>
        <FooterStyle BackColor="#CCCCCC" />
        <HeaderStyle BackColor="Black" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
        <SelectedRowStyle BackColor="#000099" Font-Bold="True" ForeColor="White" />
        <SortedAscendingCellStyle BackColor="#F1F1F1" />
        <SortedAscendingHeaderStyle BackColor="#808080" />
        <SortedDescendingCellStyle BackColor="#CAC9C9" />
        <SortedDescendingHeaderStyle BackColor="#383838" />
    </asp:GridView>
    </div>
</asp:Content>
