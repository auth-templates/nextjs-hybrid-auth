import { LoadingOverlay, LoadingOverlayProps, useMantineColorScheme  } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

type AppLoadingOverlayProps = LoadingOverlayProps & {
  visible?: boolean;
  zIndex?: number;
};

export default function CustomLoadingOverlay({ visible, zIndex = 1000, ...rest }: AppLoadingOverlayProps) {
  const colorScheme = useColorScheme();
   
  const overlayColor = colorScheme === 'dark'
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(255, 255, 255, 0.3)';

  return (
    <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3, color: overlayColor }}
        transitionProps={{
            duration: 1000,
            exitDelay: 500,
        }}
        {...rest}
    />
  );
}
