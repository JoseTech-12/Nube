const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
const database = client.database("mi-db");
const container = database.container("items");

module.exports = async function (context, req) {
    try {
        const item = req.body;

        // validar
        if (!item || !item.id) {
            context.res = {
                status: 400,
                body: "El item debe tener un id"
            };
            return;
        }

        const { resource } = await container.items.create(item);

        context.res = {
            status: 201,
            body: resource
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
};