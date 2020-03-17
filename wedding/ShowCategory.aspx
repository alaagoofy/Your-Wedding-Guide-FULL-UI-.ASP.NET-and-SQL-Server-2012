<%@ Page Title="" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ShowCategory.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <link href="css/style2.css" rel="stylesheet" type="text/css" />
    <link href="test/grid.css" rel="stylesheet" type="text/css" />
    <asp:Literal ID="litral_image" runat="server"></asp:Literal>
    <asp:Literal ID="litral_title" runat="server"></asp:Literal>
    <asp:Literal ID="litral_site_name" runat="server"></asp:Literal>
     <asp:Literal ID="litral_des" runat="server"></asp:Literal>


 


      <link rel="stylesheet" type="text/css" href="css/jquery.ad-gallery.css"/>
  
   <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
    
    <script type="text/javascript" src="js/jquery.ad-gallery.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript">
        $(function () {


            var galleries = $('.ad-gallery').adGallery();
            $('#switch-effect').change(
              function () {
                  galleries[0].settings.effect = $(this).val();
                  return false;
              }
            );
            $('#toggle-slideshow').click(
              function () {
                  galleries[0].slideshow.toggle();
                  return false;
              }
            );
            galleries[0].addAnimation('wild',
              function (img_container, direction, desc) {
                  var current_left = parseInt(img_container.css('left'), 10);
                  var current_top = parseInt(img_container.css('top'), 10);
                  if (direction == 'left') {
                      var old_image_left = '-' + this.image_wrapper_width + 'px';
                      img_container.css('left', this.image_wrapper_width + 'px');
                      var old_image_top = '-' + this.image_wrapper_height + 'px';
                      img_container.css('top', this.image_wrapper_height + 'px');
                  } else {
                      var old_image_left = this.image_wrapper_width + 'px';
                      img_container.css('left', '-' + this.image_wrapper_width + 'px');
                      var old_image_top = this.image_wrapper_height + 'px';
                      img_container.css('top', '-' + this.image_wrapper_height + 'px');
                  };
                  if (desc) {
                      desc.css('bottom', '-' + desc[0].offsetHeight + 'px');
                      desc.animate({ bottom: 0 }, this.settings.animation_speed * 2);
                  };
                  img_container.css('opacity', 0);
                  return {
                      old_image: { left: old_image_left, top: old_image_top, opacity: 0 },
                      new_image: { left: current_left, top: current_top, opacity: 1 },
                      easing: 'easeInBounce',
                      speed: 2500
                  };
              }
            );
        });
        function debug(str) {
            if (window.console && window.console.log && jQuery.browser.mozilla) {
                console.log(str);
            } else {
                $('#debug').show().val($('#debug').val() + str + '\n');
            }
        }
    </script>
    <style type="text/css">
        #gallery {
            padding: 30px;
          background:#EEEDEB
        }

        #comment-form {
            width: 100%;
        }

        #error {
            display: none;
            background: #FFF;
            position: absolute;
            left: 100px;
            top: 100px;
            width: 500px;
            height: 300px;
            padding: 10px;
            border: 1px solid #CCC;
        }
        .ad-thumb-list img {height:60px}
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">



     <div class="fullWidth">

  <h1 class="h1Arabic">
            <a href="Default.aspx" style="color: #F5821E">Home ></a>
            <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton2_Click">
                <asp:Label ID="Label2" Style="color: #F5821E" runat="server" Text=""></asp:Label>
            </asp:LinkButton>
           
        </h1>
       
       

