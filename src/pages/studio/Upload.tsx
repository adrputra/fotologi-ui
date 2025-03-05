import { Group, Image, Paper, Text } from '@mantine/core';
import { useStudioStore } from '@/store/studio';
import DropzoneBox from './Dropzone';
import { useLayoutStore } from '@/store/layout';

export default function Upload() {
  const { selectedImage, imageList, setImageList } = useStudioStore();
  const { setSidebarStudioOpen } = useLayoutStore();

  const handleUpload = (files: File[]) => {
    setImageList([...imageList, ...files]);
    setSidebarStudioOpen();
  };

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Upload Photo
      </Text>

      <Group
        p="md"
        mt="md"
        justify='center'
        style={{ border: '1px dashed #ccc', borderRadius: '5px', cursor: 'pointer' }}
      >
        {imageList.length > 0 ? (
          <Image
            width='100%'
            height='100%'
            key={selectedImage}
            src={URL.createObjectURL(
              imageList[selectedImage === imageList.length ? imageList.length - 1 : selectedImage]
            )}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <DropzoneBox onDrop={handleUpload} />
        )}
      </Group>
    </Paper>
  );
}
