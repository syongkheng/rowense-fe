
export default function copywritingEn() {

  const titleLabel = 'Create New Account,';
  const usernameFieldLabel = 'Username';
  const passwordFieldLabel = 'Password';
  const confirmPasswordFieldLabel = 'Confirm Password';
  const buttonLabel = 'Register';
  const existingAccountLabel = 'Have an existing account? Login';
  const modal: Record<string, any> = {
    success: {
      title: 'Registration Successful',
      content: ['Account has been created successfully', 'Please login'],
      buttonLabel: 'Login',
      },
      failure: {
        title: 'Registration Failed',
        existingUsernameContent: ['Username has been taken.', 'Please use another username.'],
        buttonLabel: 'Try Again',
    },
    cancelButtonLabel: 'Cancel'
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