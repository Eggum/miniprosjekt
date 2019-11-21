// @ flow

module.exports = async function() {
    await global.__MONGOD__.end();
};
