using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Facebook;
using Facebook.Web;
using System.Configuration;
using System.Dynamic;

public partial class facebooklogin : System.Web.UI.Page
{
    private bool? _isAuthorized;
    protected bool IsAuthorized
    {
        get
        {
            if (_isAuthorized == null)
            {
                var extendedPermissions = ConfigurationManager.AppSettings["extendedPermissions"].Split(',');
                _isAuthorized = FacebookWebContext.Current.IsAuthorized(extendedPermissions);
            }

            return _isAuthorized.Value;
        }
        set { _isAuthorized = value; }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (IsAuthorized)
        {
            var fb = new FacebookWebClient();
            dynamic me = fb.Get("me");

            imgProfilePic.ImageUrl = string.Format("https://graph.facebook.com/{0}/picture", me.id);

            lblName.Text = me.name;
            lblFirstName.Text = me.first_name;
            lblLastName.Text = me.last_name;
            lblID.Text = me.id;
        }
        else
        { }
    }

    
 
}