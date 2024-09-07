export default function(){
    const elements = {
        cardNumberInput: document.getElementById("card-number"),
        cardHolderInput: document.getElementById("card-name"),
        monthSelect: document.getElementById("expiration-month"),
        yearSelect: document.getElementById("expiration-year"),
        cardNumberDisplay: document.querySelector(".card__number"),
        cardHolderDisplay: document.querySelector(".card__holder-name"),
        monthDisplay: document.querySelector(".card__expires-month"),
        yearDisplay: document.querySelector(".card__expires-year")
    };

    const formatCardNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, "");
        const formattedCardNumber = cleanedValue.padEnd(16, '#');
        return formattedCardNumber.match(/.{1,4}/g).join(" ");
    };

    const formatCardHolder = (value) => value || "AD SOYAD";

    const formatExpiryDate = () => {
        const month = elements.monthSelect.value !== "Month" ? elements.monthSelect.value : "MM";
        const year = elements.yearSelect.value !== "Year" ? elements.yearSelect.value.slice(-2) : "YY";
        return { month, year };
    };

    const updateCardDisplay = (field, value) => {
        if (field) {
            field.textContent = value;
        }
    };

    const handleCardNumberInput = (e) => {
        const formattedNumber = formatCardNumber(e.target.value);
        updateCardDisplay(elements.cardNumberDisplay, formattedNumber);
    };

    const handleCardHolderInput = (e) => {
        const formattedHolder = formatCardHolder(e.target.value);
        updateCardDisplay(elements.cardHolderDisplay, formattedHolder);
    };

    const handleExpiryChange = () => {
        const { month, year } = formatExpiryDate();
        updateCardDisplay(elements.monthDisplay, `${month}/`);
        updateCardDisplay(elements.yearDisplay, year);
    };

    if (elements.cardNumberInput) {
        elements.cardNumberInput.addEventListener("input", handleCardNumberInput);
    }

    if (elements.cardHolderInput) {
        elements.cardHolderInput.addEventListener("input", handleCardHolderInput);
    }

    if (elements.monthSelect && elements.yearSelect) {
        elements.monthSelect.addEventListener("change", handleExpiryChange);
        elements.yearSelect.addEventListener("change", handleExpiryChange);
    }
}