import "../css/RegisterPage.css";
import React, { ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import { StyleButtonPrimary } from "../styling/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../middleware/axios-interceptor";
import Header from "../components/header/Header";
import { Locale } from "../enums";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import Footer from "../components/footer/Footer";
import { RegistrationUtil } from "../utils/RegistrationUtil";
import { FormUtil } from "../utils/FormUtil";
import ModalComponent, { IModalComponent, IModalContent } from "../components/modal/ModalComponent";


export interface IRegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterPage() {

  const navigate = useNavigate();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<IModalContent>();

  const [copywriting, setCopywriting] = React.useState({
    titleLabel: '',
    usernameFieldLabel: '',
    passwordFieldLabel: '',
    confirmPasswordFieldLabel: '',
    buttonLabel: '',
    existingAccountLabel: '',
    modal: {} as any,

  })

  React.useEffect(() => {
    import(`../copywriting/${locale}/RegisterPage.ts`).then((module) => {
      const {
        titleLabel,
        usernameFieldLabel,
        passwordFieldLabel,
        confirmPasswordFieldLabel,
        buttonLabel,
        existingAccountLabel,
        modal,
      } = module.default();
      setCopywriting({
        titleLabel,
        usernameFieldLabel,
        passwordFieldLabel,
        confirmPasswordFieldLabel,
        buttonLabel,
        existingAccountLabel,
        modal,
      });
    })
    const changeErrorLanguage = async () => {
      const errorList: string[] = await RegistrationUtil.validateForm(registerForm, locale as Locale);
      if (errorList.length === 0) {
        setFormErrors([]);
      } else {
        setFormErrors(errorList);
      }
    }
    if (!FormUtil.isFormEmpty(registerForm)) {
      changeErrorLanguage();
    }
  }, [locale])

  const [registerForm, setRegisterForm] = React.useState<IRegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
  })

  React.useEffect(() => {
    RegistrationUtil.validateForm(registerForm, locale as Locale);
  }, [registerForm])

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleRegister = async () => {
    const errorList: string[] = await RegistrationUtil.validateForm(registerForm, locale as Locale);
    if (errorList.length === 0) {
      setFormErrors([]);
      await axiosInstance.post(`/api/auth/register`, registerForm)
        .then((_) => {
          setShowRegistrationModal(true);
          setModalContent({
            title: copywriting.modal.success.title,
            bodyContent: copywriting.modal.success.content,
            successButtonLabel: copywriting.modal.success.buttonLabel,
            cancelButtonLabel: copywriting.modal.cancelButtonLabel,
            onSuccessHandler: handleRegisterSuccess,
          })
        }).catch((err) => {
          const customStatusCode: number = err.response.data.code;
          if (customStatusCode === 409) {
            setShowRegistrationModal(true);
            setModalContent({
              title: copywriting.modal.failure.title,
              bodyContent: copywriting.modal.failure.existingUsernameContent,
              successButtonLabel: copywriting.modal.failure.buttonLabel,
              cancelButtonLabel: copywriting.modal.cancelButtonLabel,
              onSuccessHandler: () => setShowRegistrationModal(false),
            })
          }
        })
    } else {
      setFormErrors(errorList);
    }
  }

  const handleRegisterSuccess = () => {
    navigate("/login");
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className="landing-page-container">
        <div className="login-modal">
          <div className="title-container">
            <span className="title-text">
              {copywriting?.titleLabel}
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div>
            <TextField
              id="username"
              label={copywriting?.usernameFieldLabel}
              onBlur={() => { console.log("Check if username exists;") }}
              size="small"
              fullWidth
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
              autoComplete="off"
            />
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div>
            <TextField
              id="password"
              label={copywriting?.passwordFieldLabel}
              size="small"
              fullWidth
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
              autoComplete="off"
            />
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div>
            <TextField
              id="confirmPassword"
              label={copywriting?.confirmPasswordFieldLabel}
              size="small"
              fullWidth
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
              autoComplete="off"
            />
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className="login-button-container">
            <Button
              id="btn-register"
              onClick={() => handleRegister()}
              sx={StyleButtonPrimary}
            >
              {copywriting?.buttonLabel}
            </Button>
          </div>
        </div>
        {
          formErrors?.length > 0 && formErrors?.map((error, index) => {
            return (
              <div className="form-errors" key={index}>
                {error}
              </div>
            )
          })
        }
      </div>
      <Footer />
      <ModalComponent
        show={showRegistrationModal}
        setShow={setShowRegistrationModal}
        title={modalContent?.title}
        bodyContent={modalContent?.bodyContent}
        onSuccessHandler={modalContent?.onSuccessHandler}
        successButtonLabel={modalContent?.successButtonLabel}
        cancelButtonLabel={modalContent?.cancelButtonLabel}
      />
    </>
  );
}

