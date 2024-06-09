import "../css/LoginPage.css";
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


interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {

  const navigate = useNavigate();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);

  const [copywriting, setCopywriting] = React.useState({
    title: '',
    usernameField: '',
    passwordField: '',
    buttonLabel: '',
    registerLabel: '',
  })

  React.useEffect(() => {
    import(`../copywriting/${locale}/LoginPage.ts`).then((module) => {
      const { titleLabel, usernameFieldLabel, passwordFieldLabel, buttonLabel, registerLabel  } = module.default();
      setCopywriting({
        title: titleLabel,
        usernameField: usernameFieldLabel,
        passwordField: passwordFieldLabel,
        buttonLabel: buttonLabel,
        registerLabel: registerLabel,
      });
    })
  }, [locale])

  const [loginForm, setLoginForm] = React.useState<ILoginForm>({
    username: '',
    password: '',
  })

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleLogin = async () => {
    const response = await axiosInstance.post(`/api/auth/login`, loginForm)
      .then((res) => {
        const jwt = res["data"]["data"];
        AppStorageUtil.setSession(AppStorageUtil.Keys.Jwt, jwt);
        navigate("/home");
      }).catch((err) => {
        console.log("Catch: ", JSON.stringify(err));
      });

    console.log("My resposne is: ", response);
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className="landing-page-container">
        <div className="login-modal">
          <div className="title-container">
            <span className="title-text">
              {copywriting?.title}
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div>
            <TextField
              id="username"
              label={copywriting?.usernameField}
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
              label={copywriting?.passwordField}
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
              id="btn-login"
              onClick={() => handleLogin()}
              sx={StyleButtonPrimary}
            >
              {copywriting?.buttonLabel}
            </Button>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='register-container'>
            <a onClick={() => handleRegister()}>{copywriting?.registerLabel}</a>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}
