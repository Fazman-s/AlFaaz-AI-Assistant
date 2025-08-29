import React from 'react';
import { Box, Group, Text, Loader } from '@mantine/core';

const TypingIndicator: React.FC = () => {
  return (
    <Box p="md" style={{ maxWidth: 300 }}>
      <Group gap="xs">
        <Loader size="xs" />
        <Text size="sm" c="dimmed">AI is typing...</Text>
      </Group>
    </Box>
  );
};

export default TypingIndicator;