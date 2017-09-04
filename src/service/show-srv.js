const request = require("request-promise-native");

const host = process.env.SHOW_SERVICE_HOST;

class ShowService {
    static async getShowById(id, include_movie) {
        return await request.get({
            url: `${host}/shows/${id}`,
            qs: {include_movie},
            json: true
        });
    }

    static async updateShowSalesById(id, seats_delta) {
        return await request.put({
            url: `${host}/shows/${id}/sales`,
            qs: {seats_delta}
        })
    }
}

module.exports = ShowService;
