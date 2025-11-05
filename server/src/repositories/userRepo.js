const axios = require('axios');
const USER_URL = 'https://jsonplaceholder.typicode.com/users';

async function findUserByNameAndEmail(username, email) {
    const { data } = await axios.get(`${USER_URL}?name=${username}&email=${email}`);
    return Array.isArray(data) && data.length ? data[0] : null;
}

module.exports = { findUserByNameAndEmail };