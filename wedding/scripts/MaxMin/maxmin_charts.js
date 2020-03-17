$(document).ready(function() {

/* charts colors */
var i_gcolor = '2e7bb8', i_color = '#aaaaa', i_grid = { color:i_color, borderWidth:1 };
var i_options = {
		grid: i_grid,
		yaxis: { color:i_color },
		xaxis: { color:i_color}
	};

/* Theme Tones */	
var mx_color_1 = '#428BC2';
var mx_color_2 = '#236496';
var mx_color_3 = '#7C9FCB';
var mx_color_4 = '#1A527D';
var mx_color_5 = '#81B2D7';

/* Your Colors ( Already Selected ) */
var color_1 = '#428BC2';
var color_2 = '#E64B4B';
var color_3 = '#FCE845';
var color_4 = '#FF9630';
var color_5 = '#AC7F48';
var color_6 = '#E34371';
var color_7 = '#7DAD49';
var color_8 = '#1BC1DB';
var color_9 = '#FFFFFF';
var color_10 = '#CCCCCC';
var color_11 = '#000000';

/* Line Chart */

initLineChart = function() {

	
	var sin = [], cos = [];
    for (var i = 0; i < 14; i += 0.1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    var plot = $.plot($("#linechart"),
                      [ { data: sin, label: "sin(x) = -0.00", color: mx_color_1},
                        { data: cos, label: "cos(x) = -0.00", color: mx_color_2 } ], {
                            series: {
                                lines: { show: true }
                            },
                            crosshair: { mode: "x", color: mx_color_5 },
                            grid: { hoverable: true, autoHighlight: false, color:i_color, borderWidth:1 },
                            yaxis: { min: -1.2, max: 1.2, color:i_color },
                            xaxis: { color:i_color }
                        });
    
    var legends = $("#linechart .legendLabel");
    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width());
    });

    var updateLegendTimeout = null;
    var latestPosition = null;
    
    function updateLegend() {
        updateLegendTimeout = null;
        
        var pos = latestPosition;
        
        var axes = plot.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
            return;

        var i, j, dataset = plot.getData();
        for (i = 0; i < dataset.length; ++i) {
            var series = dataset[i];

            // find the nearest points, x-wise
            for (j = 0; j < series.data.length; ++j)
                if (series.data[j][0] > pos.x)
                    break;
            
            // now interpolate
            var y, p1 = series.data[j - 1], p2 = series.data[j];
            if (p1 == null)
                y = p2[1];
            else if (p2 == null)
                y = p1[1];
            else
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);	            

	    	console.log(legends);
            legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
        }
    }
    
    $("#linechart").bind("plothover",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);
    });
};

/* Real Time Chart */

initRealtimeChart = function() {
	// we use an inline data source in the example, usually data would
	// be fetched from a server
	var data = [], totalPoints = 300;
	function getRandomData() {
		if (data.length > 0)
			data = data.slice(1);

		// do a random walk
		while (data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			if (prev > 65) {
				var y = prev + Math.random() * 11 - 6;
			} else if (prev < 35) {
				var y = prev + Math.random() * 11 - 4;
			} else {
				var y = prev + Math.random() * 11 - 5;
			}
			if (y < 5)
				y = 15;
			if (y > 95)
				y = 85;
			data.push(y);
		}

		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i)
			res.push([i, data[i]])
		return res;
	}

	// setup control widget
	var updateInterval = 300;

	// setup plot
	var options = {
		colors: [ color_1 ],
		series: { 
			lines: { 
				lineWidth: 1, 
				fill: true,
				fillColor: { colors: [ { opacity: 0.6 }, { opacity: 0.1 } ] },
				steps: false
			} 
		}, // drawing is faster without shadows
		grid: i_grid,
		yaxis: { min: 0, max: 100, color:i_color },
		xaxis: { show: false, color:i_color}
	};
	var plot = $.plot($("#realtime"), [ getRandomData() ], options);

	function update() {
		plot.setData([ getRandomData() ]);
		// since the axes don't change, we don't need to call plot.setupGrid()
		plot.draw();
		
		setTimeout(update, updateInterval);
	}

	update();
};

/* Pie Chart */

