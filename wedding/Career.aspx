<%@ Page Title="Career" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Career.aspx.cs" Inherits="ShowArticles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
<link rel="stylesheet" type="text/css" href="scripts/uniform/css/uniform.aristo.css">
	
	
	
	
	
	<script src="scripts/jquery.min.js" type="text/javascript"></script>


	<script src="scripts/jquery-ui.min.js" type="text/javascript"></script>

		

	<script src="scripts/touchPunch/jquery.ui.touch-punch.min.js" type="text/javascript"></script>

	<script src="scripts/uitotop/js/jquery.ui.totop.js" type="text/javascript"></script>

	
	<script src="scripts/uniform/jquery.uniform.min.js" type="text/javascript"></script>
	<script src="scripts/autogrow/jquery.autogrowtextarea.js" type="text/javascript"></script>
	
	
	
	
	
	<script type="text/javascript" src="scripts/livequery/jquery.livequery.js"></script>  
    		

	<script type="text/javascript" src="scripts/MaxMin/maxmin_ui.js"></script>

	<script type="text/javascript" src="scripts/MaxMin/maxmin_forms.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
   <div class="loginDivT"></div>
<div class="loginDiv">
<div class="log2">
 
   <h1>Applicant Information</h1>
   <p>
       <asp:Label ID="lbl_error" runat="server" Text=""></asp:Label>
   </p>

                    <p>
                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="txt_Position">Position applied for:</asp:Label>
                        <asp:TextBox ID="txt_Position" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="txt_name" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Name is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label1" runat="server" AssociatedControlID="txt_name">Full Name:</asp:Label>
                        <asp:TextBox ID="txt_name" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_address" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Address is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label2" runat="server" AssociatedControlID="txt_Address">Address:</asp:Label>
                        <asp:TextBox ID="txt_Address" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_email" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Email is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                     <p>
                        <asp:Label ID="Label3" runat="server" AssociatedControlID="txt_phone">Phone:</asp:Label>
                        <asp:TextBox ID="txt_phone" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txt_phone" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="Phone is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:Label ID="Label4" runat="server" AssociatedControlID="txt_Email">Email:</asp:Label>
                        <asp:TextBox ID="txt_Email" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_phone" 
                             CssClass="failureNotification" ErrorMessage="Email Name is required." ToolTip="Email is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>

                  
                  <p>
                        <asp:Label ID="Label6" runat="server" AssociatedControlID="txt_Email">Date Of Birth:</asp:Label>
                      <asp:DropDownList ID="drop_days" style="width:auto" runat="server">
                      <asp:ListItem Selected="True">Day</asp:ListItem>
                      <asp:ListItem>1</asp:ListItem>
                      <asp:ListItem>2</asp:ListItem>
                      <asp:ListItem>3</asp:ListItem>
                      <asp:ListItem>4</asp:ListItem>
                      <asp:ListItem>5</asp:ListItem>
                      <asp:ListItem>6</asp:ListItem>
                      <asp:ListItem>7</asp:ListItem>
                      <asp:ListItem>8</asp:ListItem>
                      <asp:ListItem>9</asp:ListItem>
                      <asp:ListItem>10</asp:ListItem>
                      <asp:ListItem>11</asp:ListItem>
                      <asp:ListItem>12</asp:ListItem>
                      <asp:ListItem>13</asp:ListItem>
                      <asp:ListItem>14</asp:ListItem>
                      <asp:ListItem>15</asp:ListItem>
                      <asp:ListItem>16</asp:ListItem>
                      <asp:ListItem>17</asp:ListItem>
                      <asp:ListItem>18</asp:ListItem>
                      <asp:ListItem>19</asp:ListItem>
                      <asp:ListItem>20</asp:ListItem>
                      <asp:ListItem>21</asp:ListItem>
                      <asp:ListItem>22</asp:ListItem>
                      <asp:ListItem>23</asp:ListItem>
                      <asp:ListItem>24</asp:ListItem>
                      <asp:ListItem>25</asp:ListItem>
                      <asp:ListItem>26</asp:ListItem>
                      <asp:ListItem>27</asp:ListItem>
                      <asp:ListItem>28</asp:ListItem>
                      <asp:ListItem>29</asp:ListItem>
                      <asp:ListItem>30</asp:ListItem>
                      <asp:ListItem>31</asp:ListItem>
                      </asp:DropDownList>

                      <asp:DropDownList ID="Drop_Month" style="width:auto" runat="server">
                      <asp:ListItem Selected="True">Month</asp:ListItem>
                      <asp:ListItem>1</asp:ListItem>
                      <asp:ListItem>2</asp:ListItem>
                      <asp:ListItem>3</asp:ListItem>
                      <asp:ListItem>4</asp:ListItem>
                      <asp:ListItem>5</asp:ListItem>
                      <asp:ListItem>6</asp:ListItem>
                      <asp:ListItem>7</asp:ListItem>
                      <asp:ListItem>8</asp:ListItem>
                      <asp:ListItem>9</asp:ListItem>
                      <asp:ListItem>10</asp:ListItem>
                      <asp:ListItem>11</asp:ListItem>
                      <asp:ListItem>12</asp:ListItem>
                  
                      </asp:DropDownList>

                      <asp:DropDownList ID="Drop_years" style="width:auto" runat="server">
                      <asp:ListItem Selected="True">Year</asp:ListItem>
                      <asp:ListItem>1997</asp:ListItem>
                      <asp:ListItem>1996</asp:ListItem>
                      <asp:ListItem>1995</asp:ListItem>
                      <asp:ListItem>1994</asp:ListItem>
                      <asp:ListItem>1993</asp:ListItem>
                      <asp:ListItem>1992</asp:ListItem>
                      <asp:ListItem>1991</asp:ListItem>
                      <asp:ListItem>1990</asp:ListItem>
                      <asp:ListItem>1989</asp:ListItem>
                      <asp:ListItem>1988</asp:ListItem>
                      <asp:ListItem>1987</asp:ListItem>
                      <asp:ListItem>1986</asp:ListItem>
                      <asp:ListItem>1985</asp:ListItem>
                      <asp:ListItem>1984</asp:ListItem>
                      <asp:ListItem>1983</asp:ListItem>
                      <asp:ListItem>1982</asp:ListItem>
                      <asp:ListItem>1981</asp:ListItem>
                      <asp:ListItem>1980</asp:ListItem>
                      <asp:ListItem>1979</asp:ListItem>
                      <asp:ListItem>1978</asp:ListItem>
                      <asp:ListItem>1977</asp:ListItem>
                      <asp:ListItem>1976</asp:ListItem>
                      <asp:ListItem>1975</asp:ListItem>
                      <asp:ListItem>1974</asp:ListItem>
                      <asp:ListItem>1973</asp:ListItem>
                      <asp:ListItem>1972</asp:ListItem>
                      <asp:ListItem>1971</asp:ListItem>
                      <asp:ListItem>1970</asp:ListItem>
                      <asp:ListItem>1969</asp:ListItem>
                      <asp:ListItem>1968</asp:ListItem>
                      <asp:ListItem>1967</asp:ListItem>
                      <asp:ListItem>1966</asp:ListItem>
                      <asp:ListItem>1965</asp:ListItem>
                     
                      </asp:DropDownList>
                    </p>
                       <p>
                       <label>Gender: </label>
                           <asp:DropDownList ID="drop_gender" runat="server">
                           <asp:ListItem>Male</asp:ListItem>
                           <asp:ListItem>Female</asp:ListItem>
                           </asp:DropDownList>
                       </p>

                       <p>
                       <label>Do you work now?</label>
                       <asp:DropDownList ID="drop_work" runat="server">
                           <asp:ListItem>No</asp:ListItem>
                           <asp:ListItem>Yes</asp:ListItem>
                           </asp:DropDownList>
                       </p>

                        <p>
                       <label>Do you own a car? </label>
                       <asp:DropDownList ID="drop_car" runat="server">
                           <asp:ListItem>No</asp:ListItem>
                           <asp:ListItem>Yes</asp:ListItem>
                           </asp:DropDownList>
                       </p>


                       <h1>Education</h1>


                       <p>
                       <label>High School: </label>
                        <asp:TextBox ID="txt_highSchool" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txt_highSchool" 
                             CssClass="failureNotification" ErrorMessage="high School is required." ToolTip="high School is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       
                       </p>

                        <p>
                       <label>From: </label>
                        <asp:TextBox ID="txt_highFrom" CssClass="txtbox" runat="server"></asp:TextBox>
                      
                       </p>

                        <p>
                       <label>To: </label>
                        <asp:TextBox ID="txt_highto" CssClass="txtbox" runat="server"></asp:TextBox>
                       
                       </p>
                       <p>
                       <label>College: </label>
                        <asp:TextBox ID="txt_college" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txt_college" 
                             CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="high School is required." 
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       </p>
                       
                       <p>
                       <label>Major: </label>
                        <asp:TextBox ID="txt_major" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" ControlToValidate="txt_major" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       </p>
                       
                       <p>
                       <label>University: </label>
                        <asp:TextBox ID="txt_University" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat="server" ControlToValidate="txt_University" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       </p>
                         <p>
                       <label>From: </label>
                        <asp:TextBox ID="txt_fromUni" CssClass="txtbox" runat="server"></asp:TextBox>
                      
                       </p>

                        <p>
                       <label>To: </label>
                        <asp:TextBox ID="txt_ToUni" CssClass="txtbox" runat="server"></asp:TextBox>
                       
                       </p>

                       <h1>Previous Employment</h1>

                        <p>
                       <label>Company: </label>
                        <asp:TextBox ID="txt_company" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txt_University" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       </p>

                        <p>
                       <label>Job Title: </label>
                        <asp:TextBox ID="txt_jobTitle" CssClass="txtbox" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator10" runat="server" ControlToValidate="txt_jobTitle" 
                             CssClass="failureNotification"
                             ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                       </p>


                         <p>
                       <label>From: </label>
                        <asp:TextBox ID="txt_fromCompany" CssClass="txtbox" runat="server"></asp:TextBox>
                      
                       </p>

                        <p>
                       <label>To: </label>
                        <asp:TextBox ID="txt_toCompany" CssClass="txtbox" runat="server"></asp:TextBox>
                       
                       </p>

                        

                <div>
                    <asp:Button ID="LoginButton" runat="server" CssClass="signin" 
                        CommandName="Login" Text="Submit" ValidationGroup="LoginUserValidationGroup" 
                        onclick="LoginButton_Click1"/>
                     <div class="clr"></div>
                </div>
         <div class="clr"></div>
      
    </div>
    <div class="regInfo">
    <h1>Upload Your Photo</h1>
     <p style="width:130px;margin:10px 0 30px 0 !important">
                                <asp:FileUpload ID="CV" CssClass="uniform"  runat="server" />
                               
                                </p>
                                <br /><br /><br /><br />
                                <div class="clr"></div>
    <h1>Our Location</h1>
   
    <iframe style="width:195px;display:block;margin:10px auto" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=19+makkah+St.,+Mohandseen,+Giza+Egypt&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=58.858685,114.169922&amp;ie=UTF8&amp;hq=19+makkah+St.,+Mohandseen,&amp;hnear=Giza,+Al+Omraneyah,+Giza,+Egypt&amp;t=m&amp;z=12&amp;iwloc=A&amp;cid=14498541149884667712&amp;ll=30.009072,31.176857&amp;output=embed"></iframe>
      
    </div>
    <div class="clr"></div>
    </div>
    <div class="loginDivB"></div>

  
</asp:Content>

