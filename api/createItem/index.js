module.exports = async function (context, req) {
    // 1. Verificamos si la variable existe (sin mostrarla toda por seguridad)
    const connection = process.env.COSMOS_DB_CONNECTION;
    const exists = connection ? "SÍ existe" : "NO existe";
    const length = connection ? connection.length : 0;

    // 2. Verificamos qué está llegando en el cuerpo
    const bodyReceived = req.body;

    context.res = {
        status: 200,
        body: {
            mensaje: "Prueba de diagnóstico",
            variableConexion: exists,
            longitudVariable: length,
            loQueRecibiEnElBody: bodyReceived,
            ayuda: "Si ves esto, la función está VIVA. Si la variable dice 'NO existe', el problema es la configuración en el Portal de Azure."
        }
    };
};