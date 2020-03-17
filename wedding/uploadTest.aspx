<%@ Page Language="C#" AutoEventWireup="true" CodeFile="uploadTest.aspx.cs" Inherits="uploadTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
       
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
       
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
        <br />
        <asp:Button ID="Button1" runat="server" onclick="Button1_Click1" 
            Text="Button" />
        <br />
        <br />
        <asp:Button ID="Button2" runat="server" onclick="Button2_Click" Text="Button" />
    </div>
    </form>
</body>
</html>
