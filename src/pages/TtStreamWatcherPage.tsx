import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import LoadingComponent from '../components/loader/LoadingComponent';
import TtProfileResponse from '../components/response/TtProfileResponse';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import '../css/TtStreamWatcherPage.css';
import { Locale, TiktokKey } from '../enums';
import axiosInstance from '../middleware/axios-interceptor';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import ModalComponent from '../components/modal/ModalComponent';

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
  profileUrl: string,
  streamUrl: string,
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
  const [streamInfo, setStreamInfo] = React.useState<TikTokStreamReponse>({
    nickname: '',
    userId: '',
    secUid: '',
    uniqueId: '',
    avatarUrl: '',
    profileUrl: '',
    streamUrl: '',
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
    instructionStepOne: '',
    options: {} as any,
    response: {} as any,
    button: {} as any,
  })

  const [form, setForm] = React.useState<FormState>({
    accountId: '',
    keysToRetrieve: [TiktokKey.isStreaming],
  });

  const [showResponse, setShowResponse] = React.useState<boolean>(false); // State to control showing response content
  const [showError, setShowError] = React.useState<boolean>(false);
  const [showInstruction, setShowInstruction] = React.useState<boolean>(false);

  React.useEffect(() => {
    import(`../copywriting/${locale}/TtStreamWatcherPage.ts`).then((module) => {
      const {
        titleLabel,
        instructionLabel,
        instructionStepOne,
        options,
        response,
        button,
      } = module.default();
      setCopywriting({
        loading: false,
        titleLabel,
        instructionLabel,
        instructionStepOne,
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
    setShowResponse(false);
    setShowError(false);
    axiosInstance.post("/api/v1/tt", form)
      .then((res) => {
        const data = res.data.data as TikTokStreamReponse;
        if (Object.keys(data).includes("error")) {
          setStreamInfo((prevForm) => ({
            ...prevForm,
            error: data.code,
          }));
          setShowError(true);
          return;
        }
        setStreamInfo({
          nickname: data.nickname,
          userId: data.userId,
          secUid: data.secUid,
          uniqueId: data.uniqueId,
          avatarUrl: data.avatarUrl,
          profileUrl: data.profileUrl,
          streamUrl: data.streamUrl,
          followingCount: data.followingCount,
          followerCount: data.followerCount,
          isStreaming: data.isStreaming,
          lastStreamTitle: data.lastStreamTitle,
          lastStreamStartTime: data.lastStreamStartTime,
          viewers: data.viewers,
        });
        setShowResponse(true);
      }).catch((err) => {
        console.error("Error: ", err);
        setShowError(true);
      }).finally(() => {
        console.log("SI: ", streamInfo);
        setLoading(false);
      })
  }

  const handleBack = () => {
    navigate(-1);
  }

  const handleUsage = () => {
    setShowInstruction(true);
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='page-container'>
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
            <div>
              <span className='instruction-label vertical-center hyperlink' onClick={() => handleUsage()}>
                {copywriting.instructionLabel}
                {<ArrowRightAltIcon />}
              </span>
            </div>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          {
            showResponse || showError &&
            <div className='row'>
              <span className='subtitle'>{copywriting.response.title}</span>
            </div>
          }
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='response-container-min-height'>
            {
              showResponse &&
              <TtProfileResponse
                copywriting={copywriting}
                streamInfo={streamInfo}
              />
            }

            {
              showError &&
              <div>
                {streamInfo.error
                  ? copywriting.response.error[streamInfo.error]
                  : 'An unexpected error has occured. Please try again.'}
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
      <ModalComponent
        show={showInstruction}
        setShow={setShowInstruction}
        title={copywriting.instructionLabel}
        bodyContent={[
         copywriting.instructionStepOne,
        ]}
        cancelButtonOnly
      />
      <LoadingComponent show={loading} />
    </>
  )
}
