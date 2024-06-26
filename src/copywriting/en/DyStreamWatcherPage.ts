export default function copywritingEn() {

  const titleLabel = 'Douyin Livestream Watcher';
  const instructionLabel = 'Usage';
  const instruction: Record<string, any> = {
    stepOne: 'Account ID can be retrieved as shown: ',
  }
  const options: Record<string, any> = {
    prompt: 'Account ID',
  }
  const response: Record<string, any> = {
    title: 'Response',
    roomStatus: 'Stream Status',
    online: 'Online',
    offline: 'Offline',
    currentLikeCount: 'Likes(Current): ',
    totalViewerCount: 'Viewers(Total): ',
    currentViewerCount: 'Viewers(Current): ',
  }

  const button: Record<string, any> = {
    search: "Search!",
    back: "Back",
  }

  return {
    titleLabel,
    instructionLabel,
    instruction,
    options,
    response,
    button,
  };
}