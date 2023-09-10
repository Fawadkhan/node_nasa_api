const { parse } = require('csv-parse');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

const result = []


function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6;
}
fs.createReadStream('kepler.csv')
    .pipe(parse({ comment: '#', columns: true }))
    .on('data', (data) => {
        if (isHabitable(data)) result.push(data);
    })
    .on('end', () => {
        console.log('CSV file successfully processed', result.length, result.map(planet => planet['kepler_name']));
    })
    .on('error', (err) => {
        console.log(err);
    }
    )