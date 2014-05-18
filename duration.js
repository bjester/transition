/**
 * Requires: [jQuery], transition.core
 */
(function($)
{
  var Transition = this.cfjTransition;

  var Duration = this.cfjDuration = {
    /**
     * Adds browser specific prefixes to transition
     *
     * @param {String} val
     * @returns {Object}
     */
    build: function(val)
    {
      return Transition.build({
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
})(jQuery);
