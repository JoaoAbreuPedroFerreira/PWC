var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var selectedCoin = urlParams.get("selectedCoin");

$("#toCurrencySelect").on("change", calculate);
$("#fromInput").keyup(calculate);
$("#toInput").keyup(calculate);
$("#detailsSearchBar").keyup(showSuggestions);

if(selectedCoin)
{
   apiRequest();
}
else
{
   window.location.replace("./homepage.html");
}

function apiRequest()
{
   var url = `https://api.coingecko.com/api/v3/coins/${selectedCoin}?sparkline=true`;

   $.ajax({
      type: "GET",
      url: url,
      success: function(res){populateDetailsPage(res);},
      error: function(){window.location.replace("./homepage.html");}
   });
}

function populateDetailsPage(coin)
{   
   $(".crypto_img").attr("src", coin.image.large);
   $("#name").text(coin.name);
   $("#ranking").text(coin.market_cap_rank + " #");
   $("#value").text(coin.market_data.current_price[currency] + " " + currencySymbol);
   $("#description p").html(coin.description["en"]);

   if(coin.market_data.market_cap_change_percentage_24h > 0)
   {
      $("#variation").text(`▲ ${coin.market_data.market_cap_change_percentage_24h.toFixed(2)} %`).css("color", "green");
   }
   else
   {
      $("#variation").text(`▼ ${coin.market_data.market_cap_change_percentage_24h.toFixed(2)} %`).css("color", "red");
   }

   $(".favoriteButton").attr("id", coin.id).attr("onclick", "toggleFavorite(this)");

   var sparklineValues = coin.market_data.sparkline_7d.price;

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

   $("#SparklineGraph").sparkline(sparklineValues,
   {
      type: 'line',
      width: "720px", 
      height: "340px",
      lineColor: lineColor,
      fillColor: fillColor,
      spotColor: undefined,
      minSpotColor: undefined,
      maxSpotColor: undefined,
      highlightSpotColor: undefined,
      highlightLineColor: undefined
   });

   $("#SparklineGraph canvas").removeAttr("style", "width", "height");

   if(favorites.indexOf(coin.id) > -1)
   {
      $(".favoriteButton").addClass("favorite fas");
   }

   $("#fromLabel").text(coin.symbol.toUpperCase());

   currencyId = Object.keys(coin.market_data.current_price);

   for(i = 0; i < currencyId.length; i++)
   {
      var option = $(document.createElement("option")).attr("value", coin.market_data.current_price[currencyId[i]]).text(currencyId[i].toUpperCase());

      $("#toCurrencySelect").append(option);
   }

   $.sparkline_display_visible();
}

function calculate(changedInput)
{
   var from = $("#fromInput").val();
   var to = $("#toInput").val(); 
   //var toCurrency = $("#toCurrencySelect").find(":selected").text();
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

window.matchMedia("(prefers-color-scheme:light)").onchange = apiRequest;