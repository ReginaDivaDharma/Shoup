import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Row, Col, Card, message } from 'antd';

const { Content } = Layout;

interface FormValues {
  username: string;
  password: string;
}

const mockLogin = async (values: FormValues) => {
  const { username, password } = values;
  const mockUsers = [
    { userId: 1, username: 'user1', password: 'password1' },
    { userId: 2, username: 'user2', password: 'password2' },
  ];

  const user = mockUsers.find(user => user.username === username && user.password === password);

  if (user) {
    const token: string = 'mock_token';
    return { success: true, token };
  } else {
    return { success: false };
  }
};

const LoginDashboard = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      const { success, token } = await mockLogin(values);
      if (success) {
        localStorage.setItem('token', token || '');
        message.success('Login successful');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ backgroundColor: '#A8C7E6', minHeight: '540px' }}>
        <Row justify="center">
          <Col span={8}>
            <div style={{ marginTop: '100px' }}>
              <Card>
                <h1 style={{ textAlign: 'center' }}>Artist Login</h1>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginDashboard;
