using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net.Mail;

public partial class ShowImage : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        //Literal1.Text = string.Format(" <fb:share-button href='http://www.yourwedding-guide.com/ShowCategoryImage.aspx?ID={0}' type='button'></fb:share-button>", int.Parse(Request.QueryString["ID"]));
       
        HttpCookie getCookie = new HttpCookie("facebookID");
        getCookie = Request.Cookies["facebookID"];
       
            if (Request.QueryString["ID"] != null)
            {
                DataTable getImage = new DB().ADMIN_ImagesTable2_GetByID(int.Parse(Request.QueryString["ID"]));
                Image1.ImageUrl = getImage.Rows[0]["Img"].ToString();
                litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com/{0}'/>", getImage.Rows[0]["Img"].ToString());

                int Item_ID = int.Parse(getImage.Rows[0]["OutCategory_ID"].ToString());
                DataTable getTitle = new DB().ADMIN_OutCategory_GetByID(Item_ID);
                if (getTitle.Rows.Count == 0)
                {
                 
                    Image1.ImageUrl = getImage.Rows[0]["Img"].ToString();
                    litral_image.Text = string.Format("<meta property='og:image' content='http://www.yourwedding-guide.com/{0}'/>", getImage.Rows[0]["Img"].ToString());
                    int Item_ID2 = int.Parse(getImage.Rows[0]["OutCategorys_ID"].ToString());
                    DataTable getTitle2 = new DB().ADMIN_OutCategorys_GetByID(Item_ID2);

                    Label3.Text = getTitle2.Rows[0]["Title"].ToString();

                    Page.Title = getTitle2.Rows[0]["Title"].ToString();
                    litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getTitle2.Rows[0]["Title"].ToString());
                    litral_site_name.Text = string.Format("<meta property='og:site_nam' content='Your Wedding Guide, The Best Seller In The Middle East'/>");








                    DataTable getPrevRow = new DB().prevImage2(int.Parse(Request.QueryString["ID"]));
                    DataTable getNextRow = new DB().nextImage2(int.Parse(Request.QueryString["ID"]));
                    if (getPrevRow.Rows.Count == 0)
                    {

                        Prev.Text = string.Format("<a href='#photo' class='lb-prev'></a>");
                    }
                    else
                    {
                        int prevID = int.Parse(getPrevRow.Rows[0]["ID"].ToString());
                        Prev.Text = string.Format("<a href='ShowCategoryImage.aspx?ID={0}' class='lb-prev'></a>", prevID);
                    }


                    if (getNextRow.Rows.Count == 0)
                    {
                        Next.Text = string.Format("<a href='#photo' class='lb-next'></a>");

                    }
                    else
                    {
                        int nextID = int.Parse(getNextRow.Rows[0]["ID"].ToString());
                        Next.Text = string.Format("<a href='ShowCategoryImage.aspx?ID={0}' class='lb-next'></a>", nextID);
                    }
                }
                else
                {

                    Label3.Text = getTitle.Rows[0]["Title"].ToString();

                    Page.Title = getTitle.Rows[0]["Title"].ToString();
                    litral_title.Text = string.Format("<meta property='og:title' content='{0}'/>", getTitle.Rows[0]["Title"].ToString());
                    litral_site_name.Text = string.Format("<meta property='og:site_nam' content='Your Wedding Guide, The Best Seller In The Middle East'/>");


                    DataTable getPrevRow = new DB().prevImage2(int.Parse(Request.QueryString["ID"]));
                    DataTable getNextRow = new DB().nextImage2(int.Parse(Request.QueryString["ID"]));
                    if (getPrevRow.Rows.Count == 0)
                    {

                        Prev.Text = string.Format("<a href='#photo' class='lb-prev'></a>");
                    }
                    else
                    {
                        int prevID = int.Parse(getPrevRow.Rows[0]["ID"].ToString());
                        Prev.Text = string.Format("<a href='ShowCategoryImage.aspx?ID={0}' class='lb-prev'></a>", prevID);
                    }


                    if (getNextRow.Rows.Count == 0)
                    {
                        Next.Text = string.Format("<a href='#photo' class='lb-next'></a>");

                    }
                    else
                    {
                        int nextID = int.Parse(getNextRow.Rows[0]["ID"].ToString());
                        Next.Text = string.Format("<a href='ShowCategoryImage.aspx?ID={0}' class='lb-next'></a>", nextID);
                    }

                }


               
               
              
           
            }
            
            else
            {
                Response.Redirect("~/");
            }
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


        // Read the cookie information and display it.
            else if (getCookie != null)
            {
                //Response.Write("<p>" + getCookie.Name + "<p>" + getCookie.Value);

                string facebookID = getCookie.Value;
                DivFavorite.Visible = true;


                DataTable addFbUser = new DB().Admin_FBUsers_GetByID(facebookID);
                string UserId = addFbUser.Rows[0]["UserId"].ToString();



                DataTable getFavTable = new DB().Admin_Favorite_GetByUserId(UserId);

                int total = getFavTable.Rows.Count;
                getFav.InnerHtml = total + " Items";
            }
        
           

       
    }
 

   
    protected void LinkButton1_Click2(object sender, EventArgs e)
    {
        DataTable getImage = new DB().ADMIN_ImagesTable_GetByID(int.Parse(Request.QueryString["ID"]));
      

        DataTable getTitle = new DB().ADMIN_Items_GetByID(int.Parse(getImage.Rows[0]["Item_ID"].ToString()));
        int Item_ID = int.Parse(getImage.Rows[0]["Item_ID"].ToString());

        DataTable getHead = new DB().ADMIN_Items_GetByID(Item_ID);
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
        DataTable getImage = new DB().ADMIN_ImagesTable2_GetByID(int.Parse(Request.QueryString["ID"]));
      
           int Item_ID = int.Parse(getImage.Rows[0]["OutCategory_ID"].ToString());
                DataTable getTitle = new DB().ADMIN_OutCategory_GetByID(Item_ID);
                if (getTitle.Rows.Count == 0)
                {
                    int Item_ID2 = int.Parse(getImage.Rows[0]["OutCategorys_ID"].ToString());
                    DataTable getTitle2 = new DB().ADMIN_OutCategorys_GetByID(Item_ID2);
                    string link = string.Format("ShowOutCategories.aspx?ID2={0}", Item_ID2);
                    Response.Redirect(link);

                }
                else
                {
                    string link = string.Format("ShowOutCategories.aspx?ID={0}", Item_ID);
                    Response.Redirect(link);
                }
      
        
       
    }
   
}