import { Button, TextField } from '@mui/material';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import '../css/GptPage.css';
import React, { ChangeEvent } from 'react';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../middleware/axios-interceptor';

interface IPayload {
  message: string;
}

interface IMessage {
  content: string;
  isSender: 1 | 0;
}

const GptPage = () => {

  const navigate = useNavigate();

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
    const res = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/gpt`, { payload })
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

    const messages = axiosInstance.get("/messages").then((res) => {
      setMessages(res["data"]["data"])
    }).catch((err) => {
      console.error("Catch: ", err);
    }).finally(() => {
      setIsLoading(false);
    })

  }

  React.useEffect(() => {
    axiosInstance.get("/messages").then((res) => {
      setMessages(res["data"]["data"])
    }).catch((err) => {
      console.error("Catch: ", err);
    })
  }, [])

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className='gpt-page-container'>
      <div className='dialog-container'>
        <div className='title-container'>
          <div className='title'>
            GPT
          </div>
          <div className='secondary-action'>
            <Button
              id='btn-back'
              onClick={() => handleBack()}
              sx={StyleButtonSecondary}
              disabled={isLoading}
            >
              返回
            </Button>
          </div>
        </div>
        <SquareSpacing spacing={SpacingSize.Medium} />
        <div className='response-container'>
          <div className='notice'>
            <span className='text'>目前只能显示最近的10个消息...</span>
          </div>
          {messages?.map((msg, index) => {
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
              label='(输入一个字发送)'
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
              发送
            </Button>
          </div>
        </div>
        <SquareSpacing spacing={SpacingSize.Large} />
      </div>
    </div>
  );
}

export default GptPage;