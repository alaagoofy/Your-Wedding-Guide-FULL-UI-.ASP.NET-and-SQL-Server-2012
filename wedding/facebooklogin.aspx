<%@ Page Language="C#" AutoEventWireup="true" CodeFile="facebooklogin.aspx.cs" Inherits="facebooklogin" %>
<%@ Register src="FacebookLoginControl.ascx" tagname="FacebookLoginControl" tagprefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">
<head runat="server">
    <title></title>
    <script src="scripts/jquery-1.6.2.min.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
   <% if (IsAuthorized) { %>
            <strong>Hi <asp:Label runat="server" ID="lblName"></asp:Label></strong> <br/>
            
            <asp:Image runat="server" ID="imgProfilePic"/>

            <table>
                <tr>
                    <td>First Name:</td>
                    <td><asp:label runat="server" ID="lblFirstName"/></td>
                </tr>
                <tr>
                    <td>Last Name:</td>
                    <td><asp:label runat="server" ID="lblLastName"/></td>
                </tr>
                <tr>
                    <td>ID:</td>
                    <td><asp:label runat="server" ID="lblID"/></td>
                </tr>
            </table>


        <% } else { %>
            <uc1:FacebookLoginControl ID="FacebookLoginControl1" runat="server" />
        <% } %>
    </form>
</body>
</html>
