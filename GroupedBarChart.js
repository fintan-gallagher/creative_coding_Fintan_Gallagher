class GroupedBarChart {
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
        this.yValues = obj.yValues;
        this.totalValue = obj.totalValue;
        this.maxValue = Math.max(...this.data.map(d => d[this.totalValue])); // Compute maximum value
        this.scale = this.chartHeight / this.maxValue; // Compute scale based on chart height and maximum value
        this.xValue = obj.xValue;
        this.numTicks = obj.numTicks;
        
        //label properties
        this.labelRotation = obj.labelRotation;
        this.labelTextSize = obj.labelTextSize;
    }

    render() {
        // Translates to the specified position
        push();
        translate(this.xPos, this.yPos);

        // Draws axis lines
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        // Draws ticks along the y-axis
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks));
            line(0, 0, -5, 0); // Draw tick marks
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
            let tickValue = i * (this.maxValue / this.numTicks); // Calculate tick value based on maxValue and scale
            let roundedTick = Math.round(tickValue); // Round the tick value
            text(roundedTick, -10, 0); // Display the rounded tick value
            pop();
        }

        // Calculates gap between bars
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        console.log(gap)
        let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels

        textSize(25);
        textFont(fontBold);
        noStroke();
        fill(this.labelColour);
        textAlign(CENTER, CENTER);
        text("Average Monthly Rent (Ireland)", this.chartWidth / 2, -this.chartHeight - 40);

        // Draws y-axis label
        push();
        translate(-45, -this.chartHeight / 2);
        rotate(90);
        text("Rent (in Euros)", 0, 0);
        pop();

         // Draws x-axis label
         push(); 
         translate(this.chartWidth / 2, 60); 
         text("Year", 0, 0); 
         pop(); 

        // Draws bars and corresponding labels

        push()
        translate(gap, 0);

        // let groupWidth = this.yValues.length * this.barWidth + (this.yValues.length - 1) * gap;

        for (let i = 0; i < this.data.length; i++) {
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

            for (let j = 0; j < this.yValues.length; j++) {
                push();
                let barHeight = -this.data[i][this.yValues[j]] * this.scale;

                fill(this.barColour[j % this.barColour.length]);
                noStroke();
                rect(0, 0, this.barWidth, barHeight);

                pop();

                // Translates x-position for the next bar in the group
                translate(this.barWidth, 0);
            }

            // Translates x-position for the next group
            translate(this.barWidth, 0);
        }
        pop();


        // Defines legend position
        let legendX = this.chartWidth / 2;
        let legendY = 100;

        // Draws legend
        for (let i = 0; i < this.yValues.length; i++) {
            fill(this.barColour[i % this.barColour.length]);
            rect(legendX, legendY + i * 20, 10, 10); // Draws color box

            fill(255);
            textSize(15); 
            textAlign(LEFT, CENTER);
            text(this.yValues[i], legendX + 20, legendY + i * 20 + 4); // Draws category name
        }

        pop();

    }


}