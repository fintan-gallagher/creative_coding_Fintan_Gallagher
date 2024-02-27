class VBarHbar {
    constructor(obj) {
        // Initialize properties from the passed object

        //chart positioning
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.orientation = obj.orientation;

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
        if (this.orientation === "vertical") {
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
                line(0, 0, -5, 0); // Draws tick marks
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
                let tickValue = i * (this.maxValue / this.numTicks); // Calculates tick value based on maxValue and number of ticks
                let roundedTick = Math.round(tickValue); // Rounds the tick value
                text(roundedTick, -10, 0); // Displays the rounded tick value
                pop();
            }

            // Calculates gap between bars
            let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
            let xLabels = this.data.map(d => d[this.xValue]); // Extracts x-axis labels

            // Draw title
            textSize(25);
            textFont(fontBold);
            noStroke();
            fill(this.labelColour);
            textAlign(CENTER, CENTER);
            text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 40);

            // Draws y-axis label
            push();
            translate(-45, -this.chartHeight / 2);
            rotate(90);
            text("Rent (in Euros)", 0, 0);
            pop();

            push();
            translate(this.chartWidth / 2, 60);
            text("Year", 0, 0);
            pop();

            // Draws bars and corresponding labels
            push();
            translate(gap, 0);
            for (let i = 0; i < this.data.length; i++) {

                fill(this.barColour[i % this.barColour.length]);
                rect(0, 0, this.barWidth, -this.data[i][this.yValue] * this.scale); // Draws bars

                noStroke();
                fill(this.labelColour);
                textSize(this.labelTextSize);
                textAlign(CENTER, BOTTOM);

                text(this.data[i][this.yValue], this.barWidth / 2, -this.data[i][this.yValue] * this.scale - 5); // Places label above bar

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

                translate(gap + this.barWidth, 0); // Moves to the next bar
            }
            pop();


        } else {
            push();
            translate(this.xPos, this.yPos); // Adjusted translation

            // Draws axis lines
            stroke(this.axisLineColour);
            line(0, 0, 0, -this.chartHeight);
            line(0, 0, this.chartWidth, 0);

            // Draws ticks along the y-axis
            for (let i = 0; i <= this.numTicks; i++) {
                let tickX = map(i, 0, this.numTicks, 0, this.chartWidth);
                line(tickX, 0, tickX, -5); // Adjusted tick mark position
            }

            // Labels the ticks along the y-axis
            for (let i = 0; i <= this.numTicks; i++) {
                let tickX = map(i, 0, this.numTicks, 0, this.chartWidth);
                let tickValue = Math.round(i * (this.maxValue / this.numTicks)); // Compute tick value
                textAlign(CENTER, CENTER);
                textSize(15);
                textFont(fontRegular);
                text(tickValue, tickX, 15); // Adjusted label position
            }

            // Calculates gap between bars
            let gap = this.chartHeight / (this.data.length + 1);

            let xLabels = this.data.map(d => d[this.xValue]); // Extract x-axis labels

            textSize(25);
            textFont(fontBold);
            noStroke();
            fill(this.labelColour);
            textAlign(CENTER, CENTER);
            text(this.chartTitle, this.chartWidth / 2 + 10, -this.chartHeight - 40);

            push();
            textSize(25);
            textFont(fontBold);
            noStroke();
            fill(this.labelColour);
            translate(this.chartWidth / 2, 60);
            text("Rent (in Euros)", 0, 0);
            pop();

            // Draws bars and corresponding labels
            for (let i = 0; i < this.data.length; i++) {
                noStroke();
                let barHeight = this.data[i][this.yValue] * this.scale;
                fill(this.barColour[i % this.barColour.length]);
                rect(0, -(i + 1) * gap, barHeight, -this.barWidth); // Adjusted bar position


                fill(this.labelColour);

                // Sets text alignment based on label rotation
                textAlign(LEFT, CENTER);
                textSize(this.labelTextSize);

                let labelX = barHeight + 5;
                let labelY = -(i + 1) * gap - this.barWidth / 2;
                text(xLabels[i], labelX, labelY);
            }

            pop();
        }
    }
}
