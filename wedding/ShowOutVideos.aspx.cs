using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Videos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["ID"] != null)
            {
                DataTable getVideo = new DB().ADMIN_OutVideos_GetByID(int.Parse(Request.QueryString["ID"]));
                Page.Title = getVideo.Rows[0]["Title"].ToString();
             
                Literal_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}' />",getVideo.Rows[0]["Thumb"].ToString());
             
                //Literal2.Text = getVideo.Rows[0]["Body"].ToString();
                litral_video.Text = getVideo.Rows[0]["Iframe"].ToString();
                Label1.Text = getVideo.Rows[0]["Title"].ToString();
            }
        }
    }
}