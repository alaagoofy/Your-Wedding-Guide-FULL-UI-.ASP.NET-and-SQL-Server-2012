 $(function() {

	// Form inputs	
		
		$("fieldset > div > input[type=text]").addClass("text");
		$("fieldset > div > input[type=password]").addClass("text");
		$("fieldset > div > textarea").addClass("textarea");
		$("fieldset > div > input[type=checkbox]").addClass("checkbox");
		$("fieldset > div > input[type=radio]").addClass("radio");
		$("fieldset > div > input[type=checkbox].indeterminate").prop("indeterminate", true);
		
		
	// Textxarea Autogrow
	
		$('textarea.autogrow').autoGrow();	
		
	// Input Datepicker Config
		
		$( ".datepicker" ).datepicker({ dateFormat: 'd M yy' });; 

	
	// input Slider	Config
		function slideMarkers(event,ui){					
			var totalLabels = $(this).children().children().size();
			$(this).children("ol.slider_labels").children("li").css({
				"margin-right":(100/(totalLabels-1))+"%"
			});
		}		

		$( ".slider" ).slider({
			min: "0",
			max: "100",
			range: "min",
			slide: function( event, ui ) {
				$("#slider_value").text( ui.value );
			},
			create: slideMarkers
		
		}); // creates a simple slider with default settings

		
	// input Range Slider Config	
		
		$( ".slider_range" ).slider({
			range: true, // creates a range slider
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		
		$( "#amount" ).val( "$" + $( "#slider_range" ).slider( "values", 0 ) +
			" - $" + $( "#slider_range" ).slider( "values", 1 ) );
			
		$(".slider_vertical > span").each(function() {
			var value = parseInt($(this).text());
			$(this).empty().slider({
				value: value,
				range: "min",
				animate: true,
				orientation: "vertical"
			});
		});

	//Progress Bar Config
		$( ".progressbar" ).progressbar({
			value: 65
		});

		
	// jQuery UI buttons

		$(".jqui_checkbox").buttonset();
		
		$(".jqui_radios").buttonset();
		$(".jqui_radios > label").click(function(){
			$(this).siblings().removeClass("ui-state-active");
		}); // jQuery UI radio buttonset fix


    // Uniform Form Styles
    
	    setTimeout('$(".uniform input, .uniform, .uniform a, .time_picker_holder select").uniform();',100);
		
	// Select Box
		
		$(".multiselect_box, .select_box").selectBox();
		
	// Drag and Drop Select
	
		$(".multisorter").multiselect();
		
	// Colour Picker
			
		$('#colorpicker_inline').ColorPicker({flat: true});
		
		$('#colorpicker_popup').ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).val(hex);
				$(el).ColorPickerHide();
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function(){
			$(this).ColorPickerSetColor(this.value);
		});

		
	// Star Ratings
	
		$("#star_rating").stars({inputType: "select"});

	// Autocomplete
	
	var autoCompleteList = [
			"Aaron Bottom",
			"Ashley King",
			"Atouba Tone",
			"Barrack Obama",
			"Brad Hitt",
			"Cahill Tim",
			"Cash Wingston",
			"Cristhoper Lee",			
			"Damian Duff",
			"Fred Flinstones",
			"Grimmer John",
			"M.Kemal Atatürk",
			"Houstan Problem",
			"Jedi Knight",
			"John Carter",
			"Lisa Brown",
			"Paul Chris",
			"Vladimir Putin"
		];
		
		$(".autocomplete").focus(function() {
			if ($("ul.ui-autocomplete").is(":hidden")) {
				$(this).autocomplete('search', '');
			}
		}).autocomplete({
			source: autoCompleteList,
			minLength: 0
		});
		
		
	// Dialog Config
		$(".dialog_content").dialog({
			autoOpen: false, 
			show: "fade",
			hide: "fade",
			modal: true,
			width: "500",
        	show:{effect: "fade", duration: 500},
        	hide:{effect: "fade", duration: 500},
        	create: function(){
        		$('.dialog_content.no_dialog_titlebar').dialog('option', 'dialogClass', 'no_dialog_titlebar');
        	}
		});
		$(".dialog_content.wide").dialog( "option", "width", 750 );
		
		$(".dialog_button").click(function() {
			var theDialog = $(this).attr('data-dialog');
			$("#"+theDialog).dialog( "open" ); // the #dialog element activates the modal box specified above
			return false;
		});
		
		$(".close_dialog").click(function() {
			$(".dialog_content").dialog( "close" ); // the #dialog element activates the modal box specified above
			return false;
		});
		
		$(".link_button").live("click", function(){
			var x = $(this).attr("data-link");
			
			window.location.href = x;
			
			return false;
		});
		
		$(".dialog_content.very_narrow").dialog( "option" , "width" , 300 );
		$(".dialog_content.narrow").dialog( "option" , "width" , 450 );
		$(".dialog_content.wide").dialog( "option" , "width" , 650 );
		$(".dialog_content.medium_height").dialog( "option" , "height" , 315 );
		
		$(".ui-widget-overlay").live("click", function(){
			$(".dialog_content").dialog( "close" ); 
			return false;
		});	
			
	// Bounce Slider	
		$("#slider_close_dialog").slider({
			value: "0",
			range: "min",
			animate: true,
			stop: dialogClose
		});	

		function dialogClose(e,ui){
			if($(this).slider("value") > 95){
				$("#dialog_content_1").dialog("close");
				$(this).find(".ui-slider-handle").animate({left: 0}, 350 );
				$(this).find(".ui-slider-range").animate({width:0});
			}
			else{
				$(this).find(".ui-slider-handle").animate({left: 0}, 350 );
				$(this).find(".ui-slider-range").animate({width:0});
			}			
		}  

		// Login & Register Validation
		$("#register").validate({
			rules: {
				email: "required",
				username_new: {
					required: true,
					minlength: 6
				},
				password_new: {
					required: true,
					minlength: 6
				},
				password_confirm: {
					required: true,
					minlength: 6,
					equalTo: "#password_new"
				}
			}
		});

 		 $("#login").validate({
			rules: {
				username: {
					required: true,
					minlength: 3
				},
				password: {
					required: true,
					minlength: 6
				}
			}
		});
  
   
});