const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const CACHE_TIMEOUT = 60 * 60 * 24;

exports.showComparator = (a, b) => {
    const titleComp = titleComparator(a, b);
    if (titleComp !== 0) return titleComp;

    const aYear = a.firstAirYear ?? a.releaseYear,
        bYear = b.firstAirYear ?? b.releaseYear;
    
    if (aYear < bYear) return -1;
    else return aYear === bYear ? 0 : 1;
}

exports.nameComparator = (a, b) => {
    return propComparator(a, b, 'name');
}

function titleComparator(a, b) {
    return propComparator(a, b, 'title');
}

function propComparator(a, b, prop) {
    const aProp = a[prop],
        bProp = b[prop];
    
    if (aProp < bProp) return -1;
    else return aProp === bProp ? 0 : 1;
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
        countries = await axios.request({
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/countries',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
        });

        countries = countries.data;
        cache.set('countries', countries, CACHE_TIMEOUT);
    }

    return countries;
}

exports.loadShows = async (country, title) => {
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
        });

        shows = shows.data;
        cache.set(`shows/${country}/${title}`, shows, CACHE_TIMEOUT);
    }

    return shows;
}

exports.transformStreamingOptions = (shows, country) => {
    for (const i in shows) {
        shows[i].streamingOptions = consolidateStreamingOptions(shows[i].streamingOptions[country] ?? []);
        shows[i].streamingOptions.sort((a, b) => {
            const aName = a.service.name,
                bName = b.service.name;
            
            if (aName < bName) return -1;
            else return aName === bName ? 0 : 1;
        });
    }
}

function consolidateStreamingOptions(streamingOptions) {
    let groupedStreamingOptions = groupStreamingOptionsById(streamingOptions);
    let consolidated = [];
    
    for (const key of Object.keys(groupedStreamingOptions)) {
        const grouped = groupedStreamingOptions[key];
        consolidated.push(consolidateTypes(grouped));
    }

    return consolidated;
}

function groupStreamingOptionsById(streamingOptions) {
    const len = streamingOptions.length;
    let grouped = {};

    for (let i = 0; i < len; i += 1) {
        const streamingOption = streamingOptions[i],
            id = streamingOption.service.id;
        if (Object.keys(grouped).includes(id)) grouped[id].push(streamingOption);
        else grouped[id] = [streamingOption];
    }

    return grouped;
}

function consolidateTypes(grouped) {
    const groupLen = grouped.length,
        types = new Set(),
        addons = [],
        addonIds = new Set();
    let firstStreamingOption = grouped[0];

    for (let i = 0; i < groupLen; i += 1) {
        const curStreamingOption = grouped[i],
            curType = curStreamingOption.type;

        types.add(curType);
        delete curStreamingOption.type;

        if (curType === 'addon') {
            const addonId = curStreamingOption.addon.id;
            if (!addonIds.has(addonId)) {
                addons.push(curStreamingOption.addon);
                addonIds.add(addonId);
            }
        }
    }

    firstStreamingOption.types = Array.from(types);
    firstStreamingOption.types.sort();
    delete firstStreamingOption.type;

    if (addons.length > 0) {
        addons.sort(module.exports.nameComparator);
        firstStreamingOption.addons = addons;
        delete firstStreamingOption.addon;
    }

    return firstStreamingOption;
}

exports.validateCountry = async (country) => {
    let countries = await this.loadCountries();
    return Object.keys(countries).includes(country);
}

exports.validateTitle = (title) => {
    return title.trim().length > 0;
}