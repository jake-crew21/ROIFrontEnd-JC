import NetInfo from "@react-native-community/netinfo";
import cache from "./Caching";

// Root URL for the API backend
const apiUrl = 'https://localhost:7100/api';

// Use caching for semi-offline operation - set high TTL (time to live)
cache.ttlMinutes = 60;


/**
 * Create a GET request to a URL.
 * @param {string} url The request URL.
 * @param {object} data The data to pass through.
 * @param {bool} returnsData True if the response should return data.
 * @returns {Promise} The response promise.
 */
async function getRequest(url, data = {}, returnsData = true) {
    
    // Build URL with data attached
    url += '?' + new URLSearchParams(data);
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError)

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}


/**
 * Create a GET request to a URL while using the AsyncCache for offline data loading.
 * @param {string} url The request URL.
 * @param {object} data The data to pass through.
 * @param {bool} returnsData True if the response should return data.
 * @returns {Promise} The response promise.
 */
async function getRequestWithCaching(url, data = {}, returnsData = true) {
    
    // Use the original URL as the cache key
    const cacheKey = url

    // Get network state
    const networkState = await NetInfo.fetch()

    // Check if currently offline
    if (!networkState.isConnected) {

        // Load from cache if available (null if not)
        console.log(`OFFLINE: Load from cache: ${cacheKey}`)
        return Promise.resolve(await cache.getItem(cacheKey))
    }
    
    // Build URL with data attached
    url += '?' + new URLSearchParams(data);
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError)

    // Update cache
    console.log(`Updating cache: ${cacheKey}`)
    cache.setItem(cacheKey, await response.clone().json())

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}


/**
 * Create a POST request to a URL.
 * @param {string} url The request URL.
 * @param {object} data The data to pass through.
 * @param {bool} returnsData True if the response should return data.
 * @returns {Promise} The response promise.
 */
async function postRequest(url, data = {}, returnsData = true) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}


/**
 * Create a PUT request to a URL.
 * @param {string} url The request URL.
 * @param {object} data The data to pass through.
 * @param {bool} returnsData True if the response should return data.
 * @returns {Promise} The response promise.
 */
async function putRequest(url, data = {}, returnsData = false) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}


/**
 * Create a DELETE request to a URL.
 * @param {string} url The request URL.
 * @param {object} data The data to pass through.
 * @param {bool} returnsData True if the response should return data.
 * @returns {Promise} The response promise.
 */
async function deleteRequest(url, data = {}, returnsData = false) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data if available
    return returnsData ? response.json() : Promise.resolve();
}


/**
 * Check for 400-500 errors and custom messages from the server.
 * @param {Response} response The Fetch API Response object.
 * @returns {Response} The original Response object.
 */
async function handleFetchError(response) {

    // Check for errors, e.g. 400, 500
    if (!response.ok) {

        // Check for custom error message from API
        if (response.message) {
            throw Error(`API ${response.status} error: ${response.message}`);
        } else {
            throw Error(`API ${response.status} error: ${response.statusText}`);
        }
    }

    return response;
}


/*
 * ADD YOUR API CALLING METHODS HERE
 */

/**
 * GET Departments from API
 * @returns all Departments
 */
export function RoiGetDepartments()
{
    //call the api end point: GET /Departments
    return getRequestWithCaching(`${apiUrl}/v1/Departments`)
        .then(response => {
            //If request/response is successful, return json data
            return response
        })
}
/**
 * GET People from API
 * @returns all People 
 */
export function RoiGetPeople()
{
    //call the api end point: GET /People
    return getRequestWithCaching(`${apiUrl}/People`)
        .then(response => {
            //If request/response is successful, return json data
            return response
        })
}
/**
 * GET Person
 * @param {Int} id 
 * @returns a person from People Table 
 */
export function RoiGetPerson(id)
{
    return getRequestWithCaching(`${apiUrl}/People/${id}`)
        .then(response => {
            //If request/response is successful, return json data
            return response
        })
}
/**
 * POST Person
 * @param {String} name 
 * @param {String} phone 
 * @param {Int} departmentId 
 * @param {String} street 
 * @param {String} city 
 * @param {String} state 
 * @param {String} zip 
 * @param {String} country 
 * @returns data sent to API
 */
export function RoiAddPerson(name, phone, departmentId, street, city, state, zip, country)
{
    return postRequest(`${apiUrl}/People`, {name, phone, departmentId, street, city, state, zip, country})
        .then(response => {
            //If request/response is successful, return json data
            return response
        })
}
/**
 * PUT Person
 * @param {Int} personId 
 * @param {String} name 
 * @param {String} phone 
 * @param {Int} departmentId 
 * @param {String} street 
 * @param {String} city 
 * @param {String} state 
 * @param {String} zip 
 * @param {String} country 
 * @returns no data when the API is updated
 */
export function RoiUpdatePerson(personId, name, phone, departmentId, street, city, state, zip, country)
{
    return putRequest(`${apiUrl}/People/${personId}`, { personId, name, phone, departmentId, street, city, state, zip, country})
        .then(response => {
            //If request/response is successful, return true
            return true
        })
}
/**
 * DELETE Person
 * @param {Int} id 
 * @returns no data when a Person is removed from the API
 */
export function RoiDeletePerson(id)
{
    return deleteRequest(`${apiUrl}/People/${id}`, {id})
        .then(response => {
            return true
        })
}