const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

const unitRadios = document.querySelectorAll('input[name="unitSystem"]');
const projectTypeRadios = document.querySelectorAll('input[name="projectType"]');

const singleWallInputs = document.getElementById("singleWallInputs");
const wholeRoomInputs = document.getElementById("wholeRoomInputs");

const wallWidth = document.getElementById("wallWidth");
const roomLength = document.getElementById("roomLength");
const roomWidth = document.getElementById("roomWidth");
const wallHeight = document.getElementById("wallHeight");

const coats = document.getElementById("coats");
const coverage = document.getElementById("coverage");

const doorArea = document.getElementById("doorArea");
const windowArea = document.getElementById("windowArea");

const containerSize = document.getElementById("containerSize");

const currency = document.getElementById("currency");
const pricePerContainer = document.getElementById("pricePerContainer");


const openingMethodRadios = document.querySelectorAll(
    'input[name="openingMethod"]'
);

const totalAreaInputs = document.getElementById("totalAreaInputs");

const openingCalculatorInputs =
    document.getElementById("openingCalculatorInputs");

const doorWidth = document.getElementById("doorWidth");
const doorHeight = document.getElementById("doorHeight");
const doorQuantity = document.getElementById("doorQuantity");

const windowWidth = document.getElementById("windowWidth");
const windowHeight = document.getElementById("windowHeight");
const windowQuantity = document.getElementById("windowQuantity");

function getSelectedUnit() {
    return document.querySelector(
        'input[name="unitSystem"]:checked'
    ).value;
}


function getSelectedProjectType() {
    return document.querySelector(
        'input[name="projectType"]:checked'
    ).value;
}


function getCurrencySymbol() {

    const symbols = {
        USD: "$",
        GBP: "£",
        EUR: "€",
        CAD: "C$",
        AUD: "A$",
        NZD: "NZ$",
        SGD: "S$",
        MYR: "RM"
    };

    return symbols[currency.value] || "";
}


function updateProjectInputs() {

    const projectType = getSelectedProjectType();

    if (projectType === "wall") {

        singleWallInputs.style.display = "block";
        wholeRoomInputs.style.display = "none";

    } else {

        singleWallInputs.style.display = "none";
        wholeRoomInputs.style.display = "block";

    }

    result.innerHTML = "";
}

function updateOpeningMethod() {

    const selectedMethod = document.querySelector(
        'input[name="openingMethod"]:checked'
    ).value;

    if (selectedMethod === "total") {

        totalAreaInputs.style.display = "block";
        openingCalculatorInputs.style.display = "none";

    } else {

        totalAreaInputs.style.display = "none";
        openingCalculatorInputs.style.display = "block";

    }

    result.innerHTML = "";
}

