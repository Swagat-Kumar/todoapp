import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "../graphql/mutations";
import { listTodos } from "../graphql/queries";
import { Row, Col, Card, PageHeader } from "antd";
import { message } from "antd";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import "./MainApp.css";

const MainApp = ({ username }) => {
	const [todos, setTodos] = useState([]);
	const fetchTodos = async () => {
		try {
			const todoData = await API.graphql(graphqlOperation(listTodos));
			const todos = todoData.data.listTodos.items;
			setTodos(todos);
		} catch (err) {
			console.log("error fetching todos");
		}
	};
	const handleFormSubmit = async todo => {
		try {
			const newTodo = { ...todo, done: false };
			const newResponse = await API.graphql(
				graphqlOperation(createTodo, { input: newTodo })
			);
			setTodos([...todos, newResponse.data.createTodo]);
			message.success("Todo added!");
		} catch (err) {
			console.log("error making todos");
		}
	};

	const handleRemoveTodo = async todo => {
		try {
			await API.graphql(
				graphqlOperation(deleteTodo, { input: { id: todo.id } })
			);
			setTodos(todos.filter(t => t.id !== todo.id));
			message.warn("Todo removed!");
		} catch (err) {
			console.log("error removing todos");
		}
	};

	const handleToggleTodoStatus = async todo => {
		try {
			await API.graphql(
				graphqlOperation(updateTodo, {
					input: { id: todo.id, done: !todo.done },
				})
			);
			setTodos(
				todos.map(t => {
					if (t.id !== todo.id) {
						return t;
					} else {
						return { ...t, done: !t.done };
					}
				})
			);
			message.info("Todo state updated!");
		} catch (err) {
			console.log("error updating todo status!");
		}
	};
	useEffect(() => {
		fetchTodos();
	}, []);
	return (
		<>
			<Row
				justify='center'
				align='middle'
				gutter={[0, 10]}
				className='todos-container'
			>
				<Col
					xs={{ span: 23 }}
					sm={{ span: 23 }}
					md={{ span: 21 }}
					lg={{ span: 17 }}
					xl={{ span: 18 }}
				>
					<PageHeader
						title='Add Todo'
						subTitle='To add a todo, just fill the form below and click in add todo.'
					/>
				</Col>

				<Col
					xs={{ span: 23 }}
					sm={{ span: 23 }}
					md={{ span: 21 }}
					lg={{ span: 17 }}
					xl={{ span: 18 }}
				>
					<Card title='Create a new todo'>
						<AddTodoForm
							onFormSubmit={handleFormSubmit}
							username={username}
						/>
					</Card>
				</Col>

				<Col
					xs={{ span: 23 }}
					sm={{ span: 23 }}
					md={{ span: 21 }}
					lg={{ span: 17 }}
					xl={{ span: 18 }}
				>
					<Card title='Todo List'>
						<TodoList
							todos={todos}
							onTodoRemoval={handleRemoveTodo}
							onTodoToggle={handleToggleTodoStatus}
						/>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default MainApp;
