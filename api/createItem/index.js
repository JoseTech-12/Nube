const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        const connection = process.env.COSMOS_DB_CONNECTION;
        const client = new CosmosClient(connection);
        
        // Usamos los nombres que confirmamos en tus fotos
        const database = client.database("miapp-db");
        const container = database.container("items");

        // IMPORTANTE: req.body ya viene como objeto gracias a Postman
        const item = req.body;

        if (!item || !item.id) {
            context.res = {
                status: 400,
                body: "Falta el ID en el JSON"
            };
            return;
        }

        // Guardamos en Cosmos DB
        const { resource } = await container.items.create(item);

        context.res = {
            status: 201,
            body: {
                mensaje: "¡Guardado con éxito!",
                data: resource
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: {
                error: "Error al guardar",
                detalles: error.message
            }
        };
    }
};