function updateUnits() {

    const unit = getSelectedUnit();

    const wallWidthLabel = document.getElementById("wallWidthLabel");
    const roomLengthLabel = document.getElementById("roomLengthLabel");
    const roomWidthLabel = document.getElementById("roomWidthLabel");
    const wallHeightLabel = document.getElementById("wallHeightLabel");

    const coverageLabel = document.getElementById("coverageLabel");
    const doorAreaLabel = document.getElementById("doorAreaLabel");
    const windowAreaLabel = document.getElementById("windowAreaLabel");
    const containerSizeLabel = document.getElementById("containerSizeLabel");

    const doorWidthLabel = document.getElementById("doorWidthLabel");
    const doorHeightLabel = document.getElementById("doorHeightLabel");
    const windowWidthLabel = document.getElementById("windowWidthLabel");
    const windowHeightLabel = document.getElementById("windowHeightLabel");

    if (unit === "metric") {

        wallWidthLabel.textContent = "Wall Width (m)";
        roomLengthLabel.textContent = "Room Length (m)";
        roomWidthLabel.textContent = "Room Width (m)";
        wallHeightLabel.textContent = "Wall Height (m)";

        coverageLabel.textContent = "Paint Coverage (m²/L)";
        doorAreaLabel.textContent = "Total Door Area (m²) — optional";
        windowAreaLabel.textContent = "Total Window Area (m²) — optional";
        containerSizeLabel.textContent = "Paint Container Size (L)";

        doorWidthLabel.textContent = "Door Width (m)";
        doorHeightLabel.textContent = "Door Height (m)";
        windowWidthLabel.textContent = "Window Width (m)";
        windowHeightLabel.textContent = "Window Height (m)";

        wallWidth.placeholder = "e.g. 4";
        roomLength.placeholder = "e.g. 5";
        roomWidth.placeholder = "e.g. 4";
        wallHeight.placeholder = "e.g. 2.4";

        doorWidth.placeholder = "e.g. 0.9";
        doorHeight.placeholder = "e.g. 2.1";
        windowWidth.placeholder = "e.g. 1.2";
        windowHeight.placeholder = "e.g. 1.2";

        coverage.placeholder = "e.g. 10";
        doorArea.placeholder = "e.g. 2";
        windowArea.placeholder = "e.g. 3";
        containerSize.placeholder = "e.g. 5";

    } else {

        wallWidthLabel.textContent = "Wall Width (ft)";
        roomLengthLabel.textContent = "Room Length (ft)";
        roomWidthLabel.textContent = "Room Width (ft)";
        wallHeightLabel.textContent = "Wall Height (ft)";

        doorWidthLabel.textContent = "Door Width (ft)";
        doorHeightLabel.textContent = "Door Height (ft)";
        windowWidthLabel.textContent = "Window Width (ft)";
        windowHeightLabel.textContent = "Window Height (ft)";

        coverageLabel.textContent = "Paint Coverage (sq ft/gal)";
        doorAreaLabel.textContent = "Total Door Area (sq ft) — optional";
        windowAreaLabel.textContent = "Total Window Area (sq ft) — optional";
        containerSizeLabel.textContent = "Paint Container Size (gal)";

        wallWidth.placeholder = "e.g. 13";
        roomLength.placeholder = "e.g. 16";
        roomWidth.placeholder = "e.g. 13";
        wallHeight.placeholder = "e.g. 8";

        doorWidth.placeholder = "e.g. 3";
        doorHeight.placeholder = "e.g. 7";
        windowWidth.placeholder = "e.g. 4";
        windowHeight.placeholder = "e.g. 4";

        coverage.placeholder = "e.g. 400";
        doorArea.placeholder = "e.g. 20";
        windowArea.placeholder = "e.g. 30";
        containerSize.placeholder = "e.g. 1";

    }


    wallWidth.value = "";
    roomLength.value = "";
    roomWidth.value = "";
    wallHeight.value = "";

    coverage.value = "";
    doorArea.value = "";
    windowArea.value = "";
    containerSize.value = "";

    doorWidth.value = "";
    doorHeight.value = "";
    windowWidth.value = "";
    windowHeight.value = "";

    result.innerHTML = "";
}


projectTypeRadios.forEach(radio => {
    radio.addEventListener("change", updateProjectInputs);
});


unitRadios.forEach(radio => {
    radio.addEventListener("change", updateUnits);
});

openingMethodRadios.forEach(radio => {
    radio.addEventListener("change", updateOpeningMethod);
});

