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
using System.IO;

public partial class SiteMaster : System.Web.UI.MasterPage
{
    DataTable tableMenu;
    DataTable tableCat;
    protected void Page_Load(object sender, EventArgs e)
    {
    //    if (Request.Browser.Type.Contains("Firefox")) // replace with your check
    //        {
   
    //        } 
    //    else if (Request.Browser.Type.ToUpper().Contains("IE")) // replace with your check
    //    {
    ////Response.Redirect("http://www.google.com");
   
    //    }
    //    else { }



        txt_search.Attributes.Add("onKeyPress", "javascript:if (event.keyCode == 13) __doPostBack('" + Button1.UniqueID + "','')");

        if (HttpContext.Current.User.Identity.IsAuthenticated)
        {
            DataTable getUserInfo = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
           
           

            if (HttpContext.Current.User.IsInRole("Admin"))
            {
                Panel_Admin.Visible = true;
                panel_Vendor.Visible = false;
                LinkButton1.Visible = false;
            }
            else if (HttpContext.Current.User.IsInRole("Vendor"))
            {
                Panel_Admin.Visible = false;
                panel_Vendor.Visible = true;
                LinkButton1.Visible = false;
            }
            else
            {
                Panel_Admin.Visible = false;
                panel_Vendor.Visible = false;
                LinkButton1.Visible = false;
            }
           
           
           
        }
        else
        {
           

            if (!string.IsNullOrEmpty(Request["code"]) && !Page.IsPostBack)
            {
                var oauthResult = Request.Params["code"];
                string accessToken = GetOauthTokens(oauthResult)["access_token"].ToString();

                if (string.IsNullOrEmpty(accessToken))
                {
                    // failed to get access token do something
                }
                var fb = new FacebookClient(accessToken);
                dynamic me = fb.Get("me");
                // get all the user information
                string email = me.email;
                string facebookID = me.id;
                string name = me.name;
                panal_facebook.Visible = true;

                HttpCookie myCookie = new HttpCookie("facebookID");
                DateTime now = DateTime.Now;

                // Set the cookie value.
                myCookie.Value = facebookID;
                // Set the cookie expiration date.
                myCookie.Expires = now.AddYears(50); // For a cookie to effectively never expire

                // Add the cookie.
                Response.Cookies.Add(myCookie);


                Panel_Admin.Visible = false;
                panel_Vendor.Visible = false;
                HeadLoginView.Visible = false;
                Label1.Text = name;
                changepassword.Visible = false;
                Image1.Visible = true;

                Image1.ImageUrl = GetPictureUrl(facebookID);
                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                if (addFbUser.Rows.Count == 0)
                {
                    new DB().RegisterUserFbUsers(facebookID, name,email);
                }

                Response.Redirect("~/");
            }
            else
            {
                //Do something, the user didn't give you access;
            }



            HttpCookie getCookie = new HttpCookie("facebookID");
            getCookie = Request.Cookies["facebookID"];

            // Read the cookie information and display it.
            if (getCookie != null)
            {
                //Response.Write("<p>" + getCookie.Name + "<p>" + getCookie.Value);

                string facebookID = getCookie.Value;
                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                panal_facebook.Visible = true;
                Panel_Admin.Visible = false;
                panel_Vendor.Visible = false;
                HeadLoginView.Visible = false;
                Label1.Text = addFbUser.Rows[0]["Name"].ToString();
                changepassword.Visible = false;
                Image1.Visible = true;

                Image1.ImageUrl = GetPictureUrl(facebookID);

            }
               
          

         

        }



       
        DataTable getMenu = new DB().Admin_Category_GetBylaung(1);
        Repeater2.DataSource = getMenu;
        Repeater2.DataBind();
        
    }





    private void HandleFacebookCallback()
{
  var oauthResult = Request.Params["code"];
  string accessToken = GetOauthTokens(oauthResult)["access_token"].ToString();

  if (string.IsNullOrEmpty(accessToken))
  {
    // failed to get access token do something
  }
  var fb = new FacebookClient(accessToken);
  dynamic me = fb.Get("me");
  // get all the user information
  string email = me.email;
  string facebookID = me.id;
  byte[] imageBytes = me.DownloadData(string.Format("https://graph.facebook.com/{0}/picture", me.id));
  //perform login for the user
}

private Dictionary<string, string> GetOauthTokens(string code)
{
  Dictionary<string, string> tokens = new Dictionary<string, string>();
  string clientId = "582400268443552";
  string redirectUrl = "http://yourwedding-guide.com/Default.aspx";
  string clientSecret = "29abb3820aad9e3ce5c654c3827cf235";
  string scope = "offline_access,email,publish_stream";
  string url = string.Format("https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&client_secret={2}&code={3}&scope={4}",clientId, redirectUrl, clientSecret, code, scope);

  HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
  using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
  {
    StreamReader reader = new StreamReader(response.GetResponseStream());
    string retVal = reader.ReadToEnd();
    foreach (string token in retVal.Split('&'))
    {
       tokens.Add(token.Substring(0, token.IndexOf("=")),
       token.Substring(token.IndexOf("=") + 1, token.Length - token.IndexOf("=") - 1));
    }
  }
  return tokens;
}



    public static string GetPictureUrl(string faceBookId)
    {
        WebResponse response = null;
        string pictureUrl = string.Empty;
   
            WebRequest request = WebRequest.Create(string.Format("https://graph.facebook.com/{0}/picture", faceBookId));
            response = request.GetResponse();
            pictureUrl = response.ResponseUri.ToString();
       
       
        return pictureUrl;
    }
  
    protected void grid_local_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            Repeater re = (Repeater)e.Row.Cells[0].FindControl("Repeater1");

            int pID = Convert.ToInt32(DataBinder.Eval(e.Row.DataItem, "ID"));

            tableCat = new DB().Admin_Categorys_GetByCat_ID(pID);
            re.DataSource = tableCat;
            re.DataBind();
        }


    }

    protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        Repeater repeat_NewOffer = (Repeater)e.Item.FindControl("Repeater1");


        HtmlGenericControl visibleMenu = (HtmlGenericControl)e.Item.FindControl("visibleMenu");
        LinkButton LinkButton1 = (LinkButton)e.Item.FindControl("LinkButton1");


        RepeaterItem ri = e.Item;
        HiddenField pk = (HiddenField)ri.FindControl("HiddenField2");

        int FileID = Convert.ToInt32(pk.Value);


        DataTable offers = new DB().Admin_Categorys_GetByCat_ID(FileID);


        if (offers.Rows.Count == 0)
        {
            visibleMenu.Visible = false;

            LinkButton1.PostBackUrl = string.Format("~/Category.aspx?ID2={0}",FileID);
        }
        else
        {
            LinkButton1.PostBackUrl = null;
         repeat_NewOffer.DataSource = offers;
        repeat_NewOffer.DataBind();
        }

       


    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        if (Request.Cookies["facebookID"] != null)
        {
            HttpCookie myCookie = Request.Cookies["facebookID"];
            myCookie.Expires = DateTime.Now.AddDays(-1d);
            Response.Cookies.Add(myCookie);
            Response.Redirect("~/");
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string link = string.Format("Search.aspx?Title={0}",txt_search.Text);
        Response.Redirect(link);
    }
}
