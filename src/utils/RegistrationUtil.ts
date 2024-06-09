import { Locale } from "../enums";
import { IRegisterForm } from "../pages/RegisterPage";

export namespace RegistrationUtil {


  export async function validateForm(form: IRegisterForm, locale: Locale): Promise<string[]> {
    return new Promise<string[]>(async (resolve, _) => {
      const errorList: string[] = [];
      await import(`../copywriting/${locale}/RegisterValidation.ts`).then((module) => {
        const {
          username,
          password,
          confirmPassword
        } = form;
        const {
          usernameAlphanumericLabel,
          minimumCharacterLabel,
          smallLetterLabel,
          capitalLetterLabel,
          numberLabel,
          matchLabel,
        } = module.default();
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
          errorList.push(usernameAlphanumericLabel);
        }
        if (password.length < 8) {
          errorList.push(minimumCharacterLabel);
        }
        if (!password.match(/[a-z]+/)) {
          errorList.push(smallLetterLabel);
        }
        if (!password.match(/[A-Z]+/)) {
          errorList.push(capitalLetterLabel);
        }
        if (!password.match(/[0-9]+/)) {
          errorList.push(numberLabel);
        }
        if (password !== confirmPassword) {
          errorList.push(matchLabel);
        }
      })
      resolve(errorList);
    })
  }

}