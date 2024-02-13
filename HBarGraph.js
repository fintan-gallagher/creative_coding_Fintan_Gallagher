class HorizontalBarGraph {
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
        translate(this.xPos, this.yPos + this.chartHeight); // Adjusted translation
    
        // Draw axis lines
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
    
        // Draw ticks along the y-axis
        for (let i = 0; i <= this.numTicks; i++) {
            let tickX = map(i, 0, this.numTicks, 0, this.chartWidth);
            line(tickX, 0, tickX, -5); // Adjusted tick mark position
        }
    
        // Label the ticks along the y-axis
        for (let i = 0; i <= this.numTicks; i++) {
            let tickX = map(i, 0, this.numTicks, 0, this.chartWidth);
            let tickValue = Math.round(i * (this.maxValue / this.numTicks)); // Compute tick value
            textAlign(CENTER, CENTER);
            text(tickValue, tickX, 15); // Adjusted label position
        }
    
        // Calculate gap between bars
        let gap = this.chartHeight / (this.data.length + 1);
    
        let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels
    
        // Draw bars and corresponding labels
        for (let i = 0; i < this.data.length; i++) {
            let barHeight = this.data[i][this.yValue] * this.scale;
            fill(this.barColour);
            rect(0, -(i + 1) * gap, barHeight, -this.barWidth); // Adjusted bar position
    
            noStroke();
            fill(this.labelColour);
    
            // Set text alignment based on label rotation
            textAlign(LEFT, CENTER);
            textSize(this.labelTextSize);
    
            let labelX = barHeight + 5; // Set label x-coordinate
            let labelY = -(i + 1) * gap - this.barWidth / 2; // Adjusted label position
            text(xLabels[i], labelX, labelY); // Draw label
        }
    
        pop(); // Restore previous transformation
    }
    
    
}
