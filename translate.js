/**
 * Requires: [jquery], transition.core, transition.transform
 */
(function($)
{
  var global = this,
      Transition = global.cfjTransition,
      Transform = global.cfjTransform,
      key = 'translate3d';
  
  /**
   * 
   * @param {Array} props
   * @returns {undefined}
   */
  var Translate = function(props)
  {
    var el = $(this);
    
    return {
      start: function()
      {
        el.css(Transform.build(Translate.build(props)));
      }
    };
  };
  
  // IMPORTANT, allows core to know which attrs to set for transition
  Translate.property = 'transform';
  
  /**
   * Returns the string for translation, either 'translate' or 'translate3d'
   * 
   * @returns {String}
   */
  Translate.getKey = function() { return key; };
  
  /**
   * Builds a translate setting for transform
   * 
   * @param {Array} position
   * @returns {String}
   */
  Translate.build = function(position)
  {
    // Remove z translate
    if (!Transition.support.translate3d)
    {
      position = position.slice(0,2);
    }
    
    for (var i = 0; i < 3; i++)
    {
      position[i] = parseInt((position[i] || 0), 10) + 'px';
    }
    
    return (this.getKey() + '(' + position.join(',') + ')');
  };
  
  /**
   * 
   * @returns {Object}
   */
  Translate.testSupport = function()
  {
    var el = global.document.createElement('p'),
        has3d,
        transforms = {
          'webkitTransform':'-webkit-transform',
          'OTransform':'-o-transform',
          'msTransform':'-ms-transform',
          'MozTransform':'-moz-transform',
          'transform':'transform'
        };
 
    // Add it to the body to get the computed style
    global.document.body.insertBefore(el, null);
 
    // Loop through transforms and check
    for (var t in transforms)
    {
      if (el.style[t] !== undefined)
      {
        el.style[t] = 'translate3d(1px,1px,1px)';
        has3d = global.getComputedStyle(el).getPropertyValue(transforms[t]);
      }
    }
 
    global.document.body.removeChild(el);
    has3d = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    
    if (!has3d)
    {
      key = 'translate';
    }
    
    return {
      translate3d: has3d
    };
  };
  
  // Add the handler
  this.cfjTransition.extend({
    translate: Translate
  });
  
})(jQuery);
