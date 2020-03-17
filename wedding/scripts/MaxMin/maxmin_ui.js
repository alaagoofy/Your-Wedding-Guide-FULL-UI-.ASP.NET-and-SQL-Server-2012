/* MaxMin Jquery Start Codes ( Loading, Menu & Submenu, Notifications, Validation, DataTable, Forms, Calendar, Files and so on */
//jQuery UI elements (more info can be found at http://jqueryui.com/demos/ 
 
$(function() {
	
	
	// Loading Box
	
		function loadingOverlay(){
			$("#loading_overlay .loading_message").delay(500).fadeOut(function(){}); 
			$("#loading_overlay").delay(500).fadeOut();  
		}
		window.onload = function () {
			loadingOverlay();   
	   	};
	
	// Quick Effect Codes 
	
	$('.fade').hide(0).fadeIn(1000); /* Fade Start Effect */
	$('.fadeToggle').hide(0).fadeToggle(1000); /* Fade Start Effect */
	$('.slide').hide(0).slideDown(1000); /* Slide Down Effect */
	$('.slideToggle').hide(0).slideToggle(1000); /* Slide Down Effect */
	
	/* Tooltip */
	$(function() {
	$('.tooltip-bottom').tipsy({fade: true, gravity: 'n'});
	$('.tooltip-top').tipsy({fade: true, gravity: 's'});
	$('.tooltip-left').tipsy({fade: true, gravity: 'e'});
	$('.tooltip-right').tipsy({fade: true, gravity: 'w'});
	$('.tooltip').tipsy({gravity: $.fn.tipsy.autoNS});
	});
 
	/* Slide To Top Button */
		$().UItoTop({ easingType: 'easeOutQuart' });
		
 	/* Boxes Toggle */
		
		$("a.toggle").click(function(){
			$(this).toggleClass("toggle_closed").parents().eq(4).children('.content,.toggle_container').slideToggle();
			$(this).parents().eq(1).toggleClass("toggle_closed");
			return false; 
		});
		
		/* Integrated H#(1,2,3,4,5,6) */
		$("a.toggle").click(function(){
			$(this).toggleClass("toggle_closed").parents().eq(5).children('.content,.toggle_container').slideToggle();
			$(this).parents().eq(1).toggleClass("toggle_closed");
			return false; 
		});
		
	/* Pages Toggle */
		
		$("a.toggle").click(function(){
			$(this).toggleClass("toggle_closed").parents().eq(5).next('.breadcrumb').next('.content').slideToggle().prev('.breadcrumb').toggleClass("round",500);
			$(this).parents().eq(1).toggleClass("toggle_closed");
			return false; 
		});	
		
	/* Tools Menu */
		
		$("a.openthis").click(function(){
			
			
			if ($(this).is('.glypse'))
				{
			$(this).parents().eq(1).children('.tools_menu').animate({width:'toggle'},222);		
			$(this).html("&nbsp;Quick Menu > ", 600).removeClass("glypse");		
				}
			else
				{
			$(this).parents().eq(1).children('.tools_menu').hide();	
            $(this).html("&nbsp;< Quick Menu ", 600).addClass("glypse");
				}
		
			return false; 
		});
 	
 	// Content Box Tabs Config
	
		$( ".tabs" ).tabs({ 
			fx: {opacity: 'toggle', duration: 'fast'} 
		});

		$( ".side_tabs" ).tabs({ 
			fx: {opacity: 'toggle', duration: 'fast', height:'auto'} 
		});
		
	// Content Box Accordion Config		
	
		$( ".content_accordion" ).accordion({
			collapsible: true,
			active:false,
			header: 'h3.bar', 
			autoHeight:false,
			event: 'mousedown',
			icons:false,
			animated: true
		});
		
	// Sortable Content Boxes Config	
	
		$( ".ghost" ).sortable({
			handle:'.grabber',  
			items:'div.box', 
			opacity:0.8,
			revert:true,
			tolerance:'pointer',
			helper:'original',
			forceHelperSize:true,
			placeholder: 'dashed_placeholder',		
			forcePlaceholderSize:true,
			cursorAt: { top: 20, right: 60 }
		});
		
		$( ".content" ).sortable({
			handle:'.grabber', 
			items:'div.box', 
			opacity:0.8,
			revert:true,
			tolerance:'pointer',
			helper:'original',
			forceHelperSize:true,
			placeholder: 'dashed_placeholder',		
			forcePlaceholderSize:true,
			cursorAt: { top: 20, right: 60 }
		});

	// Sortable Accordion Items Config	
	
		$( ".content_accordion" ).not(".no_rearrange").sortable({
			handle:'a.handle',
			axis: 'y',
			revert:true,
			tolerance:'pointer',
			forcePlaceholderSize:true,
			cursorAt: { top: 16, right: 16 }
		});
		
	// static tables alternating rows
	
		$('table.static tr:even').addClass("even");
	
	/* Search Box Effects */
  
	$('#search').focus(function() { $(this).animate({width: '150px'}, 300); });
	$('#search').focusout(function() { $(this).animate({width: '110px'}, 300); });
    
	/* Messages Menu */
		
	$('.buttonlist li').click(function() { $(this).children('ul').fadeIn(200); });
	$('.buttonlist li').mouseleave(function() { $(this).children('ul').fadeOut(200); });
	
	/* Administrator Menu */
		
	$('.user_settings').mouseenter(function() { 
	$('.user_settings').animate({width: '100px', height: '30px'}, 600); 
	$('.user_settings p').delay(600).fadeIn(300); 
	});
	
	$('.user_settings').mouseleave(function() { 
	$('.user_settings p').fadeOut(300); 
	$('.user_settings').delay(600).animate({width: '35px'}, 600);  
	});
	
	/* Menu - Submenu */
	
	$('#menu ul li').mouseenter(function() { $(this).children('ul').slideDown(300); });
	$('#menu ul li').mouseleave(function() { $(this).children('ul').slideUp(300); });
 
    /* Page Tabs */
  
    // Hide all .tab-page divs
    $('.tab-page').livequery(function() {
      $(this).hide();
    });

    // Show all active tabs
    $('.tabbed_page.head ul li.active a, .login_page.head ul li.active a').livequery(function() {
      var target = $(this).attr('href');
      $(target).slideDown(200);
    });
	
	$('.tabbed_page.head ul li, .login_page.head ul li').livequery(function() {
      $(this).click(function() {
        var item = $(this);
        var target = item.find('a').attr('href');
        
          item.siblings().removeClass('active');
          item.addClass('active');
    
          item.parents('#main').find('.tab-page').slideUp(200);
          $(target).delay(300).slideDown(400); 
    
        return false;
      });
	});
      
	/* Notification function! */

	$('.notification span a').click(function() { $(this).parents().eq(2).fadeOut(500); });
	
	
	// fade in once page is fully loaded( < delete this text to active) $(".box, .block, .flat_area, .indent , #nav_top").css("opacity","0");
				
		$(window).load(function(){
		
 			$("#nav_top, .indent, .flat_area").animate({opacity: 1	});
 			
 			$("#login_box").delay(100).slideDown();
 			
 			$(".box").animate({
	 				opacity: 1
		 			}, function(){
		 				$(".block").animate({
		 				opacity: 1
		 			});
			});	
 			

 		});


});