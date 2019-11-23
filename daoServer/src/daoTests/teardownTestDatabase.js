// @flow

/**
 * The script that runs after all the server tests.
 *
 * Ends the pool created in "setupTestDatabase.js".
 * Could probably end the pool in "setupTestDatabase.js" but ends it hear instead to show that it is possible.
 *
 * In the future could drop all sql tables in this script.
 */

module.exports = async function() {
    await global.__MONGOD__.end();
};
