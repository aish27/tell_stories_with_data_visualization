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

    //add the title for the pie chart.  
    d3.select("#placeholder-1_title")
            .append("h2")
            .text("Graph for height vs. batting average based on handedness");

    //Create a chart to have the graph for height vs. avg based on handedness
    var myChart = new dimple.chart(svg, data);
    var x1 = myChart.addCategoryAxis("x", ["height", "handedness"]);
    var y1 = myChart.addMeasureAxis("y", ["avg"]);
    var mySeries = myChart.addSeries(["handedness"], dimple.plot.area);
    //var mySeries2 =myChart.addSeries(["handedness"], dimple.plot.scatter);
    mySeries.interpolation = "cardinal";
    mySeries.aggregate = dimple.aggregateMethod.avg;
    //mySeries2.aggregate = dimple.aggregateMethod.avg;
    var myLegend = myChart.addLegend(530, 100, 60, 300, "Right");
    x1.title = "Height in inches";
    y1.title = "Batting average";
    myChart.axisTitle = "How does the batting average of players vary \n\
    depending on height and handedness?";
    
    myChart.draw(800);

    // Following code for legend animation adapted from 
    //http://dimplejs.org/advanced_examples_viewer.html?id=
    //advanced_interactive_legends
    //create a legend

    myChart.legends = [];

    //determine values for the legend
    var filterValues = dimple.getUniqueValues(data, "handedness");
    myLegend.shapes.selectAll("rect").on("click", function (e) {
        var hide = false;
        var newFilters = [];
        filterValues.forEach(function (f) {
            if (f === e.aggField.slice(-1)[0]) {
                hide = true;
            } else {
                newFilters.push(f);
            }
        });
        if (hide) {
            d3.select(this).style("opacity", 0.2);
        } else {
            newFilters.push(e.aggField.slice(-1)[0]);
            d3.select(this).style("opacity", 0.8);
        }
        filterValues = newFilters;
        myChart.data = dimple.filterData(data, "handedness", filterValues);
        myChart.draw(800);
    });


    //Draw the pie chart for showing the handedness of various players.
    //create an svg element to hold the pie chart.
    var svg3 = d3.select("#placeholder-2")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height - (margin / 2))
            .append('g')
            .attr('class', 'chart');

    //add the title for the pie chart.  
    d3.select("#placeholder-2_title")
            .append("h2")
            .text("Composition of people depending on the handedness");

    //draw the actual pie chart 
    var myChart3 = new dimple.chart(svg3, data);
    myChart3.addMeasureAxis("p", "avg");
    var mySeries2 = myChart3.addSeries("handedness", dimple.plot.pie);
    mySeries2.aggregate = dimple.aggregateMethod.count;
    myChart3.addLegend(10, 10, 250, 50, "right");
    myChart3.draw();
}
;