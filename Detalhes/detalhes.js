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

   if(coin.market_data.market_cap_change_percentage_24h > 0)
   {
      coin.market_data.market_cap_change_percentage_24h = `▲ ${coin.market_data.market_cap_change_percentage_24h.toFixed(2)}`;
   }
   else
   {
      coin.market_data.market_cap_change_percentage_24h = `▼ ${coin.market_data.market_cap_change_percentage_24h.toFixed(2)}`; 
   }

   $(".variacao").text(coin.market_data.market_cap_change_percentage_24h + " %");

   $(".favoriteButton").attr("id", coin.id).attr("onclick", "toggleFavorite(this)");

   if(favorites.indexOf(coin.id) > -1)
   {
      $(".favoriteButton").addClass("favorite");
   }

   currencyId = Object.keys(coin.market_data.current_price);

   for(i = 0; i < currencyId.length; i++)
   {
      var option = $(document.createElement("option")).attr("value", coin.market_data.current_price[currencyId[i]]).text(currencyId[i]);

      $("#toCurrencySelect").append(option);
   }
}

$("#toCurrencySelect").on("change", calculate);
$("#fromInput").keyup(calculate);
$("#toInput").keyup(calculate);

function calculate(changedInput)
{
   var from = $("#fromInput").val();
   var to = $("#toInput").val(); 
   var toCurrency = $("#toCurrencySelect").find(":selected").text();
   var toCurrencyValue = $("#toCurrencySelect").val();
   var convertedValue;
   
   if(changedInput.target.id === "toCurrencySelect")
   {
      convertedValue = from * toCurrencyValue;

      $("#toInput").val(convertedValue);
   }
   else if(changedInput.target.id === "fromInput")
   {
      if(from == "")
      {
         $("#fromInput").val(0)
         from = "0";
      }

      convertedValue = from * toCurrencyValue;
      console.log(convertedValue);
      $("#toInput").val(convertedValue);
   }
   else
   {
      if(to == "")
      {
         $("#toInput").val(0)
         to = "0";
      }

      convertedValue = to / toCurrencyValue;

      $("#fromInput").val(convertedValue);
   }
}
