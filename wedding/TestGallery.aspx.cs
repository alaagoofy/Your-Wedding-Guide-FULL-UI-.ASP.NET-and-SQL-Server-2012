using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class TestGallery : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpCookie getCookie = new HttpCookie("facebookID");
        getCookie = Request.Cookies["facebookID"];
        if (Request.QueryString["ID"] != null)
        {
            DataTable tablecheck = new DB().Admin_ImagesTable_GetByItem_ID(int.Parse(Request.QueryString["ID"]));


            scribtss.Text = scribt(tablecheck.Rows.Count);

            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString);
            SqlCommand myCMD = new SqlCommand("Admin_ImagesTable_GetByItem_ID", con);
            myCMD.CommandType = CommandType.StoredProcedure;
            myCMD.Parameters.AddWithValue("@Item_ID", Request.QueryString["ID"]);
            con.Open();
            SqlDataReader myReader = myCMD.ExecuteReader();
            int number = 1;
            while (myReader.Read())
            {
                int ID = myReader.GetInt32(0);    // Weight int
                string Img = myReader.GetString(1);
                int Item_ID = myReader.GetInt32(2);


                lists.InnerHtml += string.Format(" <li id='carousel-slideshow-item-{0}'><a href='TestGallery.aspx?ID2={1}#historysub'><img id='Img1' src='{2}' runat='server' alt='' /></a></li>", number++, ID, Img);



            }
            myReader.Close();
            con.Close();
            //Repeater1.DataSource = tablecheck;
            //Repeater1.DataBind();

            Image1.ImageUrl = tablecheck.Rows[0]["Img"].ToString();
           

            DataTable getHead = new DB().ADMIN_Items_GetByID(int.Parse(Request.QueryString["ID"]));
            int getCat;
            if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
            {
                getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
                DataTable table = new DB().ADMIN_Category_GetByID(getCat);
                Label3.Text = table.Rows[0]["Title"].ToString() + " > ";
                Literal1.Text = getHead.Rows[0]["Body"].ToString();
            }
            else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
            {
                getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
                DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
                Label3.Text = table.Rows[0]["Title"].ToString() + " > ";
                Literal1.Text = getHead.Rows[0]["Body"].ToString();

            }



            Label11.Text = getHead.Rows[0]["Title"].ToString();

            Page.Title = getHead.Rows[0]["Title"].ToString();
            //litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getHead.Rows[0]["Title"].ToString());
            //litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}'/>", getHead.Rows[0]["Img"].ToString());
            //litral_site_name.Text = string.Format("<meta property='og:site_nam' content='Your Wedding Guide, The Best Seller In The Middle East'/>");

          


            DataTable getVideos = new DB().Admin_Videos_GetByItem_ID(int.Parse(Request.QueryString["ID"]));
            if (getVideos.Rows.Count == 0)
            {
                Panal_Videos.Visible = false;

            }
            repeater_videos.DataSource = getVideos;
            repeater_videos.DataBind();





            DivFavorite.Visible = false;

            if (User.Identity.IsAuthenticated)
            {
                DivFavorite.Visible = true;
                DataTable getUserId = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
                string UserId = getUserId.Rows[0]["UserId"].ToString();


                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                int total = getFavTable.Rows.Count;
                getFav.InnerHtml = total + " Items";
            }
            else if (getCookie != null)
            {
                string facebookID = getCookie.Value;
                DivFavorite.Visible = true;

                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                string UserId = addFbUser.Rows[0]["UserId"].ToString();

                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                int total = getFavTable.Rows.Count;
                getFav.InnerHtml = total + " Items";
            }

        }
        else if (Request.QueryString["ID2"] != null)
        {

            DataTable getImage = new DB().ADMIN_ImagesTable_GetByID(int.Parse(Request.QueryString["ID2"]));
            Image1.ImageUrl=getImage.Rows[0]["Img"].ToString();

            int Item_ID=int.Parse(getImage.Rows[0]["Item_ID"].ToString());

            DataTable tablecheck = new DB().Admin_ImagesTable_GetByItem_ID(Item_ID);
            scribtss.Text = scribt(tablecheck.Rows.Count);

            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString);
            SqlCommand myCMD = new SqlCommand("Admin_ImagesTable_GetByItem_ID", con);
            myCMD.CommandType = CommandType.StoredProcedure;
            myCMD.Parameters.AddWithValue("@Item_ID", Item_ID);
            con.Open();
            SqlDataReader myReader = myCMD.ExecuteReader();
            int number = 1;
            while (myReader.Read())
            {
                int ID = myReader.GetInt32(0);    // Weight int
                string Img = myReader.GetString(1);
                int Item_IDs = myReader.GetInt32(2);


                lists.InnerHtml += string.Format(" <li id='carousel-slideshow-item-{0}'><a href='TestGallery.aspx?ID2={1}#historysub'><img id='Img1' src='{2}' runat='server' alt='' /></a></li>", number++, ID, Img);



            }
            myReader.Close();
            con.Close();

            DataTable getHead = new DB().ADMIN_Items_GetByID(Item_ID);
            int getCat;
            if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
            {
                getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
                DataTable table = new DB().ADMIN_Category_GetByID(getCat);
                Label3.Text = table.Rows[0]["Title"].ToString() + " > ";
                Literal1.Text = getHead.Rows[0]["Body"].ToString();
            }
            else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
            {
                getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
                DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
                Label3.Text = table.Rows[0]["Title"].ToString() + " > ";
                Literal1.Text = getHead.Rows[0]["Body"].ToString();

            }



            Label11.Text = getHead.Rows[0]["Title"].ToString();

            Page.Title = getHead.Rows[0]["Title"].ToString();
            //litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getHead.Rows[0]["Title"].ToString());
            //litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com{0}'/>", getHead.Rows[0]["Img"].ToString());
            //litral_site_name.Text = string.Format("<meta property='og:site_nam' content='Your Wedding Guide, The Best Seller In The Middle East'/>");




            DataTable getVideos = new DB().Admin_Videos_GetByItem_ID(Item_ID);
            if (getVideos.Rows.Count == 0)
            {
                Panal_Videos.Visible = false;

            }
            repeater_videos.DataSource = getVideos;
            repeater_videos.DataBind();





            DivFavorite.Visible = false;

            if (User.Identity.IsAuthenticated)
            {
                DivFavorite.Visible = true;
                DataTable getUserId = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
                string UserId = getUserId.Rows[0]["UserId"].ToString();


                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                int total = getFavTable.Rows.Count;
                getFav.InnerHtml = total + " Items";
            }
            else if (getCookie != null)
            {
                string facebookID = getCookie.Value;
                DivFavorite.Visible = true;

                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                string UserId = addFbUser.Rows[0]["UserId"].ToString();

                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                int total = getFavTable.Rows.Count;
                getFav.InnerHtml = total + " Items";
            }
        }

        else
        {
            Response.Redirect("~/TestGallery.aspx?ID=2");
        }








    }


    protected void LinkButton1_Click(object sender, EventArgs e)
    {


        DataTable getID = new DB().ADMIN_ImagesTable_GetByID(int.Parse(Request.QueryString["ID"]));
        int id = int.Parse(getID.Rows[0]["ID"].ToString());

        HttpCookie getCookie = new HttpCookie("facebookID");
        getCookie = Request.Cookies["facebookID"];



        if (User.Identity.IsAuthenticated)
        {

            DataTable getUserId = new DB().getUserInfoByName(User.Identity.Name);
            string UserId = getUserId.Rows[0]["UserId"].ToString();

            DataTable check = new DB().Admin_Favorite_GetByUserIdandID(id, UserId);
            if (check.Rows.Count == 0)
            {
                new DB().Admin_Favorite_Insert(id, UserId);
                lbl_msgFav.Text = "Image Add Successful To Your Favorites";
            }
            else
            {
                lbl_msgFav.Text = "Image Already In Your Favorites";
            }
        }
        else if (getCookie != null)
        {
            string facebookID = getCookie.Value;
            DataTable check = new DB().Admin_Favorite_GetByUserIdandID(id, facebookID);
            if (check.Rows.Count == 0)
            {
                new DB().Admin_Favorite_Insert(id, facebookID);
                lbl_msgFav.Text = "Image Add Successful To Your Favorites";
            }
            else
            {
                lbl_msgFav.Text = "Image Already In Your Favorites";
            }

        }
        else
        {
            lbl_msgFav.Text = "You Must Login To Do This Action";
        }

    }
    protected void LinkButton1_Click2(object sender, EventArgs e)
    {
        DataTable getHead = new DB().ADMIN_Items_GetByID(int.Parse(Request.QueryString["ID"]));
        int getCat;
        if (getHead.Rows[0]["Cat_ID"].ToString() == "0")
        {
            getCat = int.Parse(getHead.Rows[0]["Menu_ID"].ToString());
            DataTable table = new DB().ADMIN_Category_GetByID(getCat);
            string pageurl = string.Format("Category.aspx?ID2={0}", table.Rows[0]["ID"].ToString());
            Response.Redirect(pageurl);
        }
        else if (getHead.Rows[0]["Menu_ID"].ToString() == "0")
        {
            getCat = int.Parse(getHead.Rows[0]["Cat_ID"].ToString());
            DataTable table = new DB().ADMIN_Categorys_GetByID(getCat);
            string pageurl = string.Format("Category.aspx?ID={0}", table.Rows[0]["ID"].ToString());
            Response.Redirect(pageurl);

        }
    }
    protected void LinkButton3_Click(object sender, EventArgs e)
    {
        DataTable getImage = new DB().ADMIN_ImagesTable_GetByID(int.Parse(Request.QueryString["ID"]));


        DataTable getTitle = new DB().ADMIN_Items_GetByID(int.Parse(getImage.Rows[0]["Item_ID"].ToString()));
        int Item_ID = int.Parse(getImage.Rows[0]["Item_ID"].ToString());
        string link = string.Format("ShowCategory.aspx?ID={0}", Item_ID);
        Response.Redirect(link);
    }



    public string scribt(int number)
    {

        string scribt = "<script type='text/javascript'> \n";
        scribt += " var media_carousel_slideshow_loadHandler = function (type, args) { \n";
        scribt += "   var start = args[0]; \n";
        scribt += "    var last = args[1];\n";

        scribt += "   for (var i = start; i <= last; i++) {\n";
        scribt += "      YAHOO.util.Dom.get(carouselId + '-item-' + i).className = nonSpotlightCssName;\n";
        scribt += "    YAHOO.util.Event.addListener(carouselId + '-item-' + i, 'click', function (evt) {\n";
        scribt += "        for (var i = start; i <= last; i++) {\n";
        scribt += "     YAHOO.util.Dom.get(carouselId + '-item-' + i).className = nonSpotlightCssName;\n";
        scribt += "         }\n";
        scribt += "     media_carousel_slideshow.scrollTo(this.index);\n";
        scribt += "     YAHOO.util.Dom.get(carouselId + '-item-' + this.index).className = spotlightCssName;\n";
        scribt += "  }, { carousel: carouselId, index: i }, true);\n";
        scribt += "  }\n";
        scribt += " }\n";
        scribt += "   var media_carousel_slideshow = new YAHOO.extension.Carousel('carousel-slideshow',\n";
        scribt += "   {\n";
        scribt += "    numVisible: 8,\n";
        scribt += "   animationSpeed: 0.25,\n";
        scribt += " scrollInc: 1,\n";
        scribt += "    navMargin: 25,\n";
        scribt += string.Format("     size: {0},\n", number);
        scribt += "   prevElement: 'prev-arrow',\n";
        scribt += "      nextElement: 'next-arrow',\n";


        scribt += "    prevButtonStateHandler: function (type, args) {\n";
        scribt += "        var enabling = args[0];\n";
        scribt += "     var leftImage = args[1];\n";
        scribt += "       if (enabling)\n";
              scribt += "       leftImage.src = 'images/left-enabled.gif';\n";
              scribt+="       else";
              scribt += "     leftImage.src = 'images/left-disabled.gif';\n";
              scribt += "    },\n";
              scribt += "    nextButtonStateHandler: function (type, args) {\n";
              scribt += "      var enabling = args[0];\n";
              scribt += "    var rightImage = args[1];\n";
              scribt += "   if (enabling)\n";
              scribt += "    rightImage.src = 'images/right-enabled.gif';\n";
              scribt += "   else\n";
              scribt += "    rightImage.src = 'images/right-disabled.gif';\n";
              scribt += "  }\n";
              scribt += "   });\n";
          scribt+="   </script>";
          return scribt;


    }
}