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

public partial class Account_Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        RegisterUser.ContinueDestinationPageUrl = Request.QueryString["ReturnUrl"];
     
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
       
        string link = string.Format("https://graph.facebook.com/oauth/authorize?client_id=582400268443552&redirect_uri=http://yourwedding-guide.com/Default.aspx&scope=offline_access,email,publish_stream");
        Response.Redirect(link);
    }
    protected void RegisterUser_CreatedUser(object sender, EventArgs e)
    {
        FormsAuthentication.SetAuthCookie(RegisterUser.UserName, false /* createPersistentCookie */);

        string continueUrl = RegisterUser.ContinueDestinationPageUrl;
        if (String.IsNullOrEmpty(continueUrl))
        {
            string UserId = Membership.GetUser(RegisterUser.UserName).ProviderUserKey.ToString();

            string UserName = Membership.GetUser(RegisterUser.UserName).ToString();


          
            TextBox txt_mobile = RegisterUser.CreateUserStep.ContentTemplateContainer.FindControl("txt_mobile") as TextBox;
            TextBox txt_address = RegisterUser.CreateUserStep.ContentTemplateContainer.FindControl("txt_address") as TextBox;
            TextBox Email = RegisterUser.CreateUserStep.ContentTemplateContainer.FindControl("Email") as TextBox;
            TextBox Password = RegisterUser.CreateUserStep.ContentTemplateContainer.FindControl("Password") as TextBox;
          
            Label Error = RegisterUser.CreateUserStep.ContentTemplateContainer.FindControl("Error") as Label;
          

          

            new DB().UpdateRegister(UserId, "", txt_mobile.Text, txt_address.Text,"");





            try
            {
                SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
                var mail = new MailMessage();
                mail.From = new MailAddress("do_not_reply@yourwedding-guide.com");
                mail.To.Add(Email.Text);
                

                mail.Subject = "Registration Successful";
                mail.IsBodyHtml = true;
                string htmlBody;
                htmlBody = "<html><body><strong style='color:#000;font-size:25px'>Registration Successful</strong><br/><br/><br/><p style='direction:ltr;'>" + "Dear " + UserName + " <br /><br /> " + "Thank you for registering, we’re really pleased you’ve joined us." + "<br/>" + "Here’s your login information which you’ll need whenever you want to go online with Your Wedding Guide, " + "<br/>" + "Username: " + UserName + "<br/>" + "Password: " + Password.Text + "<br/><br/><br/>" + "Thanks" + "<br/><strong>Your Wedding guide Team</strong>" + "</p></body></html>";
                mail.Body = htmlBody;
                SmtpServer.Port = 2525;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("do_not_reply@yourwedding-guide.com", "do123456");
                SmtpServer.EnableSsl = false;
                SmtpServer.Send(mail);


             
            }
            catch (Exception ex)
            {
               
            }




            continueUrl = "~/";
        }
        Response.Redirect(continueUrl);
    }
}
