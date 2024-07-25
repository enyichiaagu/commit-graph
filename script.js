// Grabbing the SVG Element
const commitsSvg = document.querySelector('#commits');
const svgNamespace = 'http://www.w3.org/2000/svg';

// Setting the dimensions
commitsSvg.setAttribute('height', 150);
commitsSvg.setAttribute('width', 800);

// Constants for the commit graph squares
const squareLength = 12,
  squareRadius = 2,
  padding = 2,
  xStart = 25,
  yStart = 0,
  totalWeeks = 52;

// Define days to display
const displayDays = ['Mon', 'Wed', 'Fri'];

// Function to generate text for days
function textSvg(xPosition, yPosition, string) {
  const text = document.createElementNS(svgNamespace, 'text');
  const yPlacement = yPosition + squareLength / 2;
  text.setAttributeNS(null, 'x', xPosition);
  text.setAttributeNS(null, 'y', yPlacement);
  text.setAttributeNS(null, 'dominant-baseline', 'middle');
  text.textContent = string;

  return text;
}

// function to generate a single square
function squareSvg(xPosition, yPosition, length, radius) {
  const square = document.createElementNS(svgNamespace, 'rect');
  square.setAttributeNS(null, 'x', xPosition);
  square.setAttributeNS(null, 'y', yPosition);
  square.setAttributeNS(null, 'width', length);
  square.setAttributeNS(null, 'height', length);
  square.setAttributeNS(null, 'rx', radius);
  square.setAttributeNS(null, 'ry', radius);
  return square;
}

// function to generate rows of the commit graph
function generateSvgRow(weeks, yPosition) {
  let xPosition = xStart;
  for (let i = 0; i < weeks; i++) {
    commitsSvg.appendChild(
      squareSvg(xPosition, yPosition, squareLength, squareRadius)
    );
    xPosition += squareLength + padding;
  }
}

// function to generate the columns of the commit graph
function generateCommitGraph(weeks, days = 7) {
  let yPosition = yStart,
    daysIterator = 0;
  for (let i = 0; i < days; i++) {
    // Add days text if day number is odd
    if (i % 2 === 1) {
      commitsSvg.appendChild(textSvg(0, yPosition, displayDays[daysIterator]));
      daysIterator++;
    }

    generateSvgRow(weeks, yPosition);
    yPosition += squareLength + padding;
  }
}

generateCommitGraph(totalWeeks);
