import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import '../../css/components/Header.css';
import SquareSpacing from '../spacing/SquareSpacing';
import { SpacingSize } from '../spacing/SquareSpacing.enum';
import { AppStorageUtil } from '../../utils/AppStorageUtil';
import { Locale } from '../../enums';


interface HeaderProps {
  setLocale: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({
  setLocale
}: HeaderProps) {

  const [language, setLanguage] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);

  React.useEffect(() => {
    AppStorageUtil.setLocal(AppStorageUtil.Keys.Locale, AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  }, [])

  function getLanguageLabel() {
    switch (AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en) {
      case Locale.en:
        return 'Language: ';
      case Locale.cn:
        return '语言设置: ';
      default:
        return 'Language: ';
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    setLocale(event.target.value)
    AppStorageUtil.setLocal(AppStorageUtil.Keys.Locale, event.target.value);
  };


  return (
    <>
      <div className='header'>
        <div className='content'>
          <div className='brand'>
            {'qin` Studio'}
          </div>
          <div className='i18n-menu'>
            <span>{getLanguageLabel()}</span>
            <SquareSpacing spacing={SpacingSize.Small} />
            <div className='selection'>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={language}
                  onChange={handleChange}
                  size='small'
                  defaultValue={language}
                  autoWidth
                >
                  <MenuItem value={Locale.en}>English</MenuItem>
                  <MenuItem value={Locale.cn}>中文</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}