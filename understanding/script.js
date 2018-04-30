window.chartColors = {
	red: 'rgb(230, 25, 75)',
    green: 'rgb(60,180,75)',
	orange: 'rgb(245, 130, 48)',
	yellow: 'rgb(255, 225, 25)',
    blue: '#0082c8',
    purple: '#f58231',
    cyan: '#46f0f0',
    magenta: '#f032e6',
    lime: '#d2f53c',
    pink: '#fabebe',
    teal: '#008080',
    lavender: '#e6beff',
    brown: '#aa6e28',
    beige: '#fffac8',
    maroon: '#800000'
};

var table;
var UseChart;
var FreqChart;
var colorNames = Object.keys(window.chartColors);

function preload() {
    table = loadTable('Data/drugs.csv', 'csv','header');
}
var Labels;
var alcoholUse;
function setup() {
    Labels= table.getColumn('age');
    alcoholUse = table.getColumn('alcohol-use');
    alcoholFreq = table.getColumn('alcohol-frequency')
    //console.log(table.getColumn('age'))
    
    UseChart = buildChart("useChart", alcoholUse, 'Drug Use', "Alcohol");
    FreqChart = buildChart("freqChart", alcoholFreq, 'Drug Frequency', "Alcohol");
    
    var alcoholCheck = document.getElementById('alcoholCheck');
    alcoholCheck.addEventListener('click', function() {
        if (alcoholCheck.checked == true) {
            updateCharts("Alcohol",'alcohol-use','alcohol-frequency')
        } else {
            removeData("Alcohol");
        }
    });
    
    var mariCheck = document.getElementById('marijuanaCheck');
    mariCheck.addEventListener('click', function() {
        if (mariCheck.checked == true) {
            updateCharts("Marijuana",'marijuana-use','marijuana-frequency')
        } else {
            removeData("Marijuana");
        }
    });
    
    var cocaineCheck = document.getElementById('cocaineCheck');
    cocaineCheck.addEventListener('click', function() {
        if (cocaineCheck.checked == true) {
            updateCharts("Cocaine",'cocaine-use','cocaine-frequency')
        } else {
            removeData("Cocaine");
        }
    });
    
    var crackCheck = document.getElementById('crackCheck');
    crackCheck.addEventListener('click', function() {
        if (crackCheck.checked == true) {
            updateCharts("Crack",'crack-use','crack-frequency')
        } else {
            removeData("Crack");
        }
    });
    
    var heroin = document.getElementById('heroinCheck');
    heroinCheck.addEventListener('click', function() {
        if (heroinCheck.checked == true) {
            updateCharts("Heroin",'heroin-use','heroin-frequency')
        } else {
            removeData("Heroin");
        }
    });
    
    var hallucCheck = document.getElementById('hallucinogenCheck');
    hallucCheck.addEventListener('click', function() {
        if (hallucCheck.checked == true) {
            updateCharts("Hallucinogen",'hallucinogen-use','hallucinogen-frequency')
        } else {
            removeData("Hallucinogen");
        }
    });
    
    var inhalantCheck = document.getElementById('inhalantCheck');
    inhalantCheck.addEventListener('click', function() {
        if (inhalantCheck.checked == true) {
            updateCharts("Inhalant",'inhalant-use','inhalant-frequency')
        } else {
            removeData("Inhalant");
        }
    });
    
    var painCheck = document.getElementById('painCheck');
    painCheck.addEventListener('click', function() {
        if (painCheck.checked == true) {
            updateCharts("Pain Reliever",'pain-releiver-use','pain-releiver-frequency')
        } else {
            removeData("Pain Reliever");
        }
    });
    
    var oxyCheck = document.getElementById('oxycontinCheck');
    oxyCheck.addEventListener('click', function() {
        if (oxyCheck.checked == true) {
            updateCharts("Oxycontin",'oxycontin-use','oxycontin-frequency')
        } else {
            removeData("Oxycontin");
        }
    });
    
    var tranqCheck = document.getElementById('tranquilizerCheck');
    tranqCheck.addEventListener('click', function() {
        if (tranqCheck.checked == true) {
            updateCharts("Tranquilizer",'tranquilizer-use','tranquilizer-frequency')
        } else {
            removeData("Tranquilizer");
        }
    });
    
    var stimCheck = document.getElementById('stimCheck');
    stimCheck.addEventListener('click', function() {
        if (stimCheck.checked == true) {
            updateCharts("Stimulant",'stimulant-use','stimulant-frequency')
        } else {
            removeData("Stimulant");
        }
    });
    
    var methCheck = document.getElementById('methCheck');
    methCheck.addEventListener('click', function() {
        if (methCheck.checked == true) {
            updateCharts("Meth",'meth-use','meth-frequency')
        } else {
            removeData("Meth");
        }
    });
    
    var sedCheck = document.getElementById('sedativeCheck');
    sedCheck.addEventListener('click', function() {
        if (sedCheck.checked == true) {
            updateCharts("Sedative",'sedative-use','sedative-frequency')
        } else {
            removeData("Sedative");
        }
    });
    
}
function buildChart(canvas, data, title, legend){
    var yaxisLabel;
    if(title == 'Drug Use'){
        yaxisLabel = 'Percentage of those who used in past year'
    }else{
        yaxisLabel = 'Median number of times used in past year'
    }
    var chart = new Chart(document.getElementById(canvas), {
        type: 'line',
        data: { 
            labels: Labels,
            datasets: [{ 
                data: data,
                label: legend,
                borderColor: "#3e95cd",
                fill: false
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        bottom: 50,
                        top: 50
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true, 
                            labelString: 'Age',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true, 
                            labelString: yaxisLabel,
                            fontSize: 18
                        }
                    }]
                },
                title: {
                    display: true,
                    text: title
                }
            }
        });
    return chart;
}

function updateCharts(title, datasetNameUse, datasetNameFreq) {
    var newDatasetUse = {
        label: title,
        //backgroundColor: window.chartColors.red,
        borderColor: randomColor(),
        data: table.getColumn(datasetNameUse),
        fill: false
    };
    
    var newDatasetFreq = {
        label: title,
        //backgroundColor: window.chartColors.red,
        borderColor: randomColor(),
        data: table.getColumn(datasetNameFreq),
        fill: false
    };


    UseChart.data.datasets.push(newDatasetUse);
    UseChart.update();
    FreqChart.data.datasets.push(newDatasetFreq);
    FreqChart.update();
}

function removeData(title){
    var index;
    for (i=0; i< UseChart.data.datasets.length; i++) {
        if (UseChart.data.datasets[i].label == title) {
            index = i;
            break;
        }
    }
    UseChart.data.datasets.splice(index,1);
    FreqChart.data.datasets.splice(index,1);
    UseChart.update();
    FreqChart.update();
}

function randomColor(){
    var colorName = colorNames[UseChart.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    return newColor;
}




