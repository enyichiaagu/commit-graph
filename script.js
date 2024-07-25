const squareLength = 12,
  squareRadius = 2,
  padding = 2,
  xStart = 40,
  yStart = 0,
  totalWeeks = 52;

// function to generate a single square
const squareSvgString = (xPosition, yPosition, length, radius) =>
  `<rect x="${xPosition}" y="${yPosition}" width="${length}" height="${length}" rx="${radius}" ry="${radius}" />`;

// function to generate rows of the commit graph
function generateSvgRow(weeks, yPosition) {
  let rowSvg = '',
    xPosition = xStart;
  for (let i = 0; i < weeks; i++) {
    rowSvg += squareSvgString(xPosition, yPosition, squareLength, squareRadius);
    xPosition += squareLength + padding;
  }
  return rowSvg;
}

// function to generate the columns of the commit graph
function generateCommitGraph(weeks, days = 7) {
  let totalString = '';
  let yPosition = yStart;
  for (let i = 0; i < days; i++) {
    totalString += generateSvgRow(weeks, yPosition);
    yPosition += squareLength + padding;
  }
  return totalString;
}

document.querySelector('svg').innerHTML = generateCommitGraph(totalWeeks);
