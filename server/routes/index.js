const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
	console.log('get');
});

router.post('/todo', (req, res) => {
	console.log(req.body);
});

router.patch('/todo/:todoId', (req, res) => {
	console.log(req.body);
	console.log(req.params.todoId);
});

router.delete('/todo/:todoId', (req, res) => {
	console.log(req.body);
	console.log(req.params.todoId);
});

module.exports = router;
