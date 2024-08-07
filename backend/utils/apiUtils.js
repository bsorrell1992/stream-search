function compareProp(a, b, prop) {
    const aProp = a[prop],
        bProp = b[prop];
    
    if (aProp < bProp) return -1;
    else if (aProp === bProp) return 0;
    else return 1;
}

function compareName(a, b) {
    return compareProp(a, b, 'name');
}

function compareTitle(a, b) {
    return compareProp(a, b, 'title');
}

function getCodesAndNames(countries) {
    let countryInfo = [];
    Object.keys(countries).forEach((key) => {
        const { countryCode, name } = countries[key];
        countryInfo.push({ countryCode, name });
    });
    return countryInfo;
}

module.exports = { compareName, compareTitle, getCodesAndNames };