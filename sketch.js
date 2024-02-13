let barCharts = [];
let data;
let cleanData=[];
let numRows;

let fontLight; 
let fontRegular; 
let fontBold;

function preload(){
    data = loadTable("data/combined.csv", "csv", "header");
    fontLight = loadFont('Fonts/Montserrat-Thin.ttf')
    fontRegular = loadFont('Fonts/Montserrat-Regular.ttf')
    fontBold = loadFont('Fonts/Montserrat-Bold.ttf')
}

function setup(){
    background(50)
    createCanvas(1000, 1000)

    angleMode(DEGREES);

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj)
    }
    console.log(cleanData)

    let barChart01 = {
        data:cleanData,
        chartHeight:200,
        chartWidth:200,
        xPos:250,
        yPos:450,
        axisLineColour:"#d9d9d9",
        barWidth:10,
        yValue:"Total"
    }

    let barChart02 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:50,
        yPos:450,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"Female",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Age_Group",
        numTicks: 5
    }

    let barChart03 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:50,
        yPos:450,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"Female",
        barColour:"#eeccee",
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Age_Group",
        numTicks: 5
    }


    // barCharts.push(new BarChart(barChart02));
    // barCharts.push(new ScatterPlotGraph(barChart02));
    barCharts.push(new HorizontalBarGraph(barChart03));

}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
    
}
