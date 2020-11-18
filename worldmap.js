var enabled_countries = [
    "albania",
    "austria",
    "belgium",
    "canada",
    "france",
    "germany",
    "hungary",
    "italy",
    "netherlands",
    "norway",
    "portugal",
    "spain",
    "united-kingdom",
    "united-states-of-america"];

var width = 960,
    height = 500;

var projection = d3.geoMercator()
    .center([0, 38])
    .scale(150)
    .rotate([0,0]);

var svg = d3.select("#worldmap").append("svg")
    .attr("width", width)
    .attr("height", height);
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox","0 0 " + width + " " + height);

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g");

// load and display the World
d3.json("data/countries-110m.json").then(function(topology) {

    g.selectAll("path")
       .data(topojson.feature(topology, topology.objects.countries).features)
       .enter().append("path")
       .attr("d", path)
       // .attr("fill", function(d) {
       //  if (d.properties.name == "Italy") {
       //      return "white";
       //  } else {
       //      return "grey";
       //  }
       // })
       .classed("enabled", function(d) {
            id_country = d.properties.name.toLowerCase().replaceAll(" ", "-");
            return enabled_countries.includes(id_country);
       })
       .on('mousedown.log', function (d) {
            // console.log(d.target.__data__.properties);
            id_country = d.target.__data__.properties.name.toLowerCase().replaceAll(" ", "-");
            // console.log(id_country);
            if (enabled_countries.includes(id_country)) {
                window.top.location.href = "/#/" + id_country;
            }
        });

});

var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function(event) {
          g.selectAll('path')
           .attr('transform', event.transform);
});

svg.call(zoom);