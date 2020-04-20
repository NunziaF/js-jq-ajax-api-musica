// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.

 // Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.

$(document).ready(function () {

  var source = $('.album-template').html();
  var template = Handlebars.compile(source);

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function(data,stato) {

      var album = data.response;

      for (var i = 0; i < album.length; i++) {
        var context = {
          cover: album[i].poster,
          title: album[i].title,
          artist: album[i].author,
          year: album[i].year,
          genre: album[i].genre
        };
        var html = template(context);
        $('.box').append(html);
      }
    },
    error: function(richiesta,stato,errore){
      alert("Chiamata fallita!!!");
    }
  });

  // filtro generi musicali

  $(".filtro select").on("input", function() {

    var filtro = $(this).val().toLowerCase();

    $(".container").each(function() {

      var genereCd = $(this).data("genre").toLowerCase();

      if (filtro === "" || genereCd === filtro) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

})
