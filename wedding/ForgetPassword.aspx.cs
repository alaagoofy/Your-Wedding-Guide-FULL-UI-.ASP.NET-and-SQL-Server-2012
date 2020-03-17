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

public partial class ForgetPassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["ID"] != null)
        {
            DataTable checkUserId = new DB().getuserbyuserID(Request.QueryString["ID"]);
            if (checkUserId.Rows.Count == 0)
            {
                Response.Redirect("~/");
            }
            else
            {
                Panel1.Visible = false;
                Panel2.Visible = true;
            }
           
        }
        else
        {
            Panel1.Visible = true;
            Panel2.Visible = false;
        }

    }
    protected void Button1_Click(object sender, EventArgs e)
    {

        DataTable checkmail = new DB().getuserbyEmail(txt_name.Text);
        if (checkmail.Rows.Count == 0)
        {
            lbl_error.Text = "Email Address is not belong at here";
        }
        else
        {
           string UserId=checkmail.Rows[0]["UserId"].ToString();
           string url = string.Format("<a href='http://www.yourwedding-guide.com/ForgetPassword.aspx?ID={0}'>http://www.yourwedding-guide.com/ForgetPassword.aspx?ID={1}</a>", UserId,UserId);
            try
            {
                SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
                var mail = new MailMessage();
                mail.From = new MailAddress("do_not_reply@yourwedding-guide.com");
                mail.To.Add(txt_name.Text);


                mail.Subject = "Password token";
                mail.IsBodyHtml = true;
                string htmlBody;
                htmlBody = "<html><body><strong style='color:#000;font-size:25px'>Password token</strong><br/><br/><br/><p style='direction:ltr;'>" + "Hello, " + " <br /><br /> " + "Thank you for contacting us. Below you will find your Authorization Code  " + "<br/>" + "to Reset your password, click the link then enter your new Password." + "<br/>" +  url + "<br/><br/><br/>" + "Thanks" + "<br/><strong>Your Wedding guide Support Team</strong>" + "</p></body></html>";
                mail.Body = htmlBody;
                SmtpServer.Port = 2525;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("do_not_reply@yourwedding-guide.com", "do123456");
                SmtpServer.EnableSsl = false;
                SmtpServer.Send(mail);

                lbl_error.Text = "Please check your inbox or junk";
                lbl_error.ForeColor = System.Drawing.Color.Green;
                txt_name.Text = "";
            }
            catch (Exception ex)
            {

            }
        }

    }

    protected void Button2_Click(object sender, EventArgs e)
    {

        DataTable checkmail = new DB().getuserbyuserID(Request.QueryString["ID"]);
      string mail=checkmail.Rows[0]["Email"].ToString();
      new DB().changePassword(mail, txt_pass.Text);
      Label1.Text = "Password Changed successfully";
      txt_pass.Text = "";
      Label1.ForeColor = System.Drawing.Color.Green;

    }
}