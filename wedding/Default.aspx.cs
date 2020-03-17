using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Configuration;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using System.Web.Security;


public partial class _Default : System.Web.UI.Page
{
    static int IDArticels;
    static int IDArticels22;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            DataTable getVendors = new DB().Admin_Items_GetBySpecialHomePage(1);
            Repeater1.DataSource = getVendors;
            Repeater1.DataBind();


            //DataTable getVendors2 = new DB().ADMIN_Items_GetBySpecial(0);
            //repeater_222.DataSource = getVendors2;
            //repeater_222.DataBind();

            DataTable getArticles = new DB().Admin_Articles_GetHomePage(1);
            repeater_articles.DataSource = getArticles;
            repeater_articles.DataBind();


          


            DataTable getoutCategoy = new DB().ADMIN_OutCategory_GetByLaung(1);
            repeater_outCategory.DataSource = getoutCategoy;
            repeater_outCategory.DataBind();



            DataTable getArticles2 = new DB().Admin_Articles_GetHomePage(1);

            lbl_title.Text = getArticles2.Rows[0]["Title"].ToString();
            lbl_articles1.Text = getArticles2.Rows[0]["Des"].ToString();
            img_articles1.ImageUrl = getArticles2.Rows[0]["Img"].ToString();
            IDArticels = int.Parse(getArticles2.Rows[0]["ID"].ToString());


            DataTable getArticles22 = new DB().Admin_Articles_GetByLaung(1);

            lbl_title2.Text = getArticles22.Rows[0]["Title"].ToString();
            lbl_articles2.Text = getArticles22.Rows[0]["Des"].ToString();
            img_articles2.ImageUrl = getArticles22.Rows[0]["Img"].ToString();
            IDArticels22 = int.Parse(getArticles22.Rows[0]["ID"].ToString());



            DataTable getNews = new DB().Admin_News_GetHomePage(0);
            repeater_news.DataSource = getNews;
            repeater_news.DataBind();

            //DataTable getCategories = new DB().Admin_ImagesTable2_GetByCat_IDHome();
            //repeater_categories.DataSource = getCategories;
            //repeater_categories.DataBind();

            DataTable getCategoriesName = new DB().Admin_OutCategorys_GetHome(0);
            repeaterCategoriesnames.DataSource = getCategoriesName;
            repeaterCategoriesnames.DataBind();

            DataTable getVideos = new DB().Admin_OutVideos_GetHomePage();
            repeater_Videos.DataSource = getVideos;
            repeater_Videos.DataBind();
          
            Panel2.Visible = false;

           
        


