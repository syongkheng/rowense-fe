export default function copywritingCn() {

  const titleLabel = '抖音直播间观察者';
  const instructionLabel = '账号ID可以从用户主页获取,请看图片:';
  const options: Record<string, any> = {
    title: '可获取的资料',
    label: {
      isStreaming: '直播间是否在线',
      totalViewership: '总观看数',
      currentViewership: '在线观看数',
      currentLikeCount: '真时点赞量',
    },
    prompt: '账号ID',
  }
  const response: Record<string, any> = {
    title: '获取到的资料',
    nickname: '账号名: ',
    userId: '独特ID: ',
    secUid: '备用独特ID: ',
    streamStatus: '直播间是否在线: ',
    online: '在线',
    offline: '不在线',
    totalViewers: '总观看数: ',
    currentViewers: '在线观看数: ',
    currentLikeCount: '真时点赞量: ',
    notAvailable: '直播间不在线,数据暂时不能获取',
  }

  const button: Record<string, any> = {
    search: "搜索!",
    back: "返回",
  }


  return {
    titleLabel,
    instructionLabel,
    options,
    response,
    button,
  };
}
