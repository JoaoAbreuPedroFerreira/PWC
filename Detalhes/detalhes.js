var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var selectedCoin = urlParams.get("selectedCoin");

if(selectedCoin)
{
    var currency = urlParams.get("currency");
    populateDetailsPage(currency, selectedCoin);
}
else
{
    //sem moeda selecionada
}

function populateDetailsPage(currency, selectedCoin)
{   
    var currencySymbol;

    switch(currency)
    {
    case "usd" : currencySymbol = "$"; break;
    case "eur" : currencySymbol = "€"; break;
    case "jpy" : currencySymbol = "¥"; break;
    }

    var url = `https://api.coingecko.com/api/v3/coins/${selectedCoin}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //console.log(xhr.status);
            console.log(JSON.parse(xhr.response));
            coin = JSON.parse(xhr.response);
            $(".descricao p").html(coin.description["en"]);
            $(".crypto_img").attr("src", coin.image.large);
            $(".nome").text(coin.name);
            $(".ranking").text(coin.market_cap_rank + " #");
            $(".valor").text(coin.market_data.current_price[currency] + " " + currencySymbol);
            $(".variacao").text(coin.market_data.market_cap_change_percentage_24h.toFixed(2) + " %");
        }
    };

    xhr.send();
}
