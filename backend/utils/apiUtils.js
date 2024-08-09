const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache();

function propComparator(a, b, prop) {
    const aProp = a[prop],
        bProp = b[prop];
    
    if (aProp < bProp) return -1;
    else if (aProp === bProp) return 0;
    else return 1;
}

function nameComparator(a, b) {
    return propComparator(a, b, 'name');
}

function titleComparator(a, b) {
    return propComparator(a, b, 'title');
}

function getCodesAndNames(countries) {
    let countryInfo = [];
    Object.keys(countries).forEach((key) => {
        const { countryCode, name } = countries[key];
        countryInfo.push({ countryCode, name });
    });
    return countryInfo;
}

async function loadCountries() {
    let countries = cache.get('countries');

    if (countries === undefined) {
        countries = await axios.request({
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/countries',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
        })

        countries = countries.data;
        cache.set('countries', countries);
    }

    return countries;
}

async function loadShows(country, title) {
    let shows = cache.get(`shows/${country}/${title}`);
    if (shows === undefined) {
        shows = await axios.request({
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
        params: {
            title: title,
            country: country,
            series_granularity: 'show',
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
        })

        shows = shows.data;
        cache.set(`shows/${country}/${title}`, shows);
    }

    return shows;
}

function consolidateStreamingOptions(streamingOptions) {
    let serviceIds = [];
    for (let i = streamingOptions.length - 1; i >= 0; i -= 1) {
        const id = streamingOptions[i].service.id;
        if (serviceIds.includes(id)) streamingOptions.splice(i, 1);
        else serviceIds.push(id);
    }
}

function transformStreamingOptions(shows, country) {
    for (const i in shows) {
        shows[i].streamingOptions = shows[i].streamingOptions[country] ?? [];
        consolidateStreamingOptions(shows[i].streamingOptions);
        shows[i].streamingOptions.sort((a, b) => {
            const aName = a.service.name,
                bName = b.service.name;
            
            if (aName < bName) return -1;
            else if (aName === bName) return 0;
            else return 1;
        });
    }
}

module.exports = { nameComparator, titleComparator, getCodesAndNames, loadCountries, loadShows, transformStreamingOptions };