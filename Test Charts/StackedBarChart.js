class StackedBarChart {
    constructor(obj) {
        // Initialize properties from the passed object
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.barWidth = obj.barWidth;
        this.yValueMale = obj.yValueMale;
        this.yValueFemale = obj.yValueFemale;
        this.maxValue = Math.max(...this.data.map(d => Number(d[this.yValueMale]) + Number(d[this.yValueFemale]))); // Compute maximum value
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
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            noStroke();
            textSize(15);
            fill(this.labelColour);
            textFont(fontRegular);
            textAlign(RIGHT, CENTER);
            translate(0, i * (-this.chartHeight / this.numTicks));
            let tickValue = i * (this.maxValue / this.numTicks); // Calculate tick value based on maxValue and scale
            let roundedTick = Math.round(tickValue); // Round the tick value
            text(roundedTick, -10, 0); // Display the rounded tick value
            pop();
        }

        // Calculate gap between bars
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels

        // Draw bars and corresponding labels
        push();
        translate(gap, 0);
        for (let i = 0; i < this.data.length; i++) {
            // Draw bar for "Male"
            fill(this.barColour[0]);
            rect(0, 0, this.barWidth, -this.data[i][this.yValueMale] * this.scale);

            // Draw bar for "Female" on top of "Male" bar
            fill(this.barColour[1]);
            rect(0, -this.data[i][this.yValueMale] * this.scale, this.barWidth, -this.data[i][this.yValueFemale] * this.scale);

            noStroke();
            fill(this.labelColour);
            textSize(this.labelTextSize);
            textAlign(CENTER, BOTTOM);
            //text(this.data[i][this.yValueMale] + this.data[i][this.yValueFemale], this.barWidth / 2, -(this.data[i][this.yValueMale] + this.data[i][this.yValueFemale]) * this.scale - 5);

            noStroke();
            fill(this.labelColour);

            // Set text alignment based on label rotation
            if (this.labelRotation == 0) {
                textAlign(CENTER, CENTER);
            } else {
                textAlign(LEFT, CENTER);
            }
            textSize(this.labelTextSize);

            push();
            translate(this.barWidth / 2, 10);
            rotate(this.labelRotation);
            textFont(fontRegular);

            text(xLabels[i], 0, 0); // Draw label
            
            pop();

            translate(gap + this.barWidth, 0); // Move to the next bar
        }
        pop();
    }
}