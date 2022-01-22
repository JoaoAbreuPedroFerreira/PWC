$("#searchBar").keyup(function()
{
    var searchQuery = $(this).val().toUpperCase();
    var coinsList = $("#coinsList").children("div");

    coinsList.hide();

    for(var coin of coinsList)
    {
        var name = $(coin).attr("data-coin-name").toUpperCase();
        var id = $(coin).attr("data-coin-id").toUpperCase();
        var symbol = $(coin).attr("data-coin-symbol").toUpperCase();

        if(name.includes(searchQuery) || id.includes(searchQuery) || symbol.includes(searchQuery))
        {
            $(coin).toggle();
        }
    }
});

$("#searchBar").on('search', function() 
{
    var searchQuery = $(this).val().toUpperCase();
    var coinsList = $("#coinsList").children("div");

    if(searchQuery == "")
    {
        coinsList.show();
    }
});