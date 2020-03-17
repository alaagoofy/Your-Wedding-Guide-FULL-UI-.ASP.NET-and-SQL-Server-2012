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
 
    public void clear()
    {
        txt_Address.Text = "";
        txt_college.Text = "";
        txt_company.Text = "";
        txt_Email.Text = "";
        txt_fromCompany.Text = "";
        txt_fromUni.Text = "";
        txt_highFrom.Text = "";
        txt_highSchool.Text = "";
        txt_highto.Text = "";
        txt_jobTitle.Text = "";
        txt_major.Text = "";
        txt_name.Text = "";
        txt_phone.Text = "";
        txt_Position.Text = "";
        txt_toCompany.Text = "";
        txt_ToUni.Text = "";
        txt_University.Text = "";
       




    }
    protected void LoginButton_Click1(object sender, EventArgs e)
    {
        try
        {
            string birthday = null;
            string gender = null;
            string work = null;
            string car = null;


            if (drop_days.SelectedItem.Text == "Day" || Drop_Month.SelectedItem.Text == "Month" || Drop_years.SelectedItem.Text == "Year")
            {
                lbl_error.Text = "Please Choose Your Birthday";
            }
            else
            {
                if (CV.HasFile)
                {
                    string fileExt = System.IO.Path.GetExtension(CV.FileName);

                    if (fileExt == ".jpeg" || fileExt == ".jpg")
                    {
                        birthday = drop_days.SelectedItem + " / " + Drop_Month.SelectedItem + " / " + Drop_years.SelectedItem;
                        gender = drop_gender.SelectedItem.Text;
                        work = drop_work.SelectedItem.Text;
                        car = drop_car.SelectedItem.Text;

                        SmtpClient SmtpServer = new SmtpClient("mail.yourwedding-guide.com");
                        var mail = new MailMessage();
                        mail.From = new MailAddress("career@yourwedding-guide.com");
                        mail.To.Add("info@yourwedding-guide.com");
                        mail.CC.Add("yasser@blackandwhite-mag.com");
                        mail.Bcc.Add("alaa87_ma@hotmail.com");
                        mail.Subject = "New message from website sender name is: " + " " + txt_name.Text;
                        mail.IsBodyHtml = true;
                        string htmlBody;
                        htmlBody = "<html><body><p style='direction:ltr;'><strong style='display:block;color:#fff;background:#393E40;padding:10px;width:400px'>Applicant Information: </strong><br/><br/>" + "<b style='display:inline-block;width:150px'>Position applied for:</b> " + txt_Position.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>Full Name:</b> " + txt_name.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>Address:</b> " + txt_Address.Text + "<br/><br />" + "<b style='display:inline-block;width:150px'>Email:</b> " + txt_Email.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Phone:</b> " + txt_phone.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Date Of Birth:</b> " + birthday + "<br /><br />" + "<b style='display:inline-block;width:150px'>Gender:</b> " + gender + "<br /><br />" + "<b style='display:inline-block;width:150px'>Do you work now?</b> " + work + "<br /><br />" + "<b style='display:inline-block;width:150px'>Do you own a car?</b> " + car + "</p>";

                        htmlBody += "<p style='direction:ltr;'><br/><br/><strong style='display:block;color:#fff;background:#393E40;padding:10px;width:400px'>Education: </strong><br/><br/>" + "<b style='display:inline-block;width:150px'>High School:</b> " + txt_highSchool.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>From:</b> " + txt_highFrom.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>To:</b> " + txt_highto.Text + "<br/><br />" + "<b style='display:inline-block;width:150px'>College:</b> " + txt_college.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>Major:</b> " + txt_major.Text + "<br /><br />" + "<b style='display:inline-block;width:150px'>University:</b> " + txt_University.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>From:</b> " + txt_fromUni.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>To:</b> " + txt_ToUni.Text + "</p>";

                        htmlBody += "<p style='direction:ltr;'><br/><br/><strong style='display:block;color:#fff;background:#393E40;padding:10px;width:400px'>Previous Employment: </strong><br/><br/>" + "<b style='display:inline-block;width:150px'>Company:</b> " + txt_company.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>Job Title:</b> " + txt_jobTitle.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>From:</b> " + txt_fromCompany.Text + " <br /><br /> " + "<b style='display:inline-block;width:150px'>To:</b> " + txt_toCompany.Text + "</p></body></html>";
                        if (CV.PostedFile != null && CV.PostedFile.ContentLength > 0)
                        {
                            //Build an array with the file path, so we can get the file name later.
                            string[] strAttachname = CV.PostedFile.FileName.Split('\\');

                            //Create a new attachment object from the posted data and the file name
                            Attachment mailAttach = new Attachment(
                               CV.PostedFile.InputStream,  //Data posted from form
                               strAttachname[strAttachname.Length - 1] //Filename (from end of our array)
                            );

                            //Add the attachment to our mail object
                            mail.Attachments.Add(mailAttach);
                        }


                        mail.Body = htmlBody;
                        SmtpServer.Port = 2525;
                        SmtpServer.UseDefaultCredentials = false;
                        SmtpServer.Credentials = new System.Net.NetworkCredential("career@yourwedding-guide.com", "career12345");
                        SmtpServer.EnableSsl = false;
                        SmtpServer.Send(mail);

                        lbl_error.Text = "Message Send Successfully";
                        lbl_error.ForeColor = System.Drawing.Color.Green;

                        lbl_error.ForeColor = System.Drawing.Color.Green;
                        clear();
                    }
                    else
                    {
                        lbl_error.Text = "Please Upload Your Personal Photo";
                    }

                   
                }
                else
                {
                    lbl_error.Text = "Please Upload Your Personal Photo";
                }
               
            }

         
        }
        catch (Exception ex)
        {

            lbl_error.Text = ex.Message;
        }
    }
}