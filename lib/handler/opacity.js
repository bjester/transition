/**
 * Opacity Handler
 */
(function($)
{
  var Opacity = function(props)
  {
    var el = $(this);
    
    return {
      start: function()
      {
        var opacity = el.css('opacity');
        
        if (opacity === 0 || !el.is(':visible'))
        {
          el.show();
        };
        
        el.css('opacity', props);
      },
      complete: function()
      {
        if (props === 0)
        {
          el.hide();
        }
      }
    };
  };
  
  // IMPORTANT, allows core to know which attrs to set for transition
  Opacity.property = 'opacity';
  
  this.Transition.extend(
  {
    opacity: Opacity
  });
  
})(jQuery);
