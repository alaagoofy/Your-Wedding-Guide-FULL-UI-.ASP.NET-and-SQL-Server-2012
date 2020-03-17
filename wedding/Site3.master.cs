﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Data;
using System.Web.UI.HtmlControls;

public partial class SiteMaster : System.Web.UI.MasterPage
{
    DataTable tableMenu;
    DataTable tableCat;
    protected void Page_Load(object sender, EventArgs e)
    {
        txt_search.Attributes.Add("onKeyPress", "javascript:if (event.keyCode == 13) __doPostBack('" + Button1.UniqueID + "','')");
        if (HttpContext.Current.User.Identity.IsAuthenticated)
        {
            DataTable getUserInfo = new DB().getUserInfoByName(HttpContext.Current.User.Identity.Name);
           
          
            if (HttpContext.Current.User.IsInRole("Admin"))
            {
                Panel_Admin.Visible = true;
                panel_Vendor.Visible = false;
            }
            else if (HttpContext.Current.User.IsInRole("Vendor"))
            {
                Panel_Admin.Visible = false;
                panel_Vendor.Visible = true;

            }
            else
            {
                Panel_Admin.Visible = false;
                panel_Vendor.Visible = false;
            }



        }





        DataTable getMenu = new DB().ADMIN_Category_Get();
        Repeater2.DataSource = getMenu;
        Repeater2.DataBind();

    }


    protected void grid_local_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            Repeater re = (Repeater)e.Row.Cells[0].FindControl("Repeater1");

            int pID = Convert.ToInt32(DataBinder.Eval(e.Row.DataItem, "ID"));

            tableCat = new DB().Admin_Categorys_GetByCat_ID(pID);
            re.DataSource = tableCat;
            re.DataBind();
        }


    }

    protected void Repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        Repeater repeat_NewOffer = (Repeater)e.Item.FindControl("Repeater1");


        HtmlGenericControl visibleMenu = (HtmlGenericControl)e.Item.FindControl("visibleMenu");
        LinkButton LinkButton1 = (LinkButton)e.Item.FindControl("LinkButton1");


        RepeaterItem ri = e.Item;
        HiddenField pk = (HiddenField)ri.FindControl("HiddenField2");

        int FileID = Convert.ToInt32(pk.Value);


        DataTable offers = new DB().Admin_Categorys_GetByCat_ID(FileID);


        if (offers.Rows.Count == 0)
        {
            visibleMenu.Visible = false;

            LinkButton1.PostBackUrl = string.Format("~/Category.aspx?ID2={0}", FileID);
        }
        else
        {
            LinkButton1.PostBackUrl = null;
            repeat_NewOffer.DataSource = offers;
            repeat_NewOffer.DataBind();
        }




    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string link = string.Format("Search.aspx?Title={0}", txt_search.Text);
        Response.Redirect(link);
    }
    
}