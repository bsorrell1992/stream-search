const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const SHOWS_TIMEOUT = 60 * 60 * 24;

function propComparator(a, b, prop) {
    const aProp = a[prop],
        bProp = b[prop];
    
    if (aProp < bProp) return -1;
    else if (aProp === bProp) return 0;
    else return 1;
}

exports.nameComparator = (a, b) => {
    return propComparator(a, b, 'name');
}

exports.titleComparator = (a, b) => {
    return propComparator(a, b, 'title');
}

exports.getCodesAndNames = (countries) => {
    let countryInfo = [];
    Object.keys(countries).forEach((key) => {
        const { countryCode, name } = countries[key];
        countryInfo.push({ countryCode, name });
    });
    return countryInfo;
}

exports.loadCountries = async () => {
    let countries = cache.get('countries');

    if (countries === undefined) {
        try {
            countries = await axios.request({
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/countries',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
            });
        } catch (error) {
            throw error;
        }

        countries = countries.data;
        cache.set('countries', countries);
    }

    return countries;
}

exports.loadShows = async (country, title) => {
    let shows = cache.get(`shows/${country}/${title}`);
    if (shows === undefined) {
        try {
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
            });
        } catch (error) {
            throw error;
        }

        shows = shows.data;
        cache.set(`shows/${country}/${title}`, shows, SHOWS_TIMEOUT);
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

exports.transformStreamingOptions = (shows, country) => {
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

exports.validateCountry = async (country) => {
    let countries = await this.loadCountries();
    return Object.keys(countries).includes(country);
}

exports.validateTitle = (title) => {
    return title.trim().length > 0;
}