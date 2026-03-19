module.exports = async function (context, req) {
    try {
        const connection = process.env.COSMOS_DB_CONNECTION;

        if (!connection) {
            context.res = {
                status: 500,
                body: "Falta COSMOS_DB_CONNECTION"
            };
            return;
        }

        const { CosmosClient } = require("@azure/cosmos");
        const client = new CosmosClient(connection);

        const database = client.database("miapp-db");
        const container = database.container("items");

        const item = req.body || JSON.parse(req.rawBody || "{}");

        if (!item.id) {
            context.res = {
                status: 400,
                body: "Falta id"
            };
            return;
        }

        const { resource } = await container.items.create(item);

        context.res = {
            status: 200,
            body: resource
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
};