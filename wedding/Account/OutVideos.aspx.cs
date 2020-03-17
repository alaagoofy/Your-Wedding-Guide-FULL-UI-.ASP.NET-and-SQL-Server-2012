using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Account_OutVideos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        FillGrid();
        image_thumb.Visible = false;
    }

    private void clear()
    {

        txt_Title.Text = "";
        txt_link.Text = "";
        txt_iframe.Text = "";
        image_thumb.Visible = false;
    }


    private void FillGrid()
    {
        try
        {
            DataTable Grid_dt2 = new DB().ADMIN_OutVideos_Get();
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
                    if (upload_image.HasFile)
                    {
                        upload_image.SaveAs(Server.MapPath(@"/images/" + upload_image.FileName));
                        thumb_url = (@"/images/" + upload_image.FileName);
                        new DB().Admin_OutVideos_Insert(txt_Title.Text,  thumb_url, txt_link.Text, txt_iframe.Text, 0);
                        FillGrid();
                        clear();
                        lbl_id.Text = "";
                        lbl_error.Text = "saved successfully";
                        lbl_error.ForeColor = System.Drawing.Color.Green;
                    }
                    else
                    {
                        lbl_error.Text = "Please Choose Picture ";
                    }
                }
            }
            else
            {
                bool valid = true;
                if (upload_image.HasFile)
                {
                    if (valid)
                    {
                        upload_image.SaveAs(Server.MapPath(@"/images/" + upload_image.FileName));
                        thumb_url = (@"/images/" + upload_image.FileName);

                    }
                }
                else
                {
                    DataTable dt = new DB().ADMIN_OutVideos_GetByID(int.Parse(lbl_id.Text));
                    thumb_url = dt.Rows[0]["Thumb"].ToString();
                }
                if (valid)
                {
                    new DB().Admin_OutVideos_Update(int.Parse(lbl_id.Text), txt_Title.Text,  thumb_url, txt_link.Text, txt_iframe.Text,0);
                    DataTable edit_dt = new DB().ADMIN_OutVideos_GetByID(int.Parse(lbl_id.Text));
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
            new DB().ADMIN_OutVideos_Delete(id);
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
        DataTable edit_dt = new DB().ADMIN_OutVideos_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
    }

    private void Bind(DataTable edit_dt)
    {
        txt_Title.Text = edit_dt.Rows[0]["Title"].ToString();
        txt_link.Text = edit_dt.Rows[0]["Link"].ToString();
        txt_iframe.Text = edit_dt.Rows[0]["Iframe"].ToString();
        image_thumb.ImageUrl = edit_dt.Rows[0]["Thumb"].ToString();
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