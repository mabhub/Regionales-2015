module.exports = function () {

    /*
     * Dependencies
     * ------------
     */

    var _ = require('lodash');
    var request = require('request'); // TODO: replace this library (1.8MB!)

    /**
     * Leaflet library
     * (Leaflet CSS is loadedfrom CDN)
     */
    var L = require('leaflet');

    /**
     * Leaflet OSM library
     * Allow easy access tile and vector data from openstreetmap.org
     */
    require('leaflet-osm');

    /**
     * Polyfill for decimal rounding
     * from MDN :
     * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Decimal_rounding
     */
    require('round10').polyfill();

    /**
     * Variables
     * ---------
     */

    var defaultOptions = {
        container: 'map',
        tileLayer: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        mapOptions: {
            minZoom: 7
        },
        datasets: {}
    };

    var appOptions = {};

    var dataStore  = {};
    var fetching   = 0;

    /**
     * Methods
     * -------
     */

    function _buildDisplay (map) {
        var data = dataStore['regionales-2015-tour1-results'];

        data.forEach(function (dataset) {
            var container = document.createElement('div');
            container.className = 'container';

            var title;
            if (dataset.title) {
                title = document.createElement('div');
                title.className = 'title';
                title.innerHTML = dataset.title;

                container.appendChild(title);
            }

            var bars          = document.createElement('div');
            var barWidth      = Math.round10(100 / dataset.listes.length, -2);
            var barsWidth     = dataset.listes.length * 30;

            bars.className = 'chart-container';
            bars.style.width  = barsWidth + 'px';
            bars.style.height = '75px';

            // TODO: Prefilter dataset.listes so we display only lists width more than a predefined percentage

            dataset.listes.forEach(function (value) {
                var bar = document.createElement('div');
                bar.classList.add('bar');
                if (value.value <= 20) bar.classList.add('small');
                bar.classList.add(value.class);
                bar.innerHTML    = '<span>' + value.label + '</span>';
                bar.style.height = value.value + '%';
                bar.style.width  = barWidth + '%';

                bars.appendChild(bar);
            });

            container.appendChild(bars);

            var myPopup = L.popup({
                closeButton: false,
                autoPan: false,
                keepInView: false,
                closeOnClick: false,
                offset: L.point(0, 20)
            });

            myPopup.setContent(container);
            myPopup.setLatLng([49, 3]);
            myPopup.addTo(map);
        });

    }

    function _createMap () {
        var map       = new L.map(appOptions.container, appOptions.mapOptions);
        var tileLayer = new L.tileLayer(appOptions.tileLayer);
        tileLayer.addTo(map);
        map.setView([47, 2], 7);

        return map;
    }

    function _start (options) {

        _.merge(appOptions, defaultOptions, options);

        var map  = _createMap();
        this.map = map;



        // TODO: Use real async routines

        for (var dataset in appOptions.datasets) {
            fetching++;
            request(appOptions.datasets[dataset], function (error, response, body) {
                fetching--;
                if (!error && response.statusCode == 200) {
                    dataStore[dataset] = JSON.parse(body);
                }
            });
        }
        var selfInterval = setInterval(function () {
            if (fetching <= 0) {
                clearInterval(selfInterval);
                _buildDisplay(map);
            }
        }, 1000);
    };

    return {
        start: _start
    };
};
