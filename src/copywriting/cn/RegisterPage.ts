
export default function copywritingCn() {

  const titleLabel = '创新账号,';
  const usernameFieldLabel = '账号ID';
  const passwordFieldLabel = '密码';
  const confirmPasswordFieldLabel = '确认密码';
  const buttonLabel = '创新';
  const existingAccountLabel = '已有用户? 登陆';
  const modal: Record<string, any> = {
    success: {
      title: '成功',
      content: ['账号已创新', '请登录'],
      buttonLabel: '登录',
    },
    failure: {
      title: '失败',
      existingUsernameContent: ['ID已存在, 请重新设置'],
      buttonLabel: '重新尝试',
    },
    cancelButtonLabel: '返回',
  }
  return {
    titleLabel,
    usernameFieldLabel,
    passwordFieldLabel,
    confirmPasswordFieldLabel,
    buttonLabel,
    existingAccountLabel,
    modal,
  };
}