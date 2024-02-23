class ScatterPlotGraph {
    constructor(obj) {
        // Initialize properties from the passed object
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.barWidth = obj.barWidth;
        this.yValue = obj.yValue;
        this.maxValue = Math.max(...this.data.map(d => d[this.yValue])); // Compute maximum value
        this.scale = this.chartHeight / this.maxValue; // Compute scale based on chart height and maximum value
        this.barColour = obj.barColour;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.labelTextSize = obj.labelTextSize;
        this.xValue = obj.xValue;
        this.numTicks = obj.numTicks;
    }

    render() {
    // Translate to the specified position
    push();
    translate(this.xPos, this.yPos);

    // Draw axis lines
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    // Draw ticks along the y-axis
    for (let i = 0; i <= this.numTicks; i++) {
        push();
        translate(0, i * (-this.chartHeight / this.numTicks));
        line(0, 0, -5, 0); // Draw tick marks
        pop();
    }

    // Label the ticks along the y-axis
    // Adjust maxValue to be divisible by numTicks
    let adjustedMaxValue = this.maxValue;
    while (adjustedMaxValue % this.numTicks !== 0) {
        adjustedMaxValue++;
    }

    // Label the ticks along the y-axis
    for (let i = 0; i <= this.numTicks; i++) {
        push();
        noStroke();
        textSize(15);
        fill(this.labelColour);
        textFont(fontRegular);
        textAlign(RIGHT, CENTER);
        translate(0, i * (-this.chartHeight / this.numTicks));
        let tickTotal = adjustedMaxValue / this.numTicks;
        let roundedTick = Math.round(i * tickTotal); // Round the tick value
        text(roundedTick, -10, 0); // Display the rounded tick value
        pop();
    }

    // Calculate gap between points
    let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
    let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels

    // Draw title
    textSize(25);
    textFont(fontBold);
    noStroke();
    fill(this.labelColour);
    textAlign(CENTER, CENTER);
    text("Road Deaths", this.chartWidth/2, -this.chartHeight - 20); 

    // Draw points and corresponding labels
    for (let i = 0; i < this.data.length; i++) {
        fill(this.barColour[i % this.barColour.length]);
        let x = 25 + i * (this.chartWidth / this.data.length); // Calculate x position
        let y = -this.data[i][this.yValue] * this.scale; // Calculate y position
        ellipse(x, y, 10, 10); // Draw point with diameter 10
    
        noStroke();
        fill(this.labelColour);
    
        // Set text alignment based on label rotation
        if (this.labelRotation == 0) {
            textAlign(CENTER, CENTER);
        } else {
            textAlign(LEFT, CENTER);
        }
        textSize(this.labelTextSize);
    
        // Draw the x-axis label
        push();
        translate(x, this.height + 10); // Translate to the position of the x-axis, slightly below
        rotate(this.labelRotation);
        textFont(fontRegular);
        text(xLabels[i], 0, 0); // Draw label
        pop();
    
        // Draw the number beside the ellipse
        push();
        translate(x + 15, y); // Translate to the position of the point, slightly to the right
        rotate(this.labelRotation);
        textFont(fontRegular);
        text(this.data[i][this.yValue], 0, 0); // Draw number
        pop();
    }
    
    pop();
}

}
