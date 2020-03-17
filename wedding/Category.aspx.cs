using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.UI.HtmlControls;

public partial class Catrgory : System.Web.UI.Page
{
    DB d = new DB();

    DataTable t = new DataTable();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["ID"] != null)
        {
          
            DataTable table = new DB().Admin_Items_GetByCat_ID(int.Parse(Request.QueryString["ID"]));
            Repeater1.DataSource = table;
            Repeater1.DataBind();

            t = d.ADMIN_Categorys_GetByID(int.Parse(Request.QueryString["ID"]));
            lbl_head.Text=t.Rows[0]["Title"].ToString();
            Page.Title = t.Rows[0]["Title"].ToString();

            int catID = int.Parse(t.Rows[0]["Cat_ID"].ToString());

            DataTable table2 = new DB().ADMIN_Category_GetByID(catID);



            Label1.Text = table2.Rows[0]["Title"].ToString()+" > ";
        }
        else if (Request.QueryString["ID2"] != null)
        {
            DataTable table = new DB().Admin_Items_GetByMenu_ID(int.Parse(Request.QueryString["ID2"]));
            Repeater1.DataSource = table;
            Repeater1.DataBind();
            t = d.ADMIN_Category_GetByID(int.Parse(Request.QueryString["ID2"]));
            lbl_head.Text = t.Rows[0]["Title"].ToString();
            Page.Title = t.Rows[0]["Title"].ToString();
            //DataTable table2 = new DB().ADMIN_Category_GetByID(int.Parse(Request.QueryString["ID"]));
            Label1.Text = "";
        }
        else
        {
            Response.Redirect("~/");
        }
    }
    protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {

        RepeaterItem ri = e.Item;
        HiddenField pk = (HiddenField)ri.FindControl("HiddenField2");
        HiddenField TitlePage = (HiddenField)ri.FindControl("HiddenField1");
      
         int FileID = Convert.ToInt32(pk.Value);



         Literal lbl_photos = (Literal)e.Item.FindControl("lbl_photos");

         DataTable getPhotos = new DB().Admin_ImagesTable_GetByItem_IDAll(FileID);
         if (getPhotos.Rows.Count == 0)
         {
             lbl_photos.Text = "(0)";
         }
         else
         {
             lbl_photos.Text = string.Format("({0})", getPhotos.Rows.Count);
         }

    }
}