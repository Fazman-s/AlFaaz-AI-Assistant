import { Group, Title, Button, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface HeaderProps {
  onClearChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearChat }) => {
  return (
    <Group 
      justify="space-between" 
      h="100%" 
      px="md"
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div>
        <Title order={2} c="blue.7">AlFaaz</Title>
        <Text size="sm" c="dimmed">Arz ki Jiye</Text>
      </div>
      <Button
        variant="light"
        color="red"
        leftSection={<IconTrash size={16} />}
        onClick={onClearChat}
      >
        Clear Chat
      </Button>
    </Group>
  );
};

export default Header;