/**
 * Requires: [jquery], transition.queueHandler
 */
(function($)
{
  var global = this,
      queue = 'transition',
      queueHandler = '_transitionQueueHandler',
      QueueHandler = global['cfjTransition']['queueHandler'];
  
  var defaultOptions = 
  {
    duration: 400,      // ms
    easing: 'ease',     // CSS3 transition easing
    start: $.noop,      // start callback that handlers add to
    complete: $.noop    // complete callback
  };
  
  var handlerCallbacks = {
    start: $.noop,
    complete: $.noop
  };
  
  /**
   * 
   * @type Object
   */
  var Transition =
  {
    prefixes: ['webkit', 'moz', 'o', 'ms'],
            
    /**
      * Addes prefixes
      * 
      * @param {Object} css A css attr object to convert
      * @returns {Object}
      */
    build: function(css)
    {
      var out = $.extend({}, css);
      
      for (var attr in css)
      {
        for (var i = 0; i < this.prefixes.length; i++)
        {
          out['-' + this.prefixes[i] + '-' + attr] = css[attr];
        }
      }

      return out;
    },
    
    /**
     * 
     * @param {jQuery} el
     * @param {Object} properties
     * @param {Object} options
     */
    core: function(el, properties, options)
    {
      var me = this, opts = $.extend({}, defaultOptions, options);
      
      // Cache complete callback in scope
      var complete = opts.complete, start = opts.start;
      
      opts.start = $.Callbacks();
      opts.complete = $.Callbacks();
      
      opts.start.add(start);
      opts.complete.add(complete);
      
      // Add start callback to start timer
      opts.start.add(function(cb)
      {
        global.setTimeout(function()
        {
          opts.complete.fire();
          (cb || $.noop)();
        }, opts.duration);
      });
      
      // Add complete callback
      opts.complete.add(function()
      {
        // Set timeout to add a little buffer just incase JS is too fast for CSS
        global.setTimeout(function()
        {
          el.css(me.build({
            'transition-property': '',
            'transition-timing-function': '',
            'transition-duration': ''
          }));
        }, 150);
      });
      
      // Add to queue
      el.queue(queue, this.getQueueFunc(el, properties, opts));
      
      // Get the handler if set
      var qHandler = el.data(queueHandler);
      
      if (!(qHandler instanceof QueueHandler))
      {
        qHandler = new QueueHandler(el);
        el.data(queueHandler, qHandler);
      }
      
      qHandler.next();
    },
    
    /**
     * 
     * @param {DomElement} el
     * @param {Object} properties
     * @param {Object} opts
     * @returns {Function}
     */
    getQueueFunc: function(el, properties, opts)
    {
      var me = this;
      
      return function()
      {
        var transitionNames = new Array();
        for (var handler in properties)
        {
          if (!(handler in me.handlers))
          {
            continue;
          }
          
          var handlerObj = me.handlers[handler];
          transitionNames.push(handlerObj.property);
          var cbs = $.extend({}, handlerCallbacks, 
            handlerObj.call(el, properties[handler], opts));
          
          opts.start.add(cbs.start);
          opts.complete.add(cbs.complete);
        }
        
        el.css(me.build({
          'transition-property': $.unique(transitionNames).join(', '),
          'transition-timing-function': opts.easing || 'ease',
          'transition-duration': opts.duration + 'ms'
        }));
        
        return opts;
      };
    },
    
    /**
     * 
     * @returns {Object}
     */        
    detectSupport: function()
    {
      var support = {};
      
      for (var name in this.handlers)
      {
        if ($.type(this.handlers[name]['testSupport']) === 'function')
        {
          $.extend(support, this.handlers[name].testSupport());
        }
      }
      
      return this.support = support;
    },

    /**
     * To add a transition handler
     * 
     * @param {Object} obj
     */
    extend: function(obj)
    {
      $.extend(this.handlers, obj);
    }
  };
  
  // Setup namespaces
  Transition.handlers = {};
  Transition.support = {};
  
  // Expose globally
  global.cfjTransition = Transition;
  
  $(function()
  {
    Transition.detectSupport();
  });
  
  // Add to jQuery
  $.fn.extend(
  {
    transition: function(properties, options)
    {
      Transition.core($(this), properties, options);
      return $(this);
    }
  });
  
})(jQuery);
