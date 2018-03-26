$(function() {

  // GET SLIDER LIST PRICES
  //
  var productHold = [],
      items       = [],
      urls        = []; // urls get stored in the array

  $.when.apply($, urls.map(function(url) {
    return $.ajax(url);
  })).done(function() {

    var products = '',
        tiles    = [];

    for (var i = 0; i < arguments.length; i++) {
      products = arguments[i][0];
      tiles.push($(products).find('.product-tile'));
    };

    for (var i = 0; i < tiles.length; i++) {
      for (var j = 0; j < tiles[i].length; j++) {
        var result  = $(tiles[i][j]),
            name    = $(result).find('.product-name a').attr('href'),
            nameCut = name.split('/'),
            nameId  = nameCut[2].split('.'),
            catId   = nameId[0],
            price   = result.find('.product-pricing span').text().trim();

        var itemBlock = {
          id: catId,
          price: price
        };

        items.push(itemBlock);

      } // end for tiles[i]
    } // end for tiles

    compareItems();

  }); // end .done()


  // GET PAGE ITEMS ID'S
  //
  var pageItems = $('.vitapak-product-div');

  for (var i = 0; i < pageItems.length; i++) {
    var productInfo = $(pageItems[i]).find('a').attr('href'),
        productCut  = productInfo.split('/'),
        product     = productCut[4].split('.html'),
        productId   = product[0];

    productHold.push(productId);
  };


  // COMPARE AJAX CALL(ITEM) ARRAY & PAGEHOLD ARRAY AND SET PRICES
  // CALLED AFTER .DONE() IS COMPLETE
  //
  function compareItems() {
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < productHold.length; j++) {
        if (items[i].id == productHold[j]) {
          $(pageItems[i]).find('h5 em').text(items[i].price);
        };
      };
    };
  };
});
