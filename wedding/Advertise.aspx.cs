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

public partial class ShowArticles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["ID"] != null)
            {
              
            }
            else
            { 
            
            }
        }
    }
   
    protected void LoginButton_Click1(object sender, EventArgs e)
    {
        try
        {
            SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
            var mail = new MailMessage();
            mail.From = new MailAddress("advertise@yourwedding-guide.com");
            mail.To.Add("info@yourwedding-guide.com");
            mail.CC.Add("yasser@blackandwhite-mag.com");

            mail.Subject = "New message from website sender name is: " + " " + txt_name.Text;
            mail.IsBodyHtml = true;
            string htmlBody;
            htmlBody = "<html><body><p style='direction:ltr;'><strong style='display:block;color:#fff;background:#393E40;padding:10px;width:400px'>Sender Information: </strong><br/><br/>" + "<b style='display:inline-block;width:150px'>Business name:</b> " + txt_businessName.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>Services:</b> " + txt_Services.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>Full name:</b> " + txt_name.Text + "<br/><br />" + "<b style='display:inline-block;width:150px'>Phone number:</b> " + txt_phone.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Address:</b> " + txt_Address.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Email address:</b> " + txt_mail.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Website:</b> " + txt_website.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Messages: </b> " + txt_message.Text + "</p></body></html>";
            mail.Body = htmlBody;
            SmtpServer.Port = 2525;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("advertise@yourwedding-guide.com", "advertise12345");
            SmtpServer.EnableSsl = false;
            SmtpServer.Send(mail);


            lbl_error.Text = "Message Send Successfully";
            lbl_error.ForeColor = System.Drawing.Color.Green;
           
            lbl_error.ForeColor = System.Drawing.Color.Green;
        }
        catch (Exception ex)
        {
            lbl_error.Text = ex.Message;
        }
    }
}