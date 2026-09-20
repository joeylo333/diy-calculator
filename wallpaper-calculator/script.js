// =========================
// UI: Project Type
// =========================

const projectTypeButtons = document.querySelectorAll(
    'input[name="projectType"]'
);

const singleWallInputs = document.getElementById("singleWallInputs");
const wholeRoomInputs = document.getElementById("wholeRoomInputs");

projectTypeButtons.forEach(function (button) {
    button.addEventListener("change", function () {
        if (this.value === "wall") {
            singleWallInputs.style.display = "block";
            wholeRoomInputs.style.display = "none";
        } else {
            singleWallInputs.style.display = "none";
            wholeRoomInputs.style.display = "block";
        }
    });
});


// =========================
// UI: Pattern Match
// =========================

const patternMatchButtons = document.querySelectorAll(
    'input[name="patternMatch"]'
);

const patternRepeatGroup =
    document.getElementById("patternRepeatGroup");

const patternOffsetGroup =
    document.getElementById("patternOffsetGroup");

patternMatchButtons.forEach(function (button) {
    button.addEventListener("change", function () {

        if (this.value === "free") {
            patternRepeatGroup.style.display = "none";
            patternOffsetGroup.style.display = "none";

        } else if (this.value === "straight") {
            patternRepeatGroup.style.display = "block";
            patternOffsetGroup.style.display = "none";

        } else if (this.value === "drop") {
            patternRepeatGroup.style.display = "block";
            patternOffsetGroup.style.display = "block";
        }
    });
});


// =========================
// UI: Measurement Unit
// =========================

const unitSystemButtons = document.querySelectorAll(
    'input[name="unitSystem"]'
);

unitSystemButtons.forEach(function (button) {
    button.addEventListener("change", function () {

        const isMetric = this.value === "metric";

        document.getElementById("wallWidthLabel").textContent =
            isMetric ? "Wall Width (m)" : "Wall Width (ft)";

        document.getElementById("roomLengthLabel").textContent =
            isMetric ? "Room Length (m)" : "Room Length (ft)";

        document.getElementById("roomWidthLabel").textContent =
            isMetric ? "Room Width (m)" : "Room Width (ft)";

        document.getElementById("wallHeightLabel").textContent =
            isMetric ? "Wall Height (m)" : "Wall Height (ft)";

        document.getElementById("rollWidthLabel").textContent =
            isMetric
                ? "Wallpaper Roll Width (cm)"
                : "Wallpaper Roll Width (in)";

        document.getElementById("rollLengthLabel").textContent =
            isMetric
                ? "Wallpaper Roll Length (m)"
                : "Wallpaper Roll Length (ft)";

        document.getElementById("patternRepeatLabel").textContent =
            isMetric
                ? "Pattern Repeat (cm)"
                : "Pattern Repeat (in)";

        document.getElementById("patternOffsetLabel").textContent =
            isMetric
                ? "Pattern Offset (cm)"
                : "Pattern Offset (in)";

        document.getElementById("trimAllowanceLabel").textContent =
            isMetric
                ? "Trimming Allowance (cm)"
                : "Trimming Allowance (in)";
        // Update input placeholders
        document.getElementById("wallWidth").placeholder =
            isMetric ? "e.g. 4" : "e.g. 13";

        document.getElementById("roomLength").placeholder =
            isMetric ? "e.g. 5" : "e.g. 16";

        document.getElementById("roomWidth").placeholder =
            isMetric ? "e.g. 4" : "e.g. 13";

        document.getElementById("wallHeight").placeholder =
            isMetric ? "e.g. 2.4" : "e.g. 8";

        document.getElementById("rollWidth").placeholder =
            isMetric ? "e.g. 53" : "e.g. 21";

        document.getElementById("rollLength").placeholder =
            isMetric ? "e.g. 10.05" : "e.g. 33";

        document.getElementById("patternRepeat").placeholder =
            isMetric ? "e.g. 64" : "e.g. 25";

        document.getElementById("patternOffset").placeholder =
            isMetric ? "e.g. 32" : "e.g. 13";
        // Clear measurements when switching unit system
        document.getElementById("wallWidth").value = "";
        document.getElementById("roomLength").value = "";
        document.getElementById("roomWidth").value = "";
        document.getElementById("wallHeight").value = "";
        document.getElementById("rollWidth").value = "";
        document.getElementById("rollLength").value = "";
        document.getElementById("patternRepeat").value = "";
        document.getElementById("patternOffset").value = "";

// Clear previous calculation result
        document.getElementById("result").innerHTML = "";
// Set default trimming allowance
    const trimAllowanceInput =
        document.getElementById("trimAllowance");

        trimAllowanceInput.value = isMetric ? 10 : 4;
    });
});


