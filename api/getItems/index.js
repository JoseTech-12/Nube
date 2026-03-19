const { CosmosClient } = require("@azure/cosmos");

// Es mejor inicializar el cliente fuera para reutilizar la conexión, 
// pero los logs deben ir dentro.
const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
const database = client.database("miapp-db");
const container = database.container("items");

module.exports = async function (context, req) {
    try {
        // Logs de depuración (AHORA DENTRO DE LA FUNCIÓN)
        context.log("Iniciando lectura de items...");

        // Obtenemos todos los documentos
        const { resources } = await container.items.readAll().fetchAll();

        context.res = {
            status: 200,
            body: resources
        };
    } catch (error) {
        context.log.error("Error en getItems:", error.message);
        context.res = {
            status: 500,
            body: {
                mensaje: "Error al leer de la base de datos",
                error: error.message
            }
        };
    }
};