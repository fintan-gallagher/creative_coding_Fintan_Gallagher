let barCharts = [];
let data;
let cleanData=[];
let numRows;

let fontLight; 
let fontRegular; 
let fontBold;

function preload(){
    data = loadTable("data/ApartmentRent.csv", "csv", "header");
    fontLight = loadFont('Fonts/Outfit-Thin.ttf')
    fontRegular = loadFont('Fonts/Outfit-Regular.ttf')
    fontBold = loadFont('Fonts/Outfit-Bold.ttf')
}

function setup(){
    background(50)
    createCanvas(2000, 2000)
    // noLoop();
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
        yValue:"One Bed",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart03 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:600,
        yPos:0,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"One Bed",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart04 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:-600,
        yPos:300,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"Two Bed",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart05 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:600,
        yPos:700,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValueMale: "Male",
        yValueFemale: "Female",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Age_Group",
        numTicks: 5
    }

    let barChart06 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:0,
        yPos:700,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValues: ["One Bed", "Two Bed", "Three Bed"],
        totalValue: "Total",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart07 = {
        data:cleanData,
        chartHeight:400,
        chartWidth:400,
        xPos:600,
        yPos:0,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"One Bed",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }


    barCharts.push(new BarChart(barChart02));
    // barCharts.push(new ScatterPlotGraph(barChart03));
    barCharts.push(new Scatter2(barChart03));
    barCharts.push(new HorizontalBarGraph(barChart04));
    // barCharts.push(new StackedBarChart(barChart05));
    barCharts.push(new StackedBarChart2(barChart06));
    barCharts.push(new LineGraph(barChart07));

}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
    
}

