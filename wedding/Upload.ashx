<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web.SessionState;

public class Upload : IHttpHandler,IReadOnlySessionState
{
    
    public void ProcessRequest (HttpContext context) 
    {
        int Item_ID = int.Parse(UserSession.Item_ID);

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {
            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            
            string savepath = "";
            string tempPath = "";
            tempPath = System.Configuration.ConfigurationManager.AppSettings["FolderPath"]+Item_ID; 
            savepath = context.Server.MapPath(tempPath);
            string filename = postedFile.FileName;
            if (!Directory.Exists(savepath))
                Directory.CreateDirectory(savepath);
            Random rand = new Random((int)DateTime.Now.Ticks);
            int numIterations = 0;
            numIterations = rand.Next(1, 10000);

            postedFile.SaveAs(savepath + @"\" + numIterations + filename);
            string Img = (tempPath + "/" + numIterations+filename);

            context.Response.Write(tempPath + "/" + numIterations+filename);
            new DB().Admin_ImagesTable_Insert(Img, Item_ID, "");


            DataTable getItems = new DB().ADMIN_Items_GetByID(Item_ID);
            int Item_id = int.Parse(getItems.Rows[0]["ID"].ToString());
            string vendorTitle = getItems.Rows[0]["Title"].ToString();

            DataTable getLastImage = new DB().Admin_ImagesTable_GetByItem_ID(Item_id);
           




            string NewsTitle = string.Format("Check The Latest Photos Of {0}", vendorTitle);

            DataTable checkNews = new DB().Admin_News_GetByItems_ID(Item_id);


            if (checkNews.Rows.Count == 0)
            {
                new DB().Admin_News_Insert(NewsTitle, Item_id, DateTime.Now.ToShortDateString(), Img,0);
            }
            else
            {
                int NewsID = int.Parse(checkNews.Rows[0]["ID"].ToString());
                new DB().ADMIN_News_Delete(NewsID);
                new DB().Admin_News_Insert(NewsTitle, Item_id, DateTime.Now.ToShortDateString(), Img,0);

            }

           
            context.Response.StatusCode = 200;
           
           
        }
        catch (Exception ex)
        {
            context.Response.Write("Error: " + ex.Message);
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}