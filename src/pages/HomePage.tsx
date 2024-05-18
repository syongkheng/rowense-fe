import "../css/HomePage.css";
import { Button } from '@mui/material';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { StyleButtonSecondary } from "../styling/ButtonSecondary";

interface ICustomPayload {
  username: string;
  iat: number;
}

const HomePage = () => {
  const navigate = useNavigate();

  const token = window.sessionStorage.getItem("jwt") as string ?? '';
  const { username } = jwtDecode(token) as ICustomPayload;

  const handleGpt = async () => {
    navigate("/gpt");
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem("jwt");
    navigate("/");
  }

  return (
    <div className='home-page-container'>
      <div className='menu'>
        <div className='title-container'>
          <div className="info-box">
            <span className='title'>
              欢迎 {username},
            </span>
            <br />
            <span className='description'>
              以下请选一
            </span>
          </div>
          <div className="actions">
            <Button
              id="logout"
              onClick={() => handleLogout()}
              fullWidth
              sx={StyleButtonSecondary}
            >
              退出账号
            </Button>
          </div>
        </div>
        <SquareSpacing spacing={SpacingSize.Large} />
        <div className='action'>
          <Button
            id="gpt"
            onClick={() => handleGpt()}
            fullWidth
            sx={StyleButtonPrimary}
          >
            GPT
          </Button>
        </div>
        <SquareSpacing spacing={SpacingSize.Large} />
        <div className='coming-soon-container'>
          <div className='coming-soon'>
            {"待更新 :)"}
          </div>
        </div>
        <SquareSpacing spacing={SpacingSize.Large} />
      </div>
    </div>
  );
}

export default HomePage;