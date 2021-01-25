const changeBtn = document.querySelector('.sasinometer__btn-change');
const convertBtn = document.querySelector('.sasinometer__btn-convert');
const resetBtn = document.querySelector('.sasinometer__btn-reset');

const changeFromValue = document.querySelector('.sasinometer__change-1');
const changeToValue = document.querySelector('.sasinometer__change-2');

const zloty = 'pln';
const euro = 'eur';
const pound = 'gbp';
const dollar = 'usd';
const sasin = 'sas';

changeFromValue.textContent = zloty;
changeToValue.textContent = sasin;

const changeCurrency = () => {
    if (changeToValue.textContent === sasin) {
        changeToValue.textContent = changeFromValue.textContent;
        changeFromValue.textContent = sasin;
    } else {
        changeFromValue.textContent = changeToValue.textContent;
        changeToValue.textContent = sasin;
    }
}

changeBtn.addEventListener('click', changeCurrency);