import React, { ChangeEvent } from 'react';
import Header from '../components/header/Header';
import '../css/DyStreamWatcherPage.css';
import { DouyinKey, Locale } from '../enums';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import Footer from '../components/footer/Footer';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, RadioGroup, TextField } from '@mui/material';
import { StyleButtonPrimary } from '../styling/ButtonPrimary';
import SquareSpacing from '../components/spacing/SquareSpacing';
import { SpacingSize } from '../components/spacing/SquareSpacing.enum';
import axiosInstance from '../middleware/axios-interceptor';
import InstructionalImage from '../assets/sample-dy-account-id.png';
import { StyleButtonSecondary } from '../styling/ButtonSecondary';
import { useNavigate } from 'react-router-dom';

interface FormState {
  accountId: string;
  keysToRetrieve: string[];
}

interface DouyinStreamReponse {
  avatarUrl: string;
  currentLikeCount?: string;
  currentViewership?: string;
  isStreaming?: boolean | string;
  nickname: string;
  secUid: string;
  totalViewership?: string;
  userId: string;
}


export default function DyStreamWatcherPage() {
  const navigate = useNavigate();

  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const [showResponse, setShowResponse] = React.useState<Record<DouyinKey, boolean>>({
    [DouyinKey.currentLikeCount]: false,
    [DouyinKey.currentViewership]: false,
    [DouyinKey.isStreaming]: false,
    [DouyinKey.totalViewership]: false,
  });
  const [streamInfo, setStreamInfo] = React.useState<DouyinStreamReponse>({
    avatarUrl: '',
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
    options: {} as any,
    response: {} as any,
    button: {} as any,
  })


  React.useEffect(() => {
    import(`../copywriting/${locale}/DyStreamWatcherPage.ts`).then((module) => {
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

  const [form, setForm] = React.useState<FormState>({
    accountId: '',
    keysToRetrieve: [],
  });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }

  const handleSearch = () => {
    axiosInstance.post("/api/v1/dy", form)
      .then((res) => {
        const data = res['data']['data'] as DouyinStreamReponse;
        setStreamInfo({
          avatarUrl: data.avatarUrl,
          currentLikeCount: data.currentLikeCount,
          currentViewership: data.currentViewership,
          isStreaming: data.isStreaming,
          nickname: data.nickname,
          secUid: data.secUid,
          totalViewership: data.totalViewership,
          userId: data.userId,
        })
        Object.keys(data).forEach(key => {
          if (showResponse.hasOwnProperty(key)) {
            setShowResponse(prevShowResponse => ({
              ...prevShowResponse,
              [key]: true
            }));
          }
        });
        console.log("Res: ", res);
        console.log("Keys: ", Object.keys(data));
      }).catch((err) => {
        console.error("Error: ", err);
      })
  }

  const handleChecklistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      keysToRetrieve: checked
        ? [...prevForm.keysToRetrieve, name]
        : prevForm.keysToRetrieve.filter((key) => key !== name),
    }));
  };

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
          <div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
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
              <span className='instruction-label'>
                {copywriting.instructionLabel}
              </span>
            </div>
            <SquareSpacing spacing={SpacingSize.Small} />
            <img src={InstructionalImage} height='100px' />
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='row'>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <span className='subtitle'>
                  {copywriting.options.title}
                </span>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {
                  copywriting.loading === false && Object.keys(DouyinKey)?.map((key, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={key}
                        control={
                          <Checkbox checked={form?.keysToRetrieve.includes(key)} onChange={handleChecklistChange} name={key} />
                        }
                        label={copywriting?.options?.label[key] ?? ''}
                      />
                    )
                  })
                }
              </RadioGroup>
            </FormControl>
          </div>
          <div className='row'>
            <span className='subtitle'>{copywriting.response.title}</span>
          </div>
          <SquareSpacing spacing={SpacingSize.Medium} />
          <div className='row response-container'>
            <div>
              <img src={streamInfo.avatarUrl} />
            </div>
            <SquareSpacing spacing={SpacingSize.Large} />
            <div className='response retrieved'>
              <div>
                <div>
                  {copywriting.response.nickname}{streamInfo.nickname}
                </div>
                <div>
                  {copywriting.response.userId}{streamInfo.userId}
                </div>
                <div>
                  {copywriting.response.secUid}{streamInfo.secUid}
                </div>
              </div>
              <SquareSpacing spacing={SpacingSize.Medium} />
              <div className='response secondary'>
                <div className='response left'>
                  {showResponse.isStreaming && (
                    <div className='response stream-status'>
                      {copywriting.response.streamStatus} {streamInfo.isStreaming === true
                        ? copywriting.response.online
                        : streamInfo.isStreaming === false
                          ? copywriting.response.offline
                          : '-'
                      }
                    </div>
                  )}

                  {showResponse.totalViewership && (
                    <div className='response total-viewers'>
                      {copywriting.response.totalViewers} {streamInfo.isStreaming === true ? streamInfo.totalViewership : copywriting.response.notAvailable}
                    </div>
                  )}
                </div>
                <div className='response right'>
                  {showResponse.currentViewership && (
                    <div className='response current-viewers'>
                      {copywriting.response.currentViewers} {streamInfo.isStreaming === true ? streamInfo.currentViewership : copywriting.response.notAvailable}
                    </div>
                  )}
                  {showResponse.currentLikeCount && (
                    <div className='response current-likes'>
                      {copywriting.response.currentLikeCount} {streamInfo.isStreaming === true ? streamInfo.currentLikeCount : copywriting.response.notAvailable}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
