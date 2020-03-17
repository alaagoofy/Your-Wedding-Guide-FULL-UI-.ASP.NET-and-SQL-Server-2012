<%@ Page Title="Articles" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Articles.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
<div class="auto">
   

<h1 style="font-weight:normal" class="head">
   Articles
</h1>

<div>
    <ul class="articles">

           <asp:Repeater ID="repeater_articles" runat="server" OnItemDataBound="Repeater3_ItemDataBound">
                            <ItemTemplate>
                            <li><a id="A1" href='<%# "ShowArticles.aspx?ID=" + Eval("ID") %>' runat="server">
                              <img id="Img1" src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' />
                             
                                    
                                      <span><strong><%#Eval("Title") %></strong>  <asp:Literal ID="Literal1" runat="server" Text='<%#Eval("Des") %>'></asp:Literal>....</span></a>
                                      <div class="clr"></div>
                            </li>
                            </ItemTemplate>
                            </asp:Repeater>
   
   </ul>

    <div class="clr"></div>
</div>



<div class="clr"></div>
</div>
</asp:Content>

