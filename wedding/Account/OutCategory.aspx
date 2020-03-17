﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Account/MasterPage.master" AutoEventWireup="true" CodeFile="OutCategory.aspx.cs" Inherits="Account_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
 <style type="text/css">
  th {text-align:left}
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
  
       
            <h1>
                 Insert or Edit Category
            </h1>
            <p>
                <label>
                    Category Name:</label>
                <asp:TextBox ID="txt_Title" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_Title"
                    CssClass="failureNotification" ErrorMessage="*" ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
            </p>


              <p>
            <label>Have Items ?</label>
             <asp:DropDownList AutoPostBack="true" ID="Drop_Sub" runat="server">
             <asp:ListItem Value="0">No</asp:ListItem>
             <asp:ListItem Value="1">Yes</asp:ListItem>
                            </asp:DropDownList>
            
            </p>

             <div>
             <asp:Label ID="lbl_error" runat="server" EnableViewState="False" ForeColor="Red"></asp:Label>
                    <asp:Label ID="lbl_id" runat="server" Visible="False"></asp:Label>
            </div>
            <div>
                <asp:Button ID="LoginButton" runat="server" CssClass="signin" OnClick="btn_save_Click" Text="Add" ValidationGroup="LoginUserValidationGroup" />
            </div>
           

             <asp:GridView ID="grid_Display" runat="server" CssClass="static" AutoGenerateColumns="False"
                                DataKeyNames="ID" GridLines="Horizontal" OnPageIndexChanging="grid_Display_PageIndexChanging"
                                OnRowEditing="grid_Display_RowEditing" OnRowDataBound="grid_Display_RowDataBound"
                                OnRowDeleting="grid_Display_RowDeleting1" 
                AllowPaging="True" PageSize="15" BackColor="White" BorderColor="#336666" 
                 BorderWidth="3px" CellPadding="4" Width="480px">
                                <Columns>
                                    <%-- <asp:BoundField DataField="Title"  HeaderText="Title" />--%>
                                    <asp:TemplateField HeaderText="Title">
                                        <ItemTemplate>
                                           
                                                <%#Eval("Title") %>
                                           
                                           
                                        </ItemTemplate>
                                      
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Have Items (yes=1 / no=0)">
                                      <ItemTemplate>
                                        <%#Eval("HaveItems") %>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Delete">
                                    <ItemTemplate>
                                    
                                                <asp:LinkButton ID="btn_delete" runat="server" CommandArgument='<%#Eval("ID") %>'
                                                    CommandName="Delete"><img src="../images/DeleteRed.png" alt="Delete Red" /></asp:LinkButton>
                                         
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

