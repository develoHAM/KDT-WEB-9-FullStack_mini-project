import Model from '../models/index.js';

const controller = {};

controller.get_todos = async (req, res) => {
	console.log('get');
	// 모든 todo 조회
	const todos = await Model.Todo.findAll();
	res.json({ todoList: todos });
};

controller.post_todo = async (req, res) => {
	const { title, done } = req.body;
	// todo 생성완료
	const todo = await Model.Todo.create({
		title: title,
		done: done,
	});
	res.json({ id: todo.id, title: todo.title, done: todo.done, createdAt: todo.createdAt, updatedAt: todo.updatedAt });
};

controller.patch_todo = async (req, res) => {
	const { todoId } = req.params;
	const { title, done } = req.body;
	// 수정 완료 == 1, 수정 실패 == 0
	const [updatedTodo] = await Model.Todo.update(
		{ title: title, done: done },
		{
			where: {
				id: todoId,
			},
		}
	);
	res.json({ result: updatedTodo });
};

controller.delete_todo = async (req, res) => {
	const { todoId } = req.params;
	//삭제 완료 == 1, 삭제 실패 == 0
	const deletedTodo = await Model.Todo.destroy({
		where: {
			id: todoId,
		},
	});
	console.log(deletedTodo);
	res.json({ result: deletedTodo });
};

export default controller;
