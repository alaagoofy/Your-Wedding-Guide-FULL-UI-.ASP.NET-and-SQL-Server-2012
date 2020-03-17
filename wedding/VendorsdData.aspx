<%@ Page Title="Edit Your Images" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="VendorsdData.aspx.cs" Inherits="Account_VendorsData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">

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
        tr,td {padding:10px}
        th {text-align:left !important}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">


    <div class="">
        <div class="log">
        <h1>
                 Manage your account
            </h1>
        <ul style="width:300px;margin:auto">
                <li><a href="VendorInfo.aspx" class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Info</a></li>
                <li><a href="VendorsData.aspx" Class="signin" style="width:100px !important;color:#fff !important;margin:5px 5px;display:inline-block;text-align:center;background:#a39991 !important;float:left">Photos</a></li>
            </ul>
             <div class="clr"></div>
            

     
       <p style="">
      * Maximam size of image 1 m. <br />
       * Image must be jpg or jpeg format. 
     
       </p>
       <p>
     <span style="direction:rtl !important;color:#222;display:block">* يجب أن لا يتجاوز حجم الملف 1 ميجا</span>
     <span style="direction:rtl !important;color:#222;display:block">* يجب أن يكون إمتداد الصورة هوا jpg أو jpeg</span>
       </p>

           
        <p>
              
                <strong style="width: 130px; display: inline-block; margin: 0 0 0 0">
                    <asp:FileUpload ID="upload_image" CssClass="uniform" runat="server" />
                </strong>
            </p>
             <div class="clr"></div>
            <p>
                <asp:Image ID="image_thumb" Width="167px" runat="server" />
            </p>

             <div>
             <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
                    <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
            </div>
           <div>
                <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click" Text="Confirm" ValidationGroup="LoginUserValidationGroup" />
            </div>
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
                                    <asp:CommandField ShowCancelButton="False" HeaderText="Edit" ShowEditButton="True" />
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
  

</asp:Content>

