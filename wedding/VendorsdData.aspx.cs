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
            try
            {
                FillGrid();
                DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
                string UserId = getuserID.Rows[0]["UserId"].ToString();

                DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
                int Item_ID = int.Parse(getVendorData.Rows[0]["ID"].ToString());
                image_thumb.Visible = false;
            }
            catch (Exception)
            {

                //Response.Redirect("~/");
            }
            
            
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

            DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
            string UserId = getuserID.Rows[0]["UserId"].ToString();

            DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
            int Item_ID=int.Parse(getVendorData.Rows[0]["ID"].ToString());
            HttpContext.Current.Session["Vendors"] = Item_ID;
                DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_ID(Item_ID);
                grid_Display.DataSource = Grid_dt2;
                grid_Display.DataBind();
        }
        catch (Exception)
        {

            lbl_error.Text = "Error";
        }
    }

    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
              DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
            string UserId = getuserID.Rows[0]["UserId"].ToString();

            DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
            int Item_ID = int.Parse(getVendorData.Rows[0]["ID"].ToString());
            string vendorTitle = getVendorData.Rows[0]["Title"].ToString();
            string NewsTitle = string.Format("Check The Latest Photos Of {0}", vendorTitle);

            string thumb_url = null;
            if (lbl_id.Text == "")
            {
                if (upload_image.HasFile)
                {
                    if (upload_image.FileContent.Length > 1000000)
                    {
                        lbl_error.Text = "File Must be Less Than 1 mega";
                    }
                    else
                    {
                         string fileExt = System.IO.Path.GetExtension(upload_image.FileName);

                         if (fileExt == ".jpeg" || fileExt == ".jpg")
                         {

                             upload_image.SaveAs(Server.MapPath(@"/uploads/Category" + Item_ID + "/" + upload_image.FileName));
                             thumb_url = (@"/uploads/Category" + Item_ID + "/" + upload_image.FileName);

                             new DB().Admin_ImagesTable_Insert(thumb_url, Item_ID, "");

                             DataTable checkNews = new DB().Admin_News_GetByItems_ID(Item_ID);

                             if (checkNews.Rows.Count == 0)
                             {
                                 new DB().Admin_News_Insert(NewsTitle, Item_ID, DateTime.Now.ToShortDateString(), thumb_url,0);
                             }
                             else
                             {
                                 int NewsID = int.Parse(checkNews.Rows[0]["ID"].ToString());
                                 new DB().ADMIN_News_Delete(NewsID);
                                 new DB().Admin_News_Insert(NewsTitle, Item_ID, DateTime.Now.ToShortDateString(), thumb_url,0);

                             }

                             FillGrid();
                             clear();
                             lbl_error.Text = "saved successfully";
                             lbl_error.ForeColor = System.Drawing.Color.Green;
                         }
                         else
                         {
                             lbl_error.Text = "Image must be jpg or jpeg format";
                         }

                      
                    }

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
                    DataTable dt = new DB().ADMIN_ImagesTable_GetByID(int.Parse(lbl_id.Text));
                    thumb_url = dt.Rows[0]["Img"].ToString();
                }
                if (valid)
                {

                    new DB().Admin_ImagesTable_Update(int.Parse(lbl_id.Text), thumb_url, Item_ID, "");
                    new DB().Admin_News_Insert(NewsTitle, Item_ID, DateTime.Now.ToShortDateString(),thumb_url,0);
                        DataTable edit_dt = new DB().ADMIN_ImagesTable_GetByID(int.Parse(lbl_id.Text));
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