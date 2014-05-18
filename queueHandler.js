/**
 * Requires: [jquery]
 */
(function($)
{
  var global = this,
      queue = 'transition';
  
  // Init
  global.cfjTransition = {};
  
  /**
   * 
   * @param {jQuery} elements
   */
  var QueueHandler = global.cfjTransition.queueHandler = function(elements)
  {
    this.elements = elements;
  };
  
  QueueHandler.prototype = QueueHandler.fn = 
  {
    elements: null,
            
    /**
     * 
     * @returns {undefined}
     */
    next: function()
    {
      var me = this, myQ = this.elements.queue(queue), next = null;
      
      if ($.isArray(myQ))
      {
        next = myQ.shift();
      }
      
      if ($.type(next) !== 'function')
      {
        this.elements.queue(queue, []);
        return;
      }
      
      var opts = next();
      opts.start.fire(function()
      {
        me.next();
      });
      
      this.elements.queue(queue, myQ);
    }
  };
  
})(jQuery);
