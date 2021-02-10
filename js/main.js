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

const sas = 'SAS';
const currencies = ['PLN', 'EUR', 'GBP', 'USD', 'CHF'];

const oneSasin = 70000000;

let sasin, convertedValue, exchangeRate;

const init = () => {
    getRate(currencies[1]);
    changeFromValue.textContent = currencies[0];
    changeToValue.textContent = sas;
    result.textContent = `${oneSasin.toLocaleString('pl-PL')} ${currencies[0]} =`;
    resultColor.textContent = `1 ${sas}`;
    converter.value = '';
    checkedRadio.checked = true;
    showCurrentRate(currencies[0]);
}

const showCurrentRate = (code, rate) => {
    if (code === currencies[0]) {
        currencyRateContainer.classList.add('sasinometer__currency-rate--hidden')
    } else {
        currencyRateContainer.classList.remove('sasinometer__currency-rate--hidden')
        currencyCode.textContent = code;
        currencyRate.textContent = rate.toFixed(2);
    }
}

const getRate = (currencyCode) => {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyCode}&symbols=${currencies[0]}`)
        .then(res => res.json())
        .then(data => {
            exchangeRate = data.rates[currencies[0]];
        })
}

init();

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

const showResult = (value, code) => {
    if (changeToValue.textContent == sas) {
        result.textContent = `${value.toLocaleString('pl-PL')} ${code} =`;
        resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
    } else {
        result.textContent = `${value.toLocaleString('pl-PL')} ${sas} =`;
        resultColor.textContent = `${convertedValue.toLocaleString('pl-PL')} ${code}`;
    }
}

const calculate = (value, rate) => {
    changeToValue.textContent == sas ? sasin = value * rate / oneSasin : convertedValue = value * oneSasin / rate;
}

const convert = (value, code) => {
    changeFromValue.textContent == currencies[0] || changeToValue.textContent == currencies[0] ? calculate(value, 1) : calculate(value, exchangeRate);
    showResult(value, code);
}

const convertCurrency = () => {
    let converterValue = converter.value;
    if (converterValue !== "") {
        currencies.forEach(currency => {
            if (changeFromValue.textContent == currency || changeToValue.textContent == currency) {
                convert(converterValue, currency);
            }
        })
        converterValue = "";
    } else {
        result.textContent = '';
        resultColor.textContent = 'Podaj liczbę.';
    }
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