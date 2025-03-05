import { useEffect } from 'react';
import { IconChevronsLeft, IconChevronsRight, IconDots, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Checkbox,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useLayoutStore } from '@/store/layout';
import { useStudioStore } from '@/store/studio';

export default function SidebarStudio() {
  const { sidebarStudioOpen, setSidebarStudioOpen } = useLayoutStore();
  const { imageList, selectedImage, setSelectedImage, deleteImage, setImageList } = useStudioStore();

  const [hoverStates, setHoverStates] = useListState(Array(imageList.length).fill(false));
  const [checked, setChecked] = useListState(Array(imageList.length).fill(false));

  useEffect(() => {
    setChecked.setState(Array(imageList.length).fill(false));
  }, [imageList]);

  const handleHover = (index: number, isHovered: boolean) => {
    setHoverStates.setItem(index, isHovered);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();
    deleteImage(index);
  };

  const handleBulkDelete = () => {
    setImageList(imageList.filter((_, index) => !checked[index]));
  };

  const allChecked = checked.every((value) => value);
  const indeterminate = checked.some((value) => value) && !allChecked;

  return (
    <Stack h="100%">
      <Group w="100%" justify="space-between" px="md">
        {sidebarStudioOpen && (
          <Text size="xl" fw="bold">
            {`Studio (${imageList.length})`}
          </Text>
        )}
        <ActionIcon onClick={() => setSidebarStudioOpen()}>
          {sidebarStudioOpen ? <IconChevronsLeft /> : <IconChevronsRight />}
        </ActionIcon>
      </Group>
      <Divider size="sm" />

      {sidebarStudioOpen && imageList.length > 0 && (
        <Stack justify="space-between" h="100%">
          <Stack px="md">
            {imageList.length > 0 &&
              imageList.map((image, index) => (
                <Flex
                  key={index}
                  p="sm"
                  gap="sm"
                  align="center"
                  style={{
                    borderRadius: '10px',
                    backgroundColor: index === selectedImage ? '#ccc' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  <Checkbox
                    checked={checked[index]}
                    onChange={(e) => {
                      e.stopPropagation();
                      setChecked.setItem(index, e.target.checked);
                    }}
                  />
                  <Image
                    maw={50}
                    mah={50}
                    w="100%"
                    height="100%"
                    src={URL.createObjectURL(image)}
                  />
                  <Group justify="space-between" w="100%" wrap="nowrap">
                    <Text size="sm" lineClamp={2} maw="80%">
                      {image.name}
                    </Text>
                    {hoverStates[index] && (
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon size={20}>
                            <IconDots />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            color="red"
                            leftSection={<IconTrash />}
                            onClick={(e) => handleDelete(e, index)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    )}
                  </Group>
                </Flex>
              ))}
            <Divider size="sm" />
          </Stack>
          <Group px="md" mb="sm">
            <Group px="sm">
              <Checkbox
                label={
                  indeterminate || allChecked
                    ? `${checked.filter((value) => value).length} of ${imageList.length}`
                    : `Select All`
                }
                onChange={(e) =>
                  setChecked.setState(Array(imageList.length).fill(e.target.checked))
                }
                checked={allChecked}
                indeterminate={indeterminate}
              />
            </Group>
            {checked.some((value) => value) && (
              <ActionIcon variant="transparent" onClick={() => handleBulkDelete()}>
                <IconTrash color="red" />
              </ActionIcon>
            )}
          </Group>
        </Stack>
      )}
    </Stack>
  );
}
