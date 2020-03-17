using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class uploadTest : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
   
    protected void Button1_Click1(object sender, EventArgs e)
    {
        HttpCookie myCookie = new HttpCookie("MyTestCookie");
        DateTime now = DateTime.Now;

        // Set the cookie value.
        myCookie.Value = TextBox1.Text;
        // Set the cookie expiration date.
        myCookie.Expires = now.AddYears(50); // For a cookie to effectively never expire

        // Add the cookie.
        Response.Cookies.Add(myCookie);

        Response.Write("<p> The cookie has been written.");
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        HttpCookie myCookie = new HttpCookie("MyTestCookie");
        myCookie = Request.Cookies["MyTestCookie"];

        // Read the cookie information and display it.
        if (myCookie != null)
            Response.Write("<p>" + myCookie.Name + "<p>" + myCookie.Value);
        else
            Response.Write("not found");
    }
}