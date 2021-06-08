const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch change rate and update the DOM
function calculate() {
    const currency_code1 = currency_one.value;
    const currency_code2 = currency_two.value;
    //console.log(currency_code1, currency_code2);

    fetch(`https://v6.exchangerate-api.com/v6/0422b2388e1bd4c628048609/latest/${currency_code1}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        const rate = data.conversion_rates[currency_code2];
        //console.log(rate);
        rateElement.innerText = `1 ${currency_code1} = ${rate} ${currency_code2}`;
        amount_two.value = (amount_one.value * rate).toFixed(2);
    })
}
calculate();

//Dynamic title with name of currency
function setCurrencyName(currency_name) {
    fetch(`https://v6.exchangerate-api.com/v6/0422b2388e1bd4c628048609/codes`)
    .then(res => res.json())
    .then(data => {
        const codes = data.supported_codes;
        //console.log("codes:" + data.supported_codes);
        const name = codes.filter(item => item[0].includes(currency_name.value)); 
        //console.log(`filtered: ${name}`);
        const title = name.map(item => item[1]);
        currency_name.setAttribute("title", title);
    })
}



//Event Listeners

currency_one.addEventListener('change', calculate);
currency_one.addEventListener('mousemove', () => setCurrencyName(currency_one));
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
currency_two.addEventListener('mousemove', () => setCurrencyName(currency_two));
amount_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
})

