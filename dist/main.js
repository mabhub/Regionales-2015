(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

},{}],2:[function(require,module,exports){
require('./decimal-rounding.js');

var data = [ // Fake data
    {
        position: [44, 0.6],
        title: "Pyrénées Languedoc",
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 30
            },
            {
                class: 'lr',
                label: 'LR',
                value: 60
            },
            {
                class: 'fn',
                label: 'FN',
                value: 15
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 20
            },
            {
                class: 'autres',
                label: '...',
                value: 23
            }
        ]
    },
    {
        position: [47, -0.6],
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 30
            },
            {
                class: 'lr',
                label: 'LR',
                value: 60
            },
            {
                class: 'fn',
                label: 'FN',
                value: 15
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 20
            },
            {
                class: 'autres',
                label: '...',
                value: 23
            }
        ]
    },
    {
        position: [49, 3],
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 30
            },
            {
                class: 'lr',
                label: 'LR',
                value: 60
            },
            {
                class: 'fn',
                label: 'FN',
                value: 15
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 20
            },
            {
                class: 'autres',
                label: '...',
                value: 23
            }
        ]
    },
    {
        position: [48, 4],
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 30
            },
            {
                class: 'lr',
                label: 'LR',
                value: 60
            },
            {
                class: 'fn',
                label: 'FN',
                value: 15
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 20
            },
            {
                class: 'autres',
                label: '...',
                value: 23
            }
        ]
    },
    {
        position: [45, 5],
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 30
            },
            {
                class: 'lr',
                label: 'LR',
                value: 60
            },
            {
                class: 'fn',
                label: 'FN',
                value: 15
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 20
            },
            {
                class: 'autres',
                label: '...',
                value: 23
            }
        ]
    },
    {
        position: [46, 2],
        values: [
            {
                class: 'ps',
                label: 'PS',
                value: 12
            },
            {
                class: 'lr',
                label: 'LR',
                value: 15
            },
            {
                class: 'fn',
                label: 'FN',
                value: 13
            },
            {
                class: 'eelv',
                label: 'EELV',
                value: 25
            },
            {
                class: 'autres',
                label: '...',
                value: 37
            }
        ]
    }
];



var map = L.map('map', { minZoom: 7 });

// var tileLayer = new L.OSM.Mapnik();
var tileLayer = new L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png');

tileLayer.addTo(map);

map.setView([47, 2], 7);

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
    var barWidth      = Math.round10(100 / dataset.values.length, -2);
    var barsWidth     = dataset.values.length * 30;

    bars.className = 'chart-container';
    bars.style.width  = barsWidth + 'px';
    bars.style.height = '75px';

    dataset.values.forEach(function (value) {
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
    myPopup.setLatLng(dataset.position);
    myPopup.addTo(map);
});

},{"./decimal-rounding.js":1}]},{},[2]);
