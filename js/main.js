const changeBtn = document.querySelector('.sasinometer__btn-change');
const convertBtn = document.querySelector('.sasinometer__btn-convert');
const resetBtn = document.querySelector('.sasinometer__btn-reset');

const changeFromValue = document.querySelector('.sasinometer__change-1');
const changeToValue = document.querySelector('.sasinometer__change-2');

const converter = document.querySelector('.sasinometer__input');

const result = document.querySelector('.sasinometer__result');
const resultColor = document.querySelector('.sasinometer__result--color');

const radios = document.querySelectorAll('.sasinometer__radio');
const checkedRadio = document.getElementById('checked');

const currencyCode = document.querySelector('.sasinometer__currency-code');
const currencyRate = document.querySelector('.sasinometer__currency-result');
const currencyRateContainer = document.querySelector('.sasinometer__currency-rate');

const pln = 'PLN';
const eur = 'EUR';
const gbp = 'GBP';
const usd = 'USD';
const chf = 'CHF';
const sas = 'SAS';

const oneSasin = 70000000;

let sasin, convertedValue, exchangeRate;

const init = () => {
    changeFromValue.textContent = pln;
    changeToValue.textContent = sas;
    result.textContent = `${oneSasin.toLocaleString('pl-PL')} ${pln} =`;
    resultColor.textContent = `1 ${sas}`;
    converter.value = '';
    checkedRadio.checked = true;
    showCurrentRate(pln);
}

const showCurrentRate = (code, rate) => {
    if (code === pln) {
        currencyRateContainer.classList.add('sasinometer__currency-rate--hidden')
    } else {
        currencyRateContainer.classList.remove('sasinometer__currency-rate--hidden')
        currencyCode.textContent = code;
        currencyRate.textContent = rate.toFixed(2);
    }
}

init();

const getRate = (currencyCode) => {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyCode}&symbols=${pln}`)
        .then(res => res.json())
        .then(data => {
            exchangeRate = data.rates[pln];
        })
}

const changeCurrency = () => {
    converter.value = '';
    if (changeToValue.textContent === sas) {
        changeToValue.textContent = changeFromValue.textContent;
        changeFromValue.textContent = sas;
    } else {
        changeFromValue.textContent = changeToValue.textContent;
        changeToValue.textContent = sas;
    }
}

const convertCurrency = () => {
    let converterValue = converter.value;
    if (converterValue !== "") {
        if (changeFromValue.textContent == pln || changeToValue.textContent == pln) {
            changeToValue.textContent == sas ? plnToSas(converterValue) : sasToPln(converterValue);
        } else if (changeFromValue.textContent == eur || changeToValue.textContent == eur) {
            changeToValue.textContent == sas ? eurToSas(converterValue) : sasToEur(converterValue);
        } else if (changeFromValue.textContent == gbp || changeToValue.textContent == gbp) {
            changeToValue.textContent == sas ? gbpToSas(converterValue) : sasToGbp(converterValue);
        } else if (changeFromValue.textContent == usd || changeToValue.textContent == usd) {
            changeToValue.textContent == sas ? usdToSas(converterValue) : sasToUsd(converterValue);
        } else if (changeFromValue.textContent == chf || changeToValue.textContent == chf) {
            changeToValue.textContent == sas ? chfToSas(converterValue) : sasToChf(converterValue);
        }
        converterValue = "";
    } else {
        result.textContent = '';
        resultColor.textContent = 'Podaj liczbę.';
    }
}

const showSasinResult = (value, code) => {
    result.textContent = `${value.toLocaleString('pl-PL')} ${code} =`;
    resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
}

const showConvertedResult = (value, code) => {
    result.textContent = `${value.toLocaleString('pl-PL')} ${sas} =`;
    resultColor.textContent = `${convertedValue.toLocaleString('pl-PL')} ${code}`;
}

const calculateSasin = (value, rate) => {
    sasin = value * rate / oneSasin;
}

const calculateCurrency = (value, rate) => {
    convertedValue = value * oneSasin / rate;
}

const plnToSas = value => {
    calculateSasin(value, 1);
    showSasinResult(value, pln);
}

const sasToPln = value => {
    calculateCurrency(value, 1);
    showConvertedResult(value, pln);
}

const eurToSas = value => {
    calculateSasin(value, exchangeRate);
    showSasinResult(value, eur);
}

const sasToEur = value => {
    calculateCurrency(value, exchangeRate);
    showConvertedResult(value, eur);
}

const gbpToSas = value => {
    calculateSasin(value, exchangeRate);
    showSasinResult(value, gbp);
}

const sasToGbp = value => {
    calculateCurrency(value, exchangeRate);
    showConvertedResult(value, gbp);
}

const usdToSas = value => {
    calculateSasin(value, exchangeRate);
    showSasinResult(value, usd);
}

const sasToUsd = value => {
    calculateCurrency(value, exchangeRate);
    showConvertedResult(value, usd);
}

const chfToSas = value => {
    calculateSasin(value, exchangeRate);
    showSasinResult(value, chf);
}

const sasToChf = value => {
    calculateCurrency(value, exchangeRate);
    showConvertedResult(value, chf);
}

radios.forEach(radio => {
    radio.addEventListener('change', e => {
        converter.value = '';
        getRate(e.target.value);
        if (changeFromValue.textContent === sas) {
            changeToValue.textContent = radio.value;
        } else {
            changeFromValue.textContent = radio.value;
        }
        setTimeout(() => {
            showCurrentRate(e.target.value, exchangeRate);
        }, 250)
    })
})

resetBtn.addEventListener('click', init);
changeBtn.addEventListener('click', changeCurrency);
convertBtn.addEventListener('click', convertCurrency);
converter.addEventListener('keydown', e => {
    if (e.keyCode == 13) {
        convertCurrency();
    }
});