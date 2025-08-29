import { MantineProvider, AppShell, Alert, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Header from './components/Layout/Header';
import ChatContainer from './components/Chat/ChatContainer';
import MessageInput from './components/Chat/MessageInput';
import { useChat } from './hooks/useChat';

// Create a custom theme for a consistent look and feel
const theme = createTheme({
  fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  primaryColor: 'blue',
});

function App() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AppShell
        header={{ height: 70 }}
        padding="0"
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <AppShell.Header>
          <Header onClearChat={clearChat} />
        </AppShell.Header>

        <AppShell.Main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', background: 'transparent' }}>
          {error && (
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              color="red" 
              variant="light"
              withCloseButton
              style={{ margin: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              {error}
            </Alert>
          )}
          
          <ChatContainer messages={messages} isLoading={isLoading} />
          <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
