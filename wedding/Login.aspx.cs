using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.Data;
using Facebook;
using System.Net;
using System.Net.Mail;

public partial class Account_Login : System.Web.UI.Page
{
   

    protected void Page_Load(object sender, EventArgs e)
    {
        TextBox Password = (TextBox)LoginUser.FindControl("Password");
        Button ButtonLogin = (Button)LoginUser.FindControl("LoginButton");
        Password.Attributes.Add("onKeyPress", "javascript:if (event.keyCode == 13) __doPostBack('" + ButtonLogin.UniqueID + "','')");

      
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        string callbackUrl = "http://yourwedding-offers.com";
        string appID = "518512028243581";
        string link = string.Format("https://graph.facebook.com/oauth/authorize?client_id=518512028243581&redirect_uri=http://yourwedding-offers.com/en/Default.aspx&scope=offline_access,email,publish_stream");
        Response.Redirect(link);
    }
}
