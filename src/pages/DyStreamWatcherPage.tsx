import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import '../css/DyStreamWatcherPage.css';
import { DouyinKey, Locale } from '../enums';
import axiosInstance from '../middleware/axios-interceptor';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import DyProfileResponse from '../components/response/DyProfileResponse';
import LoadingComponent from '../components/loader/LoadingComponent';
import ModalComponent from '../components/modal/ModalComponent';
import SamplePhoto from '../assets/sample-dy-account-id.png';

interface FormState {
  accountId: string;
  keysToRetrieve: string[];
}

interface DouyinStreamReponse {
  avatarUrl: string;
  profileUrl: string;
  streamUrl: string;
  currentLikeCount?: string;
  currentViewership?: string;
  isStreaming?: boolean | string;
  nickname: string;
  secUid: string;
  totalViewership?: string;
  userId: string;
}

/**
 * Page for fetching and rendering the results of Douyin livestream status.
 * @returns 
 */
export default function DyStreamWatcherPage() {
  const navigate = useNavigate();
  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const [streamInfo, setStreamInfo] = React.useState<DouyinStreamReponse>({
    avatarUrl: '',
    profileUrl: '',
    streamUrl: '',
    currentLikeCount: '',
    currentViewership: '',
    isStreaming: false,
    nickname: '',
    secUid: '',
    totalViewership: '',
    userId: '',
  });
  const [copywriting, setCopywriting] = React.useState({
    loading: true as boolean,
    titleLabel: '',
    instructionLabel: '',
    instruction: {} as any,
    options: {} as any,
    response: {} as any,
    button: {} as any,
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showResponse, setShowResponse] = React.useState<boolean>(false);
  const [showError, setShowError] = React.useState<boolean>(false);
  const [showInstruction, setShowInstruction] = React.useState<boolean>(false);

  React.useEffect(() => {
    import(`../copywriting/${locale}/DyStreamWatcherPage.ts`).then((module) => {
      const {
        titleLabel,
        instructionLabel,
        instruction,
        options,
        response,
        button,
      } = module.default();
      setCopywriting({
        loading: false,
        titleLabel,
        instructionLabel,
        instruction,
        options,
        response,
        button,
      });
    })
  }, [locale])

  const [form, setForm] = React.useState<FormState>({
    accountId: '',
    keysToRetrieve: [DouyinKey.currentLikeCount, DouyinKey.currentViewership, DouyinKey.isStreaming, DouyinKey.totalViewership],
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleSearch = () => {
    setShowResponse(false);
    setShowError(false);
    setLoading(true);
    axiosInstance.post("/api/v1/dy", form)
      .then((res) => {
        const data = res['data']['data'] as DouyinStreamReponse;
        setStreamInfo({
          avatarUrl: data.avatarUrl,
          profileUrl: data.profileUrl,
          streamUrl: data.streamUrl,
          currentLikeCount: data.currentLikeCount,
          currentViewership: data.currentViewership,
          isStreaming: data.isStreaming,
          nickname: data.nickname,
          secUid: data.secUid,
          totalViewership: data.totalViewership,
          userId: data.userId,
        })
      }).then((_) => {
        setShowResponse(true);
      }).catch((err) => {
        setShowError(true);
        console.error("Error: ", err);
      }).finally(() => {
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
      <div className='dy-stream-watcher-page-container'>
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
          <div className='response-container-min-height'>
            {
              showResponse &&
              <DyProfileResponse
                copywriting={copywriting}
                streamInfo={streamInfo}
              />
            }
          </div>
          {
            showError &&
            <div>
              {'An unexpected error has occured. Please try again.'}
              
            </div>

          }
        </div>
      </div>
      <Footer />
      <ModalComponent
        show={showInstruction}
        setShow={setShowInstruction}
        title={copywriting.instructionLabel}
        bodyContent={[
          copywriting.instruction.stepOne,
          <img src={SamplePhoto} height='100px' />
        ]}
        cancelButtonOnly
      />
      <LoadingComponent show={loading} />
    </>
  )
}
