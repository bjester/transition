/**
 * Transition duration 
 */
(function($)
{
  var global = this;

  var Duration = {
    /**
     * Adds browser specific prefixes to transition
     *
     * @param {String} val
     * @returns {Object}
     */
    build: function(val)
    {
      return global.Transition.build(
      {
        'transition-duration': val + 'ms'
      });
    },

    /**
     * Returns object with browser specific prefixed styles for removing a
     * transform setting
     *
     * @returns {Object}
     */
    remove: function()
    {
      return this.build('');
    }
  };
  
  global.Transition.addGenerator({duration: Duration});
  
})(jQuery);
