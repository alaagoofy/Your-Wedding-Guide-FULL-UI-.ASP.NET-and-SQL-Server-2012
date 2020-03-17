using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Account_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            FillDrop();
            FillGrid();
        }
    }
    public void clear()
    {
        txt_Title.Text = "";
    }
    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
            if (lbl_id.Text == "")
            {
                bool valid = true;
                if (valid)
                {
                    new DB().Admin_Categorys_Insert(txt_Title.Text,int.Parse(Drop_Sub.SelectedValue));
                    FillGrid();
                    clear();
                    lbl_id.Text = "";
                    lbl_error.Text = "saved successfully";
                    lbl_error.ForeColor = System.Drawing.Color.Green;
                }
            }
            else
            {
                new DB().Admin_Categorys_Update(int.Parse(lbl_id.Text), txt_Title.Text, int.Parse(Drop_Sub.SelectedValue));
                DataTable edit_dt = new DB().ADMIN_Categorys_GetByID(int.Parse(lbl_id.Text));
                Bind(edit_dt);
                FillGrid();
                lbl_id.Text = "";
                lbl_error.Text = "saved successfully";
                Response.Redirect(Request.RawUrl);
            }

        }
        catch (Exception ex)
        {
            lbl_error.Text = ex.Message;

        }

    }
    protected void Drop_Sub_SelectedIndexChanged(object sender, EventArgs e)
    {
        FillGrid();
    }
    private void FillDrop()
    {
        try
        {
            DataTable Grid_dt = new DB().Admin_Category_GetBylaung(1);
            Drop_Sub.DataSource = Grid_dt;
            Drop_Sub.DataTextField = "Title";
            Drop_Sub.DataValueField = "ID";
            Drop_Sub.DataBind();
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }

    }


    private void FillGrid()
    {
        DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drop_Sub.SelectedValue));
        grid_Display.DataSource = Grid_dt;
        grid_Display.DataBind();
    }

    protected void grid_Display_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        grid_Display.PageIndex = e.NewPageIndex;
        FillGrid();

    }

    protected void grid_Display_RowEditing(object sender, GridViewEditEventArgs e)
    {

        int id = (int)grid_Display.DataKeys[e.NewEditIndex].Value;
        DataTable edit_dt = new DB().ADMIN_Categorys_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
        grid_Display.EditIndex = -1;
    }

    private void Bind(DataTable edit_dt)
    {
        txt_Title.Text = edit_dt.Rows[0]["Title"].ToString();
    }

    protected void grid_Display_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            LinkButton btn_del = (LinkButton)e.Row.FindControl("btn_delete");
            btn_del.Attributes.Add("onclick", "javascript:return " +
                "confirm('Are you sure ?') ");
        }
    }

    protected void grid_Display_RowDeleting1(object sender, GridViewDeleteEventArgs e)
    {
        try
        {
            int id = (int)grid_Display.DataKeys[e.RowIndex].Value;
            new DB().ADMIN_Categorys_Delete(id);
            FillGrid();
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }

    }
}