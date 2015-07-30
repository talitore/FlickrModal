# Photo search app

## How to complete this assignment

Thanks for participating in this Credentials alpha test! Instructions:

* Fork this repository
* Complete the challenge on your own - it should take about 20 minutes
* Submit the challenge by pull request
* Fill out the feedback form to let us know what you thought
* Have a beer

## What it does

* user types in a location, ie: 'nyc,usa' or 'paris,france'
* NOTE: although it WILL accept stuff like 'paris' or 'nyc', the API officially requires this format: 'city,country'
* the system hits the [Open Weather Map API](http://api.openweathermap.org/data/2.5/weather?q=nyc,usa), extracts weather info, and pushes this data into the [Flickr Search API](https://www.flickr.com/services/api/flickr.photos.search.html).
* The results are then pushed into the DOM

## Your task

* every search will clear the images from the page and repopulate with new search results
* you must write a click handler that must run *ONCE* when page loads
* this click handler should call the `showModal` function (already implemented) which will display a modal.
* you must *NOT* edit any code area aside from app.js (but feel free to read through the other included JS files -- hopefully it will be educational and/or informative).

## Why this matters

* handling data that gets pushed to the DOM asynchronously is a problem that _every_ modern webapp must contend with
* a strong knowledge of event handling will help you solve this issue with relative ease

## Hint

* the real problem here is that, when you do something like so:

```javascript
$('.some-element-class').click(function(e) {
    // stuff here
});
```

* jQuery expects / looks for ALL `.some-element-class` html tags that are on the page *CURRENTLY*
* however, with asynch apps, we know that certains elements *WILL* arrive (we expect it to), but have not arrived *YET*
* this problem is designed to test your ability to contend with and implement an elegant solution to ^that particular issue
