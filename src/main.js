var App = require('./app');
var app = new App;

app.start({
    datasets: {
        'regionales-2015-tour1-meta': 'https://rawgit.com/makinacorpus/elections-data/master/Regionales2015/Tour1/regions.json',
        'regionales-2015-tour1-results': 'https://rawgit.com/makinacorpus/elections-data/master/Regionales2015/Tour1/regions_listes.json'
    }
});
