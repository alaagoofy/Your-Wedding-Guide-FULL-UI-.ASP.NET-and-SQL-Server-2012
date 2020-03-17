using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class VendorInfo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (User.Identity.IsAuthenticated)
            {
                try
                {
                    DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
                    string UserId = getuserID.Rows[0]["UserId"].ToString();

                    DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
                    txt_Title.Text = getVendorData.Rows[0]["Title"].ToString();
                    //lbl_vendorName.Text = getVendorData.Rows[0]["Title"].ToString();
                    txt_msg.InnerText = getVendorData.Rows[0]["Body"].ToString();
                    image_thumb.ImageUrl = getVendorData.Rows[0]["Img"].ToString();

                }
                catch (Exception ex)
                {

                    lbl_error.Text = ex.Message;
                }
                  
               


               
            }
            else
            {
                Response.Redirect("~/Login.aspx");
            }
           
        }
       

    }
    protected void btn_save_Click(object sender, EventArgs e)
    {
        try
        {
             string thumb_url = null;

             if (upload_image.HasFile)
                    {

                    

                        upload_image.SaveAs(Server.MapPath(@"/images/" + upload_image.FileName));
                        thumb_url = (@"/images/" + upload_image.FileName);
            DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
            string UserId = getuserID.Rows[0]["UserId"].ToString();

            DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
            int ID = int.Parse(getVendorData.Rows[0]["ID"].ToString());
            int Cat_ID = int.Parse(getVendorData.Rows[0]["Cat_ID"].ToString());
            int Menu_ID = int.Parse(getVendorData.Rows[0]["Menu_ID"].ToString());
            int Special = int.Parse(getVendorData.Rows[0]["Special"].ToString());




            new DB().Admin_Items_Update(ID, txt_Title.Text, thumb_url, txt_msg.InnerText, Special, Cat_ID, UserId, Menu_ID);
           


            txt_Title.Text = getVendorData.Rows[0]["Title"].ToString();
            //lbl_vendorName.Text = getVendorData.Rows[0]["Title"].ToString();
            txt_msg.InnerText = getVendorData.Rows[0]["Body"].ToString();
            image_thumb.ImageUrl = getVendorData.Rows[0]["Img"].ToString();
            lbl_error.Text = "Save Successful";
             }
            else
             {
                 DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
                 string UserId = getuserID.Rows[0]["UserId"].ToString();

                 DataTable getVendorData = new DB().Admin_Items_GetByUserId(UserId);
                 int ID = int.Parse(getVendorData.Rows[0]["ID"].ToString());
                 int Cat_ID = int.Parse(getVendorData.Rows[0]["Cat_ID"].ToString());
                 int Menu_ID = int.Parse(getVendorData.Rows[0]["Menu_ID"].ToString());
                 int Special = int.Parse(getVendorData.Rows[0]["Special"].ToString());
                 thumb_url = getVendorData.Rows[0]["Img"].ToString();



                 new DB().Admin_Items_Update(ID, txt_Title.Text, thumb_url, txt_msg.InnerText, Special, Cat_ID, UserId, Menu_ID);
               
                 txt_Title.Text = getVendorData.Rows[0]["Title"].ToString();
                 //lbl_vendorName.Text = getVendorData.Rows[0]["Title"].ToString();
                 txt_msg.InnerText = getVendorData.Rows[0]["Body"].ToString();
                 image_thumb.ImageUrl = getVendorData.Rows[0]["Img"].ToString();
                 lbl_error.Text = "Save Done";
               
             }
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }

    }


}