apiRequest();

function apiRequest()
{
   var url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

   $.ajax({
      type: "GET",
      url: url,
      success: function(res){populateList(res);},
      error: function(res){alert(res.responseText)}
   });
}

function populateList(coins)
{
   if(favorites.join() == "")
   {
      $(".tableContainer").hide();
      $("#favoritesError").show();
      return;
   }
   
   $("#favoritesError").hide();

   var coinsList = $("#coinsList");
   coinsList.empty();
   var list = $(document.createDocumentFragment());

   for(i = 0; i < coins.length; i++)
   {
      if(favorites.indexOf(coins[i].id) > -1)
      {
         var coin = $(document.createElement("tr")).attr("data-coin-name", coins[i].name).attr("data-coin-id", coins[i].id).attr("data-coin-symbol", coins[i].symbol);

         var rank = $(document.createElement("td")).append(`<span class="coinRank">${i+1}</span>`).attr("scope", "row").addClass("clickable");
         var logo = $(document.createElement("td")).append(`<img class="coinLogo" src=${coins[i].image} style="width:50px; height:50px"/>`).addClass("clickable");
         var nameAndSymbol = $(document.createElement("td")).append(`<span class="coinName">${coins[i].name}</span> <span class="coinSymbol">(${coins[i].symbol.toUpperCase()})</span>`).addClass("clickable");
         var price = $(document.createElement("td")).append(`<span class="coinPrice">${coins[i].current_price} ${currencySymbol}</span>`).addClass("clickable");

         var changeIn24hValue = coins[i].market_cap_change_percentage_24h.toFixed(2);

         if(changeIn24hValue > 0)
         {
            var changeIn24h = $(document.createElement("td")).append(`<span class="coinChange">▲ ${changeIn24hValue} %</span>`).css("color", "green").addClass("clickable");
         }
         else
         {
            var changeIn24h = $(document.createElement("td")).append(`<span class="coinChange">▼ ${changeIn24hValue} %</span>`).css("color", "red").addClass("clickable");
         }
         
         var marketcap = $(document.createElement("td")).append(`<span class="coinCap">${coins[i].market_cap} ${currencySymbol}</span>`).addClass("clickable");

         var sparklineValues = coins[i].sparkline_in_7d.price.slice(coins[i].sparkline_in_7d.price.length - 24);
         var sparklineGraph = $(document.createElement("td")).append('<span class="coinSparkline"></span>').addClass("clickable");

         var favoriteButton = $(document.createElement("i")).attr("id", coins[i].id).addClass("favoriteButton far fa-heart fa-2x").attr("onclick", "toggleFavorite(this)");

         if(favorites.indexOf(coins[i].id) > -1)
         {
            favoriteButton.addClass("favorite fas");
         }

         var favoriteButtonDiv = $(document.createElement("td")).append(favoriteButton);
         
         if(window.matchMedia("(prefers-color-scheme:light)").matches)
         {
            var fillColor = "#ffc107";
            var lineColor = "#242525";
         }
         else
         {
            var fillColor = "#161616";
            var lineColor = "#ffc107";
         }

         sparklineGraph.sparkline(sparklineValues,
         {
            type: 'line',
            width: "72px", 
            height: "34px",
            lineColor: lineColor,
            fillColor: fillColor,
            spotColor: undefined,
            minSpotColor: undefined,
            maxSpotColor: undefined,
            highlightSpotColor: undefined,
            highlightLineColor: undefined
         });

         coin.append(rank, logo, nameAndSymbol, price, changeIn24h, marketcap, sparklineGraph, favoriteButtonDiv);

         list.append(coin);
      }
   }

   coinsList.append(list);
   
   $.sparkline_display_visible();

   $(".clickable").on("click", redirect);

   if($("#searchBar").val() != "")
   {
      search($("#searchBar"));
   }
}

function redirect(e)
{
   coinId = $($(e.target).parents()[0]).attr("data-coin-id");
   window.location = `./details.html?&selectedCoin=${coinId}`;
}

window.matchMedia("(prefers-color-scheme:light)").onchange = apiRequest;