using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class Account_ViewDetails : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        FileUpload1.Visible = false;

    }
    [System.Web.Script.Services.ScriptMethod()]
    [System.Web.Services.WebMethod]
    public static List<string> SearchCustomers(string prefixText, int count)
    {
        using (SqlConnection conn = new SqlConnection())
        {
            conn.ConnectionString = ConfigurationManager
                    .ConnectionStrings["ApplicationServices"].ConnectionString;
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.CommandText = "select * from Items where " +
                "Title like @SearchText + '%'";
                cmd.Parameters.AddWithValue("@SearchText", prefixText);
                cmd.Connection = conn;
                conn.Open();
                List<string> customers = new List<string>();
                List<string> ID = new List<string>();

                using (SqlDataReader sdr = cmd.ExecuteReader())
                {
                    while (sdr.Read())
                    {
                        customers.Add(sdr["Title"].ToString());
                  
                    }
                }
                conn.Close();
                return customers;
            }
        }
    }
    private void FillGrid()
    {
        try
        {
            DataTable getVendorData = new DB().searchProducts22(txtContactsSearch.Text);
            int Item_ID = int.Parse(getVendorData.Rows[0]["ID"].ToString());
            HttpContext.Current.Session["Item_ID"] = Item_ID.ToString();
            DataTable Grid_dt2 = new DB().Admin_ImagesTable_GetByItem_IDAll(Item_ID);
            grid_Display.DataSource = Grid_dt2;
            grid_Display.DataBind();
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
      
        int id = (int)grid_Display.DataKeys[e.NewEditIndex].Value;
        DataTable edit_dt = new DB().ADMIN_ImagesTable_GetByID(id);
        Bind(edit_dt);
        lbl_id.Text = id.ToString();
    }

    private void Bind(DataTable edit_dt)
    {

      


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


    protected void Button1_Click(object sender, EventArgs e)
    {
        FillGrid();
        FileUpload1.Visible = true;
        
    }
    protected void HiddenButton_Click(object sender, EventArgs e)
    {
      
            Response.Redirect("~/Account/VendorsData.aspx");
            FillGrid();
        
        
    }
}