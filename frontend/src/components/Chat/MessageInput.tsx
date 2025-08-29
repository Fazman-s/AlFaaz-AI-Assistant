import React, { useState } from 'react';
import { Group, Textarea, ActionIcon, Box } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box 
      p="md" 
      style={{ 
        borderTop: '1px solid #dee2e6', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <Group align="flex-end" gap="md">
        <Textarea
          flex={1}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          autosize
          minRows={1}
          maxRows={5}
          radius="xl"
          styles={{ input: { resize: 'none' } }}
        />
        <ActionIcon
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="xl"
          radius="xl"
          variant="filled"
          color="blue"
        >
          <IconSend size={20} />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default MessageInput;