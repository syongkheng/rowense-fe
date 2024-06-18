export default function copywritingEn() {

  const titleLabel = 'Douyin Livestream Watcher';
  const instructionLabel = 'Account ID can be retrieved from the user\'s profile page as shown:';
  const options: Record<string, any> = {
    title: 'Retrievable Information',
    label: {
      isStreaming: 'Stream Status',
      totalViewership: 'Total Views',
      currentViewership: 'Current No. of Viewers',
      currentLikeCount: 'Current No. of Likes',
    },
    prompt: 'Account ID',
  }
  const response: Record<string, any> = {
    title: 'Retrieved Information',
    nickname: 'Nickname: ',
    userId: 'Unique ID: ',
    secUid: 'Secondary Unique ID: ',
    streamStatus: 'Stream Status: ',
    online: 'Online',
    offline: 'Offline',
    totalViewers: 'Total Views: ',
    currentViewers: 'Current No. of Viewers: ',
    currentLikeCount: 'Current No. of Likes: ',
    notAvailable: 'Not available as stream is offline.',
  }

  const button: Record<string, any> = {
    search: "Search!",
    back: "Back",
  }

  return {
    titleLabel,
    instructionLabel,
    options,
    response,
    button,
  };
}