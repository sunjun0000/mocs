function loadData() {
	var jsonData = document.getElementById("myform:beanvalue").value;
	//alert(jsonData);
	//jsonData=null;
	if (null != jsonData && "" != jsonData) {
		var barModel = eval('(' + jsonData + ')');
		generateChart(barModel);
	} else {
		document.getElementById("highchartChart").innerHTML += "<div style=\"font-size:0.3rem;text-align:center;" + "color:rgb(150,150,150);padding:1.5rem;\" align=\"center\"><span data-i18n='zwxxts'></span></div>";
	}
}

function generateChart(barModel) {
	var chart;
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'highchartChart',
			type: 'bar',
			width: $("#highchartChart").width(),
			height: $("#highchartChart").height(),
			backgroundColor: 'rgba(255, 255, 255, 0)',
			plotBorderColor: null,
			plotBackgroundColor: null,
			plotBackgroundImage: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: barModel.title,
			style: {
				color: '#7A7A7A'
			}
		},
		xAxis: {
			categories: barModel.columnKeys
		},
		yAxis: {
			min: 0,
			max: 100,
			title: {
				text: null
			}
		},
		legend: {
			backgroundColor: '#FFFFFF',
			reversed: true,
			borderWidth: 0,
		},
		tooltip: {
			formatter: function() {
				return '' + this.series.name + ': ' + this.y + '';
			}
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		plotOptions: {
			series: {
				stacking: 'normal'
			}
		},
		series: [{
			name: barModel.rowKeys[4],
			data: barModel.data4,
			color: 'rgba(251,117,0,1)'
		},
		{
			name: barModel.rowKeys[3],
			data: barModel.data0,
			color: 'rgba(160,160,160,1)'
		},
		{
			name: barModel.rowKeys[2],
			data: barModel.data3,
			color: 'rgba(244,221,12,1)'
		},
		{
			name: barModel.rowKeys[1],
			data: barModel.data2,
			color: 'rgba(108,204,71,0.4)'
		},
		{
			name: barModel.rowKeys[0],
			data: barModel.data1,
			color: 'rgba(0,129,206,0.4)'
		}]
	});
};