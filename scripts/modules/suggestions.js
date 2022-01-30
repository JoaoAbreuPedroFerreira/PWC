var suggestions = [];

var url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

$.ajax({
    type: "GET",
    url: url,
}).done(function(res){
    populateSuggestions(res);
});

function populateSuggestions(res)
{
    for(i = 0; i < res.length; i++)
    {
        var suggestion = 
        {
            name: res[i].name,
            symbol: res[i].symbol,
            id: res[i].id
        }

        if(!suggestions[suggestion])
        {
            suggestions.push(suggestion);
        }
    }
}

function showSuggestions(e)
{
    var searchQuery = $(e.target).val().toUpperCase();
    $(".autocom-box").empty();

    if(searchQuery)
    {
        for(var coin in suggestions)
        {
            if(suggestions[coin].name.toUpperCase().includes(searchQuery) || suggestions[coin].id.toUpperCase().includes(searchQuery) || suggestions[coin].symbol.toUpperCase().includes(searchQuery))
            {
                if($(`#${suggestions[coin].id}`).length == 0)
                {
                    var item = $(document.createElement("li")).attr("id", suggestions[coin].id).text(`${suggestions[coin].name} (${suggestions[coin].symbol.toUpperCase()})`).attr("onclick", `window.location = './details.html?currency=${currency}&selectedCoin=${suggestions[coin].id}'`);
                    $(".autocom-box").append(item);
                } 
            }
        }

        $("#detailsSearchBar").addClass("searching");
    }
    else
    {
        $("#detailsSearchBar").removeClass("searching");
    }
}