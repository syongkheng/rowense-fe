export default function copywritingCn() {

  const titleLabel = '抖音直播间观察者';
  const instructionLabel = '说明';
  const instruction: Record<string, any> = {
    stepOne: '账号ID能以图里获取: ',
  }
  
  const options: Record<string, any> = {
    prompt: '账号ID',
  }

  const response: Record<string, any> = {
    title: '回应',
    roomStatus: '直播间状况',
    online: '正在直播',
    offline: '不在线',
    currentLikeCount: '目前点赞量: ',
    totalViewerCount: '观看人数(累计): ',
    currentViewerCount: '观看人数(目前): ',
  }

  const button: Record<string, any> = {
    search: "搜索!",
    back: "返回",
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
