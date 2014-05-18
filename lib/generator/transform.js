/**
 * Transform generator
 */
(function($)
{
  var global = this,
      Transition = global.Transition;
  
  var Transform = {
    /**
     * Adds browser specific prefixes to transform
     * 
     * @param {String} val
     * @returns {Object}
     */
    build: function(val)
    {
      return Transition.build(
      {
        'transform': val
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
  
  global.Transition.addGenerator({transform: Transform});
  
})(jQuery);
