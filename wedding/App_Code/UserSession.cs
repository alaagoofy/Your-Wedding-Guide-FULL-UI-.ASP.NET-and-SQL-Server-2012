using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UserSession
/// </summary>
public class UserSession
{
    static UserSession() { }

    public static string Item_ID
    {
        set { HttpContext.Current.Session["Item_ID"] = value; }
        get { return (string)HttpContext.Current.Session["Item_ID"]; }
    }

    public static string OutCategory_ID
    {
        set { HttpContext.Current.Session["OutCategory_ID"] = value; }
        get { return (string)HttpContext.Current.Session["OutCategory_ID"]; }
    }

    public static string OutCategorys_ID
    {
        set { HttpContext.Current.Session["OutCategorys_ID"] = value; }
        get { return (string)HttpContext.Current.Session["OutCategorys_ID"]; }
    }

    public static string Vendors
    {
        set { HttpContext.Current.Session["Vendors"] = value; }
        get { return (string)HttpContext.Current.Session["Vendors"]; }
    }

    public static string UserId
    {
        set { HttpContext.Current.Session["UserId"] = value; }
        get { return (string)HttpContext.Current.Session["UserId"]; }
    }
}