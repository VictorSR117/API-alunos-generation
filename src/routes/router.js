const express = require('express');
const router = express.Router();

const { contentValidation, userExistence } = require('../middlewares/validations');

const {
    listStudents,
    registerStudent,
    detailStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/alunos');

router.post('/alunos', contentValidation, registerStudent);
router.get('/alunos', listStudents);
router.get('/alunos/:id', userExistence, detailStudent);
router.put('/alunos/:id', contentValidation, userExistence, updateStudent);
router.delete('/alunos/:id', userExistence, deleteStudent);

module.exports = router;