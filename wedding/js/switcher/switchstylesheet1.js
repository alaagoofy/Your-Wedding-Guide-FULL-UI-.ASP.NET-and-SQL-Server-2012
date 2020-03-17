  jQuery(document).ready(function($) {
    
    $('.slide-out-div a.color-box').each(function (i) {
        var a = $(this);
        a.css({
            backgroundColor: '#' + a.attr('rel')
        })
    })    
    
    $('.slide-out-div a.pattern-box').each(function (i) {  
      var a = $(this);
        var patternUrl = 'url(images/pattern/' + a.attr('rel') + '.png)';
        a.css({
            backgroundImage: patternUrl
        })
    })
    
   var switcher_skins = $('.slide-out-div a.color-box');
   var switcher_link = $('#skins-switcher');
   switcher_skins.each(function(i) {
    var color = $(this).attr('rel');
    var defaultPattern = "url('../images/pattern/cloud.html')";
     
 
     
   });  
   
      
   switcher_skins.click(function(e) {
    var color = $(this).attr('rel');
    var skins;
    var defaultPattern = "url('../images/pattern/cloud.html')";
    
    if (color == "ff0099") {
      var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });   
    }
    if(color == "00cc33") {
       var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });   
    }
    if(color == "0099FF") {
      var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });    
    }
    if(color == "ffffff") {
      var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });     
    }
    if(color == "000000") {
      var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });    
    }
    if(color == "e1e1e1") {
      var atrrHref = switcher_link.attr('href');
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });       
    }     
    $.cookie("qark_cookie_pattern", null);   
    $.cookie("qark_cookie_bgimage",null);

    $.cookie("qark_cookie_color", color);  
    $.cookie("qark_cookie_skins", atrrHref);
    $.cookie("qark_cookie_defaultBg", defaultPattern);    
    return false;
   });  
   
  var color = $.cookie("qark_cookie_color");
  var qark_skins = $.cookie("qark_cookie_skins");
  var defaultPattern = $.cookie("qark_cookie_defaultBg");
  var pattern = $.cookie("qark_cookie_pattern");
  
  if (qark_skins) {
    $("#skins-switcher").attr("href",qark_skins);
    $('.break1, .mosaic-break').css({
        backgroundColor: '#' + color,
        backgroundImage : pattern
    });
  }

  $('.slide-out-div a.pattern-box').click(function (e) {
      e.preventDefault();
      var patternUrl = 'url(images/pattern/' + $(this).attr('rel') + '.png)';
      $('.break1, .mosaic-break').css({
          backgroundImage: patternUrl,
          backgroundRepeat: "repeat"
      });
      $.cookie("qark_cookie_bgimage",null);
      $.cookie("qark_cookie_pattern", patternUrl)
  });
  
  var defaultPattern = $.cookie("qark_cookie_defaultBg");
  var color = $.cookie("qark_cookie_color");
  var background = $.cookie("qark_cookie_bgimage");
  if (color) {
      $('.break1, .mosaic-break').css({
          backgroundColor: '#' + color,
          backgroundImage : defaultPattern
      });
  }
  var pattern = $.cookie("qark_cookie_pattern");
  if (pattern) {
      $('.break1, .mosaic-break').css({
          backgroundImage: pattern,
          backgroundRepeat: "repeat"
      });
  } else {
    if (background) {
        $('.break1, .mosaic-break').css({
          backgroundImage: background,
          backgroundRepeat: "norepeat",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed"
        });
    }    
  }  

  $('.slide-out-div a.bg-box').each(function (i) {
    var backgroundUrl = 'url(images/' + $(this).attr('rel') + '.jpg)';
    var a = $(this);
      a.css({
          backgroundImage: backgroundUrl
      })
  })
    
  $('.slide-out-div a.bg-box').click(function (e) {
      e.preventDefault();
      var backgroundUrl = 'url(images/' + $(this).attr('rel') + '.jpg)';
      $('.break1, .mosaic-break').css({
          backgroundImage: backgroundUrl,
          backgroundRepeat: "norepeat",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed"
      });
    $.cookie("qark_cookie_bgimage",backgroundUrl)
  });

  var background = $.cookie("qark_cookie_bgimage");
  if (background) {
      $('.break1, .mosaic-break').css({
        backgroundImage: background,
        backgroundRepeat: "norepeat",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed"
      });
  }
         
});   
 