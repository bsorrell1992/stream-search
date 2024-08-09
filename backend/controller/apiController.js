const {
    nameComparator,
    titleComparator,
    getCodesAndNames,
    loadCountries,
    loadShows,
    transformStreamingOptions
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
    const country = req.params.country,
        title = req.params.title,
        shows = await loadShows(country, title);

    transformStreamingOptions(shows, country);
    shows.sort(titleComparator);
    res.status(200).send(shows);
};