class Scatter2 {
    constructor(obj) {
        // Initialize properties from the passed object

        //chart positioning
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;

        //colours
        this.axisLineColour = obj.axisLineColour;
        this.barColour = obj.barColour;
        this.labelColour = obj.labelColour;

        //bar properties & data for chart scaling
        this.barWidth = obj.barWidth;
        this.yValue = obj.yValue;
        this.maxValue = Math.max(...this.data.map(d => d[this.yValue])); // Compute maximum value
        this.scale = this.chartHeight / this.maxValue; // Compute scale based on chart height and maximum value
        this.xValue = obj.xValue;
        this.numTicks = obj.numTicks;

        //label properties
        this.labelRotation = obj.labelRotation;
        this.labelTextSize = obj.labelTextSize;
        
        //chart title
        this.chartTitle = obj.chartTitle;
    }

    render() {
        // Translates to the specified position
        push();
        translate(this.xPos, this.yPos);

        // Draw axis lines
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        

        // Draws ticks along the y-axis
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks));
            line(0, 0, this.chartWidth, 0); // Draws tick marks
            pop();
        }
        

       // Labels the ticks along the y-axis
       for (let i = 0; i <= this.numTicks; i++) {
        push();
        noStroke();
        textSize(15);
        fill(this.labelColour);
        textFont(fontRegular);
        textAlign(RIGHT, CENTER);
        translate(0, i * (-this.chartHeight / this.numTicks));
        let tickValue = i * (this.maxValue / this.numTicks); 
        let roundedTick = Math.round(tickValue); 
        text(roundedTick, -10, 0); 
        pop();
    }

        // Calculates gap between bars
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        let xLabels = this.data.map(d => d[this.xValue]); // Extracts x-axis labels

        // Draws title
        textSize(25);
        textFont(fontBold);
        noStroke();
        fill(this.labelColour);
        textAlign(CENTER, CENTER);
        text("Average Monthly Rent (National)", this.chartWidth/2, -this.chartHeight - 40); 

        // Draws y-axis label
        push(); 
        translate(-45, -this.chartHeight/2); 
        rotate(90); 
        text("Rent (in Euros)", 0, 0); 
        pop(); 

        // Draw ellipses and corresponding labels
        push();
        translate(gap, 0);
        for (let i = 0; i < this.data.length; i++) {
            fill(this.barColour[i % this.barColour.length]);
            ellipse(this.barWidth, -this.data[i][this.yValue] * this.scale, 10, 10); 
            
            noStroke();
            fill(this.labelColour);
            textSize(10);
            textAlign(CENTER, CENTER);
            text(this.data[i][this.yValue], this.barWidth / 2, -this.data[i][this.yValue] * this.scale - 5);

            noStroke();
            fill(this.labelColour);

            // Sets text alignment based on label rotation
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

            text(xLabels[i], 0, 0); // Draws label
            
            pop();

            translate(gap + this.barWidth, 0); // Moves to the next ellipses
        }
        pop();
        
        
    }
}
