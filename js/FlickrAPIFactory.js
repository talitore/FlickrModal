var FlickrAPIFactory = (function() {

    // common to all instances
    // ie: constants, etc
    var FLICKR_API = {
        url_base: 'https://api.flickr.com/services/rest/',
        args: {
            method: 'flickr.photos.search',
            format: 'json',
            per_page: 25,
            sort: 'relevance'
        }
    };

    // static methods
    function _search( args, APIKEY ) {
        var keys = { api_key: APIKEY };
        var flickrArgs = $.extend( {}, FLICKR_API.args, args, keys );

        return $.ajax({
           url: FLICKR_API.url_base 
            , data: flickrArgs
            , jsonpCallback: "jsonFlickrApi"
            , dataType: 'jsonp' 
        });
    } // search

    // end common

    function _factory() {

        // INTERNAL
        var _areKeysSet = 0; 
        var _APIKEY;

        // PRIVATE METHODS
        function _init( APIKEY ) {

            if ( _areKeysSet === 0 ) {
                _areKeysSet = 1;

                _APIKEY = APIKEY;
            } // call only once
            else {
                throw new Error( 'Keys are already set for this instance!' );
            } // if defied, get angry

        } // _init

        // PUBLIC METHODS
        var _api = {};

        _api.objectToURL = function objectToURL( photoObj ) {
            // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
            var farmId = photoObj.farm;
            var serverId = photoObj.server;
            var id = photoObj.id;
            var secret = photoObj.secret;

            var url = "https://farm"
                      + farmId
                      + ".staticflickr.com/"
                      + serverId 
                      + "/"
                      + id 
                      + "_"
                      + secret
                      + ".jpg";

            return url;
        } // objectToURL

        _api.getAPIKEY = function getAPIKEY() {
            return _APIKEY;
        } // getAPIKEY

        _api.search = function search( args ) {
            if ( typeof args === "undefined" ) {
                throw new Error( 'The args have not been defined' );
            } // if fail

            return _search( args, _APIKEY );
        } // search

        // instantiate + call internal method
        var _ = Object.create( _api );

        _init.apply( _, arguments );

        return _;
    } // _factory

    return _factory;
})(); // FlickrAPIFactory
