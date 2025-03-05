/**
 * Handles API requests to fetch data from JSON endpoints
 * @class
 */
class Api {
    /**
     * Creates a new Api instance
     * @param {string} url - The URL endpoint to fetch data from
     */
    constructor(url) {
        this._url = url
    }

    /**
     * Fetches and parses JSON data from the API endpoint
     * @async
     * @returns {Promise<Object>} The parsed JSON response
     * @throws {Error} If the HTTP response is not OK or if data format is invalid
     */
    async get() {
        try {
            const response = await fetch(this._url)
            if (!response.ok) throw new Error(`Error http : ${response.status}`)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Format de données inconnu', { error: error })
        }
    }
}

export default Api