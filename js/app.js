(function() { // protect the lemmings

    /*
     *
     *  README path (relative): ../README.md
     *
     */

    var searchHandler = WeatherTaggedPhotosFactory(
        '0981849ea2f15bb1ad1262f6dae2a460',
        $('#photos')
    );
    var modal = ModalFactory();

    function onSubmit( e ) {

        var val;
        if ( e.type === 'keypress' && e.keyCode === 13 ) {
            val = $( this ).val(); 
        }
        else if ( e.type === 'keypress' && e.keyCode !== 13 ) {
            return;
        }

        e.preventDefault();
        val = $(this).parents('form').find('.js-search').val();

        searchHandler.get( val );
    } // onSubit

    function onClear( e ) {
        e.preventDefault();

        $( this ).parents('form')[ 0 ].reset();
    } // onClear

    function showModal( $img ) {
        var img = $img.clone();

        img.css({
            width: 'auto',
            height: '80%',
            marginTop: '10%'
        });

        modal.showModal( img );

    }

    $('.js-submit').click( onSubmit );
    $('.js-reset').click( onClear );
    $('.js-search').keypress( onSubmit );

    // write your event handler in the lines below
    
})();
