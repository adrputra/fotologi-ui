import { Player } from '@lordicon/react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { useRef } from 'react';
import ICON from '@/assets/icon/camera-logo.json';

export function HomePage() {
    const playerRef = useRef<Player>(null);
  
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Player ref={playerRef} icon={ICON} size={50}/>

    </>
  );
}
