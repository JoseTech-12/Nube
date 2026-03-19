const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
const database = client.database("miapp-db");
const container = database.container("items");

module.exports = async function (context, req) {
    const { resources } = await container.items.readAll().fetchAll();

    context.res = {
        status: 200,
        body: resources
    };
};

context.log("Connection:", process.env.COSMOS_DB_CONNECTION);
context.log("Body:", req.body);