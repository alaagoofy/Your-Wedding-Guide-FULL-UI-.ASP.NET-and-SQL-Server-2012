<%@ Page Language="C#" AutoEventWireup="true" CodeFile="fbAdvertise.aspx.cs" Inherits="fbAdvertise" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
    body { margin:auto; display:block; width:550px;padding:20px;border:0px solid #ccc;background:#fff; background-attachment:fixed; background-repeat:no-repeat; background-image:url('bg.gif');background-position:center top; font-family:'Lucida Grande', Tahoma, Verdana, Arial, sans-serif; font-size:small; }
	fieldset { border:0;margin:0;padding:0; }
	label { display:block; }
	input,textarea { width:300px;font:10px/10px 'Lucida Grande', Tahoma, Verdana, Arial, sans-serif;color:#333;padding:3px;margin:1px 0;border:1px solid #ccc; }
	input.submit { padding:2px 5px;font:bold 10px/10px'Lucida Grande', Tahoma, Verdana, Arial, sans-serif; }
	
	.hover {cursor:pointer}
	.hover:hover {background:#a39991;color:#fff}
	-->
	</style>
    </style>
</head>
<body>
    <form id="form1" runat="server">
   <div id="header" style="padding-top:100px; margin:0px auto;display:block;">

			<p style="color:#000000;font-size:medium; text-align:center;">To advertise in our printed catalogue<br/> please fill in the form below.</p>
	<p style="font-family:'Lucida Grande', Tahoma, Verdana, Arial, sans-serif">

		<p id="loadBar" style="display:none;">
		<strong>Sending your request. Hold on just a sec&#8230;</strong>
		<img src="img/loading.gif" alt="Loading..." title="Sending Email" />
	</p>
	<p id="emailSuccess" style="display:none;">
		<strong style="color:green;">Success! Your request has been sent.</strong>
	</p>
	<div id="contactFormArea" style="margin:auto;display:block;">
	
			<fieldset>
			<label for="posBus">Business name:</label>
                <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
			
				<br>
				&nbsp;
				<label for="posSer">Services:</label>
				<asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
				<br>
				&nbsp;
				<label for="posName">Full name:</label>
				<asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
				<br>
				&nbsp;
				<label for="posRegard">Phone number:</label>
				<asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>
				<br>
				&nbsp;<label for="posAdd">Address:</label>
				<asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
                <br>
				&nbsp;<label for="posEmail">Email address:</label>
				<asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
                <br>&nbsp;
				<label for="posWeb">Website:</label>
				<asp:TextBox ID="TextBox7" runat="server"></asp:TextBox>
				<br>
				
				&nbsp;<label for="posText">Messages:</label>
			<asp:TextBox ID="TextBox8" runat="server" Height="100px" TextMode="MultiLine"></asp:TextBox>
				<label>
					<br>
                    <asp:Button ID="Button1" runat="server" Text="Send" Width="100px" CssClass="hover" Height="30px" />
				</label>
			</fieldset>
		
	</div>

</div>
    </form>
</body>
</html>
