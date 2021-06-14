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
        console.log(currency_code1, currency_code2);

        let rate;

        fetch(`db/rates.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const expr = currency_code1;
            switch (expr) {
            case 'USD':
                rate = data.conversion_rates_USD[currency_code2];
                break;
            case 'EUR':
                rate = data.conversion_rates_EUR[currency_code2];
                break;
            case 'GBP':
                rate = data.conversion_rates_GBP[currency_code2];
                break;
            case 'CHF':
                rate = data.conversion_rates_CHF[currency_code2];
                break;
            case 'AUD':
                rate = data.conversion_rates_AUD[currency_code2];
                break;
            case 'AED':
                rate = data.conversion_rates_AED[currency_code2];
                break;
            case 'ARS':
                rate = data.conversion_rates_ARS[currency_code2];
                break;
            case 'HKD':
                rate = data.conversion_rates_HKD[currency_code2];
                break;
            case 'INR':
                rate = data.conversion_rates_INR[currency_code2];
                break;
            case 'CNY':
                rate = data.conversion_rates_CNY[currency_code2];
                break;
            case 'SEK':
                rate = data.conversion_rates_SEK[currency_code2];
                break;
            case 'RUB':
                rate = data.conversion_rates_RUB[currency_code2];
                break;
            case 'THB':
                rate = data.conversion_rates_THB[currency_code2];
                break;
            case 'UAH':
                rate = data.conversion_rates_UAH[currency_code2];
                break;
            case 'SGD':
                rate = data.conversion_rates_SGD[currency_code2];
                break;
            default:
                rate = 0;
}
            console.log("RATE " + rate);
            rateElement.innerText = `1 ${currency_code1} = ${rate} ${currency_code2}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
        })
    }
    calculate();

    //Dynamic title with name of currency
    function setCurrencyName(currency_name) {
        fetch(`db/codes.json`)
        .then(res => res.json())
        .then(data => {
            const codes = data.supported_codes;
            const name = codes.filter(item => item[0].includes(currency_name.value)); 
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

