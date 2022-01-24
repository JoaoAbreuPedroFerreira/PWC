$("#toggle").on("click", toggleTop);

apiRequest();

function apiRequest()
{
   var url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         //console.log(xhr.status);
         console.log(JSON.parse(xhr.response));
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
      console.log(i);
      var coin = $(document.createElement("div")).attr("id", "coinRow").attr("data-coin-name", coins[i].name).attr("data-coin-id", coins[i].id).attr("data-coin-symbol", coins[i].symbol).addClass("row");
      var logo = $(document.createElement("div")).append(`<img class="coinLogo" src=${coins[i].image} style="width:50px; height:50px"/>`).addClass("col-sm");
      var rank = $(document.createElement("div")).append(`<span class="coinRank">#${i+1}</span>`).addClass("col-sm");
      var name = $(document.createElement("div")).append(`<span class="coinName">${coins[i].name}</span>`).addClass("col-sm");
      var symbol = $(document.createElement("div")).append(`<span class="coinSymbol">${coins[i].symbol.toUpperCase()}</span>`).addClass("col-sm");
      var price = $(document.createElement("div")).append(`<span class="coinPrice">${coins[i].current_price} ${currencySymbol}</span>`).addClass("col-sm");

      var changeIn24hValue = coins[i].market_cap_change_percentage_24h.toFixed(2);
      changeIn24hValue > 0 ? changeIn24hValue = `▲ ${changeIn24hValue}` : changeIn24hValue = `▼ ${changeIn24hValue}`;
      var changeIn24h = $(document.createElement("div")).append(`<span class="coinChange">${changeIn24hValue} %</span>`).addClass("col-sm");

      var marketcap = $(document.createElement("div")).append(`<span class="coinCap">${coins[i].market_cap} ${currencySymbol}</span>`).addClass("col-sm");

      var sparklineValues = coins[i].sparkline_in_7d.price.slice(coins[i].sparkline_in_7d.price.length - 24);
      var sparklineGraph = $(document.createElement("div")).append('<span class="coinSparkline"></span>');

      var favoriteButton = $(document.createElement("button")).attr("id", coins[i].id).addClass("favoriteButton").attr("onclick", "toggleFavorite(this)");

      if(favorites.indexOf(coins[i].id) > -1)
      {
         favoriteButton.addClass("favorite");
      }

      var favoriteButtonDiv = $(document.createElement("div")).append(favoriteButton);

      //var info = $(document.createElement("a"));
      //info.text(`#${rank} ${name} (${symbol}) | ${price} ${currencySymbol} | ${changeIn24H}% | ${marketcap} ${currencySymbol}`);
      //info.attr("href", `./Detalhes/detalhes.html?selectedCoin=${coins[i].id}`);
      //info.append(sparklineGraph);
      

      sparklineGraph.sparkline(sparklineValues.map(sparkLinePrice => sparkLinePrice.toFixed(2)), {width: "72px", height: "34px"});

      coin.append(logo, rank, name, symbol, price, changeIn24h, marketcap, sparklineGraph, favoriteButtonDiv);

      list.append(coin);
   }
   
   coinsList.append(list);
   
   $.sparkline_display_visible();
}

function toggleTop(e)
{
   var quantity = $(e.target).val();
   var coinsList = $("#coinsList");
   $(coinsList).children("div").toggle();

   for (i = 0; i < quantity; i++) 
   {
      var coin = $(coinsList).children("div")[i];
      $(coin).toggle();
   }
}