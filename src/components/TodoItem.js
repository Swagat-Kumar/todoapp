import React from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./TodoItem.css";

const TodoItem = ({ todo, onTodoRemoval, onTodoToggle }) => {
	return (
		<List.Item
			actions={[
				<Tooltip
					title={
						todo.done
							? "mark as uncompleted!"
							: "mark as completed!"
					}
				>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
						onChange={() => onTodoToggle(todo)}
						defaultChecked={todo.done}
					/>
				</Tooltip>,
				<Popconfirm
					title='are you sure you want to delete?'
					onConfirm={() => {
						onTodoRemoval(todo);
					}}
				>
					<Button
						className='remove-todo-button'
						type='primary'
						danger
					>
						X
					</Button>
				</Popconfirm>,
			]}
			className='list-item'
			key={todo.id}
		>
			<div className='todo-item'>
				<Tag color={todo.done ? "cyan" : "red"} className='todo-tag'>
					{todo.text}
				</Tag>
			</div>
		</List.Item>
	);
};

export default TodoItem;
