import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button, Card, Typography, Alert, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginPage.css';

const { Title, Text } = Typography;

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError(null);
    try {
      await login(data.email, data.password, data.rememberMe);
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err: any) {
      setFormError(err?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <Title level={2}>Đăng nhập</Title>
            <Text type="secondary">Teaching Assistant WebApp</Text>
          </div>

          {(error || formError) && (
            <Alert
              message={error || formError}
              type="error"
              showIcon
              closable
              style={{ marginBottom: 24 }}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    disabled={isLoading}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    placeholder="Mật khẩu"
                    prefix={<LockOutlined />}
                    disabled={isLoading}
                  />
                )}
              />
            </Form.Item>

            <Form.Item>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
                    Ghi nhớ đăng nhập
                  </Checkbox>
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                icon={<UserOutlined />}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </form>

          <div className="login-footer">
            <Text type="secondary">
              Chưa có tài khoản? <a href="#">Liên hệ quản trị viên</a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
