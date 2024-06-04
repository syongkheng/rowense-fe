import React, { useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import SquareSpacing from '../components/spacing/SquareSpacing'
import { SpacingSize } from '../components/spacing/SquareSpacing.enum'
import '../css/LandingPage.css'
import { ISectionInfo } from '../models/copywriting/LandingPage.model'
import { Button } from '@mui/material'
import BtnPrimary from '../styles/Button'
import { AppStorageUtil } from '../utils/AppStorageUtil'
import { Locale } from '../enums'

export default function LandingPage() {

  const [locale, setLocale] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);

  const [copywriting, setCopywriting] = React.useState<ISectionInfo[] | null>(null);
  const [buttonLabel, setButtonLabel] = React.useState('');

  useEffect(() => {
    import(`../copywriting/${locale}/LandingPage`).then((module) => {
      const { sectionInfo, buttonLabel } = module.default();
      setCopywriting(sectionInfo);
      setButtonLabel(buttonLabel)
    })
  }, [locale])

  const handleTryNow = () => {
    console.log("Navigate to login/register page.")
  }

  return (
    <>
      <Header setLocale={setLocale} />
      <div className='login-page-container'>
        <div className='content'>
          <SquareSpacing spacing={SpacingSize.ExtraLarge} />
          {
            copywriting && copywriting.map((section: ISectionInfo, index: number) => {
              return (
                <div className='row' key={index}>
                  <div className='section-container'>
                    <div>
                      <span className={`section h${index === 0 ? '1' : '2'}`}>
                        {section.title}
                      </span>
                      <span className='section version'>
                        {section.version}
                      </span>
                    </div>
                    <div>
                      <span className='section content'>
                        {section.description}
                      </span>
                    </div>
                  </div>
                  <SquareSpacing spacing={SpacingSize.Medium} />
                </div>
              )
            })
          }
          <Button
            sx={BtnPrimary()}
            onClick={() => handleTryNow()}
          >
            {buttonLabel}
          </Button>
          <SquareSpacing spacing={SpacingSize.ExtraLarge} />
        </div>
      </div>
      <Footer />
    </>
  )
}