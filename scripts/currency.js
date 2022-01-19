var currency = JSON.parse(localStorage.getItem('currency'));
var currencySymbol;

if(!currency)
{
    localStorage.setItem("currency", JSON.stringify("eur"));
}

$("#currencySelect").on("change", changeCurrency);
$(`#${currency}`).attr("selected", "selected");

switchCurrencySymbol();

function switchCurrencySymbol()
{
    switch(currency)
    {
    case "usd" : currencySymbol = "$"; break;
    case "eur" : currencySymbol = "€"; break;
    case "jpy" : currencySymbol = "¥"; break;
    }
}

function changeCurrency(selectedCurrency)
{
    currency = $(selectedCurrency.target).val();
    localStorage.setItem("currency", JSON.stringify(currency));
    
    switchCurrencySymbol();
    apiRequest();
}