initPieChart = function(id) {
	// data
	var data = [
		{ label: "Cameras",  data: 20, color: color_1 },
		{ label: "Consoles",  data: 50, color: color_2 },
		{ label: "Desktops",  data: 50, color: color_3 },
		{ label: "Laptops",  data: 40, color: color_4 },
		{ label: "M.Phones",  data: 45, color: color_5 },
		{ label: "PDA's",  data: 35, color: color_6 },
		{ label: "Servers",  data: 50, color: color_7 },
		{ label: "Tablets",  data: 30, color: color_8 }
	];
	
	$.plot($(id), data, {
		series: {
			pie: { 
				show: true
			}
		},
		grid: {
            hoverable: true,
            clickable: true
        }
	});
};

/* Tooltip Chart */

initTooltipChart = function(id) {		

	var sales = [[1325376000000, 100], [1325462400000, 110], [1325548800000, 105], [1325635200000, 108], [1325721600000, 102], [1325808000000, 115], [1325894400000, 110], [1325980800000, 114], [1326067200000, 108], [1326153600000, 120], [1326240000000, 118], [1326326400000, 122], [1326412800000, 127], [1326499200000, 120], [1326672000000, 132], [1326758400000, 130], [1326844800000, 128], [1326931200000, 136], [1327017600000, 138], [1327104000000, 132], [1327190400000, 135], [1327276800000, 133], [1327363200000, 139], [1327449600000, 134], [1327536000000, 142], [1327622400000, 138], [1327708800000, 143], [1327795200000, 145], [1327881600000, 148], [1327968000000, 155]];
	var costs = [[1325376000000, 100], [1325462400000, 110], [1325548800000, 105], [1325635200000, 108], [1325721600000, 102], [1325808000000, 115], [1325894400000, 110], [1325980800000, 114], [1326067200000, 108], [1326153600000, 120], [1326240000000, 118], [1326326400000, 122], [1326412800000, 127], [1326499200000, 123], [1326672000000, 132], [1326758400000, 130], [1326844800000, 128], [1326931200000, 136], [1327017600000, 138], [1327104000000, 132], [1327190400000, 135], [1327276800000, 133], [1327363200000, 139], [1327449600000, 134], [1327536000000, 142], [1327622400000, 138], [1327708800000, 143], [1327795200000, 145], [1327881600000, 148], [1327968000000, 155]];
	
	var plot = $.plot($(id),
           [ { data: sales, label: "Sales x1000", color: mx_color_1 /* Line 'Sales' Color  */}, { data: costs, label: "Costs", color: mx_color_2 /* Line 'Costs' color */, yaxis: 2 } ], {
               series: {
                   lines: { show: true },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true, color:i_color, borderWidth:1 },
               xaxes: [ { mode: 'time', color:i_color } ],
               yaxes: [ { min: 0, color:i_color },{ 
            	   tickFormatter: euroFormatter,
            	   alignTicksWithAxis: 'right',
                   position: 'right'
               }]
             });
    
    function showTooltip(x, y, contents) {
        $('<div id="chart_tooltip">' + contents + '</div>').css( {
            top: y - 30,
            left: x + 5,
        }).appendTo("body").fadeIn(200);
    }	    

	function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) +"€";
    }

    var previousPoint = null;
    $(id).bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                
                $("#chart_tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                
                showTooltip(item.pageX, item.pageY,
                            item.series.label + " = " + y + " €");
            }
        }
        else {
            $("#chart_tooltip").remove();
            previousPoint = null;            
        }
    });
};

/* Stacked Graph */
initStackedGraph = function(id){
    var css_id = "#stack";
    var data = [
        {label: 'Store', data: [[1,300], [2,300], [3,300], [4,300], [5,300]], color: mx_color_1 },
        {label: 'E-Store', data: [[1,800], [2,600], [3,400], [4,200], [5,0]], color: mx_color_2 },
        {label: 'Telephone', data: [[1,100], [2,200], [3,300], [4,400], [5,500]], color: mx_color_3 },
    ];
    var options = {
        series: {stack: 0,
                 lines: {show: false, steps: false },
                 bars: {show: true, barWidth: 0.7, align: 'left',},},
        xaxis: {ticks: [[1,'24-40 Age'], [2,'20-24 Age'], [3,'18-20 Age'], [4,'12-16 Age'], [5,'10-12 Age']]},
        grid: { hoverable: true, clickable: true, color:i_color, borderWidth:1 }
    };

    $.plot($(css_id), data, options);
};
		  
});