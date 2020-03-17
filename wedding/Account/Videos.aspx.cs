using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Account_Videos : System.Web.UI.Page
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
            }
            else if (DropDownList1.SelectedValue == null)
            {
                DataTable Grid_dt = new DB().Admin_Items_GetByCat_ID(int.Parse(DropDownList1.SelectedValue));
                DropDownList2.DataSource = Grid_dt;
                DropDownList2.DataTextField = "Title";
                DropDownList2.DataValueField = "ID";
                DropDownList2.DataBind();
                HttpContext.Current.Session["Item_ID"] = DropDownList1.SelectedValue;
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
        }
        else
        {
            DataTable Grid_dt = new DB().Admin_Categorys_GetByCat_ID(int.Parse(Drob_Sub.SelectedValue));
            DropDownList1.DataSource = Grid_dt;
            DropDownList1.DataTextField = "Title";
            DropDownList1.DataValueField = "ID";
            DropDownList1.DataBind();
            HttpContext.Current.Session["Item_ID"] = DropDownList1.SelectedValue;
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
        }
        else
        {
            DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(Drob_Sub.SelectedValue));
            HttpContext.Current.Session["Item_ID"] = DropDownList2.SelectedValue;
        }
        FillGrid();
    }
    private void FillDrop()
    {
        try
        {

            DataTable Grid_dt = new DB().Admin_Category_GetBylaung(1);


            Drob_Sub.DataSource = Grid_dt;
            Drob_Sub.DataTextField = "Title";
            Drob_Sub.DataValueField = "ID";
            Drob_Sub.DataBind();




        }
        catch (Exception ex)
        {

            lbl_error.Text = "filldrop";
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

        txt_Title.Text = "";
        txt_link.Text = "";
        txt_iframe.Text="";
        image_thumb.Visible = false;
    }

    private void FillGrid()
    {
        try
        {
            DataTable Grid_dt2 = new DB().Admin_Videos_GetByItem_ID(int.Parse(DropDownList2.SelectedValue));
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
                        new DB().Admin_Videos_Insert(txt_Title.Text, "", thumb_url, txt_link.Text, txt_iframe.Text, int.Parse(DropDownList2.SelectedValue));
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
                    DataTable dt = new DB().ADMIN_Videos_GetByID(int.Parse(lbl_id.Text));
                    thumb_url = dt.Rows[0]["Thumb"].ToString();
                }
                if (valid)
                {
                    new DB().Admin_Videos_Update(int.Parse(lbl_id.Text), txt_Title.Text, "", thumb_url, txt_link.Text, txt_iframe.Text, int.Parse(DropDownList2.SelectedValue));
                    DataTable edit_dt = new DB().ADMIN_Videos_GetByID(int.Parse(lbl_id.Text));
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
            new DB().ADMIN_Videos_Delete(id);
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
        DataTable edit_dt = new DB().ADMIN_Videos_GetByID(id);
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