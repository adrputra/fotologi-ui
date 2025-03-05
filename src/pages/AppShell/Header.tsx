import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import { AspectRatio, Group, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import ICON from '@/assets/icon/camera-logo.json';
import LanguageIcon from './LanguageIcon';
import ProfileMenu from './ProfileMenu';
import ThemeButton from './ThemeButton';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const theme = useMantineTheme();
  const playerRef = useRef<Player>(null);
  const dashboardHover = useHover();
  const studioHover = useHover();
  const navigate = useNavigate();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  }, []);

  return (
    <Group justify="space-between" mx={18}>
      <Group>
        <Group>
          <AspectRatio ratio={50 / 50} maw={50} ml={20} mt={5} my="auto">
            <Player ref={playerRef} icon={ICON} size={50} />
          </AspectRatio>
          <Group pt={5}>
            <Group
              ref={dashboardHover.ref}
              style={{
                borderRadius: '5px',
                backgroundColor: dashboardHover.hovered ? theme.colors.primary[8] : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/dashboard')}
            >
              <Text size="lg" fw={900} p='xs'>
                Dashboard
              </Text>
            </Group>
            <Group
              ref={studioHover.ref}
              style={{
                borderRadius: '5px',
                backgroundColor: studioHover.hovered ? theme.colors.primary[8] : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/studio')}
            >
              <Text size="lg" fw={900} p='xs'>
                Studio
              </Text>
            </Group>
          </Group>
        </Group>
      </Group>
      <Group>
        <LanguageIcon />
        <ThemeButton />
        <ProfileMenu />
      </Group>
    </Group>
  );
}
