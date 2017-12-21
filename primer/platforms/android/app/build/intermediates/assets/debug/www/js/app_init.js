//Get the layout of the users keyboard
//workaround 1) on page load send a key and read for charCode.
//workaround 2) read from http header for the browser



$(document).ready(function () {
  $('ul.tabs').tabs();
  console.log("Loaded all libraries .. SUCCESS");

  typeCast("rug");
  typeCast
  // typeCast("rutyg"); -- the other similar to google typewriter layout refer th imgs for the layout pictures.



})

// $( document ).ajaxError(function( event, request, settings ) {
//   $( "body" ).append( "<li>Error requesting page " + settings.url + "</li>" );
// });
