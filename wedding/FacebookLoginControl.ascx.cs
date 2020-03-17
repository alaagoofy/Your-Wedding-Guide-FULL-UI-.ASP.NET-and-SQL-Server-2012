using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using Facebook.Web;

public partial class FacebookLoginControl : System.Web.UI.UserControl
{
    protected string[] ExtendedPermissions = ConfigurationManager.AppSettings["extendedPermissions"].Split(',');

    protected void Page_Load(object sender, EventArgs e)
    {
   
    }
}