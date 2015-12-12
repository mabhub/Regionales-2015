var App = require('./app');
var app = new App;

app.start({
    datasets: {
        'regionales-2015-tour1-stats': 'https://rawgit.com/makinacorpus/elections-data/master/Regionales2015/Tour1/regions.json',
        'regionales-2015-tour1-resultats': 'https://rawgit.com/makinacorpus/elections-data/master/Regionales2015/Tour1/regions_listes.json'
    }
});
