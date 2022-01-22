apiRequest();

function apiRequest()
{
   var url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         //console.log(xhr.status);
         //console.log(JSON.parse(xhr.response));
         res = JSON.parse(xhr.response);
         populateList(res);
      }
   };

   xhr.send();
}

function populateList(coins)
{
   var coinsList = $("#coinsList");
   coinsList.empty();
   var list = $(document.createDocumentFragment());

   for(i = 0; i < coins.length; i++)
   {
      if(favorites.indexOf(coins[i].name) > -1)
      {
         var coin = $(document.createElement("div"));
         var logo = $(document.createElement("img")).attr("src", coins[i].image).width(50).height(50);
         var name = coins[i].name;
         var symbol = coins[i].symbol.toUpperCase();
         var price = coins[i].current_price;
         var changeIn24H = coins[i].market_cap_change_percentage_24h;
         var marketcap = coins[i].market_cap;
         var sparklineValues = coins[i].sparkline_in_7d.price.slice(coins[i].sparkline_in_7d.price.length - 24);
         
         var info = $(document.createElement("span"));
         var sparklineGraph = $(document.createElement("span"));

         if(changeIn24H > 0)
         {
            changeIn24H = `▲ ${changeIn24H}`;
         }
         else
         {
            changeIn24H = `▼ ${changeIn24H}`; 
         }

         info.text(`${name} (${symbol}) | ${price} ${currencySymbol} | ${changeIn24H}% | ${marketcap} ${currencySymbol}`);
         info.append(sparklineGraph);
         
         sparklineGraph.sparkline(sparklineValues, {width: "72px", height: "34px"});

         coin.append(logo);
         coin.append(info);
         
         var favoriteButton = $(document.createElement("button")).attr("id", name).addClass("favoriteButton").attr("onclick", "toggleFavorite(this)");

         if(favorites.indexOf(name) > -1)
         {
               favoriteButton.addClass("favorite");
         };

         coin.append(favoriteButton);

         list.append(coin);
        }
   }

   coinsList.append(list);
   $.sparkline_display_visible();
}