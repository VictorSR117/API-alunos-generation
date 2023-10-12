const pool = require("../data/connection");

const contentValidation = (req, res, next) => {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

    if (!nome || !idade || !nota_primeiro_semestre || !nota_segundo_semestre || !nome_professor || !numero_sala) return res.status(400).json({ mensagem: "todos os campos devem ser preenchidos" });
    if (!Number.isInteger(idade) || !Number.isInteger(Number(nota_primeiro_semestre)) || !Number.isInteger(Number(nota_segundo_semestre)) || !Number.isInteger(Number(numero_sala))) return res.status(400).json({ mensagem: "Os campos 'idade', 'nota_primeiro_semestre', 'nota_segundo_semestre' e 'numero_sala' devem ser números inteiros" });

    return next();
}

const userExistence = async (req, res, next) => {
    let { id } = req.params;

    id = parseInt(id);

    if (isNaN(id) || !Number.isInteger(id)) return res.status(400).json({ mensagem: "o id tem que ser um número inteiro" });

    try {
        const { rowCount } = await pool.query("SELECT * FROM alunos WHERE id = $1", [id]);
        if (rowCount === 0) return res.status(404).json({ mensagem: "usuário não encontrado" });
    }
    catch (error) {
        console.error(error.message);
    }
    return next();
}

module.exports = {
    contentValidation,
    userExistence
}