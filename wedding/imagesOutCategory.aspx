<%@ Page Language="C#" AutoEventWireup="true" CodeFile="imagesOutCategory.aspx.cs" Inherits="imagesOutCategory" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   
<script type="text/javascript">

    $(document).ready(function () {
        $("#image_container").zoom();
        $("img.image_view").bind('click', function () { $("#image_main").attr('src', $(this).attr('src')); });
        $("img.image_view").bind('click', function () { $("#amain").attr('href', $(this).attr('src')); $('#image_container').zoom(); });

    });


</script>

</head>
<body>
    <form id="form1" runat="server">
    
<div id="image_container">
<img src="images/hebaedres.jpg" id="image_main" class="image_view" border="0" alt="" width="450" height="650" />

</div>

    </form>
</body>
</html>
