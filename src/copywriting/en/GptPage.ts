export default function copywritingEn() {

  const titleLabel = 'Assistant';
  const recentMessageLabel = 'Currently, only the recent 10 messages are shown...';
  const sendMessagePrompt = '(Type at least 1 character to begin...)';
  const button = {
    return: 'Back',
    send: 'Send',
    loading: 'typing...',
  }

  return {
    titleLabel,
    recentMessageLabel,
    sendMessagePrompt,
    button,
  };
}