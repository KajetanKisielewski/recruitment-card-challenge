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

    const detectCardBrand = (number) => {
        const cardPatterns = {
            visa: /^4/,
            mastercard: /^(5[1-5]|22[2-7][1-9])/,
        };

        if (cardPatterns.visa.test(number)) {
            return 'visa';
        } else if (cardPatterns.mastercard.test(number)) {
            return 'mastercard';
        } else {
            return 'visa';
        }
    };

    const updateCardLogo = (brand) => {
        const visaLogo = document.querySelector('.card-preview__image--visa');
        const mastercardLogo = document.querySelector('.card-preview__image--mastercard');

        if (brand === 'visa') {
            visaLogo.style.display = 'block';
            mastercardLogo.style.display = 'none';
        } else if (brand === 'mastercard') {
            mastercardLogo.style.display = 'block';
            visaLogo.style.display = 'none';
        }
    };

    const formatCardNumberForDisplay = (value) => {
        const cleanedValue = value.replace(/\D/g, "");
        return cleanedValue.padEnd(16, '#').match(/.{1,4}/g) || [];
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

        while (elements.cardNumberDisplay.firstChild) {
            elements.cardNumberDisplay.removeChild(elements.cardNumberDisplay.firstChild);
        }

        const formattedNumberForDisplay = formatCardNumberForDisplay(limitedValue);
        formattedNumberForDisplay.forEach(group => {
            const span = document.createElement('span');
            span.textContent = group;
            elements.cardNumberDisplay.appendChild(span);
        });

        const cardBrand = detectCardBrand(limitedValue);
        updateCardLogo(cardBrand);
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