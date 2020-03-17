using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Account_upload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
         string thumb_url = null;
     
             if (upload_image.HasFile)
             {
                 upload_image.SaveAs(Server.MapPath(@"/Articles/" + upload_image.FileName));
                 thumb_url = (@"/Articles/" + upload_image.FileName);

                 Image1.Visible = true;
                 Image1.ImageUrl = thumb_url;

             }
         
    }
}