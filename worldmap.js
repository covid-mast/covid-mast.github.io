// spinner
$(window).on('load', function(){
  setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});


function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}

// worldmap
var unit_to_country = {
    "albania": "albania",
    "austria": "austria",
    "belgium": "belgium",
    "canada": "canada",
    "france": "france",
    "germany": "germany",
    "hungary": "hungary",
    "italy": "italy",
    "netherlands": "netherlands",
    "norway": "norway",
    "portugal": "portugal",
    "spain": "spain",
    "england": "united-kingdom",
    "scotland": "united-kingdom",
    "wales": "united-kingdom",
    "n.-ireland": "united-kingdom",
    "united-states-of-america": "united-states-of-america",
}

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
d3.json("data/map/map-units-110m.json").then(function(topology) {

    g.selectAll("path")
       .data(topojson.feature(topology, topology.objects.map_units).features)
       .enter().append("path")
       .attr("d", path)
       .classed("enabled", function(d) {
            id_unit = d.properties.name.toLowerCase().replaceAll(" ", "-");
            return Object.keys(unit_to_country).includes(id_unit);
       })
       .on('mousedown.log', function (d) {
            console.log(d.target.__data__.properties);
            id_unit = d.target.__data__.properties.name.toLowerCase().replaceAll(" ", "-");

            // console.log(id_unit);
            if (Object.keys(unit_to_country).includes(id_unit)) {
                window.top.location.href = "/#/" + unit_to_country[id_unit];
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