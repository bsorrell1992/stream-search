const {
    compareName,
    compareTitle,
    getCodesAndNames
} = require('../utils/apiUtils');

const axios = require('axios');

const NodeCache = require('node-cache');
const cache = new NodeCache();

exports.getCountries = async (req, res) => {
    let countries = cache.get('countries');

    if (countries === undefined) {
        countries = await axios.request({
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/countries',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
        }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
        });

        countries = countries.data;

        cache.set('countries', countries);
    }

    let serviceNames = getCodesAndNames(countries);
    serviceNames.sort(compareName);

    res.status(200).send(serviceNames);
};

exports.getStreamingServices = (req, res) => {
    const country = req.params.country,
    cachedCountries = cache.get('countries'),
    streamingServices = cachedCountries[country].services;

    streamingServices.sort(compareName);
    res.status(200).send(streamingServices);
};

exports.getShows = async (req, res) => {
    const title = req.params.title,
    country = req.params.country;

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
        }).catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });

        shows = shows.data;

        cache.set(`shows/${country}/${title}`, shows, 10 * 60);
    }

    shows.sort(compareTitle);

    res.status(200).send(shows);
};