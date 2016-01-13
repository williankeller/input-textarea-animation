;(function() {

  function Actions(element, options) {
    this.element = element;
    this.options = options;
    this.$element = $(element);

    this.init();
  }

  Actions.prototype = {

  	textContent: function (value) {
	  return (value.replace(/\s/g, '').length > 0);
    },
    textSize: function(txt, font, padding){
	  // Create a dummy canvas (render invisible with css)
	  var c=document.createElement('canvas');
	  // Get the context of the dummy canvas
	  var ctx=c.getContext('2d');
	  // Set the context.font to the font that you are using
	  ctx.font = font;
	  // Measure the string
	  var length = ctx.measureText(txt).width + parseInt(padding);
	  // Return width
	  return length;
	},
    init: function() {
      // Get element Height
      var y = this.$element.outerHeight();
      // Get element Width
      var x = this.$element.outerWidth();
      // Get different element Height padding
      var dY = parseInt(this.$element.css('paddingBottom')) +
               parseInt(this.$element.css('paddingTop')) || 0;
      // Get different element Width padding
      var dX = parseInt(this.$element.css('paddingRight')) +
               parseInt(this.$element.css('paddingLeft')) || 0,
      // Instance the _this to follow the context
      var _this = this;
      // If has content, start area including the content
      if (this.textContent(this.element.value)) {
        this.$element.height(this.element.scrollHeight - dY);
      }
      // Track any keyupa action
      this.$element.on('input keyup', function(event) {
        var $window = $(window),
        	position = $window.scrollTop(),
        	fontParm = $(this).css('font');
        // Check if the text content has many words
        if (_this.textSize($(this).val(), fontParm, dX) >= x) {
          $(this).css('font-size','11px')
        } else {
          $(this).css('font-size','inherit')
        }
        // Set content with the new Height
        $(this).height(0).height(this.scrollHeight - dY);
        // Set the window position
        $window.scrollTop(position);
      });
    }
  };

  $.fn.inputTextarea = function (options) {
    this.each(function() {
      if (!$.data(this, '_inputTextarea')) {
        $.data(this, '_inputTextarea', new Actions(this, options));
      }
    });
    return this;
  };
})(jQuery, window, document);
