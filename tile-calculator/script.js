const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

const unitRadios = document.querySelectorAll('input[name="unitSystem"]');

const areaLength = document.getElementById("areaLength");
const areaWidth = document.getElementById("areaWidth");

const tileLength = document.getElementById("tileLength");
const tileWidth = document.getElementById("tileWidth");

const wasteAllowance = document.getElementById("wasteAllowance");
const tilesPerBox = document.getElementById("tilesPerBox");

const pricingMethod = document.getElementById("pricingMethod");
const currency = document.getElementById("currency");
const price = document.getElementById("price");
const priceHelper = document.getElementById("priceHelper");


function getSelectedUnit() {
    return document.querySelector(
        'input[name="unitSystem"]:checked'
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


function updateUnits() {

    const unit = getSelectedUnit();

    const areaLengthLabel = document.getElementById("areaLengthLabel");
    const areaWidthLabel = document.getElementById("areaWidthLabel");
    const tileLengthLabel = document.getElementById("tileLengthLabel");
    const tileWidthLabel = document.getElementById("tileWidthLabel");

    if (unit === "metric") {

        areaLengthLabel.textContent = "Area Length (m)";
        areaWidthLabel.textContent = "Area Width (m)";

        tileLengthLabel.textContent = "Tile Length (cm)";
        tileWidthLabel.textContent = "Tile Width (cm)";

        areaLength.placeholder = "e.g. 4";
        areaWidth.placeholder = "e.g. 3";

        tileLength.placeholder = "e.g. 60";
        tileWidth.placeholder = "e.g. 60";

    } else {

        areaLengthLabel.textContent = "Area Length (ft)";
        areaWidthLabel.textContent = "Area Width (ft)";

        tileLengthLabel.textContent = "Tile Length (in)";
        tileWidthLabel.textContent = "Tile Width (in)";

        areaLength.placeholder = "e.g. 12";
        areaWidth.placeholder = "e.g. 10";

        tileLength.placeholder = "e.g. 24";
        tileWidth.placeholder = "e.g. 24";
    }

    areaLength.value = "";
    areaWidth.value = "";
    tileLength.value = "";
    tileWidth.value = "";

    result.innerHTML = "";
}


function updatePricingMethod() {

    if (pricingMethod.value === "tile") {

        priceHelper.textContent = "Enter the price of one tile.";
        price.placeholder = "e.g. 5";

    } else {

        priceHelper.textContent = "Enter the price of one box.";
        price.placeholder = "e.g. 40";
    }

    price.value = "";
    result.innerHTML = "";
}


function calculateTiles() {

    const unit = getSelectedUnit();

    const areaLengthValue = parseFloat(areaLength.value);
    const areaWidthValue = parseFloat(areaWidth.value);

    const tileLengthValue = parseFloat(tileLength.value);
    const tileWidthValue = parseFloat(tileWidth.value);

    const wasteValue = parseFloat(wasteAllowance.value);

    const tilesPerBoxValue = parseInt(tilesPerBox.value);
    const priceValue = parseFloat(price.value);


    if (
        !Number.isFinite(areaLengthValue) ||
        !Number.isFinite(areaWidthValue) ||
        !Number.isFinite(tileLengthValue) ||
        !Number.isFinite(tileWidthValue) ||
        areaLengthValue <= 0 ||
        areaWidthValue <= 0 ||
        tileLengthValue <= 0 ||
        tileWidthValue <= 0
    ) {
        result.innerHTML =
            "<p>Please enter valid area and tile dimensions.</p>";
        return;
    }


    if (!Number.isFinite(wasteValue) || wasteValue < 0) {
        result.innerHTML =
            "<p>Please enter a valid waste allowance.</p>";
        return;
    }


    let surfaceArea;
    let tileArea;
    let areaUnit;


    if (unit === "metric") {

        surfaceArea =
            areaLengthValue * areaWidthValue;

        const tileLengthMetres =
            tileLengthValue / 100;

        const tileWidthMetres =
            tileWidthValue / 100;

        tileArea =
            tileLengthMetres * tileWidthMetres;

        areaUnit = "m²";

    } else {

        surfaceArea =
            areaLengthValue * areaWidthValue;

        const tileLengthFeet =
            tileLengthValue / 12;

        const tileWidthFeet =
            tileWidthValue / 12;

        tileArea =
            tileLengthFeet * tileWidthFeet;

        areaUnit = "sq ft";
    }


    const exactTilesBeforeWaste =
        surfaceArea / tileArea;

    const tilesBeforeWaste =
        Math.ceil(exactTilesBeforeWaste);

    const exactTilesWithWaste =
        exactTilesBeforeWaste * (1 + wasteValue / 100);

    const recommendedTiles =
        Math.ceil(exactTilesWithWaste);


    let purchaseHTML = "";
    let estimatedCost = null;


    if (
        Number.isFinite(tilesPerBoxValue) &&
        tilesPerBoxValue > 0
    ) {

        const boxesRequired =
            Math.ceil(recommendedTiles / tilesPerBoxValue);

        const totalTilesPurchased =
            boxesRequired * tilesPerBoxValue;

        purchaseHTML += `
            <p>
                <strong>Recommended Purchase:</strong>
                ${boxesRequired} × ${tilesPerBoxValue}-tile boxes
            </p>

            <p>
                <strong>Total Tiles Purchased:</strong>
                ${totalTilesPurchased} tiles
            </p>
        `;


        if (
            Number.isFinite(priceValue) &&
            priceValue >= 0
        ) {

            if (pricingMethod.value === "box") {

                estimatedCost =
                    boxesRequired * priceValue;

            } else {

                estimatedCost =
                    totalTilesPurchased * priceValue;
            }
        }

    } else {

        if (
            pricingMethod.value === "box" &&
            Number.isFinite(priceValue)
        ) {

            result.innerHTML =
                "<p>Please enter Tiles Per Box to calculate a box-based price.</p>";

            return;
        }


        if (
            Number.isFinite(priceValue) &&
            priceValue >= 0
        ) {

            estimatedCost =
                recommendedTiles * priceValue;
        }
    }


    const currencySymbol =
        getCurrencySymbol();


    let costHTML = "";

    if (estimatedCost !== null) {

        costHTML = `
            <p>
                <strong>Estimated Cost:</strong>
                ${currencySymbol}${estimatedCost.toFixed(2)}
            </p>
        `;
    }


    result.innerHTML = `
        <h3>Estimated Tiles Required</h3>

        <p>
            ${recommendedTiles} tiles
        </p>

        ${purchaseHTML}

        ${costHTML}

        <hr>

        <h3>How we calculated this</h3>

        <p>
            <strong>Surface Area:</strong>
            ${surfaceArea.toFixed(2)} ${areaUnit}
        </p>

        <p>
            <strong>Tile Area:</strong>
            ${tileArea.toFixed(4)} ${areaUnit}
        </p>

        <p>
            <strong>Tiles Before Waste:</strong>
            ${tilesBeforeWaste}
        </p>

        <p>
            <strong>Waste Allowance:</strong>
            ${wasteValue}%
        </p>

        <p>
            <strong>Recommended Tiles:</strong>
            ${recommendedTiles}
        </p>
    `;
}


unitRadios.forEach(radio => {
    radio.addEventListener("change", updateUnits);
});


pricingMethod.addEventListener(
    "change",
    updatePricingMethod
);


calculateButton.addEventListener(
    "click",
    calculateTiles
);