/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ($, window, document, undefined) {

    'use strict';
    
    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.
    
    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'textify',
        defaults = {
            duration : 500, // duration of animation. In milliseconds. i.e. 2000
            delay : 100, // delay between each animation
            easing : 'linear', // easing for each line
            showClass: 'show', // class that is added on show method
            onShowCallback : undefined, // callback invoked once show animation is complete
            onHideCallback : undefined // callback invoked once show animation is complete
        };

    // The actual plugin constructor
    function Textify (element, options) {

        this.element = $(element);

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;

        this.onShowComplete = this.onShow.bind(this);
        this.onHideComplete = this.onHide.bind(this);
        
        this.init();

        return this;
    }

    Textify.prototype.init = function () {

        var lines,
            i = 0,
            num_lines,
            line;

        lines = this.element.find('span'); // split it into sections

        num_lines = lines.length;
        
        this.element.css('webkitTransitionDuration', this.options.duration + 'ms');
        this.element.css('webkitTransitionTimingFunction', this.options.easing);

        for (i; i < num_lines; i++) {
            
            line = $(lines[i]);

            line.css('webkitTransitionDelay', (this.options.delay * i) + 'ms');
            line.css('webkitTransitionDuration', 'inherit');
            line.css('webkitTransitionTimingFunction', 'inherit');
        }
    };

    Textify.prototype.show = function () {

        if (this.options.onShowCallback !== undefined) {
            this.element.on('webkitTransitionEnd', this.onShowComplete);
        }

        this.element.addClass(this.options.showClass);
    };

    Textify.prototype.onShow = function () {

        this.element.off('webkitTransitionEnd', this.onShowComplete);

        this.options.onShowCallback.call();
    };

    Textify.prototype.hide = function (callback) {

        if (this.options.onHideCallback !== undefined) {
            this.element.on('webkitTransitionEnd', this.onHideComplete);
        }

        this.element.removeClass(this.options.showClass);
    };

    Textify.prototype.onHide = function () {

        this.element.off('webkitTransitionEnd', this.onHideComplete);

        this.options.onHideCallback.call();
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, 
                new Textify(this, options));
            }
        });
    }

})(jQuery, window, document);