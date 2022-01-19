var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var selectedCoin = urlParams.get("selectedCoin");

if(selectedCoin)
{
    apiRequest();
}
else
{
    window.location.replace("../index.html");
}

function apiRequest()
{
   var url = `https://api.coingecko.com/api/v3/coins/${selectedCoin}`;

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         //console.log(xhr.status);
         //console.log(JSON.parse(xhr.response));
         res = JSON.parse(xhr.response);
         if(res.error)
         {
            window.location.replace("../index.html");
         }
         else
         {
            populateDetailsPage(res);
         } 
      }
   };

   xhr.send();
}

function populateDetailsPage(coin)
{   
    $(".descricao p").html(coin.description["en"]);
    $(".crypto_img").attr("src", coin.image.large);
    $(".nome").text(coin.name);
    $(".ranking").text(coin.market_cap_rank + " #");
    $(".valor").text(coin.market_data.current_price[currency] + " " + currencySymbol);
    $(".variacao").text(coin.market_data.market_cap_change_percentage_24h.toFixed(2) + " %");
}
