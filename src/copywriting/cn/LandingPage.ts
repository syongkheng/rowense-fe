import { ISectionInfo } from "../../models/copywriting/LandingPage.model";

export default function copywritingCn() {

  const sectionInfo: ISectionInfo[] = [
    {
      title: '功能',
      version: '',
      description: '直播间观察者一分钟只能发送十次的询问。',
    },
    {
      title: 'TikTok直播间观察者',
      version: 'v0.0.0-beta',
      description: '查看您喜欢的TikTok主播是否正在直播和相关数据!',
    },
    {
      title: '抖音直播间观察者',
      version: 'v0.0.0-beta',
      description: '查看您喜欢的抖音主播是否正在直播和相关数据!',
    },
    {
      title: '助手',
      version: 'v0.0.0-beta',
      description: '和您私人虚拟助理聊天。',
    },
  ]
  const buttonLabel = '立马体验!';

  return { 
    sectionInfo, 
    buttonLabel 
  };
}