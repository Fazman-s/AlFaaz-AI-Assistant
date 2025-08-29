import React, { useEffect, useRef } from 'react';
import { Container, Stack, Paper, Text, Box, ThemeIcon, Title } from '@mantine/core';
import { IconMessageChatbot } from '@tabler/icons-react';
import { Message } from '../../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Box 
      style={{ 
        flex: 1, 
        overflowY: 'auto', 
        background: 'transparent',
        padding: '1rem' 
      }}
    >
      <Container size="lg" h="100%">
        {messages.length === 0 ? (
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Paper p="xl" shadow="sm" radius="lg" withBorder style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <ThemeIcon size="xl" radius="xl" variant="light" mb="md">
                <IconMessageChatbot size={32} />
              </ThemeIcon>
              <Title order={3} mb="sm">Welcome to AlFaaz!</Title>
              <Text c="dimmed">What can I help with?</Text>
            </Paper>
          </Box>
        ) : (
          <Stack gap="md">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </Stack>
        )}
        <div ref={messagesEndRef} />
      </Container>
    </Box>
  );
};

export default ChatContainer;