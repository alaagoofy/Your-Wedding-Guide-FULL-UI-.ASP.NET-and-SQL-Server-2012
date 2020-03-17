$(document).ready(function() {
//Fullcalendar		
	
    $('#calendar').fullCalendar({
    		firstDay:'1',
    		weekMode:'liquid',
    		aspectRatio: '1.5',
			theme:true,
			selectable:true,
			editable:true,
			draggable:true,
			droppable:true,
			timeFormat:'H:mm',
	    	axisFormat:'H:mm',
	    	columnFormat:{
			    month: 'ddd',    // Mon
			    week: 'ddd dS', // Mon 9/7
			    day: 'dddd dS MMMM'  // Monday 9/7
			},
			titleFormat:{
			    month: 'MMMM yyyy',                             // February 2012
			    week: "MMM d[ yyyy]{ 'to'[ MMM] d, yyyy}", // Feb 13 - 14 2012
			    day: 'ddd, MMMM d, yyyy'                  // Tuesday, Feb 14, 2009
			},
	    	allDayText:'All Day',
			header:{
			    left:   'prev title next, today',
			    center: '',
			    right:  'agendaWeek,agendaDay,month'
				},
			
			eventSources: [

			        // your event source
			        {
			            events: [ // put the array in the `events` property
			                {
			                    title  : 'Company AGM',
			                    start  : '2011-04-03',
							    className:'calendar_green'
			                },
			                {
			                    title  : 'Business Trip',
			                    start  : '2011-04-15',
			                    end    : '2011-04-20',
							    className:'calendar_cyan'
			                },
			                {
			                    title  : 'Day off',
			                    start  : '2011-04-08 12:30:00',
							    className:'calendar_red'
			                }
			            ]
			        },
					{
						url: 'https://www.google.com/calendar/feeds/ddk3tivrtfhv9jubvh020af23s%40group.calendar.google.com/public/basic',
						className: 'calendar_blue'
					}
			
			
			    ],
			
			drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		}
	        
	    });
	
	$('ul#calendar_drag_list li a').each(function() {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()), // use the element's text as the event title
			className: 'calendar_blue'
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 10,  //  original position after the drag
			cursorAt: { top:15, left: 0 }
		});
		
	});
});