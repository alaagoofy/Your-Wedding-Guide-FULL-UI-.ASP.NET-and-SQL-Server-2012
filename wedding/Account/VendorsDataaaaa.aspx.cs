using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public partial class Account_VendorsData : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            FillDrop();
            FillDrop2();
            if (DropDownList1.SelectedValue != null)
            {

                DataTable Grid_dt2 = new DB().Admin_Items_GetByMenu_ID(int.Parse(Drob_Sub.SelectedValue));
                DropDownList2.DataSource = Grid_dt2;
                DropDownList2.DataTextField = "Title";
                DropDownList2.DataValueField = "ID";
                DropDownList2.DataBind();
                HttpContext.Current.Session["Item_ID"] = Drob_Sub.SelectedValue;
                HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;

            }
            else if (DropDownList1.SelectedValue == null)
            {
                DataTable Grid_dt = new DB().Admin_Items_GetByCat_ID(int.Parse(DropDownList1.SelectedValue));
                DropDownList2.DataSource = Grid_dt;
                DropDownList2.DataTextField = "Title";
                DropDownList2.DataValueField = "ID";
                DropDownList2.DataBind();
                HttpContext.Current.Session["Item_ID"] = DropDownList1.SelectedValue;
                HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;
            }
           
            //FillDrop2();
            FillDrop3();
            FillGrid();
            image_thumb.Visible = false;
            
        }
    }
    protected void Drop_Sub_SelectedIndexChanged(object sender, EventArgs e)
    {
        FillDrop2();
        if (DropDownList1.SelectedValue != null)
        {

            DataTable Grid_dt2 = new DB().Admin_Items_GetByMenu_ID(int.Parse(Drob_Sub.SelectedValue));
            DropDownList2.DataSource = Grid_dt2;
            DropDownList2.DataTextField = "Title";
            DropDownList2.DataValueField = "ID";
            DropDownList2.DataBind();
            HttpContext.Current.Session["Item_ID"] = Drob_Sub.SelectedValue;
            HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;
        }
        else
        {
            DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drob_Sub.SelectedValue));
            DropDownList1.DataSource = Grid_dt;
            DropDownList1.DataTextField = "Title";
            DropDownList1.DataValueField = "ID";
            DropDownList1.DataBind();
            HttpContext.Current.Session["Item_ID"] = DropDownList1.SelectedValue;
            HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;
        }
        FillDrop2();
            FillGrid();
       
       
    }
    protected void Drop_Sub_SelectedIndexChanged2(object sender, EventArgs e)
    {
       
        FillDrop3();
       
        FillGrid();
    }

    protected void Drop_Sub_SelectedIndexChanged3(object sender, EventArgs e)
    {
        if (DropDownList1.SelectedValue == "0")
        {
            DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(DropDownList1.SelectedValue));
            HttpContext.Current.Session["Item_ID"] = DropDownList2.SelectedValue;
            HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;
        }
        else
        {
            DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(Drob_Sub.SelectedValue));
            HttpContext.Current.Session["Item_ID"] = DropDownList2.SelectedValue;
            HttpContext.Current.Session["UserId"] = Drob_Sub.SelectedValue;
        }
        FillGrid();
    }
    private void FillDrop()
    {
        try
        {

            DataTable Grid_dt = new DB().ADMIN_Category_Get();


            Drob_Sub.DataSource = Grid_dt;
            Drob_Sub.DataTextField = "Title";
            Drob_Sub.DataValueField = "ID";
            Drob_Sub.DataBind();

           


        }
        catch (Exception ex)
        {

            lbl_error.Text ="filldrop";
        }

    }

    private void FillDrop2()
    {
        try
        {

            DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drob_Sub.SelectedValue));
           
              
                DropDownList1.DataSource = Grid_dt;
                DropDownList1.DataTextField = "Title";
                DropDownList1.DataValueField = "ID";
                DropDownList1.DataBind();
               



        }
        catch (Exception ex)
        {

            lbl_error.Text = "filldrop2";
        }

    }


    private void FillDrop3()
    {
        try
        {
            if (DropDownList1.SelectedValue == null)
            {

                DataTable Grid_dt2 = new DB().Admin_Items_GetByMenu_ID(int.Parse(Drob_Sub.SelectedValue));
                DropDownList2.DataSource = Grid_dt2;
                DropDownList2.DataTextField = "Title";
                DropDownList2.DataValueField = "ID";
                DropDownList2.DataBind();
                
            }
            else
            {
                DataTable Grid_dt = new DB().Admin_Items_GetByCat_ID(int.Parse(DropDownList1.SelectedValue));
                DropDownList2.DataSource = Grid_dt;
                DropDownList2.DataTextField = "Title";
                DropDownList2.DataValueField = "ID";
                DropDownList2.DataBind();
                
            }


          
          
                
           
           
        }
        catch (Exception ex)
        {

            lbl_error.Text = "filldrop3";
        }

    }


    private void clear()
    {
        
       
        image_thumb.Visible = false;
    }

    private void FillGrid()
    {
        try
        {
                DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(DropDownList2.SelectedValue));
                grid_Display.DataSource = Grid_dt2;
                grid_Display.DataBind();
        }
        catch (Exception ex)
        {

            lbl_error.Text = "FillGrid";
        }
    }

    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
            DataTable getItems = new DB().ADMIN_Items_GetByID(int.Parse(DropDownList2.SelectedValue));
            int Item_id = int.Parse(getItems.Rows[0]["ID"].ToString());
            string vendorTitle = getItems.Rows[0]["Title"].ToString();

            DataTable getLastImage = new DB().Admin_ImagesTable_GetByItem_ID(Item_id);
            string Img=getLastImage.Rows[0]["Img"].ToString();




            string NewsTitle = string.Format("Check The Latest Photos Of {0}", vendorTitle);

            DataTable checkNews = new DB().Admin_News_GetByItems_ID(Item_id);
          

            if (checkNews.Rows.Count == 0)
            {
                new DB().Admin_News_Insert(NewsTitle, Item_id, DateTime.Now.ToShortDateString(),Img);
            }
            else
            {
                int NewsID = int.Parse(checkNews.Rows[0]["ID"].ToString());
                new DB().ADMIN_News_Delete(NewsID);
                new DB().Admin_News_Insert(NewsTitle, Item_id, DateTime.Now.ToShortDateString(),Img);

            }




        }
        catch (SqlException sql)
        {
            lbl_error.Text = sql.Message;

        }

        catch (Exception ex)
        {
            lbl_error.Text = ex.Message;
        }
    }

    protected void grid_Display_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grid_Display.PageIndex = e.NewPageIndex;
        FillGrid();

    }

    protected void grid_Display_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            int id = (int)grid_Display.DataKeys[e.RowIndex].Value;
            new DB().ADMIN_ImagesTable_Delete(id);
            FillGrid();
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }
    }

    protected void grid_Display_RowEditing(object sender, GridViewEditEventArgs e)
    {
        image_thumb.Visible = true;
        int id = (int)grid_Display.DataKeys[e.NewEditIndex].Value;
        DataTable edit_dt = new DB().ADMIN_ImagesTable_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
    }

    private void Bind(DataTable edit_dt)
    {
       
        image_thumb.ImageUrl = edit_dt.Rows[0]["Img"].ToString();


    }

    protected void grid_Display_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            LinkButton btn_del = (LinkButton)e.Row.FindControl("btn_delete");

            btn_del.Attributes.Add("onclick", "javascript:return " +
                "confirm('Are you sure') ");

        }
    }
}