<div style="width:650px;float:left;padding-right:50px;border-right:1px solid #ccc">
    <asp:Panel ID="panal_images" runat="server">
            <h6 class="titles">
                 <asp:Label ID="Label1" runat="server" Text=""></asp:Label></h6>


              
               

    <asp:UpdatePanel ID="UpdatePanel3" runat="server">
    <ContentTemplate>
  


    <div id="gallery" class="ad-gallery">
            <div class="ad-image-wrapper">
            </div>
          <!--  <div class="ad-controls">
            </div>-->
            <div class="ad-nav">
                <div class="ad-thumbs">
                    <ul class="ad-thumb-list">

                         <asp:Repeater ID="Repeater1" runat="server">
                    <ItemTemplate>
                       <li>
                            <a href='<%#Eval("Img") %>'>
                            <img src='<%#Eval("Img") %>' alt="" /> <%--<span>Code # 0<%#  Eval("ID")%></span>--%>
                      </a>
                        </li>
                    </ItemTemplate>
                </asp:Repeater>
                       
                       
                    </ul>
                </div>
            </div>
        </div>
            
        




                  <div>
                  <h2>
                      <asp:Label ID="txt_InterviewTitle" runat="server" Text=""></asp:Label></h2>

                      <div>

                          <asp:Literal ID="txt_interviewBody" runat="server"></asp:Literal>
                 

                          </div>
                  </div>

            
           
    </ContentTemplate>
  
    </asp:UpdatePanel>

          
        </asp:Panel>
      



    <div class="clr"></div>
     <div style="width: 120px; float: right">
            <div class="favoret" runat="server" id="DivFavorite">
                <h1>
                    <a href="MyFavorites.aspx" class="loveit2" title="View My favorite">
                        <img src="images/loveit.png" alt="" />
                        My favorite </a>
                </h1>
                <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                    <ContentTemplate>
                       
                        <b runat="server" style="font-size:12px" id="getFav"></b>
                    </ContentTemplate>
                </asp:UpdatePanel>
                <span><a href="MyFavorites.aspx">favorite</a></span>
                <div class="clr">
                </div>
            </div>
        </div>



      <%--<span class='st_sharethis_hcount' displayText='ShareThis'></span>--%>
<span class='st_facebook_hcount' displayText='Facebook'></span>
<span class='st_twitter_hcount' displayText='Tweet'></span>
<span class='st_linkedin_hcount' displayText='LinkedIn'></span>
<span class='st_pinterest_hcount' displayText='Pinterest'></span>



