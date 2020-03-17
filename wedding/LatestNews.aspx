<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LatestNews.aspx.cs" Inherits="LatestNews" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Latest News</title>
     <link href="css/news/style.css" rel="stylesheet" type="text/css" />
    <link href="css/news/presentationCycle.css" rel="stylesheet" type="text/css" />
   
       <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2'></script>
    <script type='text/javascript' src='js/jquery.cycle.all.min.js'></script>
    <script type='text/javascript' src='js/presentationCycle.js'></script>

</head>
<body>
    <form id="form1" runat="server">
    
    	   <div id="presentation_container" class="pc_container">
            <div class="pc_item">
                <div class="desc">
                    <h1>Server Park</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/honey.jpg" alt="slide1" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>iPhone Apps</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide2.jpg" alt="slide2" />
            </div>
            <div class="pc_item">
                <div class="desc" style="left: 0px;">
                    <h1>Wordpress Extensions</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide3.jpg" alt="slide3" />
            </div>
            <div class="pc_item">
                <div class="desc" style="left: 165px;">
                    <h1>City Skyline</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide4.jpg" alt="slide4" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>Mario Finds Peach</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide5.jpg" alt="slide5" />
            </div>
            <div class="pc_item">
                <div class="desc">
                    <h1>Said and Done</h1>
                    Consectetur adipiscing elit. Nunc quis tellus eros.
                    Nam blandit diam id turpis bibendum nec rutrum dui pulvinar. Quisque fermentum,
                    dolor ut adipiscing suscipit, leo lorem malesuada mauris, vitae dapibus mi
                    ligula ut nunc.
                </div>
                <img src="images/slide6.jpg" alt="slide6" />
            </div>
        </div>
        
        <script type="text/javascript">
            presentationCycle.init();
        </script>
    

    </form>
</body>
</html>
