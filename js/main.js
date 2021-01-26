const changeBtn = document.querySelector('.sasinometer__btn-change');
const convertBtn = document.querySelector('.sasinometer__btn-convert');
const resetBtn = document.querySelector('.sasinometer__btn-reset');

const changeFromValue = document.querySelector('.sasinometer__change-1');
const changeToValue = document.querySelector('.sasinometer__change-2');

const converter = document.querySelector('.sasinometer__input');
const result = document.querySelector('.sasinometer__result');
const resultColor = document.querySelector('.sasinometer__result--color');

const radios = document.querySelectorAll('.sasinometer__radio');

const url = 'http://api.nbp.pl/api/exchangerates/rates/c/';

const pln = 'pln';
const eur = 'eur';
const gbp = 'gbp';
const usd = 'usd';
const sas = 'sas';

let zloty, euro, funt, dollar, sasin;

changeFromValue.textContent = pln;
changeToValue.textContent = sas;
result.textContent = '70000000 zł =';
resultColor.textContent = '1 sas';

const changeCurrency = () => {
    if (changeToValue.textContent === sas) {
        changeToValue.textContent = changeFromValue.textContent;
        changeFromValue.textContent = sas;
    } else {
        changeFromValue.textContent = changeToValue.textContent;
        changeToValue.textContent = sas;
    }
}

const convertCurrency = () => {
    if (converter.value !== "") {
        if (changeFromValue.textContent == pln || changeToValue.textContent == pln) {
            changeToValue.textContent == sas ? plnToSas() : sasToPln();
        } else if (changeFromValue.textContent == eur || changeToValue.textContent == eur) {
            changeToValue.textContent == sas ? eurToSas() : sasToEur();
        } else if (changeFromValue.textContent == gbp || changeToValue.textContent == gbp) {
            changeToValue.textContent == sas ? gbpToSas() : sasToGbp();
        } else if (changeFromValue.textContent == usd || changeToValue.textContent == usd) {
            changeToValue.textContent == sas ? usdToSas() : sasToUsd();
        }
        converter.value = "";
    } else {
        result.textContent = '';
        resultColor.textContent = 'Błąd. Podaj liczbę.';
    }
}

const plnToSas = () => {
    sasin = converter.value / 70000000;
    result.textContent = `${converter.value} ${pln} =`;
    resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
}

const sasToPln = () => {
    zloty = converter.value * 70000000;
    result.textContent = `${converter.value} ${sas} =`;
    resultColor.textContent = `${zloty} ${pln}`;
}

const eurToSas = () => {
    const converterValue = converter.value;
    axios.get(url + eur)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            euro = status.bid;
            sasin = converterValue * euro / 70000000;
            result.textContent = `${converterValue} ${eur} =`;
            resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
        })
}

const sasToEur = () => {
    const converterValue = converter.value;
    axios.get(url + eur)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            euro = status.bid;
            euro = converterValue * 70000000 / euro;
            result.textContent = `${converterValue} ${sas} =`;
            resultColor.textContent = `${euro.toFixed(2)} ${eur}`;
        })
}

const gbpToSas = () => {
    const converterValue = converter.value;
    axios.get(url + gbp)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            funt = status.bid;
            sasin = converterValue * funt / 70000000;
            result.textContent = `${converterValue} ${gbp} =`;
            resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
        })
}

const sasToGbp = () => {
    const converterValue = converter.value;
    axios.get(url + gbp)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            funt = status.bid;
            funt = converterValue * 70000000 / funt;
            result.textContent = `${converterValue} ${sas} =`;
            resultColor.textContent = `${funt.toFixed(2)} ${gbp}`;
        })
}

const usdToSas = () => {
    const converterValue = converter.value;
    axios.get(url + usd)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            dollar = status.bid;
            sasin = converterValue * dollar / 70000000;
            result.textContent = `${converterValue} ${usd} =`;
            resultColor.textContent = `${sasin.toFixed(8)} ${sas}`;
        })
}

const sasToUsd = () => {
    const converterValue = converter.value;
    axios.get(url + usd)
        .then(res => {
            const status = Object.assign({}, ...res.data.rates);
            dollar = status.bid;
            dollar = converterValue * 70000000 / dollar;
            result.textContent = `${converterValue} ${sas} =`;
            resultColor.textContent = `${dollar.toFixed(2)} ${usd}`;
        })
}


radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (changeFromValue.textContent === sas) {
            changeToValue.textContent = radio.value;
        } else {
            changeFromValue.textContent = radio.value;
        }
    })
})

changeBtn.addEventListener('click', changeCurrency);
convertBtn.addEventListener('click', convertCurrency);
converter.addEventListener('keydown', (e) => {
    if (e.keyCode == 188 || e.keyCode == 110) {
        e.preventDefault();
    }
    if (e.keyCode == 13) {
        convertCurrency();
    }
})