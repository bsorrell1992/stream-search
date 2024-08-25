const {
    nameComparator,
    showComparator,
    getCodesAndNames,
    loadCountries,
    loadShows,
    transformStreamingOptions,
    validateCountry,
    validateTitle
} = require('../utils/apiUtils');

exports.getCountries = async (req, res) => {
    try {
        const countries = await loadCountries();
        let serviceNames = getCodesAndNames(countries);
        serviceNames.sort(nameComparator);
        res.status(200).send(serviceNames);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

exports.getStreamingServices = async (req, res) => {
    const targetCountry = req.params.country;
    if (!(await validateCountry(targetCountry))) return res.status(400).send("Country code not found");

    try {
        const countries = await loadCountries();        
        streamingServices = countries[targetCountry].services;
        streamingServices.sort(nameComparator);
        res.status(200).send(streamingServices);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

exports.getShows = async (req, res) => {
    const country = req.params.country,
        title = req.params.title;
    if (!(await validateCountry(country)) || !validateTitle(title)) return res.status(400).send("Invalid input");

    try {
        let shows = await loadShows(country, title);
        transformStreamingOptions(shows, country);
        shows.sort(showComparator);
        res.status(200).send(shows);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};