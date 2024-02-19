const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.save();
let trianglePoints = [];

document.getElementById('openPopup').addEventListener('click', openPopup);

        function openPopup() {
            document.getElementById('popupContainer').style.display = 'block';
        }

        function closePopup() {
            document.getElementById('popupContainer').style.display = 'none';
        }
        
function openPage(page) {
    window.location.href = page;
         }
// Draw coordinate grid and axes
function drawGrid() {
    ctx.restore();
    ctx.beginPath();
    for (let i = 0; i <= canvas.width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.strokeStyle = '#eee';
    ctx.stroke();
}

// Draw labels for coordinate axes
function drawLabels() {
    ctx.restore();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    for (let i = 50; i <= canvas.width; i += 50) {
        ctx.fillText(i, i - 5, canvas.height - 5);
        ctx.fillText(canvas.height - i, 5, i - 5);
    }
}

function drawTriangle() {
    drawGrid();
    drawLabels();
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    

    const p1X = parseInt(document.getElementById('point1X').value);
    const p1Y = parseInt(document.getElementById('point1Y').value);
    const p2X = parseInt(document.getElementById('point2X').value);
    const p2Y = parseInt(document.getElementById('point2Y').value);
    const height = parseInt(document.getElementById('height').value);

    ctx.beginPath();
    ctx.moveTo(p1X, p1Y);
    ctx.lineTo(p2X, p2Y);
    const topX = p1X + (p2X - p1X) / 2;
    const topY = p1Y + height;
    ctx.lineTo(topX, topY);
    ctx.closePath();

    trianglePoints = [[p1X, p1Y], [p2X, p2Y], [topX, topY]];
    
    ctx.strokeStyle = 'blue';  // Original triangle color
    ctx.stroke();
    ctx.restore();
}

function drawLine() {
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);

    const a = parseInt(document.getElementById('coefficientA').value);
    const b = parseInt(document.getElementById('coefficientB').value);
    const c = parseInt(document.getElementById('coefficientC').value);

    ctx.beginPath();
    ctx.moveTo(0, c / b);
    ctx.lineTo(canvas.width, (-a * canvas.width + c) / b);
    ctx.strokeStyle = 'black';  // Line color
    ctx.stroke();
    ctx.restore();
}

function reflectTriangle() {
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    const reflectedTrianglePoints = trianglePoints.map(point => {
        const [x, y] = point;
        const a = parseInt(document.getElementById('coefficientA').value);
        const b = parseInt(document.getElementById('coefficientB').value);
        const c = parseInt(document.getElementById('coefficientC').value);

        // Calculate the reflection of each point
        const t = (a * x + b * y - c) / (a ** 2 + b ** 2);
        const d = x - 2 * a * t;
        const e = y - 2 * b * t;

        return [d, e];
    });

    // Draw original triangle
    ctx.beginPath();
    ctx.moveTo(...trianglePoints[0]);
    ctx.lineTo(...trianglePoints[1]);
    ctx.lineTo(...trianglePoints[2]);
    ctx.closePath();
    ctx.strokeStyle = 'blue';  // Original triangle color
    ctx.stroke();

    // Draw reflected triangle
    ctx.beginPath();
    ctx.moveTo(...reflectedTrianglePoints[0]);
    ctx.lineTo(...reflectedTrianglePoints[1]);
    ctx.lineTo(...reflectedTrianglePoints[2]);
    ctx.closePath();
    ctx.strokeStyle = 'red';  // Reflected triangle color
    ctx.stroke();
    ctx.restore();
}