// =========================
// Calculator
// =========================

const calculateButton =
    document.getElementById("calculateButton");

calculateButton.addEventListener("click", function () {

    // -------------------------
    // Read project type
    // -------------------------

    const selectedProjectType =
        document.querySelector(
            'input[name="projectType"]:checked'
        ).value;

    let totalWallWidth;

    if (selectedProjectType === "wall") {

        totalWallWidth =
            parseFloat(
                document.getElementById("wallWidth").value
            );

    } else {

        const roomLength =
            parseFloat(
                document.getElementById("roomLength").value
            );

        const roomWidth =
            parseFloat(
                document.getElementById("roomWidth").value
            );

        totalWallWidth =
            (roomLength + roomWidth) * 2;
    }


    // -------------------------
    // Read measurements
    // -------------------------

    let wallHeight =
        parseFloat(
            document.getElementById("wallHeight").value
        );

    let rollWidth =
        parseFloat(
            document.getElementById("rollWidth").value
        );

    let rollLength =
        parseFloat(
            document.getElementById("rollLength").value
        );

    let patternRepeat =
        parseFloat(
            document.getElementById("patternRepeat").value
        );

    let patternOffset =
        parseFloat(
            document.getElementById("patternOffset").value
        );

    let trimAllowance =
        parseFloat(
            document.getElementById("trimAllowance").value
        );

    const pricePerRoll =
        parseFloat(
            document.getElementById("pricePerRoll").value
        );
    const selectedCurrency =
        document.getElementById("currency").value;

    // -------------------------
    // Read selected options
    // -------------------------

    const selectedPatternMatch =
        document.querySelector(
            'input[name="patternMatch"]:checked'
        ).value;

    const selectedUnit =
        document.querySelector(
            'input[name="unitSystem"]:checked'
        ).value;


    // -------------------------
    // Convert to metres
    // -------------------------

    if (selectedUnit === "metric") {

        rollWidth = rollWidth / 100;
        trimAllowance = trimAllowance / 100;

        if (!isNaN(patternRepeat)) {
            patternRepeat = patternRepeat / 100;
        }

        if (!isNaN(patternOffset)) {
            patternOffset = patternOffset / 100;
        }

    } else {

        totalWallWidth =
            totalWallWidth * 0.3048;

        wallHeight =
            wallHeight * 0.3048;

        rollLength =
            rollLength * 0.3048;

        rollWidth =
            rollWidth * 0.0254;

        trimAllowance =
            trimAllowance * 0.0254;

        if (!isNaN(patternRepeat)) {
            patternRepeat =
                patternRepeat * 0.0254;
        }

        if (!isNaN(patternOffset)) {
            patternOffset =
                patternOffset * 0.0254;
        }
    }


    // -------------------------
    // Validation
    // -------------------------

    if (
        !totalWallWidth ||
        !wallHeight ||
        !rollWidth ||
        !rollLength ||
        (isNaN(trimAllowance))
    ) {
        document.getElementById("result").innerHTML =
            "<p>Please enter valid measurements.</p>";
        return;
    }

    if (
        selectedPatternMatch !== "free" &&
        (!patternRepeat || patternRepeat <= 0)
    ) {
        document.getElementById("result").innerHTML =
            "<p>Please enter a valid pattern repeat.</p>";
        return;
    }

    if (
        selectedPatternMatch === "drop" &&
        (!patternOffset || patternOffset <= 0)
    ) {
        document.getElementById("result").innerHTML =
            "<p>Please enter a valid pattern offset.</p>";
        return;
    }


    // -------------------------
    // Calculate strips required
    // -------------------------

    const stripsRequired =
        Math.ceil(
            totalWallWidth / rollWidth
        );


    // -------------------------
    // Calculate strip length
    // -------------------------

    const wallHeightWithTrim =
        wallHeight + trimAllowance;

    let stripLength;

    if (selectedPatternMatch === "free") {

        stripLength =
            wallHeightWithTrim;

    } else {

        // Straight Match and Drop / Offset Match
        stripLength =
            Math.ceil(
                wallHeightWithTrim /
                patternRepeat
            ) * patternRepeat;
    }


    // -------------------------
    // Calculate strips per roll
    // -------------------------

    let stripsPerRoll;

    if (selectedPatternMatch !== "drop") {

        // Free / Straight Match
        stripsPerRoll =
            Math.floor(
                rollLength / stripLength
            );

    } else {

        // Drop / Offset Match
        // Simulate alternating A / B positions

        let usedLength = 0;
        let stripCount = 0;

        while (true) {

            let alignmentWaste = 0;

            if (stripCount > 0) {

                if (stripCount % 2 === 1) {

                    // A -> B
                    alignmentWaste =
                        patternOffset;

                } else {

                    // B -> A
                    alignmentWaste =
                        patternRepeat -
                        patternOffset;
                }
            }

            const requiredLength =
                alignmentWaste +
                stripLength;

            if (
                usedLength +
                requiredLength >
                rollLength
            ) {
                break;
            }

            usedLength += requiredLength;
            stripCount++;
        }

        stripsPerRoll = stripCount;
    }


    // -------------------------
    // Check roll length
    // -------------------------

    if (stripsPerRoll < 1) {

        document.getElementById("result").innerHTML =
            "<p>The wallpaper roll is too short for this wall height.</p>";

        return;
    }


    // -------------------------
    // Calculate rolls required
    // -------------------------

    const rollsRequired =
        Math.ceil(
            stripsRequired /
            stripsPerRoll
        );


    // -------------------------
    // Estimated cost
    // -------------------------

    let costText = "";

if (
    !isNaN(pricePerRoll) &&
    pricePerRoll > 0
) {

    const totalCost =
        rollsRequired * pricePerRoll;

    const currencySymbols = {
        USD: "$",
        GBP: "£",
        EUR: "€",
        CAD: "C$",
        AUD: "A$",
        NZD: "NZ$",
        SGD: "S$",
        MYR: "RM"
    };

    const currencySymbol =
        currencySymbols[selectedCurrency];

    costText = `
        <p>
            <strong>Estimated Cost:</strong>
            ${currencySymbol}${totalCost.toFixed(2)}
        </p>
    `;
}


    // -------------------------
    // Display conversions
    // -------------------------

    const isMetricResult =
        selectedUnit === "metric";

    const displayWallWidth =
        isMetricResult
            ? totalWallWidth
            : totalWallWidth / 0.3048;

    const displayWallHeight =
        isMetricResult
            ? wallHeight
            : wallHeight / 0.3048;

    const displayRollWidth =
        isMetricResult
            ? rollWidth * 100
            : rollWidth / 0.0254;

    const displayRollLength =
        isMetricResult
            ? rollLength
            : rollLength / 0.3048;

    const displayStripLength =
        isMetricResult
            ? stripLength
            : stripLength / 0.3048;

    const displayTrimAllowance =
        isMetricResult
            ? trimAllowance * 100
            : trimAllowance / 0.0254;

    const displayPatternRepeat =
        isMetricResult
            ? patternRepeat * 100
            : patternRepeat / 0.0254;

    const displayPatternOffset =
        isMetricResult
            ? patternOffset * 100
            : patternOffset / 0.0254;


    // -------------------------
    // Display units
    // -------------------------

    const wallUnit =
        isMetricResult ? "m" : "ft";

    const rollWidthUnit =
        isMetricResult ? "cm" : "in";

    const rollLengthUnit =
        isMetricResult ? "m" : "ft";

    const stripLengthUnit =
        isMetricResult ? "m" : "ft";

    const smallUnit =
        isMetricResult ? "cm" : "in";


    // -------------------------
    // Pattern information
    // -------------------------

    const patternName =
        selectedPatternMatch === "free"
            ? "Free / No Match"
            : selectedPatternMatch === "straight"
                ? "Straight Match"
                : "Drop / Offset Match";

    let patternDetails = "";

    if (
        selectedPatternMatch === "straight"
    ) {

        patternDetails = `
            <p>
                <strong>Pattern Repeat:</strong>
                ${displayPatternRepeat.toFixed(2)}
                ${smallUnit}
            </p>
        `;
    }

    if (
        selectedPatternMatch === "drop"
    ) {

        patternDetails = `
            <p>
                <strong>Pattern Repeat:</strong>
                ${displayPatternRepeat.toFixed(2)}
                ${smallUnit}
            </p>

            <p>
                <strong>Pattern Offset:</strong>
                ${displayPatternOffset.toFixed(2)}
                ${smallUnit}
            </p>
        `;
    }


    // -------------------------
    // Display result
    // -------------------------

    document.getElementById("result").innerHTML = `

        <div class="result-summary">

            <p class="result-label">
                YOUR ESTIMATE
            </p>

            <h2>
                ${rollsRequired} rolls needed
            </h2>

        </div>


        <div class="result-grid">

            <div>
                <span>Strips Required</span>
                <strong>
                    ${stripsRequired}
                </strong>
            </div>

            <div>
                <span>Length Per Strip</span>
                <strong>
                    ${displayStripLength.toFixed(2)}
                    ${stripLengthUnit}
                </strong>
            </div>

            <div>
                <span>Strips Per Roll</span>
                <strong>
                    ${stripsPerRoll}
                </strong>
            </div>

            <div>
                <span>Pattern Match</span>
                <strong>
                    ${patternName}
                </strong>
            </div>

        </div>


        <div class="calculation-breakdown">

            <h3>
                How we calculated this
            </h3>

            <p>
                <strong>Total Wall Width:</strong>
                ${displayWallWidth.toFixed(2)}
                ${wallUnit}
            </p>

            <p>
                <strong>Wall Height:</strong>
                ${displayWallHeight.toFixed(2)}
                ${wallUnit}
            </p>

            <p>
                <strong>Roll Width:</strong>
                ${displayRollWidth.toFixed(2)}
                ${rollWidthUnit}
            </p>

            <p>
                <strong>Roll Length:</strong>
                ${displayRollLength.toFixed(2)}
                ${rollLengthUnit}
            </p>

            <p>
                <strong>Trimming Allowance:</strong>
                ${displayTrimAllowance.toFixed(2)}
                ${smallUnit}
            </p>

            ${patternDetails}

            <hr>

            <p>
                ${displayWallWidth.toFixed(2)}
                ${wallUnit}
                wall width ÷

                ${displayRollWidth.toFixed(2)}
                ${rollWidthUnit}
                roll width

                =
                <strong>
                    ${stripsRequired} strips
                </strong>
            </p>

            <p>
                Cut length per strip:
                <strong>
                    ${displayStripLength.toFixed(2)}
                    ${stripLengthUnit}
                </strong>
            </p>

            ${selectedPatternMatch === "drop" ? `
    <p>
        Drop / Offset Match uses alternating pattern alignment.
        Pattern offset waste is included when calculating how many
        full strips fit on each roll.

        <strong>
            ${stripsPerRoll}
            full strips per roll
        </strong>
    </p>
` : `
    <p>
        ${displayRollLength.toFixed(2)}
        ${rollLengthUnit}
        roll length ÷

        ${displayStripLength.toFixed(2)}
        ${stripLengthUnit}

        =
        <strong>
            ${stripsPerRoll}
            full strips per roll
        </strong>
    </p>
`}

            <p>
                ${stripsRequired}
                strips ÷

                ${stripsPerRoll}
                strips per roll

                =
                <strong>
                    ${rollsRequired} rolls
                </strong>
            </p>

            ${costText}

        </div>
    `;
});