let barCharts = [];
let data;
let cleanData=[];
let numRows;

let fontLight; 
let fontRegular; 
let fontBold;

function preload(){
    data = loadTable("data/AverageRent.csv", "csv", "header");
    fontLight = loadFont('Fonts/Outfit-Thin.ttf')
    fontRegular = loadFont('Fonts/Outfit-Regular.ttf')
    fontBold = loadFont('Fonts/Outfit-Bold.ttf')
}

function setup(){
    background(0)
    createCanvas(4000, 2000)
    noLoop();
    angleMode(DEGREES);

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj)
    }
    console.log(cleanData)

    let barChart01 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:70,
        yPos:600,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"Dublin",
        barColour:['#000033', '#000066', '#000099', '#0000CC', '#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF', '#E6E6FF', '#F2F2FF', '#FFFFFF'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 10,
        chartTitle: "Average Monthly Rent (Dublin City)"
    }

    let barChart01b = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:600,
        yPos:0,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"National",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5,
        chartTitle: "Average Monthly Rent (National)"
    }

    let barChart02 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:600,
        yPos:0,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"National",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart03 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:-600,
        yPos:300,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"Outside GDA",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5,
        chartTitle: "Average Monthly Rent (Outside Greater Dublin Area)"
    }

    let barChart03b = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:-1200,
        yPos:300,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"GDA",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5,
        chartTitle: "Average Monthly Rent (Greater Dublin Area)"
    }

    let barChart04 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:0,
        yPos:800,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValues: ["National", "Dublin", "GDA", "Outside GDA"],
        totalValue: "Total",
        barColour:['#0000CC', '#3333FF', '#6666FF', '#F2F2FF'],
        labelColour:"#e1e1e1",
        labelRotation:90,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart05 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:600,
        yPos:0,
        axisLineColour:"#d9d9d9",
        barWidth:25,
        yValue:"GDA",
        barColour:['#0384fc', '#47a6ff', '#62b2fc', '#82c0fa', '#99caf7', '#bbdcfa'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5
    }

    let barChart06 = {
        data:cleanData,
        chartHeight:500,
        chartWidth:500,
        xPos:0,
        yPos:800,
        axisLineColour:"#d9d9d9",
        barWidth:7.8,
        yValues: ["National", "Dublin", "GDA", "Outside GDA"],
        totalValue: "Dublin",
        barColour:['#0000CC', '#3333FF', '#6666FF', '#F2F2FF'],
        labelColour:"#e1e1e1",
        labelRotation:45,
        labelTextSize:15,
        xValue: "Year",
        numTicks: 5,
    }


    barCharts.push(new BarChart(barChart01));
    barCharts.push(new BarChart(barChart01b));
    barCharts.push(new Scatter2(barChart02));
    barCharts.push(new HorizontalBarGraph(barChart03));
    barCharts.push(new HorizontalBarGraph(barChart03b));
    barCharts.push(new StackedBarChart2(barChart04));
    barCharts.push(new LineGraph(barChart05));
    barCharts.push(new GroupedBarChart(barChart06));

}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
    
}

