using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class ShowArticles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {

            if (Request.QueryString["ID"] != null)
            {

                DataTable tablecheck = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(Request.QueryString["ID"]));

                DataTable getVendors = new DB().Admin_Items_GetBySpecialHomePageart(1);
                Repeater2.DataSource = getVendors;
                Repeater2.DataBind();




                DataTable getCategoriesName = new DB().Admin_OutCategorys_GetHome(0);
                repeaterCategoriesnames.DataSource = getCategoriesName;
                repeaterCategoriesnames.DataBind();

                Repeater1.DataSource = tablecheck;
                Repeater1.DataBind();


                DataTable getArticles2 = new DB().Admin_Articles_GetHomePage(1);
                repeater_articles.DataSource = getArticles2;
                repeater_articles.DataBind();



                DataTable getComments = new DB().Admin_Comments_GetByItemID(int.Parse(Request.QueryString["ID"]), 1);

                repeater_comments.DataSource = getComments;
                repeater_comments.DataBind();
                if (getComments.Rows.Count == 0)
                {
                    lbl_CommentNumber.Text = "0";
                }
                else
                {
                    lbl_CommentNumber.Text = getComments.Rows.Count.ToString();
                }


                DataTable Interviews = new DB().Admin_Interview_GetByItemID(int.Parse(Request.QueryString["ID"]));

                if (Interviews.Rows.Count != 0)
                {
                    txt_InterviewTitle.Text = Interviews.Rows[0]["Title"].ToString();
                    txt_interviewBody.Text = Interviews.Rows[0]["Body"].ToString();

                    string description = string.Format("<meta property='og:description' content='{0}'/>", Interviews.Rows[0]["Des"].ToString());
                    litral_des.Text = description;
                }




                DataTable getHead = new DB().ADMIN_Items_GetByID(int.Parse(Request.QueryString["ID"]));
                int getCat;
                if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
                {
                    getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
                    DataTable table = new DB().ADMIN_Category_GetByID(getCat);
                    Label2.Text = table.Rows[0]["Title"].ToString();
                    Literal2.Text = getHead.Rows[0]["Body"].ToString();
                }
                else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
                {
                    getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
                    DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
                    Label2.Text = table.Rows[0]["Title"].ToString() + " ";
                    Literal2.Text = getHead.Rows[0]["Body"].ToString();


                }



                Label1.Text = getHead.Rows[0]["Title"].ToString();

                Page.Title = getHead.Rows[0]["Title"].ToString();
                //litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getHead.Rows[0]["Title"].ToString());
               litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}'/>", getHead.Rows[0]["Img"].ToString());
                litral_site_name.Text = string.Format("<meta property='og:site_name' content='Your Wedding Guide, The Best Seller In The Middle East'/>");

                DivFavorite.Visible = false;

                if (User.Identity.IsAuthenticated)
                {
                    DivFavorite.Visible = true;
                    DataTable getUserId = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
                    string UserId = getUserId.Rows[0]["UserId"].ToString();


                    DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                    int total = getFavTable.Rows.Count;
                    getFav.InnerHtml = total + " Item";
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



    protected void Button1_Click(object sender, EventArgs e)
    {
        new DB().Admin_Comments_Insert(txt_name.Text, txt_mail.Text, DateTime.Now, txt_comment.Text, 2, int.Parse(Request.QueryString["ID"]));
        txt_msgError.Text = "تم إضافة تعليقك بنجاح .. برجاء الإنتظار حتى موافقة اإدارة";
        txt_msgError.ForeColor = System.Drawing.Color.Green;
        txt_name.Text = "";
        txt_mail.Text = "";
        txt_comment.Text = "";
    }
}