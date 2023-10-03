import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const _Wrapper = styled.div`
	box-sizing: border-box;
	margin: 0 auto;
	padding: 0px;
	width: 60vw;
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const _Header = styled.h1`
	font-family: 'KCC-DodamdodamR';
	font-size: 4rem;
	text-align: center;
	height: 15%;
	width: 90%;
	color: white;
	border-radius: 15px;
	background-color: orange;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const _TodoForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 80%;
	height: 4rem;

	input {
		flex: 0 0 80%;
		border: none;
		border-bottom: 2px solid orange;
		height: 100%;
		&:focus-visible {
			outline: none;
		}
	}

	div {
		flex: 0 0 20%;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
`;

const _AddButton = styled.button`
	width: 4rem;
	height: 4rem;
	border: none;
	border-radius: 15px;
	background-color: lightgrey;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: orange;
	}

	&:first-child {
		font-size: 1.5rem;
		color: whitesmoke;
	}
`;

const _TodoCount = styled.div`
	font-size: 1.2rem;
	font-family: 'KCC-DodamdodamR';
	height: 2rem;
	display: flex;
	align-items: center;
`;

const _TodoList = styled.ul`
	width: 80%;
	flex: 0 0 65%;
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow-y: scroll;
	padding-top: 1rem;
`;

const _TodoItemWrapper = styled.li`
	flex: 0 0 10%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-bottom: 1rem;
`;

const _TodoInputWrapper = styled.div`
	flex: 1 0 80%;
	display: flex;
	padding: 1rem 0;
	border-bottom: 1px dotted orange;
`;

const _CheckBox = styled.input`
	flex: 0 0 10%;
	cursor: pointer;
`;
const _Todo = styled.input`
	flex: 1 0 90%;
	border: none;
	cursor: pointer;

	&:focus-visible {
		outline: none;
	}
`;

const _DeleteButton = styled.button`
	flex-grow: 0;
	flex-shrink: 0;
	height: 2rem;
	width: 2rem;
	background-color: lightgrey;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	border: none;
	color: whitesmoke;

	&:hover {
		background-color: orange;
	}
`;

const _BorderBottom = styled.hr`
	width: 90%;
	height: 0.2rem;
	background-color: lightgray;
	border: none;
`;

export default function App() {
	const [todoList, setTodoList] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const fetchTodo = async () => {
		try {
			const response = await axios.get('http://localhost:8000/todos');
			setTodoList(
				response.data.todoList.map((todo) => {
					return { ...todo, readOnly: true };
				})
			);
		} catch (error) {
			console.error('Error fetching todo data:', error);
		}
	};
	useEffect(() => {
		fetchTodo();
	}, []);
	const createTodo = async (title) => {
		try {
			await axios.post('http://localhost:8000/todo', { title: inputValue, done: 0 });
			fetchTodo();
		} catch (error) {
			console.error('Error creating todo:', error);
		}
	};
	const addTodo = (e) => {
		e.preventDefault();
		createTodo(inputValue);
		setInputValue('');
	};
	const checkTodo = (e, title, id) => {
		console.log(e.target.checked);
		console.log(id);
		updateTodo(id, title, e.target.checked);
	};
	const updateTodo = async (id, title, done) => {
		const response = await axios.patch(`http://localhost:8000/todo/${id}`, { title: title, done: done });
		console.log(response.data);
		fetchTodo();
	};
	const deleteTodo = async (id) => {
		await axios.delete(`http://localhost:8000/todo/${id}`);
		fetchTodo();
	};
	const submitUpdate = (e, id) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			changeReadOnly(id);
			e.target.blur();
			const [newTodo] = todoList.filter((todo) => {
				return todo.id === id;
			});
			console.log('updateTodo', newTodo);
			updateTodo(id, newTodo.title, newTodo.done);
		}
	};
	const changeReadOnly = (id) => {
		console.log('changeReadONly');
		const newTodoList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, readOnly: !todo.readOnly };
			} else {
				return todo;
			}
		});
		setTodoList(newTodoList);
	};
	const changeTitle = (e, id) => {
		console.log('changeTitle');

		const newTodoList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, title: e.target.value };
			} else {
				return todo;
			}
		});
		setTodoList(newTodoList);
	};

	return (
		<_Wrapper>
			<_Header>My Todo App</_Header>
			<_TodoForm onSubmit={(e) => addTodo(e)}>
				<input
					type='text'
					placeholder='add your new todo'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<div>
					<_AddButton type='button' onClick={addTodo}>
						<FaPlus />
					</_AddButton>
				</div>
			</_TodoForm>
			<_TodoCount>{todoList.length} Todo</_TodoCount>
			<_TodoList>
				{todoList.map((todo) => {
					return (
						<_TodoItemWrapper key={todo.id}>
							<_TodoInputWrapper>
								<_CheckBox
									type='checkbox'
									checked={todo.done}
									onChange={(e) => checkTodo(e, todo.title, todo.id)}
								/>
								<_Todo
									value={todo.title}
									readOnly={todo.readOnly}
									onClick={() => changeReadOnly(todo.id)}
									onChange={(e) => changeTitle(e, todo.id)}
									onKeyDown={(e) => submitUpdate(e, todo.id)}
								/>
							</_TodoInputWrapper>
							<_DeleteButton type='button' onClick={() => deleteTodo(todo.id)}>
								<FaTrashAlt />
							</_DeleteButton>
						</_TodoItemWrapper>
					);
				})}
			</_TodoList>
			<_BorderBottom />
		</_Wrapper>
	);
}