<script type="text/javascript">    var switchTo5x = true;</script>
<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
<script type="text/javascript">    stLight.options({ publisher: "c3bf2a1a-b56b-4775-b9fd-2d2ade30d3b3", doNotHash: false, doNotCopy: false, hashAddressBar: false });</script>
   <div class="clr"></div>
     <br /><br />
  

   <h6 class="titles">
              Contact Details</h6>
     <div class="data">
            <div class="topData">
            </div>
            <div class="middleData">
             
                <asp:Literal ID="Literal2" runat="server"></asp:Literal>
                <div class="clr">
                </div>
            </div>
            <div class="bottomData">
            </div>
        </div>
        <div class="clr">
        </div>
        <asp:Panel ID="Panal_Videos" runat="server">
            <div class="">
                <h6 style="height:35px !important;line-height:35px !important;margin:0 !important;padding:0 !important;font-size:16px !important;font-weight:lighter;border-bottom:1px solid #ccc;color:#418FA5 !important">
                    Videos</h6>
              <br />
                   
                        <ul class="lb-album" >
                            <asp:Repeater ID="repeater_videos" runat="server">
                                <ItemTemplate>
                                    <li class="masonryImage"><a href='<%# "Videos.aspx?ID=" + Eval("ID")%>' title='<%#Eval("Title") %>'>
                                        <img id="Img1" src='<%#Eval("Thumb") %>' runat="server" alt='<%#Eval("Title") %>' /></a>
                                        <b style="height:auto;overflow:visible;line-height:normal;color:#666;display:block;padding:5px;font-weight:normal">
                                            <%#Eval("Title") %></b> </li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                      <div class="clr">
        </div>
               
            </div>

            
                 <script src="test/jquery.wookmark.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {

                var $container = $('.container');

                $container.imagesLoaded(function () {
                    $container.masonry({
                        itemSelector: '.masonryImage'
                    });
                });

            });
        </script>
        </asp:Panel>

 <div class="clr">
        </div>



        <div class="comment-container" id="comments">
							<h6 class="titles">
            <asp:Literal ID="lbl_CommentNumber" runat="server"></asp:Literal> Comment</h6>
							
							<div id="comment-content-container">
								<ul class="commentlist">


            <asp:Repeater ID="repeater_comments" runat="server">
                <ItemTemplate>
                    <li class="comment"> 
										<div>
											<div class="coment-box">
												<div class="coment-box-inner">
													<div class="comment-autor">
														<img alt='' src='http://0.gravatar.com/avatar/6140e26be2f7f0c51896235904faeca3?s=80&amp;d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D80&amp;r=X' class='avatar avatar-80 photo' height='80' width='80' />			
													</div>
													<div class="comment-meta portfolio-meta blog-meta">
														<ul>			
															<li class="addby" style="float:left;padding-top:10px;margin-right:15px"><i class="icon-user"></i><a class='url'><%#Eval("Name") %></a></li>
															<li class="addtime" style="float:left;padding-top:10px"><i class="icon-time"></i><%#Eval("Date") %></li>
															
															
														</ul>
													</div>
													<div class="comment-text">
														<p><%#Eval("Comment") %></p>				
													</div>
													<div style="clear: both;"></div>
												</div>
											</div>
										</div>
									
									</li>

                </ItemTemplate>
            </asp:Repeater>

								</ul>				
							</div>
							
							<div id="respond">							
								<h6 class="titles">
									Leave Comment
								
								</h6>					
								<div id="commentform" />
									

									<p class="comment-form-author">
										<span class="comment-author-wrapper">
											<label for="author">Name</label> <span class="required">*</span>
											<asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
                                              <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_name" 
                             CssClass="failureNotification" ErrorMessage="من فضلك أدخل الاسم" ToolTip="من فضلك أدخل الاسم" 
                             ValidationGroup="a">*</asp:RequiredFieldValidator>
										</span>
									</p>
									<p class="comment-form-email">
										<label for="email">Email</label> <span class="required">*</span>
										<asp:TextBox ID="txt_mail" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_mail" 
                             CssClass="failureNotification" ErrorMessage="من فضلك أدخل بريدك الإلكترونى" ToolTip="من فضلك أدخل بريدك الإلكترونى" 
                             ValidationGroup="a">*</asp:RequiredFieldValidator>
									</p>
								
									<p class="comment-form-comment">
										<label for="comment">Comment</label>
										<asp:TextBox ID="txt_comment" TextMode="MultiLine" Height="150px" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_comment" 
                             CssClass="failureNotification" ErrorMessage="من فضلك أدخل التعليق" ToolTip="من فضلك أدخل التعليق" 
                             ValidationGroup="a">*</asp:RequiredFieldValidator>
									</p>
								<p>

            <asp:Label ID="txt_msgError" runat="server" Text=""></asp:Label>
								</p>
									<div class="form-submit">
									
            <asp:Button ID="Button1" runat="server" CssClass="signin" ValidationGroup="a" Text="Comment" OnClick="Button1_Click" />
									</div>
								</div>
							</div>
						</div>		



</div>


<div style="width:250px;float:right;">
<h1>Last Articles </h1>
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
             <div class="clr">
                </div>
                <br />




             <div style="margin-right:-25px">





                 <asp:Repeater ID="Repeater2" runat="server">
                 <ItemTemplate>
                 
                  <div class="adverArea" style="margin-bottom:50px">
                <a href='<%# "ShowCategory.aspx?ID=" + Eval("ID") %>' title='<%#Eval("Title") %>'>
                   <img id="Img3" src='<%#Eval("Img") %>' runat="server" style="width:280px !important" alt='<%#Eval("Title") %>' />

                     <span style="width:280px;height:30px;line-height:30px;display:block;margin:-70px 0 0 0;background:#fff;position:relative;opacity:0.7;text-align:center">
               <span style="opacity:1 !important"> <%#Eval("Title") %></span>
                </span>
                </a>
              
                <div class="clr"></div>
            </div>


                 </ItemTemplate>
                 </asp:Repeater>




               


               
            </div>
</div>



<div class="clr"></div>
<br />
<hr />
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

