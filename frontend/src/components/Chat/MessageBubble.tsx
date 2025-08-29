import React from 'react';
import { Paper, Text, Group, Box } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Message } from '../../types/chat';
import './MessageBubble.css'; // Import the new CSS file

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <Group
      justify={isUser ? 'flex-end' : 'flex-start'}
      mb="md"
      style={{ width: '100%' }}
    >
      <Paper
        p="md"
        shadow="md"
        style={{
          maxWidth: '70%',
          backgroundColor: isUser ? '#1971c2' : '#ffffff',
          color: isUser ? 'white' : 'inherit',
          borderRadius: isUser ? '1.2rem 1.2rem 0.2rem 1.2rem' : '1.2rem 1.2rem 1.2rem 0.2rem',
        }}
      >
        {/* Conditionally render based on the sender */}
        {isUser ? (
          <Text size="sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {message.text}
          </Text>
        ) : (
          <Box className="markdown-content">
             <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.text}</ReactMarkdown>
          </Box>
        )}

        <Text
          size="xs"
          c={isUser ? 'blue.1' : 'dimmed'}
          mt={8}
          ta="right"
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Paper>
    </Group>
  );
};

export default MessageBubble;