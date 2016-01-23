function draw(data) {

    //Sets the size of svg elements.
    "use strict";
    var margin = 75,
            width = 600 - margin,
            height = 500 - margin;

    //Graph for height vs. avg based on handedness
    //One svg element to hold the following graph.
    var svg = d3.select("#placeholder-1")
            .append("svg")
            .attr("width", width + margin + 200)
            .attr("height", height + margin)
            .append('g')
            .attr('class', 'chart');
    
    //add the title for the chart.  
    d3.select("#placeholder-1_title")
            .append("h2")
            .text("Graph of height of players versus the batting average");

    //Create a chart to have the graph for height vs. avg based on handedness
    var myChart = new dimple.chart(svg, data);
    var x1 = myChart.addCategoryAxis("x", ["height"]);
    var y1 = myChart.addMeasureAxis("y", ["avg"]);
    var mySeries = myChart.addSeries(null, dimple.plot.line);
    var mySeries2 = myChart.addSeries(null, dimple.plot.scatter);
    //mySeries.interpolation = "cardinal";
    mySeries.aggregate = dimple.aggregateMethod.avg;
    mySeries2.aggregate = dimple.aggregateMethod.avg;
    //var myLegend = myChart.addLegend(530, 100, 60, 300, "Right");
    x1.title = "Height in inches";
    y1.title = "Batting average";
    myChart.draw(800);




}
;