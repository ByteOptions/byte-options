
/**
 * Given an object containing all the required com.codeup.capstonestarter.data for a given page, fetch all the needed com.codeup.capstonestarter.data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export default function fetchData(state, request) {
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable
    const baseUri = "https://byteoptions.co";

    for (let pieceOfState of Object.keys(state)) {
        promises.push(
            fetch(baseUri + state[pieceOfState], request)
                .then(function (res) {
                    return res.json();
                }));
    }
    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}
