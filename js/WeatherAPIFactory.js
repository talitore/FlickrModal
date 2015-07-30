var WeatherAPIFactory = (function() {

    // common to all instances
    // ie: constants, etc
    var WEATHER_API = {
        url_base: 'http://api.openweathermap.org/data/',
        version: '2.5/',
        endpoint: 'weather'
    };
    // end common

    // static methods
    function _getWeatherData( search ) {
        return $.get(
            WEATHER_API.url_base + WEATHER_API.version + WEATHER_API.endpoint,
            { q: search }
        );
    } // _getWeatherData

    function _factory() {
        var _api = {};

        _api.get = function get( search ) {

            if ( typeof search === "undefined" ) {
                throw new Error( 'The search has not been defined' );
            } // if fail

            return _getWeatherData( search );
        } // get

        return Object.create( _api );
    } // _factory

    return _factory;
})(); // WeatherAPIFactory
