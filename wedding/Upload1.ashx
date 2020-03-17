<%@ WebHandler Language="C#" Class="Upload1" %>

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

public class Upload1 : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
      
         int OutCategory_ID = int.Parse(UserSession.OutCategory_ID);
        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {

            HttpPostedFile postedFile = context.Request.Files["Filedata"];

            string savepath = "";
            string tempPath = "";
            tempPath = System.Configuration.ConfigurationManager.AppSettings["FolderPath2"] + OutCategory_ID;
            savepath = context.Server.MapPath(tempPath);
            string filename = postedFile.FileName;
            if (!System.IO.Directory.Exists(savepath))
                System.IO.Directory.CreateDirectory(savepath);
          

            postedFile.SaveAs(savepath + @"\"  + filename);
            string Img = (tempPath + "/"  + filename);

            context.Response.Write(tempPath + "/" + filename);
            new DB().Admin_ImagesTable2_Insert(Img, OutCategory_ID, 0);
            context.Response.StatusCode = 200;
        }
        catch (Exception ex)
        {
            context.Response.Write( ex.Message);
        }
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}