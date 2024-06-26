export default function copywritingEn() {

  const titleLabel = 'Tiktok Livestream Watcher';
  const instructionLabel = 'Usage';
  const instructionStepOne = 'Enter the account\'s handler (@xxx)';
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
    userId: 'User ID: ',
    uniqueId: 'Unique ID: ',
    secUid: 'Secondary Unique ID: ',
    streamStatus: 'Stream Status: ',
    online: 'Online',
    offline: 'Offline',
    currentLikeCount: 'Current No. of Likes: ',
    followingCount: 'Followings: ',
    followerCount: 'Followers: ',
    lastStreamTitle: 'Latest livestream title: ',
    lastStreamStartTime: 'Start(SGT): ',
    lastRecordedViewers: 'Viewers: ',
    error: {
      1: "User has never streamed before.",
    },
    notAvailable: 'Not available as stream is offline.',
  }

  const button: Record<string, any> = {
    search: "Search!",
    back: "Back",
  }

  return {
    titleLabel,
    instructionLabel,
    instructionStepOne,
    options,
    response,
    button,
  };
}