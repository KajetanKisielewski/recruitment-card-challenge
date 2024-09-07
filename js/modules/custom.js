export default function(){
    const cardNumberInput = document.getElementById("card-number");
    const cardHolderInput = document.getElementById("card-name");
    const monthSelect = document.getElementById("expiration-month");
    const yearSelect = document.getElementById("expiration-year");

    const cardNumberDisplay = document.querySelector(".card__number");
    const cardHolderDisplay = document.querySelector(".card__holder-name");
    const monthDisplay = document.querySelector(".card__expires-month");
    const yearDisplay = document.querySelector(".card__expires-year");

    if (cardNumberInput && cardNumberDisplay) {
        cardNumberInput.addEventListener("input", function () {
            let formattedNumber = this.value.replace(/\D/g, "");
            console.log('for', formattedNumber)
            formattedNumber = formattedNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
            cardNumberDisplay.textContent = formattedNumber || "#### #### #### ####";
        });
    }

    if (cardHolderInput && cardHolderDisplay) {
        cardHolderInput.addEventListener("input", function () {
            cardHolderDisplay.textContent = this.value || "AD SOYAD";
        });
    }

    function updateExpiryDate() {
        const month = monthSelect.value !== "Month" ? monthSelect.value : "MM";
        const year = yearSelect.value !== "Year" ? yearSelect.value.slice(-2) : "YY";
        monthDisplay.textContent = `${month}/`;
        yearDisplay.textContent = year;
    }

    if (monthSelect && yearSelect && monthDisplay && yearDisplay) {
        monthSelect.addEventListener("change", updateExpiryDate);
        yearSelect.addEventListener("change", updateExpiryDate);
    }
}