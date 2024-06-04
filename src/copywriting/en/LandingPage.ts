import { ISectionInfo } from "../../models/copywriting/LandingPage.model";

export default function copywritingLandingPageEn() {

  const sectionInfo: ISectionInfo[] = [
    {
      title: 'Services',
      version: '',
      description: 'Livestream Watcher services are capped at 10 requests per minute.',
    },
    {
      title: 'TikTok Livestream Watcher',
      version: 'v0.0.0-beta',
      description: 'Find out if your favourite TIKTOK streamer is currently online and relevant data!',
    },
    {
      title: 'Douyin Livestream Watcher',
      version: 'v0.0.0-beta',
      description: 'Find out if your favourite DOUYIN streamer is currently online and relevant data!',
    },
    {
      title: 'Assistant',
      version: 'v0.0.0-beta',
      description: 'Chat with a virtual assistant powered by OpenAI\'s GPT.',
    },
  ]

  const buttonLabel = 'Try Now!';

  return { sectionInfo, buttonLabel };
}