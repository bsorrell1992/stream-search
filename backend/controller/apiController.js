const {
    nameComparator,
    titleComparator,
    getCodesAndNames,
    loadCountries,
    loadShows
} = require('../utils/apiUtils');

exports.getCountries = async (req, res) => {
    const countries = await loadCountries();
    let serviceNames = getCodesAndNames(countries);
    serviceNames.sort(nameComparator);

    res.status(200).send(serviceNames);
};

exports.getStreamingServices = async (req, res) => {
    const targetCountry = req.params.country,
        countries = await loadCountries();
    let streamingServices = countries[targetCountry].services;
    streamingServices.sort(nameComparator);
    res.status(200).send(streamingServices);
};

exports.getShows = async (req, res) => {
    const shows = await loadShows(req.params.country, req.params.title);
    shows.sort(titleComparator);
    res.status(200).send(shows);
};