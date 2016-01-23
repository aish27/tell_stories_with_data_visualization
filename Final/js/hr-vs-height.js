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
            .text("Graph for height vs. average number of home runs");

    //Create a chart to have the graph for height vs. avg based on handedness
    var myChart = new dimple.chart(svg, data);
    var x1 = myChart.addCategoryAxis("x", ["height"]);
    var y1 = myChart.addMeasureAxis("y", ["HR"]);
    var mySeries = myChart.addSeries(null, dimple.plot.bar);
    mySeries.interpolation = "cardinal";
    mySeries.aggregate = dimple.aggregateMethod.avg;

    x1.title = "Height in inches";
    y1.title = "Average number of home runs ";
    myChart.axisTitle = "How does the batting average of players vary \n\
    depending on height and handedness?";



    //change standard tooltip
    //Code adapted from http://dimplejs.org/advanced_examples_viewer.html?
    //id=advanced_custom_styling
    mySeries.addEventHandler("mouseover", function (e) {

        // Make a text tag containing our required information
        svg.selectAll(".dimple-hover-text")
                .append("div")
                .style("border","2px black solid")
                .data(["Height: " + e.xValue, "Average home runs: " +
                    d3.format(",.2f")(e.yValue)])
                .enter()
                .append("text")
                .attr("class", "dimple-hover-text")
                .attr("x", myChart._xPixels() -150 + myChart._widthPixels())
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
    mySeries.addEventHandler("mouseleave", function (e) {
       svg.selectAll(".dimple-hover-text").remove();
    });

    myChart.draw(800);
}
;