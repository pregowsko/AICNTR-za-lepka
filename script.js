const img = document.querySelector("img");
const container = document.querySelector(".container");

// osobne zmienne na rozmiar okana
let prevYWindow = 0;
let prevXWindow = 0;

let moveXAmount = 0;
let moveYAmount = 0;


function moveImg(xAmount, yAmount){
        let movementStrength = 5 + (Math.random() * 15);

        img.style.left = (img.offsetLeft) - (xAmount/movementStrength) + "px";
        img.style.top = (img.offsetTop) - (yAmount/movementStrength) + "px";
}

// nowy listener - na zmianę rozmiaru okna
window.onload = () => {
    window.onresize = windowSize;
    moveImg(moveXAmount, moveYAmount); 
}


// funkcja obliczająca zmianę pozycji Y/X rozmiaru okna
const windowSize = e => {
    moveXAmount = (e.target.innerWidth / 2) - prevXWindow;
    moveYAmount = (e.target.innerHeight / 2) - prevYWindow;

    prevXWindow = (e.target.innerWidth / 2);
    prevYWindow = (e.target.innerHeight / 2);

    changeImagePosition(moveXAmount / 2, moveYAmount / 2);
    moveImg(moveXAmount, moveYAmount);
}

// zmiana pozycji x/y o połowę zmiany szerokości okna
const changeImagePosition = (xAmount, yAmount) => {
        img.style.left = (img.offsetLeft) + (xAmount) + "px";
        img.style.top = (img.offsetTop) + (yAmount) + "px";
}

const hexagonWidth = 100;
const hexagonHeight = 110;

function createHexagonRow() {
  const row = document.createElement("div");
  row.classList.add("row");
  return row;
}

function addHexagonToRow(row) {
  const hexagon = document.createElement("div");
  hexagon.classList.add("hexagon");
  row.appendChild(hexagon);
}

function calculateHexagonsPerRow(containerWidth) {
  return Math.floor(containerWidth / hexagonWidth);
}

function createHexagons(containerWidth, containerHeight) {
  const fragment = document.createDocumentFragment();
  let row = createHexagonRow();
  let hexagonsInRow = 0;
  const hexagonsPerRow = calculateHexagonsPerRow(containerWidth);

  const rows = Math.floor(containerHeight / (hexagonHeight * 0.50));
  const totalHexagons = rows * hexagonsPerRow;

  for (let i = 0; i < totalHexagons; i++) {
    addHexagonToRow(row);
    hexagonsInRow++;

    if (hexagonsInRow > hexagonsPerRow) {
      const rowWidth = hexagonsInRow * (hexagonWidth + 4);
      row.style.width = `${rowWidth}px`;
      fragment.appendChild(row);
      row = createHexagonRow();
      hexagonsInRow = 0;
    }
  }

  fragment.appendChild(row);
  container.append(fragment);
}


function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const createHexagonsDebounced = debounce(() => {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  container.innerHTML = "";
  createHexagons(containerWidth, containerHeight);
}, 200);

window.addEventListener("resize", createHexagonsDebounced);

createHexagons(container.offsetWidth, container.offsetHeight);
moveImg(moveXAmount, moveYAmount);


