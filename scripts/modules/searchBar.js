$("#searchBar").keyup(search);

$("#searchBar").on('search', function() 
{
    var searchQuery = $(this).val().toUpperCase();
    var coinsList = $("#coinsList").children("tr");

    if(searchQuery == "")
    {
        coinsList.show();
    }
});

$("#detailsSearchBar").on('search', function() 
{
    var searchQuery = $(this).val().toUpperCase();

    if(searchQuery == "")
    {
        $("#detailsSearchBar").removeClass("searching");
        $(".autocom-box").empty();
    }
});

function search(e)
{
    $(e.target)[0] != null ? searchQuery = $(e.target).val().toUpperCase() : searchQuery = $(e).val().toUpperCase();

    var coinsList = $("#coinsList").children("tr");

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
}