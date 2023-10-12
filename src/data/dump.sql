CREATE DATABASE escola

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    nota_primeiro_semestre INTEGER NOT NULL,
    nota_segundo_semestre INTEGER NOT NULL,
    nome_professor TEXT NOT NULL,
    numero_sala INTEGER NOT NULL
);