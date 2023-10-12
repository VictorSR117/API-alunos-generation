const pool = require("../data/connection");

const listStudents = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM alunos");
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" })
        console.error(error.message);
    }
}

const registerStudent = async (req, res) => {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

    try {
        await pool.query(`
        INSERT INTO alunos (nome, idade, nota_primeiro_semestre,
        nota_segundo_semestre, nome_professor, numero_sala) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nome, idade, nota_primeiro_semestre, nota_segundo_semestre,
                nome_professor, numero_sala]);
        res.status(201).json({ mensagem: "Aluno cadastrado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" })
        console.error(error.message);
    }
}

const detailStudent = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await pool.query("SELECT * FROM alunos WHERE id = $1", [id]);
        res.status(200).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" })
        console.error(error.message);
    }
}

const updateStudent = async (req, res) => {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
    const { id } = req.params;

    try {
        await pool.query(`UPDATE alunos SET nome = $1, idade = $2, nota_primeiro_semestre = $3,
        nota_segundo_semestre = $4, nome_professor = $5, numero_sala = $6 WHERE id = $7`, [nome, idade,
            nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala, id]);

        res.status(200).json({ mensagem: "Aluno atualizado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" })
        console.error(error.message);
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM alunos WHERE id = $1", [id]);
        res.status(200).json({ mensagem: "Aluno excluido com sucesso" });
    }
    catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor" })
        console.error(error.message);
    }
}

module.exports = {
    listStudents,
    registerStudent,
    detailStudent,
    updateStudent,
    deleteStudent
}