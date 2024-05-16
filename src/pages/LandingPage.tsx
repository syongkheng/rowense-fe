import "../css/LandingPage.css";
import React, { ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import SquareSpacing from "../components/spacing/SquareSpacing";
import { SpacingSize } from "../components/spacing/SquareSpacing.enum";
import { StyleButtonPrimary } from "../styling/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../middleware/axios-interceptor";


interface ILoginForm {
  username: string;
  password: string;
}
export default function LandingPage() {

  const navigate = useNavigate();

  const [loginForm, setLoginForm] = React.useState<ILoginForm>({
    username: '',
    password: '',
  })

  const [status, setStatus] = React.useState<string>("目前没有");

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleLogin = async () => {
    setStatus("正在尝试登入")
    const response = await axiosInstance.post(`/login`, loginForm)
      .then((res) => {
        console.log("Then: ", res);
        const jwt = res["data"]["data"];
        window.sessionStorage.setItem("jwt", jwt);
        navigate("/home");
        setStatus("成功")
      }).catch((err) => {
        console.log("Catch: ", JSON.stringify(err));
        setStatus(JSON.stringify(err));

      });

    console.log("My resposne is: ", response);
  }

  return (
    <>
      <div className="landing-page-container">
        <div className="login-modal">
          <div className="title-container">
            <span className="title-text">
              请登入
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div>
            <TextField
              id="username"
              label="账号 ID"
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
              label="密码"
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
              登入
            </Button>
          </div>
          <span className="error-message">报错：{status}</span>

        </div>
      </div>
    </>
  );
}

