var data = [
    {
        position: [43.9583006, 0.6879448],
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
    }
];



var map       = L.map('map');
var tileLayer = new L.OSM.Mapnik();

map.setView([43.9583006, 0.6879448], 7);

tileLayer.addTo(map);


data.forEach(function (dataset) {
    var bars = document.createElement('placeholder');

    dataset.values.forEach(function (value) {
        var bar = document.createElement('div');
        bar.classList.add('bar');
        bar.classList.add(value.class);
        bar.innerHTML    = '<span>' + value.label + '</span>';
        bar.style.height = value.value + '%';

        bars.appendChild(bar);
    });

    var myIcon   = L.divIcon({
        className : 'chart-container',
        iconAnchor: L.point(75, 75),
        html: bars.innerHTML
    });

    var myMarker = L.marker(dataset.position, {
        icon: myIcon,
        clickable: false
    });

    myMarker.addTo(map);
});
