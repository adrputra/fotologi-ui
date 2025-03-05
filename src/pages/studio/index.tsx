import { Group, Paper, Stack, TextInput } from '@mantine/core';
import Upload from './Upload';

export default function StudioPage() {
  return (
    <>
      <Upload />
      <Paper p="md" shadow="xl">
        <form>
          <Stack my="md">
            <Group grow align="flex-start">
              <TextInput
                withAsterisk
                required
                label="Username"
                // {...form.getInputProps('username')}
              />
              <TextInput withAsterisk required label="Email"
              //  {...form.getInputProps('email')} 
               />
            </Group>
          </Stack>
        </form>
      </Paper>
    </>
  );
}
