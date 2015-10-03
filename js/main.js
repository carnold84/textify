$(window).ready(function () {

    var button = $('.button'),
        hidden = false,
        textify_example;

    textify_example = $('#text1').textify({
        duration : 700, // duration of transitions in milliseconds
        delay : 100,  // delay between each transition in milliseconds
        showClass : 'reveal', // class name to show text
        easing : 'cubic-bezier(.19,.5,.32,.97)', // accepts CSS easing
        onShowCallback : onShow, // callback invoked once show animation is complete
        onHideCallback : onHide // callback invoked once show animation is complete
    });

    function onShow () {

        hidden = false;
        
        button.text('Hide');
    }

    function onHide () {
        
        button.text('Show');

        hidden = true;
    }

    function onClick (evt) {

        if (hidden) {
            textify_example.data('textify').show();
        } else {
            textify_example.data('textify').hide();
        }

        evt.preventDefault();
    }

    button.on('click', onClick);

    textify_example.data('textify').show();
});