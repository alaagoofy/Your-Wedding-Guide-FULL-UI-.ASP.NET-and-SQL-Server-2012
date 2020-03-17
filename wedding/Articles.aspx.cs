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
         
                DataTable getArticles = new DB().ADMIN_Articles_GetByLaung(1);
                repeater_articles.DataSource = getArticles;
                repeater_articles.DataBind();


                //DataTable getArticles2 = new DB().Admin_Articles_GetHomePagetop4();
                //repeater_articles.DataSource = getArticles2;
                //repeater_articles.DataBind();
         
        }
    }
    protected void Repeater3_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        //Repeater repeat_NewOffer = (Repeater)e.Item.FindControl("Repeater1");

        RepeaterItem ri = e.Item;

       

        if (((Literal)e.Item.FindControl("Literal1")).Text.Length > 650)
        {
            ((Literal)e.Item.FindControl("Literal1")).Text = ((Literal)e.Item.FindControl("Literal1")).Text.Substring(0,650);
        }






    }
}