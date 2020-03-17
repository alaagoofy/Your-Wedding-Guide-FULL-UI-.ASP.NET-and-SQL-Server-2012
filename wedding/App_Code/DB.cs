using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

/// <summary>
/// Summary description for wight
/// </summary>
public class DB
{
    SqlConnection con = null;
    SqlCommand com = null;
    SqlDataAdapter da = null;
    SqlDataReader dr = null;
    DataTable dt = null;
    DataSet ds = null;

    public DB()
    {
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["ApplicationServices"].ConnectionString);

    }



    # region Category

    public void ADMIN_Category_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Category_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Category_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Category_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Category_GetBylaung(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Category_GetBylaung";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable ADMIN_Category_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Category_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_Category_Insert(string Title,int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Category_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Category_Update(int ID, string Title,int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Category_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region Items

    public void ADMIN_Items_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Items_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Items_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Items_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable ADMIN_Items_GetBySpecial(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Items_GetBySpecial";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Items_GetBySpecialHomePage(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetBySpecialHomePage";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Items_GetBySpecialHomePageart(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetBySpecialHomePageart";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Items_GetByCat_ID(int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetByCat_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_Items_GetByUserIdandID(int ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetByUserIdandID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Items_GetByUserId(string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetByUserId";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Items_GetByMenu_ID(int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetByMenu_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable ADMIN_Items_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Items_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_Items_Insert(string Title, string Img, string Body, int Special, int Cat_ID, string UserId,int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Special", Special);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_Items_Update(int ID, string Title, string Img, string Body, int Special, int Cat_ID, string UserId,int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Special", Special);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }
    public DataTable Admin_Items_UpdateUserId(int ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_UpdateUserId";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable searchProducts(string Title)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "searchProducts";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Title", Title);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable searchProducts22(string Title)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "searchProducts22";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Title", Title);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }




    # endregion

    # region OutItems

    public void ADMIN_OutItems_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutItems_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_OutItems_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutItems_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_OutItems_GetByCat_ID(int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutItems_GetByCat_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_OutItems_GetByMenu_ID(int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Items_GetByMenu_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable ADMIN_OutItems_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_OutItems_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_OutItems_Insert(string Title, string Img, int Cat_ID, int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutItems_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);
           
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_OutItems_Update(int ID, string Title, string Img, int Cat_ID, int Menu_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutItems_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@Menu_ID", Menu_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }
   


    # endregion

    # region ImagesTable

    public void ADMIN_ImagesTable_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_ImagesTable_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }

    public void deletebyItem_ID(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "deletebyItem_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_ImagesTable_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_ImagesTable_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }
    public DataTable Admin_ImagesTable_GetByItem_ID(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByItem_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Item_ID", Item_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_ImagesTable_GetByItem_IDAll1(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByItem_IDAll1";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Item_ID", Item_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_ImagesTable_GetByItem_IDAll(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByItem_IDAll";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Item_ID", Item_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }




    public DataTable Admin_ImagesTable_GetByItem_IDTop15(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByItem_IDTop15";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Item_ID", Item_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_ImagesTable_GetByUserId(string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByUserId";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_ImagesTable_GetByUserIdandID(int ID,string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_GetByUserIdandID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_ImagesTable_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_ImagesTable_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_ImagesTable_Insert(string Img, int Item_ID,  string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_ImagesTable_Update(int ID, string Img, int Item_ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }


    public DataTable Admin_ImagesTable_UpdateUser_Id(int ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable_UpdateUser_Id";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }


    public DataTable nextImage(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "nextImage";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@ID", ID);
           
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable prevImage(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "prevImage";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@ID", ID);
          
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    # endregion

    # region ImagesTable2

    public void ADMIN_ImagesTable2_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_ImagesTable2_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_ImagesTable2_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_ImagesTable2_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }
    public DataTable Admin_ImagesTable2_GetByItem_ID(int OutCategory_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_GetByItem_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@OutCategory_ID", OutCategory_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_ImagesTable2_GetByItem_IDTop30(int OutCategory_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_GetByItem_IDTop30";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@OutCategory_ID", OutCategory_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_ImagesTable2_GetByOutCategorys_ID(int OutCategorys_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_GetByOutCategorys_ID";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@OutCategorys_ID", OutCategorys_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_ImagesTable2_GetByOutCategorys_IDTop30(int OutCategorys_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_GetByOutCategorys_IDTop30";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@OutCategorys_ID", OutCategorys_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_ImagesTable2_GetByItem_IDTop15(int OutCategory_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_GetByItem_IDTop15";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@OutCategory_ID", OutCategory_ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



  

    public DataTable ADMIN_ImagesTable2_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_ImagesTable2_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }


    public DataTable Admin_ImagesTable2_GetByCat_IDHome()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_ImagesTable2_GetByCat_IDHome";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_ImagesTable2_GetByCat_IDHome2()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_ImagesTable2_GetByCat_IDHome2";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }


    public DataTable Admin_ImagesTable2_GetByCat_IDHome3()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_ImagesTable2_GetByCat_IDHome3";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }



    public DataTable Admin_ImagesTable2_GetByCats_IDHome()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_ImagesTable2_GetByCats_IDHome";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_ImagesTable2_Insert(string Img, int OutCategory_ID, int OutCategorys_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@OutCategory_ID", OutCategory_ID);
            com.Parameters.AddWithValue("@OutCategorys_ID", OutCategorys_ID);

            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_ImagesTable2_Update(int ID, string Img, int OutCategory_ID, int OutCategorys_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_ImagesTable2_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@OutCategory_ID", OutCategory_ID);
            com.Parameters.AddWithValue("@OutCategorys_ID", OutCategorys_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable nextImage2(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "nextImage2";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable prevImage2(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "prevImage2";
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@ID", ID);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    # endregion

    # region Users


    public DataTable getUserInfo(string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "getUserInfo";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable getUserInfoByName(string UserName)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "getUserInfoByName";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserName", UserName);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable UpdateRegister(string UserId,string Name, string Mobile,string Address,string Avatar)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "UpdateRegister";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserId", UserId);
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Mobile", Mobile);
            com.Parameters.AddWithValue("@Address", Address);
            com.Parameters.AddWithValue("@Avatar", Avatar);
          
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable RegisterUserFbUsers(string UserId, string Name,string Email)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "RegisterUserFbUsers";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserId", UserId);
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Email", Email);

            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_FBUsers_GetByID(string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_FBUsers_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable getuserbyEmail(string Email)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "getuserbyEmail";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Email", Email);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable getuserbyuserID(string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "getuserbyuserID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable changePassword(string Email, string Password)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "changePassword";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Email", Email);
            com.Parameters.AddWithValue("@Password", Password);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    

    # region OutCategory

    public void ADMIN_OutCategory_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategory_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_OutCategory_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategory_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_OutCategory_GetByLaung(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategory_GetByLaung";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_OutCategory_GetByHaveItem(int HaveItems,int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategory_GetByHaveItem";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@HaveItems", HaveItems);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }




    public DataTable ADMIN_OutCategory_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_OutCategory_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_OutCategory_Insert(string Title, int HaveItems)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategory_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@HaveItems", HaveItems);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_OutCategory_Update(int ID, string Title, int HaveItems)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategory_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@HaveItems", HaveItems);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region Categorys

    public void ADMIN_Categorys_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Categorys_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Categorys_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Categorys_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Categorys_GetByCat_ID(int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Categorys_GetByCat_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable ADMIN_Categorys_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Categorys_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_Categorys_Insert(string Title,int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Categorys_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Categorys_Update(int ID, string Title,int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Categorys_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region OutCategorys

    public void ADMIN_OutCategorys_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategorys_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_OutCategorys_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutCategorys_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_OutCategorys_GetByCat_ID(int Cat_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategorys_GetByCat_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable ADMIN_OutCategorys_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_OutCategorys_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }





    public DataTable Admin_OutCategorys_GetHome(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategorys_GetHome";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_OutCategorys_Getart(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategorys_Getart";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


   

    public DataTable Admin_OutCategorys_Insert(string Title, int Cat_ID,string Img)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategorys_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@Img", Img);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_OutCategorys_Update(int ID, string Title, int Cat_ID,string Img)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutCategorys_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Cat_ID", Cat_ID);
            com.Parameters.AddWithValue("@Img", Img);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region Favorite

    public void ADMIN_Favorite_Delete(int id)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Favorite_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", id);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Favorite_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Favorite_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_Favorite_GetByUserId(string UserID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Favorite_GetByUserId";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@UserID", UserID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable Admin_Favorite_GetByUserIdandID(int Image_ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Favorite_GetByUserIdandID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Image_ID", Image_ID);
            com.Parameters.AddWithValue("@UserId", UserId);

            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable ADMIN_Favorite_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Favorite_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_Favorite_Insert(int Image_ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Favorite_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Image_ID", Image_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_Favorite_UpdateUser_Id(int ID, string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Favorite_UpdateUser_Id";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    public DataTable Admin_Favorite_Update(int ID, int Image_ID,string UserId)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Favorite_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Image_ID", Image_ID);
            com.Parameters.AddWithValue("@UserId", UserId);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region Articles

    public void ADMIN_Articles_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Articles_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Articles_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Articles_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Articles_GetByLaung(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Articles_GetByLaung";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_Articles_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Articles_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }


    public DataTable Admin_Articles_GetHomePage(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Articles_GetHomePage";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


   

    public DataTable Admin_Articles_GetHomePagetop4()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_Articles_GetHomePagetop4";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_Articles_Insert(string Title, string Img, string Body, string Des, int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Articles_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Des", Des);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Articles_Update(int ID, string Title, string Img, string Body, string Des, int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Articles_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Des", Des);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region Videos

    public void ADMIN_Videos_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Videos_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Videos_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Videos_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }






    public DataTable ADMIN_Videos_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Videos_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }



    public DataTable Admin_Videos_GetByItem_ID(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Videos_GetByItem_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Videos_GetBySpecial(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Videos_GetBySpecial";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Videos_GetHomePage(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Videos_GetHomePage";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Videos_Insert(string Title, string Body, string Thumb, string Link,string Iframe,int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Video_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Thumb", Thumb);
            com.Parameters.AddWithValue("@Link", Link);
            com.Parameters.AddWithValue("@Iframe", Iframe);
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Videos_Update(int ID, string Title, string Body, string Thumb, string Link, string Iframe, int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Video_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Thumb", Thumb);
            com.Parameters.AddWithValue("@Link", Link);
            com.Parameters.AddWithValue("@Iframe", Iframe);
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region OutVideos

    public void ADMIN_OutVideos_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutVideos_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_OutVideos_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_OutVideos_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }






    public DataTable ADMIN_OutVideos_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_OutVideos_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }



    public DataTable Admin_OutVideos_GetByItem_ID(int Item_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutVideos_GetByItem_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Item_ID", Item_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_OutVideos_GetBySpecial(int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutVideos_GetBySpecial";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_OutVideos_GetHomePage()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_OutVideos_GetHomePage";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }


    public DataTable Admin_OutVideos_Getart()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_OutVideos_Getart";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }



    public DataTable Admin_OutVideos_Insert(string Title, string Thumb, string Link, string Iframe, int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutVideo_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
          
            com.Parameters.AddWithValue("@Thumb", Thumb);
            com.Parameters.AddWithValue("@Link", Link);
            com.Parameters.AddWithValue("@Iframe", Iframe);
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_OutVideos_Update(int ID, string Title, string Thumb, string Link, string Iframe, int Special)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_OutVideo_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
          
            com.Parameters.AddWithValue("@Thumb", Thumb);
            com.Parameters.AddWithValue("@Link", Link);
            com.Parameters.AddWithValue("@Iframe", Iframe);
            com.Parameters.AddWithValue("@Special", Special);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region News

    public void ADMIN_News_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_News_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_News_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_News_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }

    public DataTable ADMIN_News_GetByLaung(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_News_GetByLaung";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }





    public DataTable Admin_News_GetByItems_ID(int Items_ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_News_GetByItems_ID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Items_ID", Items_ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_News_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_News_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

   

    public DataTable Admin_News_GetHomePage(int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_News_GetHomePage";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_News_GetHomePagetop4()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_News_GetHomePagetop4";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_News_Insert(string Title, int Items_ID, string DateTimes,string Img,int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_News_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Items_ID", Items_ID);
            com.Parameters.AddWithValue("@DateTimes", DateTimes);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_News_Update(int ID, string Title, int Items_ID, string DateTimes, string Img, int Laung)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_News_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Items_ID", Items_ID);
            com.Parameters.AddWithValue("@DateTimes", DateTimes);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@Laung", Laung);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion

    # region NewsLetter

    public void ADMIN_NewsLetter_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_NewsLetter_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_NewsLetter_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_NewsLetter_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable Admin_NewsLetter_GetBymail(string  Email)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_NewsLetter_GetBymail";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Email", Email);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_NewsLetter_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_NewsLetter_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_NewsLetter_GetHomePage()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_NewsLetter_GetHomePage";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_NewsLetter_GetHomePagetop4()
    {
        com = con.CreateCommand();
        com.CommandText = "Admin_NewsLetter_GetHomePagetop4";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }

    public DataTable Admin_NewsLetter_Insert(string Name,string Email,string Phone,string Gender,string City)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_NewsLetter_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Email", Email);
            com.Parameters.AddWithValue("@Phone", Phone);
            com.Parameters.AddWithValue("@Gender", Gender);
            com.Parameters.AddWithValue("@City", City);
            
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_NewsLetter_Update(int ID, string Name, string Email, string Phone, string Gender, string City)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_NewsLetter_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Email", Email);
            com.Parameters.AddWithValue("@Phone", Phone);
            com.Parameters.AddWithValue("@Gender", Gender);
            com.Parameters.AddWithValue("@City", City);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion



    # region Interview

    public void Admin_Interview_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Interview_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Interview_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Interview_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Interview_GetByItemID(int ItemID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Interview_GetByItemID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ItemID", ItemID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_Interview_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Interview_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }





    public DataTable Admin_Interview_Insert(string Title, string Des, string Body, string Img, int ItemID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Interview_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Des", Des);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@ItemID", ItemID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Interview_Update(int ID, string Title, string Des, string Body, string Img, int ItemID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Interview_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Title", Title);
            com.Parameters.AddWithValue("@Des", Des);
            com.Parameters.AddWithValue("@Body", Body);
            com.Parameters.AddWithValue("@Img", Img);
            com.Parameters.AddWithValue("@ItemID", ItemID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion



    # region Comments

    public void Admin_Comments_Delete(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Comments_Delete";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }


    public DataTable ADMIN_Comments_GetByID(int ID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "ADMIN_Comments_GetByID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }



    public DataTable Admin_Comments_GetByItemID(int ItemID,int Active)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Comments_GetByItemID";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ItemID", ItemID);
            com.Parameters.AddWithValue("@Active", Active);
            da = new SqlDataAdapter(com);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0];
        }
    }


    public DataTable ADMIN_Comments_Get()
    {
        com = con.CreateCommand();
        com.CommandText = "ADMIN_Comments_Get";
        com.CommandType = CommandType.StoredProcedure;
        da = new SqlDataAdapter(com);
        ds = new DataSet();
        da.Fill(ds);
        return ds.Tables[0];

    }





    public DataTable Admin_Comments_Insert(string Name, string Email, DateTime Date, string Comment, int Active, int ItemID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Comments_Insert";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Email", Email);
            com.Parameters.AddWithValue("@Date", Date);
            com.Parameters.AddWithValue("@Comment", Comment);
            com.Parameters.AddWithValue("@Active", Active);
            com.Parameters.AddWithValue("@ItemID", ItemID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }



    public DataTable Admin_Comments_Update(int ID, string Name, string Email, DateTime Date, string Comment, int Active, int ItemID)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Comments_Update";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@Email", Email);
            com.Parameters.AddWithValue("@Date", Date);
            com.Parameters.AddWithValue("@Comment", Comment);
            com.Parameters.AddWithValue("@Active", Active);
            com.Parameters.AddWithValue("@ItemID", ItemID);
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }


    public DataTable Admin_Comments_UpdateActive(int ID,  int Active)
    {
        using (con)
        {
            com = con.CreateCommand();
            com.CommandText = "Admin_Comments_UpdateActive";
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", ID);
    
            com.Parameters.AddWithValue("@Active", Active);
          
            da = new SqlDataAdapter(com);
            dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }

    # endregion
}