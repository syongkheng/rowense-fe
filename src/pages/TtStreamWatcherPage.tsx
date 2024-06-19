import { Button, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import '../css/TtStreamWatcherPage.css';
import { Locale, TiktokKey } from '../enums';
import axiosInstance from '../middleware/axios-interceptor';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import { DateUtil } from '../utils/DateUtil';
import LoadingComponent from '../components/loader/LoadingComponent';

interface FormState {
  accountId: string;
  keysToRetrieve: string[];
}

interface TikTokStreamReponse {
  nickname: string,
  userId: string,
  secUid: string,
  uniqueId: string,
  avatarUrl: string,
  followingCount: string,
  followerCount: string,
  isStreaming: boolean | string,
  lastStreamTitle: string,
  lastStreamStartTime: string,
  viewers: string,
  error?: string,
  code?: string,
}

export default function TtStreamWatcherPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const [showResponse, setShowResponse] = React.useState<Record<TiktokKey, boolean>>({
    [TiktokKey.isStreaming]: false,
    [TiktokKey.error]: false,
  });
  const [streamInfo, setStreamInfo] = React.useState<TikTokStreamReponse>({
    nickname: '',
    userId: '',
    secUid: '',
    uniqueId: '',
    avatarUrl: '',
    followingCount: '',
    followerCount: '',
    isStreaming: false,
    lastStreamTitle: '',
    lastStreamStartTime: '',
    viewers: '',
  });
  const [copywriting, setCopywriting] = React.useState({
    loading: true as boolean,
    titleLabel: '',
    instructionLabel: '',
    options: {} as any,
    response: {} as any,
    button: {} as any,
  })

  const [form, setForm] = React.useState<FormState>({
    accountId: '',
    keysToRetrieve: [TiktokKey.isStreaming],
  });

  const [showResponseContent, setShowResponseContent] = React.useState<boolean>(false); // State to control showing response content

  React.useEffect(() => {
    import(`../copywriting/${locale}/TtStreamWatcherPage.ts`).then((module) => {
      const {
        titleLabel,
        instructionLabel,
        options,
        response,
        button,
      } = module.default();
      setCopywriting({
        loading: false,
        titleLabel,
        instructionLabel,
        options,
        response,
        button,
      });
    })
  }, [locale])

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Check if '@' is already at the beginning or if the value is empty
    if (!value.startsWith('@') && value !== '') {
      value = '@' + value; // Prepend '@' if not already present
    }

    setForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: value,
    }));
  }

  const handleSearch = () => {
    if (form.accountId === "") {
      return;
    }
    setLoading(true);
    axiosInstance.post("/api/v1/tt", form)
      .then((res) => {
        const data = res.data.data as TikTokStreamReponse;
        if (Object.keys(data).includes("error")) {
          setShowResponse((prevForm) => ({
            ...prevForm,
            [TiktokKey.error]: true,
          }));
          setStreamInfo((prevForm) => ({
            ...prevForm,
            error: data.code,
          }));
          return;
        }
        setStreamInfo({
          nickname: data.nickname,
          userId: data.userId,
          secUid: data.secUid,
          uniqueId: data.uniqueId,
          avatarUrl: data.avatarUrl,
          followingCount: data.followingCount,
          followerCount: data.followerCount,
          isStreaming: data.isStreaming,
          lastStreamTitle: data.lastStreamTitle,
          lastStreamStartTime: data.lastStreamStartTime,
          viewers: data.viewers,
        });
        Object.keys(data).forEach(key => {
          if (showResponse.hasOwnProperty(key)) {
            setShowResponse(prevShowResponse => ({
              ...prevShowResponse,
              [key]: true,
              [TiktokKey.error]: false,
            }));
          }
        });
      }).catch((err) => {
        console.error("Error: ", err);
      }).finally(() => {
        console.log("SI: ", streamInfo);
        setLoading(false);
        setShowResponseContent(true); // Hide response content on error
      })
  }

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='stream-watcher-page-container'>
        <div className='content-container'>
          <div className='row title-container'>
            <div className='title'>
              {copywriting.titleLabel}
            </div>
            <div>
              <Button
                sx={StyleButtonSecondary}
                onClick={() => handleBack()}
              >
                {copywriting.button.back}
              </Button>
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='row user-options'>
            <div>
              <TextField
                id='accountId'
                label={copywriting.options.prompt}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleTextChange(event)}
                size='small'
              />
            </div>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <div>
              <Button
                sx={StyleButtonPrimary}
                onClick={() => handleSearch()}
              >
                {copywriting.button.search}
              </Button>
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='row'>
            <span className='subtitle'>{copywriting.response.title}</span>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='row response-container'>
            {
              showResponseContent &&  // Conditionally render based on showResponseContent state
              (
                showResponse.error
                  ? (
                    <div>{copywriting.response.error[streamInfo.error ?? 0]}</div>
                  )
                  : (
                    <>
                      <div className='identity-container'>
                        <div className='avatar'>
                          <img src={streamInfo.avatarUrl} height={'100px'} width={'100px'} />
                        </div>
                        <div className='details'>
                          <div className='top'>
                            <div className='left'>
                              <div>
                                <span>{copywriting.response.nickname}{streamInfo.nickname}</span>
                              </div>
                              <div>
                                <span>{copywriting.response.uniqueId}{streamInfo.uniqueId}</span>
                              </div>
                            </div>
                            <div className='right'>
                              <div>
                                <span>{copywriting.response.followingCount}{streamInfo.followingCount}</span>
                              </div>
                              <div>
                                <span>{copywriting.response.followerCount}{streamInfo.followerCount}</span>
                              </div>
                            </div>
                          </div>
                          <div className='bottom'>
                            <div>
                              <span>{copywriting.response.streamStatus}{streamInfo.isStreaming ? copywriting.response.online : copywriting.response.offline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <SquareSpacing spacing={SpacingSize.Small} />
                      <div className='stream-container'>
                        <div>
                          <span>{copywriting.response.lastStreamTitle}{streamInfo.lastStreamTitle === "" ? "\"\"" : streamInfo.lastStreamTitle}</span>
                        </div>
                        <div>
                          <span>{copywriting.response.lastStreamStartTime}{streamInfo.lastStreamStartTime ? DateUtil.convertUnixToDDMMYYYYHHMM(parseInt(streamInfo.lastStreamStartTime)) : 'Unknown'}</span>
                        </div>
                        <div>
                          <span>{copywriting.response.lastRecordedViewers}{streamInfo.viewers}</span>
                        </div>
                        <div>
                        </div>
                      </div>
                    </>
                  )
              )
            }
          </div>
        </div>
      </div>
      <Footer />
      <LoadingComponent show={loading} />
    </>
  )
}
