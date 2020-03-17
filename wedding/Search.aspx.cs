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
        if (Request.QueryString["Title"] != null)
        {
          
            DataTable table = new DB().searchProducts(Request.QueryString["Title"]);
            if (table.Rows.Count==0)
            {
                Label1.Text = "No Results Found";
            }
            else
            {
            Repeater1.DataSource = table;
            Repeater1.DataBind();
            }
            

           
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

 string linkOfPage = string.Format("~/ShowCategory.aspx?ID={0}", FileID);
    
       

        if (Request.QueryString["ID"] != null)
        {
            Literal Label1 = (Literal)e.Item.FindControl("Literal2");
            
            Label1.Text = string.Format("<div class='fb-like' data-href='{0}' data-send='false' data-width='350' data-show-faces='true'>", linkOfPage);

        }
        else if (Request.QueryString["ID2"] != null)
        {
            Literal Label1 = (Literal)e.Item.FindControl("Literal2");
             
            Label1.Text = string.Format("<div class='fb-like' data-href='{0}' data-send='false' data-width='350' data-show-faces='true'>", linkOfPage);
        }

    }
}