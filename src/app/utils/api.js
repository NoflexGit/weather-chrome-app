import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { API_ROOT } from 'app/utils/constants';

const superagent = superagentPromise(_superagent, global.Promise);

/**
 * @function tokenPlugin - API errors handler
 * @param {object} err - API error response
 * @return {object} err - API error response
 */
const handleErrors = err => {
	return err;
};

/**
 * @function tokenPlugin - API response handler
 * @param {object} res - API response
 * @return {any} res.body - API response body
 */
const response = res => {
	if (res && res.status === 200) {
		return res.body;
	}
};

// /**
//  * @function tokenPlugin - Authorization token handler
//  * @param {object} req - API request
//  */
// const tokenPlugin = req => {
//     /** Check token existence in local storage and put it to authorization header **/
//     if (tokenStore.token) {
//         req.set("authorization", `JWT ${tokenStore.token}`);
//     }
// };

/**
 * @object request - List of REST API request methods
 * @property {function} delete
 * @property {function} get
 * @property {function} put
 * @property {function} post
 */
const requests = {
	/**
	 * @function delete - Returns Superagent wrapper for DELETE method
	 * @property {string} url - API resource url
	 * @return {function} superagent - Superagent Promise
	 */
	delete: url =>
		superagent
			.del(`${API_ROOT}${url}`)
			.end(handleErrors)
			.then(response),

	/**
	 * @function get - Returns Superagent wrapper for GET method
	 * @property {string} url - API resource url
	 * @return {function} superagent - Superagent Promise
	 */
	get: (url, param) => {
		const req = superagent.get(`${API_ROOT}${url}`, param);

		const promise = req.end(handleErrors).then(response);

		promise.abort = () => {
			req.abort();
		};
		return promise;
	},

	/**
	 * @function put - Returns Superagent wrapper for PUT method
	 * @property {string} url - API resource url
	 * @property {any} body - Request payload
	 * @return {function} superagent - Superagent wrapper
	 */
	put: (url, body) =>
		superagent
			.put(`${API_ROOT}${url}`, body)
			.end(handleErrors)
			.then(response),

	/**
	 * @function post - Returns Superagent wrapper for POST method
	 * @property {string} url - API resource url
	 * @property {any} body - Request payload
	 * @return {function} superagent - Superagent wrapper
	 */
	post: (url, body) =>
		superagent
			.post(`${API_ROOT}${url}`, body)
			.end(handleErrors)
			.then(response)
};

/**
 * @object reports - List of REST API methods for user
 * @property {function} getReportsList
 */
const reports = {
	/**
	 * @function getReportsList - Reports List
	 * @property {object} params - params request
	 * @return {function} POST request
	 */
	getReportsList: (from_ts, to_ts, site_id) =>
		requests.get(`/reports`, {
			from: from_ts,
			to: to_ts,
			site: site_id
		}),

	requestReport: (from_ts, to_ts, site_id) =>
		requests.post(`/reports`, {
			from: from_ts,
			to: to_ts,
			site: site_id
		}),

	getInteractiveReport: (type, site_id, count, period) =>
		requests.get(`/interactive/${type}/${site_id}/${count}/${period}`),

    getStatsForQuery: (site_id, period, query) =>
        requests.get(`/interactive/query/stats/${site_id}/${period}?query=${query}`)
};

/**
 * @object reports - List of REST API methods for user
 * @property {function} getReportsList
 */
const sites = {
	getSitesList: () => requests.get(`/sites`),

	deleteSiteById: site_id => requests.delete(`/sites/${site_id}`),

	addNewSite: (site_id, site_name) =>
		requests.post(`/sites`, {
			id: site_id,
			name: site_name
		}),

	updateSiteName: (site_id, site_name) =>
		requests.put(`/sites/${site_id}`, {
			name: site_name
		})
};

export default {
	reports,
	sites
};
