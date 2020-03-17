using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net.Mail;
using System.Data.SqlClient;

public partial class ShowCategory : System.Web.UI.Page
{
  

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
          
                if (Request.QueryString["ID"] != null)
                {

                    DataTable tablecheck = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(Request.QueryString["ID"]));

                    if (tablecheck.Rows.Count >= 30)
                    {
                        ButtonTrigger.Visible = true;
                    }
                    else
                    {
                        ButtonTrigger.Visible = false;
                    }


                    Repeater1.DataSource = tablecheck;
                    Repeater1.DataBind();


                    DataTable getHead = new DB().ADMIN_Items_GetByID(int.Parse(Request.QueryString["ID"]));
                    int getCat;
                    if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
                    {
                        getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
                        DataTable table = new DB().ADMIN_Category_GetByID(getCat);
                        Label2.Text = table.Rows[0]["Title"].ToString() + " > ";
                        Literal2.Text = getHead.Rows[0]["Body"].ToString();
                    }
                    else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
                    {
                        getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
                        DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
                        Label2.Text = table.Rows[0]["Title"].ToString() + " > ";
                        Literal2.Text = getHead.Rows[0]["Body"].ToString();

                    }



                    Label1.Text = getHead.Rows[0]["Title"].ToString();

                    Page.Title = getHead.Rows[0]["Title"].ToString();
                    //litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getHead.Rows[0]["Title"].ToString());
                    litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}'/>", getHead.Rows[0]["Img"].ToString());
                    litral_site_name.Text = string.Format("<meta property='og:site_nam' content='Your Wedding Guide, The Best Seller In The Middle East'/>");

                    DivFavorite.Visible = false;

                    if (User.Identity.IsAuthenticated)
                    {
                        DivFavorite.Visible = true;
                        DataTable getUserId = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
                        string UserId = getUserId.Rows[0]["UserId"].ToString();


                        DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                        int total = getFavTable.Rows.Count;
                        getFav.InnerHtml = total + " Items";
                    }




                    DataTable getVideos = new DB().Admin_Videos_GetByItem_ID(int.Parse(Request.QueryString["ID"]));
                    if (getVideos.Rows.Count == 0)
                    {
                        Panal_Videos.Visible = false;

                    }
                    repeater_videos.DataSource = getVideos;
                    repeater_videos.DataBind();


                }
                else
                {
                    Response.Redirect("~/");
                }
            

            
           

            
           
               
        }
        catch (Exception)
        {

            Response.Redirect("~/");
        }
     
        
    }



    
  

   

    protected void LinkButton2_Click(object sender, EventArgs e)
    {
        DataTable getHead = new DB().ADMIN_Items_GetByID(int.Parse(Request.QueryString["ID"]));
        int getCat;
        if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
        {
            getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
            DataTable table = new DB().ADMIN_Category_GetByID(getCat);
            string pageurl = string.Format("Category.aspx?ID2={0}", table.Rows[0]["ID"].ToString());
            Response.Redirect(pageurl);
        }
        else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
        {
            getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
            DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
            string pageurl = string.Format("Category.aspx?ID={0}", table.Rows[0]["ID"].ToString());
            Response.Redirect(pageurl);

        }
    }
   

    protected void Button2_Click(object sender, EventArgs e)
    {
        System.Threading.Thread.Sleep(1000);
        DataTable tablecheck = new DB().Admin_ImagesTable_GetByItem_IDAll(int.Parse(Request.QueryString["ID"]));

        Repeater1.DataSource = tablecheck;
        Repeater1.DataBind();

        ButtonTrigger.Visible = false;


    }
}