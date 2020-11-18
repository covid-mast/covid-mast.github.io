// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    mouseWheel: true,
    touch: true,
    viewDistance: 100,
    menu: { // Menu works best with font-awesome installed: sudo apt-get install fonts-font-awesome
        themes: false,
        transitions: false,
        markers: true,
        hideMissingTitles: true, //,
        // custom: [
        //     { title: 'Plugins', icon: '<i class="fa fa-external-link-alt"></i>', src: 'toc.html' },
        //     { title: 'About', icon: '<i class="fa fa-info"></i>', src: 'about.html' }
        // ]},
    },
    chart: {
        defaults: {
            global: {
                defaultFontFamily: "Lato, sans-serif",
                legend: {
                    labels: { fontColor: "#EEE" },
                }
            },
            scale: {
                scaleLabel: { fontColor: "#EEE" },
                // gridLines: { 
                    // color: "#FFF", 
                    // zeroLineColor: "#FFF" 
                // },
                ticks: { fontColor: "#EEE" },
            }
        }
    },
    plugins: [ RevealMarkdown, RevealMenu, RevealHighlight, RevealChart ],
    // dependencies: [
    //     { src: 'https://d3js.org/d3.v4.min.js' },
    //     { src: 'reveal.js-d3js-plugin/d3js.js' }
    // ]
    
});