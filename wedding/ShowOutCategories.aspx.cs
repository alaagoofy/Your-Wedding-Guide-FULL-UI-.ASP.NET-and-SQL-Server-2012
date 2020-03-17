using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using System.Configuration;

public partial class ShowOutCategories : System.Web.UI.Page
{
    DB d = new DB();

    DataTable t = new DataTable();
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Request.QueryString["ID"] != null)
            {
                ButtonTrigger2.Visible = false;
                ButtonTrigger.Visible = true;



                DataTable table = new DB().Admin_ImagesTable2_GetByItem_IDTop30(int.Parse(Request.QueryString["ID"]));
                if (table.Rows.Count<30)
                {
                     ButtonTrigger2.Visible = false;
                ButtonTrigger.Visible = false;
                }

                if (table.Rows.Count > 0)
                {
                    Repeater1.DataSource = table;
                    Repeater1.DataBind();
                    litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}'/>", table.Rows[0]["Img"].ToString());
                    t = d.ADMIN_OutCategory_GetByID(int.Parse(Request.QueryString["ID"]));
                    Label1.Text = t.Rows[0]["Title"].ToString();
                    Page.Title = t.Rows[0]["Title"].ToString();

                    panal_cat.Visible = false;
                    panal_images.Visible = true;
              

                    //Label1.Text = table2.Rows[0]["Title"].ToString() + " > ";
                }

                else
                {
                    DataTable tablecategoryys = new DB().Admin_OutCategorys_GetByCat_ID(int.Parse(Request.QueryString["ID"]));
                    Repeater2.DataSource = tablecategoryys;
                    Repeater2.DataBind();
                    panal_images.Visible = false;
                    panal_cat.Visible = true;
                   


                    t = d.ADMIN_OutCategory_GetByID(int.Parse(Request.QueryString["ID"]));
                    Label1.Text = t.Rows[0]["Title"].ToString();
                    Page.Title = t.Rows[0]["Title"].ToString();
                }



            }
            else if (Request.QueryString["ID2"] != null)
            {
                DataTable table = new DB().Admin_ImagesTable2_GetByOutCategorys_IDTop30(int.Parse(Request.QueryString["ID2"]));
                if (table.Rows.Count < 30)
                {
                    ButtonTrigger2.Visible = false;
                    ButtonTrigger.Visible = false;
                }

                ButtonTrigger.Visible = false;
                ButtonTrigger2.Visible = true;
                    Repeater1.DataSource = table;
                    Repeater1.DataBind();
                    litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com/{0}'/>", table.Rows[0]["Img"].ToString());
               
              
                
                DataTable ttt = new DB().ADMIN_OutCategorys_GetByID(int.Parse(Request.QueryString["ID2"]));
                int cat_ID = int.Parse(ttt.Rows[0]["Cat_ID"].ToString());
                t = d.ADMIN_OutCategory_GetByID(cat_ID);


                Label1.Text = ttt.Rows[0]["Title"].ToString();
                Page.Title = ttt.Rows[0]["Title"].ToString();
                Label2.Text = t.Rows[0]["Title"].ToString() + " > ";
                panal_cat.Visible = false;
                panal_images.Visible = true;
            }
            else
            {
                Response.Redirect("~/");
            }
        }
        catch (Exception)
        {

            
        }
      
    }

    protected void Button2_Click(object sender, EventArgs e)
    {
        
        DataTable tablecheck = new DB().Admin_ImagesTable2_GetByItem_ID(int.Parse(Request.QueryString["ID"]));

        Repeater1.DataSource = tablecheck;
        Repeater1.DataBind();

        ButtonTrigger.Visible = false;
        ButtonTrigger2.Visible = false;

    }

    protected void Button3_Click(object sender, EventArgs e)
    {
        
        DataTable tablecheck = new DB().Admin_ImagesTable2_GetByOutCategorys_ID(int.Parse(Request.QueryString["ID2"]));

        Repeater1.DataSource = tablecheck;
        Repeater1.DataBind();

        ButtonTrigger.Visible = false;
        ButtonTrigger2.Visible = false;


    }

   
    //protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    //{


    //    RepeaterItem ri = e.Item;
    //    HiddenField pk = (HiddenField)ri.FindControl("HiddenField2");
    //    Literal Next = (Literal)ri.FindControl("Next");
    //    Literal Prev = (Literal)ri.FindControl("Prev");
    //    int FileID = Convert.ToInt32(pk.Value);

    //    DataTable getNextRow = new DB().nextImage2(FileID);
    //    if (getNextRow.Rows.Count == 0)
    //    {

    //        Next.Text = string.Format("<a href='#photo' class='lb-next'></a>");
    //    }
    //    else
    //    {
    //        int nextID = int.Parse(getNextRow.Rows[0]["ID"].ToString());
    //        Next.Text = string.Format("<a href='#photo-{0}' class='lb-next'></a>", nextID);
    //    }

    //    DataTable getPrevRow = new DB().prevImage2(FileID);
    //    if (getPrevRow.Rows.Count == 0)
    //    {

    //        Prev.Text = string.Format("<a href='#photo' class='lb-prev'></a>");
    //    }
    //    else
    //    {
    //        int prevID = int.Parse(getPrevRow.Rows[0]["ID"].ToString());
    //        Prev.Text = string.Format("<a href='#photo-{0}' class='lb-prev'></a>", prevID);
    //    }









    //}

    //protected void Repeater1_OnItemCommand(object source, RepeaterCommandEventArgs e)
    //{
    //    RepeaterItem ri = e.Item;
    //    Literal litral_image = (Literal)ri.FindControl("litral_image");
    //    int fileid = int.Parse(e.CommandArgument.ToString());
    //    DataTable getID = new DB().ADMIN_ImagesTable_GetByID(fileid);
    //    int id = int.Parse(getID.Rows[0]["ID"].ToString());
    //    litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com/{0}'/>", getID.Rows[0]["Img"].ToString());
      
        

    //}
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        DataTable ttt = new DB().ADMIN_OutCategorys_GetByID(int.Parse(Request.QueryString["ID2"]));
        int cat_ID = int.Parse(ttt.Rows[0]["Cat_ID"].ToString());
        
        string link = string.Format("ShowOutCategories.aspx?ID={0}",cat_ID);
        Response.Redirect(link);

    }
}