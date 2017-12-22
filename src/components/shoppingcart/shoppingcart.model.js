/* eslint-disable */
(function() {
  var MODULE_NAME = 'shoppingcartModel',
    NAMESPACE = 'nn';

  window[NAMESPACE] = window[NAMESPACE] || {};

  window[NAMESPACE][MODULE_NAME] = function() {
    _getCart = function() {
      return {
        total: 0,
        products: []
      };
    };

    return {
      init: function(initialState) {},

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
        return _getCart();
      },

      changeProductQuantity: function(product, newQuantity) {
        return _getCart();
      },

      removeProducts: function(productsToDelete) {
        return _getCart();
      },

      destroy: function() {},
    };
  };
})();
