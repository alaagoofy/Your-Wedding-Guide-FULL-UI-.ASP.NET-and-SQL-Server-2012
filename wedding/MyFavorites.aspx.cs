using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class MyFavorites : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            HttpCookie getCookie = new HttpCookie("facebookID");
            getCookie = Request.Cookies["facebookID"];

            if (User.Identity.IsAuthenticated)
            {

                DataTable getuserID = new DB().getUserInfoByName(User.Identity.Name);
                string UserId=getuserID.Rows[0]["UserId"].ToString();
            

                DataTable getImages = new DB().Admin_Favorite_GetByUserId(UserId);
               
                Repeater1.DataSource = getImages;
                Repeater1.DataBind();


                if (getImages.Rows.Count == 0)
                {
                    Label1.Text = User.Identity.Name + " Sorry You Don't Have any Items";
                }
                else
                {
                    Label1.Text = User.Identity.Name + " Welcome In Your Favorites Page";
                }
                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);
             
                int total = getFavTable.Rows.Count ;
                getFav.InnerHtml = total + " Items";
                
             

            }
            else if (getCookie != null)
            {

                string facebookID = getCookie.Value;
                DataTable getImages = new DB().Admin_Favorite_GetByUserId(facebookID);
                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                string Username=addFbUser.Rows[0]["Name"].ToString();


                Repeater1.DataSource = getImages;
                Repeater1.DataBind();


                if (getImages.Rows.Count == 0)
                {
                    Label1.Text = Username + " Sorry You Don't Have any Items";
                }
                else
                {
                    Label1.Text = Username + " Welcome In Your Favorites Page";
                }
               

                int total = getImages.Rows.Count;
                getFav.InnerHtml = total + " Items";
                
             
                
            }
            else
            {
                Response.Redirect("~/");
            }
        }

    }

  

    protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {


       

    }

    protected void Repeater1_OnItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "Delete")
        {
            RepeaterItem ri = e.Item;
            Label lbl_msgFav = (Label)ri.FindControl("lbl_msgFav");

           


                int fileid = int.Parse(e.CommandArgument.ToString());
                DataTable getID = new DB().ADMIN_Favorite_GetByID(fileid);
                int id = int.Parse(getID.Rows[0]["ID"].ToString());

                    new DB().ADMIN_Favorite_Delete(id);
                    Response.Redirect(Request.RawUrl);
              
               
           
        }

    }
}