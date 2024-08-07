const {
    nameComparator,
    titleComparator,
    getCodesAndNames,
    loadCountries,
    loadShows
} = require('../utils/apiUtils');

exports.getCountries = async (req, res) => {
    const countries = loadCountries();
    let serviceNames = getCodesAndNames(countries);
    serviceNames.sort(nameComparator);

    res.status(200).send(serviceNames);
};

exports.getStreamingServices = (req, res) => {
    const targetCountry = req.params.country,
        countries = loadCountries();
    let streamingServices = countries[targetCountry].services;
    streamingServices.sort(nameComparator);
    res.status(200).send(streamingServices);
};

exports.getShows = async (req, res) => {
    const shows = loadShows(req.params.country, req.params.title);
    shows.sort(titleComparator);
    res.status(200).send(shows);
};