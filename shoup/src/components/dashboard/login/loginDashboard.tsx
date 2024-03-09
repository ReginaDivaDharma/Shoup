import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Layout, Row, Col, Card } from 'antd';
import { Content } from 'antd/es/layout/layout';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginDashboard: React.FC = () => (
  <Layout>
    <Content style={{ backgroundColor: '#A8C7E6', minHeight: '540px' }}>
      <Row>
        <Col span={24}>
        <div className='content-item-mid' style={{
            marginTop:'100px'
        }}>
          <Card style={{
            width: '500px',
            height: 'auto'
          }}>
            <h1 className='content-item-mid'>Artist Login</h1>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
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

export default LoginDashboard;
