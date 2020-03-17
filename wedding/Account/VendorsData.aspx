<%@ Page Title="" Language="C#" MasterPageFile="~/Account/MasterPage.master" AutoEventWireup="true" CodeFile="VendorsData.aspx.cs" Inherits="Account_ViewDetails" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
   <link rel="Stylesheet" type="text/css" href="../css/uploadify.css" />
     <script type="text/javascript" src="../scripts/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="../scripts/jquery.uploadify.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<h1>Photos</h1>

<p>
    <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label>
     <asp:Label ID="lbl_id" runat="server" Text=""></asp:Label>
</p>
<p><label>Write Vendor name</label>

 <asp:AutoCompleteExtender ServiceMethod="SearchCustomers" 
    MinimumPrefixLength="2"
    CompletionInterval="100" EnableCaching="false"  CompletionSetCount="10" 
    TargetControlID="txtContactsSearch"
    ID="AutoCompleteExtender1" runat="server" FirstRowSelected = "false">
    </asp:AutoCompleteExtender>


    
<asp:TextBox ID="txtContactsSearch" runat="server"></asp:TextBox>
</p>

<p>
        <asp:FileUpload ID="FileUpload1" runat="server" />
    </p>


    <asp:Button ID="Button1" runat="server" CssClass="signin" Text="Get Images" OnClick="Button1_Click" />


     <asp:Button runat="server" ID="HiddenButton" Style="display: none;" onclick="HiddenButton_Click"  />

       <asp:GridView ID="grid_Display" runat="server" CssClass="static" AutoGenerateColumns="False"
                                DataKeyNames="ID" GridLines="Horizontal" OnPageIndexChanging="grid_Display_PageIndexChanging"
                                OnRowEditing="grid_Display_RowEditing" OnRowDataBound="grid_Display_RowDataBound"
                                OnRowDeleting="grid_Display_RowDeleting" 
                AllowPaging="True"  BackColor="White" BorderColor="#336666" 
                 BorderWidth="3px" CellPadding="4" Width="480px">
                                <Columns>
                                    <%-- <asp:BoundField DataField="Title"  HeaderText="Title" />--%>
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <td>
                                            <asp:Image ID="image_thumb" ImageUrl='<%# "~/" + Eval("Img") %>' Width="80px" runat="server" />
                                                
                                            </td>
                                            <td>
                                            
                                                <%# "00" + Eval("ID") %>
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

                            <script type = "text/javascript">
                                $(window).load(
    function () {
        $("#<%=FileUpload1.ClientID %>").fileUpload({
            'uploader': '../scripts/uploader.swf',
            'cancelImg': '../images/cancel.png',
            'buttonText': 'Browse Files',
            'script': '../Upload.ashx',
            'folder': '../uploads',
            'fileDesc': 'Image Files',
            'fileExt': '*.jpg;*.jpeg;*.gif;*.png',
            'multi': true,
            'auto': true,
            'onAllComplete': function (event, data) {
                $("#<%= HiddenButton.ClientID %>").click();
                return true;
            }
        });
    }
);
</script> 
</asp:Content>

