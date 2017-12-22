let shoppingCart = [];
let productID = 1;

/**
 * On load
 */
$(function () {
  shoppingCartVisibility();

  $('button[data-shop-listing]').on('click', function () {
    addItem($(this).data('shop-listing'));
    shoppingCartVisibility();
  });

  $('body').on('click', 'button.remove-btn', function () {
    removeItem($(this).parents().closest('tr').attr('id'));
    shoppingCartVisibility();
  });

  $('body').on('click', 'button[aria-label="step up"]', function () {
    updateQuantity($(this).parents().closest('tr').attr('id'), 'increase');
    shoppingCartVisibility();
  });

  $('body').on('click', 'button[aria-label="decrease"]', function () {
    updateQuantity($(this).parents().closest('tr').attr('id'), 'decrease');
    shoppingCartVisibility();
  });

  $('.cart-decision').on('click', 'button', function () {
    proceedToCheckout();
  });
});

/**
 * Manages the shopping cart visibility depending on the number of items
 */
function shoppingCartVisibility() {
  if (shoppingCart.length === 0) {
    $('#section-shoppingcart').hide();
  } else {
    $('#section-shoppingcart').show();
  }
}

/**
 * Check if the item already exists in the shopping cart
 *
 * @param   {Object}      item                 item object
 * @returns {Boolean}
 */
function checkExistence(item) {
  let result = false;
  for (let index of shoppingCart) {
    if (index.id === item.id) {
      result = true;
      break;
    }
  }
  return result;
}

/**
 * Add item to the shopping cart
 *
 * @param   {Object}      item                 item object
 */
function addItem(item) {
  if (checkExistence(item)) {
    item.quantity++;
    $('.items-list').find('#' + item.id).find('.quantity').val(item.quantity);
  } else {
    item.quantity = 1;
    item.id = productID;
    productID++;
    shoppingCart.push(item);
    updateShoppingCartForm(item);
  }
  updateCartPrice(item, 'add');
}

/**
 * Remove item from the shopping cart
 *
 * @param   {Integer}      id                  item id
 */
function removeItem(id) {
  let index = shoppingCart.findIndex(x => x.id == id);
  let item = shoppingCart[index];
  shoppingCart.splice(index, 1);
  $('#' + id).remove();
  updateCartPrice(item, 'remove');
}

/**
 * Add item to the shopping cart form
 *
 * @param   {Object}      item                 item object
 */
function updateShoppingCartForm(item) {
  let row = $('.item-example').clone(true);
  row.find('.name').text(item.name);
  row.find('.description').text(item.description);
  row.find('.price').text('€' + item.price);
  row.find('.quantity').val('1');
  row.attr('id', item.id);
  row.removeClass('item-example');
  row.show();
  $('.items-list').append(row);
}

/**
 * Update cart total price
 *
 * @param   {Object}       item                 item object
 * @param   {String}       operation            add/remove/increase/decrease operation
 */
function updateCartPrice(item, operation) {
  let tax = 0.2;
  let row = $('.cart-value');
  let totalPrice = 0;
  switch (operation) {
    case 'add':
      totalPrice = (parseFloat(row.find('.total-price').text().split('€')[1]) +
        item.price).toFixed(2);
      break;
    case 'remove':
      totalPrice = (parseFloat(row.find('.total-price').text().split('€')[1]) -
        (item.price * item.quantity)).toFixed(2);
      break;
    case 'increase':
      totalPrice = (parseFloat(row.find('.total-price').text().split('€')[1]) +
        item.price).toFixed(2);
      break;
    case 'decrease':
      totalPrice = (parseFloat(row.find('.total-price').text().split('€')[1]) -
        item.price).toFixed(2);
      break;
  }
  row.find('.total-price').text('€' + totalPrice);
  row.find('.total-price-tax').text('€' + (totalPrice * tax).toFixed(2));
  row.find('.total-paid').text('€' + (totalPrice * (1 + tax)).toFixed(2));
}

/**
 * Update item quantity and form
 *
 * @param   {Integer}      id                   id
 * @param   {String}       operation            add or remove operation
 */
function updateQuantity(id, operation) {
  let index = shoppingCart.findIndex(x => x.id == id);
  let item = shoppingCart[index];
  if (operation === 'increase') {
    item.quantity++;
    updateCartPrice(item, operation);
  } else {
    item.quantity--;
    updateCartPrice(item, operation);
    if (item.quantity === 0) {
      shoppingCart.splice(index, 1);
      $('#' + id).remove();
    }
  }
  $('.items-list').find('#' + item.id).find('.quantity').val(item.quantity);
}

/**
 * Proceed to Checkout - shop and cart inactive
 */
function proceedToCheckout() {
  $('.cart-decision').text('Sending your order...');
  $('body :button').attr('disabled', true);
}

