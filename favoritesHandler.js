var favorites = JSON.parse(localStorage.getItem('favorites'));

if(!favorites)
{
    var favoritesArray = [];

    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
}

function toggleFavorite(clickedButton)
{
    if($(clickedButton).hasClass("favorite"))
    {
        var name = $(clickedButton).attr("id");
        var index = favorites.indexOf(name);

        favorites.splice(index, 1);
    }
    else
    {
        var name = $(clickedButton).attr("id");

        favorites.push(name);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    $(clickedButton).toggleClass("favorite");
    console.log(favorites);
}