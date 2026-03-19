const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        const connection = process.env.COSMOS_DB_CONNECTION;

        if (!connection) {
            context.res = { status: 500, body: "Error: Falta la variable COSMOS_DB_CONNECTION en Azure." };
            return;
        }

        const client = new CosmosClient(connection);
        const database = client.database("miapp-db");
        const container = database.container("items");

        // Simplificamos la obtención del body para evitar errores de parseo
        const item = req.body;

        if (!item || !item.id) {
            context.res = {
                status: 400,
                body: "Error: El cuerpo de la petición está vacío o le falta el campo 'id'."
            };
            return;
        }

        // Intentamos crear el ítem
        const { resource } = await container.items.create(item);

        context.res = {
            status: 201, // 201 es el estándar para "Creado con éxito"
            body: resource
        };

    } catch (error) {
        // ESTA ES LA PARTE CLAVE: 
        // Ahora el error 500 te dirá EXACTAMENTE qué falló (si la base no existe, si el ID está repetido, etc.)
        context.res = {
            status: 500,
            body: {
                message: "Error interno en la función",
                error: error.message,
                stack: error.stack // Esto nos dirá en qué línea exacta falló
            }
        };
    }
};