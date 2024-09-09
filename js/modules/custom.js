export default function(){
    const elements = {
        cardNumberInput: document.getElementById("card-number"),
        cardHolderInput: document.getElementById("card-name"),
        monthSelect: document.getElementById("expiration-month"),
        yearSelect: document.getElementById("expiration-year"),
        cardNumberDisplay: document.querySelector(".card-preview__number"),
        cardHolderDisplay: document.querySelector(".card-preview__holder-name"),
        monthDisplay: document.querySelector(".card-preview__expires-month"),
        yearDisplay: document.querySelector(".card-preview__expires-year")
    };

    const formatCardNumberForDisplay = (value) => {
        const cleanedValue = value.replace(/\D/g, "");
        const formattedCardNumber = cleanedValue.padEnd(16, '#');
        return formattedCardNumber.match(/.{1,4}/g).join(" ");
    };

    const formatCardNumberForInput = (value) => {
        const cleanedValue = value.replace(/\D/g, "");
        return cleanedValue.match(/.{1,4}/g)?.join(" ") || "";
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
        const rawValue = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        const limitedValue = rawValue.slice(0, 16);
        e.target.value = formatCardNumberForInput(limitedValue);
        const formattedNumberForDisplay = formatCardNumberForDisplay(limitedValue);
        updateCardDisplay(elements.cardNumberDisplay, formattedNumberForDisplay);
    };

    const handleCardHolderInput = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
        const formattedHolder = formatCardHolder(value);
        updateCardDisplay(elements.cardHolderDisplay, formattedHolder);
        e.target.value = value;
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