calculateButton.addEventListener("click", function () {

    const unit = getSelectedUnit();
    const projectType = getSelectedProjectType();

    const height = parseFloat(wallHeight.value);
    const numberOfCoats = parseFloat(coats.value);
    const coverageRate = parseFloat(coverage.value);

    let doors = 0;
let windows = 0;

const openingMethod = document.querySelector(
    'input[name="openingMethod"]:checked'
).value;

if (openingMethod === "total") {

    doors = parseFloat(doorArea.value) || 0;
    windows = parseFloat(windowArea.value) || 0;

} else {

    const dWidth = parseFloat(doorWidth.value) || 0;
    const dHeight = parseFloat(doorHeight.value) || 0;
    const dQty = parseFloat(doorQuantity.value) || 0;

    const wWidth = parseFloat(windowWidth.value) || 0;
    const wHeight = parseFloat(windowHeight.value) || 0;
    const wQty = parseFloat(windowQuantity.value) || 0;

    doors = dWidth * dHeight * dQty;
    windows = wWidth * wHeight * wQty;
}

    const selectedContainerSize = parseFloat(containerSize.value);
    const price = parseFloat(pricePerContainer.value);


    if (
        !height ||
        height <= 0 ||
        !numberOfCoats ||
        numberOfCoats <= 0 ||
        !coverageRate ||
        coverageRate <= 0
    ) {

        result.innerHTML = `
            <p>Please enter valid wall dimensions, number of coats, and paint coverage.</p>
        `;

        return;
    }


    let wallArea = 0;


    if (projectType === "wall") {

        const width = parseFloat(wallWidth.value);

        if (!width || width <= 0) {

            result.innerHTML = `
                <p>Please enter a valid wall width.</p>
            `;

            return;
        }

        wallArea = width * height;

    } else {

        const length = parseFloat(roomLength.value);
        const width = parseFloat(roomWidth.value);

        if (
            !length ||
            length <= 0 ||
            !width ||
            width <= 0
        ) {

            result.innerHTML = `
                <p>Please enter valid room dimensions.</p>
            `;

            return;
        }

        const perimeter = 2 * (length + width);

        wallArea = perimeter * height;
    }


    if (doors < 0 || windows < 0) {

        result.innerHTML = `
            <p>Door and window areas cannot be negative.</p>
        `;

        return;
    }


    const openingsArea = doors + windows;
    const paintableArea = wallArea - openingsArea;


    if (paintableArea <= 0) {

        result.innerHTML = `
            <p>The total door and window area must be smaller than the total wall area.</p>
        `;

        return;
    }


    const totalCoverageArea = paintableArea * numberOfCoats;

    const paintRequired = totalCoverageArea / coverageRate;


    let areaUnit;
    let volumeUnit;

    if (unit === "metric") {

        areaUnit = "m²";
        volumeUnit = "L";

    } else {

        areaUnit = "sq ft";
        volumeUnit = "gal";

    }


    let containerHTML = "";
    let costHTML = "";


    if (
        !isNaN(selectedContainerSize) &&
        selectedContainerSize > 0
    ) {

        const containersRequired = Math.ceil(
            paintRequired / selectedContainerSize
        );

        const totalPurchased =
            containersRequired * selectedContainerSize;


        containerHTML = `
            <p>
                <strong>Recommended Purchase:</strong>
                ${containersRequired} × ${selectedContainerSize} ${volumeUnit}
                container${containersRequired === 1 ? "" : "s"}
            </p>

            <p>
                <strong>Total Paint Purchased:</strong>
                ${totalPurchased.toFixed(2)} ${volumeUnit}
            </p>
        `;


        if (!isNaN(price) && price >= 0) {

            const totalCost =
                containersRequired * price;

            const symbol = getCurrencySymbol();

            costHTML = `
                <p>
                    <strong>Estimated Cost:</strong>
                    ${symbol}${totalCost.toFixed(2)}
                </p>
            `;
        }
    }


    result.innerHTML = `

        <h3>Estimated Paint Required</h3>

        <p class="main-result">
            ${paintRequired.toFixed(2)} ${volumeUnit}
        </p>

        ${containerHTML}

        ${costHTML}

        <hr>

        <h3>How we calculated this</h3>

        <p>
            <strong>Total Wall Area:</strong>
            ${wallArea.toFixed(2)} ${areaUnit}
        </p>

        <p>
            <strong>Doors & Windows Deducted:</strong>
            ${openingsArea.toFixed(2)} ${areaUnit}
        </p>

        <p>
            <strong>Paintable Area:</strong>
            ${paintableArea.toFixed(2)} ${areaUnit}
        </p>

        <p>
            <strong>Number of Coats:</strong>
            ${numberOfCoats}
        </p>

        <p>
            <strong>Total Coverage Required:</strong>
            ${totalCoverageArea.toFixed(2)} ${areaUnit}
        </p>

        <p>
            <strong>Paint Coverage:</strong>
            ${coverageRate} ${areaUnit}/${volumeUnit}
        </p>

    `;
});