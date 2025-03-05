import { useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useAuthStore } from '@/store/auth';
import { useMenuStore } from '@/store/menu';
import { showNotification } from '@/libs/alert';
import { doLogin } from '@/api/login';

export default function LoginForm() {
  const { setMenuList } = useMenuStore();
  const { setToken, setInstitutionID } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useDisclosure(false);

  const form = useForm<LoginForm>({
    name: 'LoginForm',
    mode: 'uncontrolled',
    initialValues: {
      username: 'johndoe',
      password: 'P@ssw0rd',
    },
    validate: {
      username: (value) => (value.length < 4 ? 'Invalid Username or Email' : null),
    },
  });

  const handleSubmit = async (values: LoginForm) => {
    setLoading.open();
    try {
      const res = await doLogin(values);
      setMenuList(res.data.menu_mapping);
      setToken(res.data.token);
      setInstitutionID(res.data.institution_id);
      navigate('/');
    } catch (error) {
      showNotification({ status: 'error', message: 'Login Failed' });
    } finally {
      setLoading.close();
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          leftSection={<IconUser size={20} />}
          label="Username or Email"
          placeholder="Input Username or Email"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          leftSection={<IconLock size={20} />}
          label="Password"
          placeholder="Input Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          w="100%"
        />
        <Button type="submit" mt="sm" loading={loading} loaderProps={{ type: 'dots' }}>
          Login
        </Button>
      </Stack>
    </form>
  );
}
