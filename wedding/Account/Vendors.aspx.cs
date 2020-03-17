using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public partial class Account_Vendors : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            FillDrop();
            FillDrop2();
            
            FillGrid();
            image_thumb.Visible = false;
        }
    }
    protected void Drop_Sub_SelectedIndexChanged(object sender, EventArgs e)
    {
        DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drop_Sub.SelectedValue));
        if (Grid_dt.Rows.Count == 0)
        {
            visibleDrop.Visible = false;
        }
        else if (Grid_dt.Rows.Count > 0)
        {
            visibleDrop.Visible = true;
        }
        if (visibleDrop.Visible == false)
        {
            FillGrid();
        }
        else
        {
            visibleDrop.Visible = true;
            FillDrop2();
            FillGrid();
        }
       
    }
    protected void Drop_Sub_SelectedIndexChanged2(object sender, EventArgs e)
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

    private void FillDrop2()
    {
        try
        {
           
            DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drop_Sub.SelectedValue));
            if (Grid_dt.Rows.Count == 0)
            {
                visibleDrop.Visible = false;
                FillGrid();
            }
            else if (Grid_dt.Rows.Count > 0)
            {
                visibleDrop.Visible = true;
                DropDownList1.DataSource = Grid_dt;
                DropDownList1.DataTextField = "Title";
                DropDownList1.DataValueField = "ID";
                DropDownList1.DataBind();
            }
           
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }

    }
    private void clear()
    {
        txt_Title.Text = "";
        txt_msg.InnerText = "";
        image_thumb.Visible = false;
    }

    private void FillGrid()
    {
        try
        {
            DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drop_Sub.SelectedValue));
            if (Grid_dt.Rows.Count == 0)
            {
                DataTable Grid_dt2 = new DB().Admin_Items_GetByMenu_ID(int.Parse(Drop_Sub.SelectedValue));
                grid_Display.DataSource = Grid_dt2;
                grid_Display.DataBind();
            }
            else
            { 
            DataTable Grid_dt2 = new DB().Admin_Items_GetByCat_ID(int.Parse(DropDownList1.SelectedValue));
            grid_Display.DataSource = Grid_dt2;
            grid_Display.DataBind();
            }
            
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
            int Special =1;
            string UserID = "";
            if (lbl_id.Text == "")
            {
                if (upload_image.HasFile)
                {
                    upload_image.SaveAs(Server.MapPath(@"/images/" + upload_image.FileName));
                    thumb_url = (@"/images/" + upload_image.FileName);

                        DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drop_Sub.SelectedValue));
                        if (Grid_dt.Rows.Count == 0)
                        {
                            new DB().Admin_Items_Insert(txt_Title.Text, thumb_url, txt_msg.InnerText, 1, 0, "", int.Parse(Drop_Sub.SelectedValue));
                        }
                        else
                        {
                           new DB().Admin_Items_Insert(txt_Title.Text, thumb_url, txt_msg.InnerText, 1, int.Parse(DropDownList1.SelectedValue), "",0);
                        }

                    FillGrid();
                    clear();
                    lbl_error.Text = "saved successfully";
                    lbl_error.ForeColor = System.Drawing.Color.Green;
                }
                else
                {
                    lbl_error.Text = "Please Choose Picture ";
                }
            }
            /////////////////
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
                    DataTable dt = new DB().ADMIN_Items_GetByID(int.Parse(lbl_id.Text));
                    thumb_url = dt.Rows[0]["Img"].ToString();
                    Special = int.Parse(dt.Rows[0]["Special"].ToString());
                    UserID = dt.Rows[0]["UserId"].ToString();

                }
                if (valid)
                {
                    if (visibleDrop.Visible == false)
                    {
                        new DB().Admin_Items_Update(int.Parse(lbl_id.Text),txt_Title.Text, thumb_url, txt_msg.InnerText,Special, 0,UserID, int.Parse(Drop_Sub.SelectedValue));
                    }
                    else
                    {
                        new DB().Admin_Items_Update(int.Parse(lbl_id.Text), txt_Title.Text, thumb_url, txt_msg.InnerText, Special, int.Parse(DropDownList1.SelectedValue), UserID, 0);

                    }
                    DataTable edit_dt = new DB().ADMIN_Items_GetByID(int.Parse(lbl_id.Text));
                    Bind(edit_dt);
                    FillGrid();
                    lbl_id.Text = "";
                    image_thumb.Visible = false;
                    lbl_error.Text = "saved successfully";
                 
                }

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
            new DB().ADMIN_Items_Delete(id);
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
        DataTable edit_dt = new DB().ADMIN_Items_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
    }

    private void Bind(DataTable edit_dt)
    {
        txt_Title.Text = edit_dt.Rows[0]["Title"].ToString();
        txt_msg.InnerText = edit_dt.Rows[0]["Body"].ToString();
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