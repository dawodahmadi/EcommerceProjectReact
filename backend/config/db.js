const { connect, disconnect } = require('mongoose');

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Unable to create connection, try again...");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Unable to disconnect connection, try again...");
    }
}

module.exports = { connectToDatabase, disconnectFromDatabase };
