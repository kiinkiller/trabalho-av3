let historicoDeConversao = [];

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit)

const inputValue = document.getElementById('value-real');
const selectedCurrency = document.getElementById('currency');
const result = document.getElementById('result');
const historicoSection = document.getElementById('historico-conversoes');

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const historicoResults = document.getElementById('historico-results');



function handleSubmit(e){
    e.preventDefault();

    const numberFormated = Number(inputValue.value.replace(",",".") ) 

    if(!numberFormated || numberFormated <= 0){
        alert('informe um valor valido!');
        return;
    } else if(!selectedCurrency.value){
        alert('escolha uma moeda');
        return;
    }
 
    converter();
};

function converter(){
    let valueConverted;
    let currency;

    if(selectedCurrency.value === 'eur'){
        valueConverted = inputValue.value / 6;
        currency = 'EUR';
    } else if(selectedCurrency.value === 'dol'){
        valueConverted = inputValue.value / 5 ;
        currency = 'USD';
    } else if(selectedCurrency.value === 'cny'){
        valueConverted = inputValue.value / 0.8;
        currency = 'CNY';
    } else if(selectedCurrency.value === 'aoa'){
        valueConverted = inputValue.value /0.01;
        currency = 'AOA';
    } else if(selectedCurrency.value === 'twd'){
        valueConverted = inputValue.value /0.15;
        currency = 'TWD';
    }

    historicoDeConversao.push({
        medida: selectedCurrency.value,
        valorOriginal: inputValue.value,
        resultado: valueConverted
    });

    resulte.innerHTML = valueFormatter(valueConverted, currency);

    atualizarHistorico();

    inputValue.value = '';
    selectedCurrency.value = '';
};

function valueFormatter(value, currency){
    const formattedValue = value.toLocaleString('pt-BR', {style: 'currency', currency: currency });
    return ` ${formattedValue} `;
};

function atualizarHistorico() {

    historicoSection.innerHTML = '';
    historicoSection.classList.add("historico")
    historicoDeConversao.forEach((conversao, index) => {
        const conversaoElement = document.createElement('p');
        conversaoElement.textContent = `Conversão ${index + 1}: ${conversao.valorOriginal.replace(".",",")} BRL = ${valueFormatter(conversao.resultado, conversao.medida.toUpperCase())}`;
        historicoSection.appendChild(conversaoElement);


    });
}