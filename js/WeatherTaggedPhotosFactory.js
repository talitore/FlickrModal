var WeatherTaggedPhotosFactory = (function( WeatherAPI, FlickrAPI ) {

    function _factory() {

        // INTERNAL
        var weatherAPI, flickrAPI, $wrapper;

        // PRIVATE METHODS
        function _init( APIKEY, $wrap ) {
            // instantiate weatherAPI
            weatherAPI = WeatherAPI();
            // instantiate flickrAPI
            flickrAPI = FlickrAPI.apply( null, arguments );
            // save ref to parent wrapper
            $wrapper = $wrap;
        } // _init

        function generateTagsList( search, tags, isOR ) {
            var tagsMode;

            if ( isOR ) {
                tagsMode = 'any';
            }
            else {
                tagsMode = 'all';
            }

            var tagsList = tags.map(function(el) {
                return el.main;
            }).join( ',' );

            return {
                tags: tagsList,
                tags_mode: tagsMode
            };

        } // generateTagsList

        function onWeatherDataBack( search ) {
            // clever trick in order to get the `search` in scope
            function _callback( data ) {
                var searchArgs = {
                    text: search,
                    tags: generateTagsList( search, data.weather, 'all' )
                };

                return flickrAPI.search( searchArgs );
            } // _callback

            return _callback;
        } // onWeatherDataBack

        function dataToURL( data ) {
            var d = $.Deferred(),
                photos = data.photos.photo,
                urls = [];

            urls = photos.map( flickrAPI.objectToURL );

            if ( urls.length ) {
                d.resolve( urls );
            }
            else {
                d.reject( 'No urls found' );
            }

            return d.promise();
        } // dataToURL

        function onFail() {
        } // onWeatherDataFail

        // PUBLIC METHODS
        var _api = {};

        _api.get = function get( search ) {

            $wrapper.empty();

            weatherAPI.get( search )
            .then( onWeatherDataBack( search ) )
            .then( dataToURL )
            .then( function( data ) {

                var cols = [];
                cols[0] = $('<div/>');
                cols[1] = $('<div/>');

                cols.forEach(function(el) {
                    el.addClass('one-half column');
                    $wrapper.append( el );
                });

                data.forEach(function(el, idx) {
                    var $div = $('<div/>');
                    $div.addClass('weather-factory-item');

                    var img = new Image();
                    img.onload = function() {
                        var $img = $( img );
                        $img.css({
                            'width': '100%',
                            'height': 'auto'
                        });

                        $div.append( $img );
                        $img
                            .hide()
                            .fadeIn( 'slow' );

                    } // onload
                    img.src = el;

                    if ( idx > Math.floor( data.length / 2 ) ) {
                        cols[ 0 ].append( $div );
                    }
                    else {
                        cols[ 1 ].append( $div );
                    }
                });
            })
            .fail(function() {
                throw new Error( 'Something went wrong! Please try again' );
            });
        };

        // instantiate + call internal method
        var _ = Object.create( _api );

        _init.apply( _, arguments );

        return _;
    } // _factory

    return _factory;
})( WeatherAPIFactory, FlickrAPIFactory ); // #rudimentaryDependencyInjection
