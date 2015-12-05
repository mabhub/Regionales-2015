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
