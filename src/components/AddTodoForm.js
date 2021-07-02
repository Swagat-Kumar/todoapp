import React from "react";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
const AddTodoForm = ({ onFormSubmit, username }) => {
	const [form] = Form.useForm();
	const onFinish = () => {
		onFormSubmit({
			text: form.getFieldValue("text"),
		});

		form.resetFields();
	};
	return (
		<Form
			form={form}
			onFinish={onFinish}
			layout='horizontal'
			className='todo-form'
		>
			<Row gutter={20}>
				<Col xs={24} sm={24} md={17} lg={19} xl={20}>
					<Form.Item
						name={"text"}
						rules={[
							{
								required: true,
								message: "This field is required",
							},
						]}
					>
						<Input
							placeholder={`What needs to be done ${
								username[0].toUpperCase() + username.slice(1)
							}?`}
						/>
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={7} lg={5} xl={4}>
					<Button type='primary' htmlType='submit' block>
						<PlusCircleFilled />
						Add todo
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default AddTodoForm;
