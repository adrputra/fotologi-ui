import { useEffect, useState } from 'react';
import { Center, Container, Grid, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { getRandomImage } from '@/api/login';
import LoginForm from './LoginForm';

export default function Login() {
  const [image, setImage] = useState<string>('');

  const getImage = async () => {
    const res: string = await getRandomImage();
    if (res) {
      setImage(res);
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <Grid>
      <Grid.Col span={4} p={0}>
        <Container p={0}>
          <Image src={image} fit="cover" h="99vh" />
        </Container>
      </Grid.Col>
      <Grid.Col span={8} p={0}>
        <Center h="100%">
          <Paper shadow="xl" radius="md" withBorder p="xl" w="60%">
            <Stack gap="xl">
              <Stack gap={0}>
                <Title order={1}>Welcome!</Title>
                <Text fs="italic" size="sm">
                  Sorry, I have bad memory. Can you tell me who are you again?
                </Text>
              </Stack>
              <LoginForm />
            </Stack>
          </Paper>
        </Center>
      </Grid.Col>
    </Grid>
  );
}
