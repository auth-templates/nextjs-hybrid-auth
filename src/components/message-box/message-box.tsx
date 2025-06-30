import { Alert, Text, AlertProps, List } from '@mantine/core';
import { useState } from 'react';
import styles from './message-box.module.css';
import classNames from 'classnames';

export type Message = {
  text: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
};

type MessageBoxProps = AlertProps & {
  /** One or more messages to display */
  messages: Message[];
  /** Overall Alert color (defaults to highest‑priority in messages, or 'info') */
  alertSeverity?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
};

export default function MessageBox({
  messages,
  alertSeverity,
  onClose,
  className,
  ...rest
}: MessageBoxProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  // map our severities to Mantine colors
  const colorMap: Record<string, string> = {
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    success: 'green',
  };

  // determine overall color: explicit prop > first message severity > 'info'
  const overall = alertSeverity
    ?? messages[0]?.severity
    ?? 'info';
  const alertColor = colorMap[overall] || 'blue';

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <Alert
      color={alertColor}
      radius="md"
      withCloseButton
      onClose={handleClose}
      classNames={{ root: classNames(styles.root, className) }}
      {...rest}
    >
      <List size="sm" spacing="xs" classNames={{ root: styles.messageList }}>
        {messages.map((item, idx) => {
          const itemColor = colorMap[item.severity ?? overall] || alertColor;
          return (
            <List.Item key={idx}>
              <Text size="sm" c={itemColor}>
                {item.text}
              </Text>
            </List.Item>
          );
        })}
      </List>
    </Alert>
  );
}
