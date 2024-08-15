const {
    nameComparator,
    titleComparator,
    getCodesAndNames,
    loadCountries,
    loadShows,
    transformStreamingOptions,
    tryCatchSendAsync
} = require('../utils/apiUtils');

exports.getCountries = async (req, res) => {
    await tryCatchSendAsync(res, async () => {
        const countries = await loadCountries();
        let serviceNames = getCodesAndNames(countries);
        serviceNames.sort(nameComparator);
        return serviceNames;
    });
};

exports.getStreamingServices = async (req, res) => {
    const targetCountry = req.params.country;

    await tryCatchSendAsync(res, async () => {
        let countries = await loadCountries(),
            streamingServices = countries[targetCountry].services;
        streamingServices.sort(nameComparator);
        return streamingServices;
    });
};

exports.getShows = async (req, res) => {
    const country = req.params.country,
        title = req.params.title;

    await tryCatchSendAsync(res, async () => {
        let shows = await loadShows(country, title);
        transformStreamingOptions(shows, country);
        shows.sort(titleComparator);
        return shows;
    });
};