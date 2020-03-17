using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Account_NewsLetter : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        FillGrid();
    }

    private void clear()
    {

        txt_city.Text = "";
        txt_email.Text = "";
        txt_Gender.Text = "";
        txt_phone.Text = "";
        txt_Name.Text = "";
       
    }


    private void FillGrid()
    {
        try
        {
            DataTable Grid_dt2 = new DB().ADMIN_NewsLetter_Get();
            grid_Display.DataSource = Grid_dt2;
            grid_Display.DataBind();
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }
    }


    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
            string thumb_url = null;
            if (lbl_id.Text == "")
            {
                bool valid = true;

                if (valid)
                {


                    new DB().Admin_NewsLetter_Insert(txt_Name.Text,txt_email.Text,txt_phone.Text,txt_Gender.Text,txt_city.Text);
                        FillGrid();
                        clear();
                        lbl_id.Text = "";
                        lbl_error.Text = "saved successfully";
                        lbl_error.ForeColor = System.Drawing.Color.Green;
                   
                }
            }
            else
            {
                bool valid = true;
               
                if (valid)
                {
                    new DB().Admin_NewsLetter_Update(int.Parse(lbl_id.Text), txt_Name.Text, txt_email.Text, txt_phone.Text, txt_Gender.Text, txt_city.Text);
                    DataTable edit_dt = new DB().ADMIN_NewsLetter_GetByID(int.Parse(lbl_id.Text));
                    Bind(edit_dt);
                    FillGrid();
                    lbl_id.Text = "";
                    lbl_error.Text = "saved successfully";
                    Response.Redirect(Request.RawUrl);
                }
            }

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
            new DB().ADMIN_NewsLetter_Delete(id);
            FillGrid();
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }
    }

    protected void grid_Display_RowEditing(object sender, GridViewEditEventArgs e)
    {
        
        int id = (int)grid_Display.DataKeys[e.NewEditIndex].Value;
        DataTable edit_dt = new DB().ADMIN_NewsLetter_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
    }

    private void Bind(DataTable edit_dt)
    {
        txt_Name.Text = edit_dt.Rows[0]["Name"].ToString();
        txt_email.Text = edit_dt.Rows[0]["Email"].ToString();
        txt_phone.Text = edit_dt.Rows[0]["Phone"].ToString();
        txt_Gender.Text = edit_dt.Rows[0]["Gender"].ToString();
        txt_city.Text = edit_dt.Rows[0]["City"].ToString();
       
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