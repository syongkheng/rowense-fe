import "../css/HomePage.css";
import { Button } from '@mui/material';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { AppStorageUtil } from "../utils/AppStorageUtil";
import React from "react";
import { Locale } from "../enums";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

interface ICustomPayload {
  username: string;
  iat: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const token = AppStorageUtil.getSession(AppStorageUtil.Keys.Jwt) ?? ''
  const { username } = jwtDecode(token) as ICustomPayload;
  const [copywriting, setCopywriting] = React.useState({
    titleLabel: '',
    subtitleLabel: '',
    comingSoonLabel: '',
    service: {} as any,
    button: {} as any,
  })

  React.useEffect(() => {
    import(`../copywriting/${locale}/HomePage.ts`).then((module) => {
      const {
        titleLabel,
        subtitleLabel,
        comingSoonLabel,
        service,
        button,
      } = module.default();
      setCopywriting({
        titleLabel,
        subtitleLabel,
        comingSoonLabel,
        service,
        button,
      });
    })
  }, [locale])

  const handleGpt = async () => {
    navigate("/gpt");
  }

  const handleTiktokStreamWatcher = () => {
    navigate("/tt-stream-watch");
  }
  const handleDouyinStreamWatcher = () => {
    navigate("/dy-stream-watch");
  }


  return (
    <>
      <Header setLocale={setLocale} />
      <div className='page-container'>
        <div className='menu'>
          <div className='title-container'>
            <div className="info-box">
              <span className='title'>
                {copywriting.titleLabel} {username},
              </span>
              <br />
              <span className='description'>
                {copywriting.subtitleLabel}
              </span>
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
              {copywriting.service.gpt}
            </Button>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className='action'>
            <Button
              id="gpt"
              onClick={() => handleTiktokStreamWatcher()}
              fullWidth
              sx={StyleButtonPrimary}
            >
              {copywriting.service.tiktokStreamWatcher}
            </Button>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className='action'>
            <Button
              id="gpt"
              onClick={() => handleDouyinStreamWatcher()}
              fullWidth
              sx={StyleButtonPrimary}
            >
              {copywriting.service.douyinStreamWatcher}
            </Button>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
          <div className='coming-soon-container'>
            <div className='coming-soon'>
              {copywriting.comingSoonLabel}
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
