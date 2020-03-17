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
public partial class fbLogin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["accessToken"] != null)
            {
                var accessToken = Session["accessToken"].ToString();
                var client = new FacebookClient(accessToken);

                dynamic result = client.Get("me", new { fields = "name,id" });
                string name = result.name;
                string id = result.id;
                //Response.Write(name);
                Response.Redirect("~/");

            }
            else
            {
                Response.Write("fuck");
            }
        }
        catch (Exception)
        {


        }
    }

    public static string GetPictureUrl(string faceBookId)
    {
        WebResponse response = null;
        string pictureUrl = string.Empty;
        try
        {
            WebRequest request = WebRequest.Create(string.Format("https://graph.facebook.com/{0}/picture", faceBookId));
            response = request.GetResponse();
            pictureUrl = response.ResponseUri.ToString();
        }
        catch (Exception ex)
        {
            //? handle
        }
        finally
        {
            if (response != null) response.Close();
        }
        return pictureUrl;
    }
}