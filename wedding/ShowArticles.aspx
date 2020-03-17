<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ShowArticles.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <style type="text/css">
    img {max-width:650px !important}
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
    <div class="fullWidth">

<h1 style="font-weight:normal" class="head">
    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
</h1>

<div style="width:650px;float:left;padding-right:50px;border-right:1px solid #ccc">
    <asp:Literal ID="Literal1" runat="server"></asp:Literal>

    <div class="clr"></div>

      <%--<span class='st_sharethis_hcount' displayText='ShareThis'></span>--%>
<span class='st_facebook_hcount' displayText='Facebook'></span>
<span class='st_twitter_hcount' displayText='Tweet'></span>
<span class='st_linkedin_hcount' displayText='LinkedIn'></span>
<span class='st_pinterest_hcount' displayText='Pinterest'></span>



<script type="text/javascript">    var switchTo5x = true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">    stLight.options({ publisher: "c3bf2a1a-b56b-4775-b9fd-2d2ade30d3b3", doNotHash: false, doNotCopy: false, hashAddressBar: false });</script>
  
     <br /><br />


    <a href="Articles.aspx" class="btnsignout">All Articles</a>
</div>

<div style="width:250px;float:right;">
<h1>Top Articles</h1>
   <div class="tab-contents">
                <ul>
                    <asp:Repeater ID="repeater_articles" runat="server">
                        <ItemTemplate>
                            <li><em>
                                <img id="Img1" src='<%#Eval("Img") %>' runat="server" alt='<%#Eval("Title") %>' /></em>
                                <p>
                                    <a id="A1" href='<%# "ShowArticles.aspx?ID=" + Eval("ID") %>' runat="server">
                                        <%#Eval("Title") %></a></p>
                            </li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
                <%-- <a href="#" class="btnTab">More...</a>--%>
                <div class="clr">
                </div>
            </div>


            <div style="margin-left:-30px">

               <div class="adverArea">
                <a href="ShowCategory.aspx?ID=148" title="Click Image Production" class="clickImage">
                </a>
            </div>


                         <div class="adverArea">
            <a href="ShowCategory.aspx?ID=110" title="Rasha Khalaf Pro. Make-up Artist">
                <img src="images/rasha3.jpg" style="margin: 5px 0 0" alt="Rasha Khalaf Pro. Make-up Artist" /></a>
                </div>

 

   <div class="adverArea">
                <a href="ShowCategory.aspx?ID=329" title="Body Art Clinic" class="bodyArt">
                </a>
            </div>
         

             

            <div class="adverArea">
                <a href="ShowCategory.aspx?ID=115" title="Yasser Zien - Beauty Salon" class="yasserzien">
                </a>
            </div>
            </div>
</div>




<div class="clr"></div>
</div>
<br />
 <div class="bigRuler">
        </div>


  <div class="auto">
        <div class="subCategories">
            <ul>
                <asp:Repeater ID="repeaterCategoriesnames" runat="server">
                    <ItemTemplate>
                        <li>
                            <div>
                                <a href='<%# "ShowOutCategories.aspx?ID2=" + Eval("ID") %>'><em>
                                    <img src='<%#Eval("Img") %>' alt='<%#Eval("Title") %>' /></em></a> <a href='<%# "ShowOutCategories.aspx?ID2=" + Eval("ID") %>'>
                                        <span>
                                            <%#Eval("Title") %></span></a>
                            </div>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
            <div class="clr">
            </div>
        </div>
       
        </div>
</asp:Content>

