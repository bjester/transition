/**
 * Opacity Handler
 */
(function($)
{
  var global = this,
      Transition = global.Transition;
  
  var Opacity = function(props)
  {
    $(this)
      .one(Transition.START, function()
      {
        var opacity = $(this).css('opacity');
        
        if (opacity === 0 || !$(this).is(':visible'))
        {
          $(this).show();
        };
        
        $(this).css('opacity', props);
      })
      .one(Transition.END, function()
      {
        if (props === 0)
        {
          el.hide();
        }
      });
  };
  
  // IMPORTANT, allows core to know which attrs to set for transition
  Opacity.property = 'opacity';
  
  Transition.addHandler(
  {
    opacity: Opacity
  });
  
})(jQuery);
