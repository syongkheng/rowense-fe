export default function copywritingEn() {

  const titleLabel = 'Tiktok Livestream Watcher';
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
    lastStreamStartTime: 'Latest livestream start time (GMT + 8): ',
    lastRecordedViewers: 'Latest viewer count: ',
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
    options,
    response,
    button,
  };
}