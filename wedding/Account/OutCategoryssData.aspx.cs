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
            HttpContext.Current.Session["OutCategorys_ID"] = DropDownList1.SelectedValue;
            FillGrid();
            image_thumb.Visible = false;
            
        }
    }
    protected void Drop_Sub_SelectedIndexChanged(object sender, EventArgs e)
    {

        FillDrop2();
        HttpContext.Current.Session["OutCategorys_ID"] = DropDownList1.SelectedValue;
        FillGrid();
        
    }

    protected void Drop_Sub_SelectedIndexChanged2(object sender, EventArgs e)
    {

        HttpContext.Current.Session["OutCategorys_ID"] = DropDownList1.SelectedValue;
        FillGrid();

    }
   
    private void FillDrop()
    {
        try
        {

            DataTable Grid_dt = new DB().ADMIN_OutCategory_GetByHaveItem(1,1);


            Drob_Sub.DataSource = Grid_dt;
            Drob_Sub.DataTextField = "Title";
            Drob_Sub.DataValueField = "ID";
            Drob_Sub.DataBind();

            FillGrid();


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

            DataTable Grid_dt = new DB().Admin_OutCategorys_GetByCat_ID(int.Parse(Drob_Sub.SelectedValue));


            DropDownList1.DataSource = Grid_dt;
            DropDownList1.DataTextField = "Title";
            DropDownList1.DataValueField = "ID";
            DropDownList1.DataBind();

            FillGrid();


        }
        catch (Exception ex)
        {

            lbl_error.Text = "filldrop";
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


                //DataTable Grid_dt = new DB().Admin_ImagesTable2_GetByItem_ID(int.Parse(Drob_Sub.SelectedValue));
                //grid_Display.DataSource = Grid_dt;
                //grid_Display.DataBind();
                //HttpContext.Current.Session["OutCategory_ID"] = Drob_Sub.SelectedValue;



            DataTable Grid_dt = new DB().Admin_ImagesTable2_GetByOutCategorys_ID(int.Parse(DropDownList1.SelectedValue));
            grid_Display.DataSource = Grid_dt;
            grid_Display.DataBind();

          
               
            
          
                
           

        }
        catch (Exception ex)
        {

            lbl_error.Text =ex.Message;
        }
    }

    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
           
                
            

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
            new DB().ADMIN_ImagesTable2_Delete(id);
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
        DataTable edit_dt = new DB().ADMIN_ImagesTable2_GetByID(id);
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