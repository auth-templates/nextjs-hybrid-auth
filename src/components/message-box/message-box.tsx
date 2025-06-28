import { Alert, Text, AlertProps } from '@mantine/core';
import { useState } from 'react';
import styles from './message-box.module.css';
import { ValidationErrorItem } from '@/api/generated';

export type Message = {
    message?: string
    type?: 'info' | 'error';
}

type MessageBoxProps = AlertProps & {
  message: Message | ValidationErrorItem[];
  type?: 'info' | 'error' | 'warning';
  onClose?: () => void;
}

export default function MessageBox({ message, type = 'info', onClose, className, ...rest }: MessageBoxProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Map 'warning' to a Mantine-supported color or fallback to 'yellow'
  const colorMap: Record<string, string> = {
    error: 'red',
    info: 'blue',
    warning: 'yellow',
  };

  const color = colorMap[type] || 'blue';

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const renderMessages = () => {
    if (Array.isArray(message)) {
      return (
        <ul className={styles.messageList}>
          {message.map((item, idx) => (
            <li key={idx}>
              <Text size="sm">{item.message}</Text>
            </li>
          ))}
        </ul>
      );
    }
    return (
        <Text size="sm">{message.message}</Text>
    );
  };

  return (
    <Alert
      color={color}
      radius="md"
      p="md"
      icon={null}
      withCloseButton
      onClose={handleClose}
      {...rest}
    >
      {renderMessages()}
    </Alert>
  );
}
