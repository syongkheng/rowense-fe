import { Button, TextField } from '@mui/material';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import '../css/GptPage.css';
import React, { ChangeEvent } from 'react';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../middleware/axios-interceptor';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import { Locale } from '../enums';

interface IPayload {
  message: string;
}

interface IMessage {
  created_dt: string | number | Date;
  content: string;
  isSender: 1 | 0;
}

const GptPage = () => {

  const navigate = useNavigate();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const [copywriting, setCopywriting] = React.useState({
    titleLabel: '',
    recentMessageLabel: '',
    sendMessagePrompt: '',
    button: {} as any, 
  });

  React.useEffect(() => {
    import(`../copywriting/${locale}/GptPage.ts`).then((module) => {
      const {
        titleLabel,
        recentMessageLabel,
        sendMessagePrompt,
        button,
      } = module.default();
      setCopywriting({
        titleLabel,
        recentMessageLabel,
        sendMessagePrompt,
        button,
      });
    })
  }, [locale])


  const [payload, setPayload] = React.useState<IPayload>({
    message: ''
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<IMessage[]>([]);

  function isPayloadMessageEmpty() {
    return payload.message.length < 1
  }

  function isButtonDisabled() {
    return isPayloadMessageEmpty() || isLoading;
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPayload((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }))
  }

  const handleSendRequest = async () => {
    await setIsLoading(true);
    await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/gpt`, { payload })
      .then((res) => {
        console.log("Test:", res["data"]["data"])
      }).catch((err) => {
        console.log("Catch: ", err);
      }).finally(() => {

        setPayload((prevForm) => ({
          ...prevForm,
          message: '',
        }))
      })

    axiosInstance.get("/api/messages").then((res) => {
      setMessages(res["data"]["data"])
    }).catch((err) => {
      console.error("Catch: ", err);
    }).finally(() => {
      setIsLoading(false);
    })

  }

  React.useEffect(() => {
    axiosInstance.get("/api/messages").then((res) => {
      setMessages(res["data"]["data"])
    }).catch((err) => {
      console.error("Catch: ", err);
    })
  }, [])

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='gpt-page-container'>
        <div className='dialog-container'>
          <div className='title-container'>
            <div className='title'>
              {copywriting.titleLabel}
            </div>
            <div className='secondary-action'>
              <Button
                id='btn-back'
                onClick={() => handleBack()}
                sx={StyleButtonSecondary}
                disabled={isLoading}
              >
                {copywriting.button.return}
              </Button>
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='response-container'>
            <div className='notice'>
              <span className='text'>{copywriting.recentMessageLabel}</span>
            </div>
            {messages.length > 0 && messages?.sort((a: IMessage, b: IMessage) => new Date(a.created_dt).getTime() - new Date(b.created_dt).getTime())
              .map((msg, index) => {
                return (
                  <div key={index} className={`message-container-anchor${msg.isSender ? ' rr' : ''}`}>
                    <div className='message-container'>
                      <span className='message'>
                        {msg.isSender ? null : 'GPT: '}{msg.content}
                      </span>
                    </div>
                  </div>
                )
              })}

          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='request-container'>
            <div className='form'>
              <TextField
                id='message'
                fullWidth
                size='small'
                label={copywriting.sendMessagePrompt}
                value={payload?.message ?? ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                autoComplete="off"
              />
            </div>
            <div className='action'>
              <Button
                id="btn-send"
                onClick={() => handleSendRequest()}
                sx={StyleButtonPrimary}
                disabled={isButtonDisabled()}
              >
                {copywriting.button.send}
              </Button>
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Large} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GptPage;