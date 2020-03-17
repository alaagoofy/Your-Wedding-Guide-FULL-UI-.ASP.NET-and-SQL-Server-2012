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
       
    }
    protected void LoginButton_Click1(object sender, EventArgs e)
    {
  
        try
        {
            SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
            var mail = new MailMessage();
            mail.From = new MailAddress("contact@yourwedding-guide.com");
            mail.To.Add("info@yourwedding-guide.com");
            mail.CC.Add("yasser@blackandwhite-mag.com");

            mail.Subject = "New message from website sender name is: " + " " + txt_name.Text;
            mail.IsBodyHtml = true;
            string htmlBody;
            htmlBody = "<html><body><p style='direction:ltr;'><strong style='color:Red'>Sender information.</strong><br/><br/>" + "Name: " + txt_name.Text + " <br /> " + "Email: " + txt_email.Text + " <br /> " + "Address: " + txt_address.Text + "<br/>" + "Phone: " + txt_phone.Text + "<br />" + "Message: " + txt_message.Text + "</p></body></html>";
            mail.Body = htmlBody;
            SmtpServer.Port = 2525;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("contact@yourwedding-guide.com", "contact12345");
            SmtpServer.EnableSsl = false;
            SmtpServer.Send(mail);

            lbl_error.Text = "Message Send Successfully";
            lbl_error.ForeColor = System.Drawing.Color.Green;
            txt_name.Text = "";
            txt_address.Text = "";
            txt_email.Text = "";
            txt_phone.Text = "";
            lbl_error.ForeColor = System.Drawing.Color.Green;
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }
    
    }
}