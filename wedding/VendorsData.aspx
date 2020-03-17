<%@ Page Title="Edit Your Images" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="VendorsData.aspx.cs" Inherits="Account_VendorsData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">


    <link rel="Stylesheet" type="text/css" href="css/uploadify.css" />
     <script type="text/javascript" src="scripts/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.uploadify.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">


    <div class="">
        <div class="log">
        <h1>
                 Manage your account
            </h1>
        <ul style="width:300px;margin:auto">
                <li><a href="VendorInfo.aspx" class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Info</a></li>
                <li><a href="VendorsData.aspx" class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Photos</a></li>
            </ul>
             <div class="clr"></div>
            

     
       <p style="">
      * Maximam size of image 1 m. <br />
       * Image must be jpg or jpeg format. <br />
     * You can select more than one picture.<br />
    
       </p>
       <p>
     <span style="direction:rtl !important;color:#222;display:block">* يجب أن لا يتجاوز حجم الملف 1 ميجا</span>
     <span style="direction:rtl !important;color:#222;display:block">* يجب أن يكون إمتداد الصورة هوا jpg أو jpeg</span>
     <span style="direction:rtl !important;color:#222;display:block">* تستطيع إختيار أكثر من صورة</span>
     
       </p>

           
      
             <div class="clr"></div>
            <p>
                <asp:Image ID="image_thumb" Width="167px" runat="server" />
            </p>

             <div>
             <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
                    <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
            </div>
               <p>
        <asp:FileUpload ID="FileUpload1" runat="server" />
    </p>


         <%--  <div>
                <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click" Text="Confirm" ValidationGroup="LoginUserValidationGroup" />
            </div>--%>
           <div class="clr>"></div>
           <br /><br /><br />



              
            <asp:GridView ID="grid_Display" runat="server" CssClass="static" AutoGenerateColumns="False"
                                DataKeyNames="ID" GridLines="Vertical" OnPageIndexChanging="grid_Display_PageIndexChanging"
                                OnRowEditing="grid_Display_RowEditing" OnRowDataBound="grid_Display_RowDataBound"
                                OnRowDeleting="grid_Display_RowDeleting" 
                AllowPaging="True" PageSize="21" Width="570px" BackColor="White" 
                BorderColor="#999999" BorderStyle="Solid" BorderWidth="1px" CellPadding="3" 
                ForeColor="#a39991">
                                <AlternatingRowStyle BackColor="#DBD8D6" />
                                <Columns>
                                    <%-- <asp:BoundField DataField="Title"  HeaderText="Title" />--%>
                                    <asp:TemplateField HeaderText="Image">
                                        <ItemTemplate>
                                         
                                            <asp:Image ID="image_thumb" ImageUrl='<%# "~/" + Eval("Img") %>' Width="80px" runat="server" />
                                                
                                           
                                            
                                            
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Delete">
                                    <ItemTemplate>
                                       <asp:LinkButton ID="btn_delete" runat="server" CommandArgument='<%#Eval("ID") %>'
                                                    CommandName="Delete"><img src="../images/DeleteRed.png" alt="Delete Red" /></asp:LinkButton>
                                    </ItemTemplate>
                                    </asp:TemplateField>
                                   <%-- <asp:CommandField ShowCancelButton="False" HeaderText="Edit" ShowEditButton="False" />--%>
                                </Columns>
                              
                                <FooterStyle BackColor="#e8e8e8" />
                                <HeaderStyle BackColor="#a39991" Font-Bold="True" ForeColor="White" />
                                <PagerStyle BackColor="#a39991" ForeColor="Black" HorizontalAlign="Center" />
                                <SelectedRowStyle BackColor="#000099" Font-Bold="True" ForeColor="White" />
                                <SortedAscendingCellStyle BackColor="#F1F1F1" />
                                <SortedAscendingHeaderStyle BackColor="#808080" />
                                <SortedDescendingCellStyle BackColor="#CAC9C9" />
                                <SortedDescendingHeaderStyle BackColor="#383838" />
                              
                            </asp:GridView>
          
            <div class="clr">
            </div>
        </div>
      
        <div class="clr">
        </div>
    </div>
  <asp:Button runat="server" ID="HiddenButton" Style="display: none;" onclick="HiddenButton_Click"  />
       <script type = "text/javascript">
           $(window).load(
    function () {
        $("#<%=FileUpload1.ClientID %>").fileUpload({
            'uploader': 'scripts/uploader.swf',
            'cancelImg': 'images/cancel.png',
            'buttonText': 'Browse Files',
            'script': 'Upload.ashx',
            'folder': 'uploads',
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

