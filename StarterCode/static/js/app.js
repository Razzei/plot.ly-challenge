function extractData(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var results = metadata.filter(element => element.id == sample);
      var result = results[0]
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });    
    });
  }

function barChart(sample) {
d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var results = samples.filter(element => element.id == sample);
    var result = results[0]
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var barData =[
    {
        y:ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
        x:values.slice(0, 10).reverse(),
        text:labels.slice(0, 10).reverse(),
        type:"bar",
        orientation:"h"

    }
    ];

    var layout = {
    title: "Top 10 OTUs Found",
    margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, layout);
    });
}

function bubbleChart(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var results = samples.filter(element => element.id == sample);
    var result = results[0]
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var bubbleData = [
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            color: ids,
            size: values,
            }
        }
      ];

    var layout = {
      margin: { t: 0 },
      xaxis: { title: "Id's" },
      hovermode: "closest",
      };



    Plotly.plot("bubble", bubbleData, layout);
  })
}  
 
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    var names = data.names;
    names.forEach((name) => {
      selector
        .append("option")
        .text(name)
        .property("value", name);
    });

    const initial = names[0];
    barChart(initial);
    bubbleChart(initial);
    extractData(initial);
  });
}

function optionChanged(change) {
  barChart(change);
  bubbleChart(change);
  extractData(change);
}

init();