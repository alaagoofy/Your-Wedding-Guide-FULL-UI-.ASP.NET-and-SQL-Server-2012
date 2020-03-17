using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

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
            new DB().Admin_NewsLetter_Insert(txt_name.Text, txt_email.Text);
            Label1.Text = "Thank You";
            Label1.ForeColor = System.Drawing.Color.Green;
            txt_email.Text = "";
            txt_name.Text = "";
        }
        catch (Exception ex)
        {

            Label1.Text = ex.Message;
        }
       
    }
}