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
        if (!IsPostBack)
        {
            if (Request.QueryString["ID"] != null)
            {
                DataTable getArticles = new DB().ADMIN_Articles_GetByID(int.Parse(Request.QueryString["ID"]));
                Label1.Text=getArticles.Rows[0]["Title"].ToString();
                Page.Title = getArticles.Rows[0]["Title"].ToString();
                Literal1.Text = getArticles.Rows[0]["Body"].ToString();


                DataTable getArticles2 = new DB().Admin_Articles_GetHomePage(1);
                repeater_articles.DataSource = getArticles2;
                repeater_articles.DataBind();


                DataTable getCategoriesName = new DB().Admin_OutCategorys_GetHome(0);
                repeaterCategoriesnames.DataSource = getCategoriesName;
                repeaterCategoriesnames.DataBind();
                //DataTable getArticles2 = new DB().Admin_Articles_GetHomePagetop4();
                //repeater_articles.DataSource = getArticles2;
                //repeater_articles.DataBind();
            }
            else
            { 
            
            }
        }
    }
}