            if (Request.Cookies["subscripe"] != null )
            {
                Panel1.Visible = false;

            }
            else
            {
                Panel1.Visible = true;
            }
       
        }
      
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        string showart = string.Format("ShowArticles.aspx?ID={0}",IDArticels);
        Response.Redirect(showart);
    }

    protected void LinkButton1_Click2(object sender, EventArgs e)
    {
        string showart = string.Format("ShowArticles.aspx?ID={0}", IDArticels22);
        Response.Redirect(showart);
    }


    protected void Repeater3_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        //Repeater repeat_NewOffer = (Repeater)e.Item.FindControl("Repeater1");

        RepeaterItem ri = e.Item;

        Label Label1 = (Label)ri.FindControl("Label1");

        if (((Literal)e.Item.FindControl("Literal1")).Text.Length > 35)
        {
            ((Literal)e.Item.FindControl("Literal1")).Text = ((Literal)e.Item.FindControl("Literal1")).Text.Substring(0, 35);
        }
    }
    public bool IsValid(string emailaddress)
    {
       
            MailAddress m = new MailAddress(emailaddress);
            return true;
       
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        try
        {
            string gender = null;
            IsValid(txt_emailNews.Text);
            if (IsValid(txt_emailNews.Text) == true)
            {
                if (DropDownList1.SelectedItem.Text == "Gender")
                {
                    lbl_error.InnerText = "Please select your gender";
                }
                else
                {
                    gender = DropDownList1.SelectedItem.Text;
                    DataTable checkMails = new DB().Admin_NewsLetter_GetBymail(txt_emailNews.Text);
                    if (checkMails.Rows.Count == 0)
                    {
                        string Phone = txt_phoneNews.Text;
                        if (Phone == null || Phone == "")
                        {

                            new DB().Admin_NewsLetter_Insert(txt_nameNews.Text, txt_emailNews.Text, "", gender, txt_CityNews.Text);
                            lbl_error.InnerText = "Thank you for Subscribe in your wedding guide";
                            

                            try
                            {
                                SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
                                var mail = new MailMessage();
                                mail.From = new MailAddress("do_not_reply@yourwedding-guide.com");
                                mail.To.Add(txt_emailNews.Text);


                                mail.Subject = "Subscription Successful";
                                mail.IsBodyHtml = true;
                                string htmlBody;
                                htmlBody = "<html><body><strong style='color:#000;font-size:25px'>Subscription Successful</strong><br/><br/><br/><p style='direction:ltr;'>" + "Dear " + txt_nameNews.Text + " <br /><br /> " + "Thank you for subscribe to our newsletter, we’re really pleased you’ve joined us." + "<br/>" + "Wait for our latest news and offers." +  "<br/><br/><br/>" + "Thanks" + "<br/><strong>Your Wedding guide Team</strong>" + "</p></body></html>";
                                mail.Body = htmlBody;
                                SmtpServer.Port = 2525;
                                SmtpServer.UseDefaultCredentials = false;
                                SmtpServer.Credentials = new System.Net.NetworkCredential("do_not_reply@yourwedding-guide.com", "do123456");
                                SmtpServer.EnableSsl = false;
                                SmtpServer.Send(mail);



                            }
                            catch (Exception ex)
                            {
                                lbl_error.InnerText = ex.Message;
                            }

                            HttpCookie myCookie = new HttpCookie("subscripe");
                            DateTime now = DateTime.Now;

                            // Set the cookie value.
                            myCookie.Value = txt_emailNews.Text;
                            // Set the cookie expiration date.
                            myCookie.Expires = now.AddYears(50); // For a cookie to effectively never expire

                            // Add the cookie.
                            Response.Cookies.Add(myCookie);



                            txt_nameNews.Text = "";
                            txt_emailNews.Text = "";
                            txt_phoneNews.Text = "";
                            txt_CityNews.Text = "";
                            Panel1.Visible = false;
                            Panel2.Visible = true;

                        }
                        else
                        {
                            new DB().Admin_NewsLetter_Insert(txt_nameNews.Text, txt_emailNews.Text, txt_phoneNews.Text, gender, txt_CityNews.Text);
                            lbl_error.InnerText = "Thank you for Subscribe in your wedding guide";
                            
                            try
                            {
                                SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
                                var mail = new MailMessage();
                                mail.From = new MailAddress("do_not_reply@yourwedding-guide.com");
                                mail.To.Add(txt_emailNews.Text);


                                mail.Subject = "Subscription Successful";
                                mail.IsBodyHtml = true;
                                string htmlBody;
                                htmlBody = "<html><body><strong style='color:#000;font-size:25px'>Subscription Successful</strong><br/><br/><br/><p style='direction:ltr;'>" + "Dear " + txt_nameNews.Text + " <br /><br /> " + "Thank you for subscribe to our newsletter, we’re really pleased you’ve joined us." + "<br/>" + "Wait for our latest news and offers." + "<br/><br/><br/>" + "Thanks" + "<br/><strong>Your Wedding guide Team</strong>" + "</p></body></html>";
                                mail.Body = htmlBody;
                                SmtpServer.Port = 2525;
                                SmtpServer.UseDefaultCredentials = false;
                                SmtpServer.Credentials = new System.Net.NetworkCredential("do_not_reply@yourwedding-guide.com", "do123456");
                                SmtpServer.EnableSsl = false;
                                SmtpServer.Send(mail);



                            }
                            catch (Exception ex)
                            {
                                lbl_error.InnerText = ex.Message;
                            }

                            HttpCookie myCookie = new HttpCookie("subscripe");
                            DateTime now = DateTime.Now;

                            // Set the cookie value.
                            myCookie.Value = txt_emailNews.Text;
                            // Set the cookie expiration date.
                            myCookie.Expires = now.AddYears(50); // For a cookie to effectively never expire

                            // Add the cookie.
                            Response.Cookies.Add(myCookie);


                            txt_nameNews.Text = "";
                            txt_emailNews.Text = "";
                            txt_phoneNews.Text = "";
                            txt_CityNews.Text = "";
                            Panel1.Visible = false;
                            Panel2.Visible = true;
                        }
                    }
                    else
                    {
                        lbl_error.InnerText = "Your Email is Already Subscribed";
                    }



                }
            }




            else
            {
                lbl_error.InnerText = "Wrong Email Address";
            }

        }
        catch (Exception)
        {

            lbl_error.InnerText = "ERROR";
        }
       
    }

}
