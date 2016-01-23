
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
            .text("Graph for height vs. batting average based on handedness");

    //Create a chart to have the graph for height vs. avg based on handedness
    var myChart = new dimple.chart(svg, data);
    var x1 = myChart.addCategoryAxis("x", ["height", "handedness"]);
    var y1 = myChart.addMeasureAxis("y", ["avg"]);
    var mySeries = myChart.addSeries(["handedness"], dimple.plot.area);
    mySeries.interpolation = "cardinal";
    mySeries.aggregate = dimple.aggregateMethod.avg;
    var myLegend = myChart.addLegend(630, 55, 60, 300, "Right");
    x1.title = "Height in inches";
    y1.title = "Batting average";

    myChart.assignColor("R", "#F8AC69", "#DA975C", 1);
    myChart.assignColor("L", "#FB998E", "#C77C78", 1);
    myChart.assignColor("B", "#99C0DB", "#82A3B9", 1);
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

    //Graph for height vs. avg based on handedness
    //One svg element to hold the following graph.
    var svg3 = d3.select("#placeholder-2")
            .append("svg")
            .attr("width", width + margin + 200)
            .attr("height", height + margin)
            .append('g')
            .attr('class', 'chart');

    //add the title for the pie chart.  
    d3.select("#placeholder-2_title")
            .append("h2")
            .text("So, left-handed people have the highest batting average in \n\
general. \nHow many people are actually left-handed?");

    //draw the actual pie chart 
    var myChart3 = new dimple.chart(svg3, data);
    myChart3.addMeasureAxis("p", "avg");
    var mySeries2 = myChart3.addSeries("handedness", dimple.plot.pie);
    mySeries2.aggregate = dimple.aggregateMethod.count;
    myChart3.addLegend(600, 0, 0, 300, "left");
    myChart3.assignColor("R", "#F8AC69", "#DA975C", 1);
    myChart3.assignColor("L", "#FB998E", "#C77C78", 1);
    myChart3.assignColor("B", "#99C0DB", "#82A3B9", 1);

    //change standard tooltip
    //Code adapted from http://dimplejs.org/advanced_examples_viewer.html?
    //id=advanced_custom_styling
    mySeries2.addEventHandler("mouseover", function (e) {

        // Make a text tag containing our required information
        svg3.selectAll(".dimple-hover-text")
                .style("border", "2px black solid")
                .data(["Handedness: " + e.seriesValue,
                    "Number of players: " + e.pValue,
                    "Percentage: " + d3.format(",.2f")(e.pValue * 100 / 1157) + "%"])
                .enter()
                .append("text")
                .attr("class", "dimple-hover-text")
                .attr("x", myChart._xPixels() - 650 + myChart._widthPixels())
                .attr("y", function (d, i) {
                    return myChart._yPixels() + 11 + i * 25;
                })
                .style("font-size", "12px")
                .style("fill", "#428BD1")
                .style("font-family", "Roboto")
                .text(function (d) {
                    return d;
                });
    });
    // Clear the text on exit
    mySeries2.addEventHandler("mouseleave", function (e) {
        svg3.selectAll(".dimple-hover-text").remove();
    });
    myChart3.draw();

    d3.selectAll("text.dimple-b").text("B : Both-hands");
    d3.selectAll("text.dimple-l").text("L : Left-handed");
    d3.selectAll("text.dimple-r").text("R : Right-handed");
}
;