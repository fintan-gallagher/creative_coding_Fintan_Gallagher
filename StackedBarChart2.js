class StackedBarChart2 {
    constructor(obj) {
        // Initialize properties from the passed object
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.barWidth = obj.barWidth;
        this.yValues = obj.yValues;
        this.totalValue =obj.totalValue;
        this.maxValue = Math.max(...this.data.map(d => d[this.totalValue])); // Compute maximum value
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
        console.log(gap)
        let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels

        textSize(25);
        textFont(fontBold);
        noStroke();
        fill(this.labelColour);
        textAlign(CENTER, CENTER);
        text("Average Monthly Rent (Ireland)", this.chartWidth/2, -this.chartHeight - 40);

        // Draws y-axis label
        push(); 
        translate(-50, -this.chartHeight/2); 
        rotate(90); 
        text("Rent (in Euros)", 0, 0); 
        pop(); 

        // Draw bars and corresponding labels
    
       push();
        translate(gap, 0);
   
        for (let i = 0; i < this.data.length; i++) {

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
            
            
            
            push();

            for (let j = 0; j < this.yValues.length; j++) {
                let barHeight = -this.data[i][this.yValues[j]] * this.scale;
               
                fill(this.barColour[j%this.barColour.length]);
                noStroke();
                rect(0, 0, this.barWidth, barHeight);

                
             
                translate(0, barHeight);
                
            }
            pop();
           
            translate(this.barWidth + gap, 0);
        }
        
        pop();



// Defines legend position
let legendX = this.chartWidth + 20; 
let legendY = 20;

// Draw legend
for (let i = 0; i < this.yValues.length; i++) {
    fill(this.barColour[i%this.barColour.length]);
    rect(legendX, legendY + i * 20, 10, 10); // Draws color box

    fill(255); // Sets colour for text
    textSize(15); // Sets text size
    textAlign(LEFT, CENTER); // Sets text alignment
    text(this.yValues[i], legendX + 20, legendY + i * 20 + 4); // Draws category name
}
    
    pop();
    
}

   
}