var ModalFactory = (function() {

    // static
    var showing = 'modal--showing',
        modalClass = 'modal',
        modalContentClass = 'modal__content',
        modalCloseClass = 'modal__close';

    function _factory() {
        // INTERNAL
        var $overlay,
            $content,
            $close,
            $wrapper = $('body');

        // PRIVATE METHODS
        function _init() {
            $overlay = $('<div/>');
            $overlay.addClass( modalClass );

            $content = $('<div/>');
            $content.addClass( modalContentClass );

            $close = $('<div/>');
            $close.addClass( modalCloseClass );
            $close.text('X');

            $overlay.append( $close );
            $overlay.append( $content );

            $wrapper.append( $overlay );
            $wrapper.on(
                'click',
                '.'+modalCloseClass,
                this.hideModal
            );
        }

        // PUBLIC METHODS
        var _api = {};

        _api.showModal = function showModal( $el ) {
            $content.empty().append( $el );
            $overlay.addClass( showing );
        } // showModal

        _api.hideModal = function hideModal() {
            $overlay.removeClass( showing );
        } // hideModal

        var _ = Object.create( _api );

        _init.apply( _, arguments );

        return _;
    }

    return _factory;
})(); // ModalFactory
