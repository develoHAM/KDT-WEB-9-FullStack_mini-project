import express from 'express';
import controller from '../controller/Ctodo.js';
const router = express.Router();

router.get('/todos', controller.get_todos);

router.post('/todo', controller.post_todo);

router.patch('/todo/:todoId', controller.patch_todo);

router.delete('/todo/:todoId', controller.delete_todo);

export default router;
