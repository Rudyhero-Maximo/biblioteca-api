const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Token não informado"
        });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
        return res.status(401).json({
            mensagem: "Token inválido"
        });
    }

    const [bearer, token] = partes;

    if (bearer !== "Bearer") {
        return res.status(401).json({
            mensagem: "Token inválido"
        });
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = dados;

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
}

module.exports = autenticarToken;