/**
 * Transition Core
 */
(function($)
{
  var global = this;

  /**
   * 
   * @type Object
   */
  var Transition = global.Transition =
  {
    START: 'transitionStart',
    END: 'transitionEnd',
    
    prefixes: ['', 'webkit', 'moz', 'o', 'ms'],
    supportPrefix: '',
    supportEvent: '',
    support: {},
    handlers: {},
    generators: {},
    defaultOptions:
    {
      duration: 400,      // ms
      easing: 'ease'     // CSS3 transition easing
    },
    
    /**
     * 
     * @returns {undefined}
     */
    init: function()
    {
      this.detectSupport();
    },
    
    /**
     * 
     * @param {jQuery} el
     * @param {Object} properties
     * @param {Object} options
     * @param {Function} callback
     */
    core: function(el, properties, options, callback)
    {
      var me = this;
      
      if ($.type(options) === 'function')
      {
        callback = options;
        options = this.defaultOptions;
      }
      else if ($.type('options') === 'object')
      {
        callback = callback || $.noop;
        options = $.extend({}, this.defaultOptions, options);
      }
      else
      {
        callback = $.noop;
        options = this.defaultOptions;
      }
      
      var transitionNames = new Array();
      for (var property in properties)
      {
        // When a property isn't supported
        if (!(property in me.handlers))
        {
          continue;
        }

        this.handlers[property].call(el, properties[property], options);
        transitionNames.push(property);
      }
      
      // Bind to end event and queue
      el.one(this.supportEvent, function()
        {
          // Clear transition
          el.css(me.build(
          {
            'transition-property': '',
            'transition-timing-function': '',
            'transition-duration': ''
          }));
          
          callback.call(el);
          el.trigger(me.END).dequeue();
        })
        .queue(function()
        {
          // Add transition
          el.css(me.build(
          {
            'transition-property': $.unique(transitionNames).join(', '),
            'transition-timing-function': options.easing || 'ease',
            'transition-duration': options.duration + 'ms'
          }));

          el.trigger(me.START);
        });
    },
    
    /**
      * Adds the support prefix to a set of css properties
      * 
      * @param {Object} css A css attr object to convert
      * @returns {Object}
      */
    build: function(css)
    {
      var out = $.extend({}, css);
      
      for (var attr in css)
      {
        out['-' + this.supportPrefix + '-' + attr] = css[attr];
      }

      return out;
    },
    
    /**
     * 
     * @returns {String}
     */
    detectSupport: function()
    {
      // Test prefix
      var el = global.document.createElement('div'),
          test = 'transition';

      for (var i = 0; i < this.prefixes.length; i++)
      {
        var style = this.getStyleString(test, this.prefixes[i]);

        if (el.style[style] !== undefined)
        {
          this.supportPrefix = this.prefixes[i];
          break;
        }
      }
      
      // Test handler support
      var support = {};
      
      for (var name in this.handlers)
      {
        if ($.type(this.handlers[name]['testSupport']) === 'function')
        {
          $.extend(support, this.handlers[name].testSupport());
        }
      }
      
      this.supportEvent = (this.supportPrefix === '')
        ? 'transitionend'
        : this.supportPrefix + 'TransitionEnd';
      return this.supportPrefix;
    },
    
    /**
     * 
     * @param {String} property
     * @param {String} prefix
     * @returns {String}
     */
    getStyleString: function(property, prefix)
    {
      prefix = prefix || this.supportPrefix;

      if (prefix.trim() === '')
      {
        return property;
      }

      return [prefix, property].map(function(s)
      {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }).join('');
    },
    
    /**
     * To add a transition property generator
     * 
     * @param {Object} obj
     */
    addGenerator: function(obj)
    {
      $.extend(this.generators, obj);
    },
    
    /**
     * To add a transition handler
     * 
     * @param {Object} obj
     */
    addHandler: function(obj)
    {
      $.extend(this.handlers, obj);
    }
  };
  
  // Detect support on load
  $(function()
  {
    Transition.init();
  });
  
  // Add to jQuery
  $.fn.extend(
  {
    transition: function(properties, options, callback)
    {
      Transition.core($(this), properties, options, callback);
      return $(this);
    }
  });
  
})(jQuery);
