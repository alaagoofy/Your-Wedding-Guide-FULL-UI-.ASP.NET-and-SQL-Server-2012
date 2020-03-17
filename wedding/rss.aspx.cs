using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class rss : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         XmlTextWriter writer = new XmlTextWriter(Response.OutputStream, 
    System.Text.Encoding.UTF8);  











 
  WriteRSSPrologue(writer);




  SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString);
  SqlCommand myCMD = new SqlCommand("Admin_Articles_Get", con);
  myCMD.CommandType = CommandType.StoredProcedure;
  
  con.Open();
  SqlDataReader myReader = myCMD.ExecuteReader();
  while (myReader.Read())
  {
      int ID = myReader.GetInt32(0);    // Weight int
      string Title = myReader.GetString(1);
      string Img = myReader.GetString(2);
      string Des = myReader.GetString(4);
      //PriceTotal = myReader.GetDecimal(5);

      string description = string.Format("<![CDATA[ <p><img class='ngg-singlepic ngg-none' src='{0}' /></p><p>{1}</p> ", Img, Des);


      AddRSSItem(writer, Title, "http://www.yourwedding-guide.com/ShowArticles.aspx?ID=" + ID, "http://www.yourwedding-guide.com" + Img, description);




  }
  myReader.Close();
  con.Close();



  WriteRSSClosing(writer);
  writer.Flush();

  writer.Close(); 
  
  Response.ContentEncoding = System.Text.Encoding.UTF8; 
  Response.ContentType = "text/xml";  
  Response.Cache.SetCacheability(HttpCacheability.Public);

  Response.End();
    }
    public XmlTextWriter WriteRSSPrologue(XmlTextWriter writer)
    {
        writer.WriteStartDocument();
        writer.WriteStartElement("rss");
        writer.WriteAttributeString("version", "2.0");
        writer.WriteAttributeString("xmlns:websiteChannel","http://yourwedding-guide.com");
        writer.WriteStartElement("channel");
        writer.WriteElementString("title", "Your Wedding Guide Articles RSS");
        writer.WriteElementString("link", "http://yourwedding-guide.com");
        //writer.WriteElementString("description",
        //   "A simple RSS document generated using XMLTextWriter");
        writer.WriteElementString("copyright", "Copyright 2013 Your Wedding Guide");
        writer.WriteElementString("generator", "RSSviaXmlTextWriter v1.0");

        return writer;
    }
    public XmlTextWriter AddRSSItem(XmlTextWriter writer,string sItemTitle, string sItemLink,string Thumb,string sItemDescription)
    {
        writer.WriteStartElement("item");
        writer.WriteElementString("title", sItemTitle);
        writer.WriteElementString("link", sItemLink);
        writer.WriteElementString("Thumb", Thumb);
        writer.WriteElementString("description", sItemDescription);
        writer.WriteElementString("pubDate", DateTime.Now.ToString("r"));
        writer.WriteEndElement();

        return writer;
    }

    public XmlTextWriter WriteRSSClosing(XmlTextWriter writer)
    {
        writer.WriteEndElement();
        writer.WriteEndElement();
        writer.WriteEndDocument();

        return writer;
    }
}