import { Button, Drawer, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import '../../css/components/Header.css';
import SquareSpacing from '../spacing/SquareSpacing';
import { SpacingSize } from '../spacing/SquareSpacing.enum';
import { AppStorageUtil } from '../../utils/AppStorageUtil';
import { Locale } from '../../enums';
import MenuIcon from '@mui/icons-material/Menu';
import { StyleButtonSecondary } from '../../styling/ButtonSecondary';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';


interface HeaderProps {
  setLocale: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({
  setLocale
}: HeaderProps) {

  const [language, setLanguage] = React.useState<string>(AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
  const navigate = useNavigate();

  React.useEffect(() => {
    AppStorageUtil.setLocal(AppStorageUtil.Keys.Locale, AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en);
    if (AppStorageUtil.getSession(AppStorageUtil.Keys.Jwt)) {
      setIsAuthenticated(true);
    };
  }, [])

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

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
  function getLogoutLabel() {
    switch (AppStorageUtil.getLocal(AppStorageUtil.Keys.Locale) ?? Locale.en) {
      case Locale.en:
        return 'Logout';
      case Locale.cn:
        return '退出账号';
      default:
        return 'Logout';
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    setLocale(event.target.value)
    AppStorageUtil.setLocal(AppStorageUtil.Keys.Locale, event.target.value);
  };

  const handleLogout = () => {
    AppStorageUtil.removeSession(AppStorageUtil.Keys.Jwt);
    navigate("/");
  }


  return (
    <>
      <div className='header'>
        <div className='content'>
          <div className='brand'>
            {'qin` Studio'}
          </div>
          <div className='i18n-menu'>
            <div className='vertical-center' onClick={() => setOpenMenu(true)}>
              <MenuIcon />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor='bottom'
      >
        <div className='horizontal-center'>
          <div className='menu-container'>
            <SquareSpacing spacing={SpacingSize.Large} />
            <div className='vertical-center'>
              <span className='no-wrap'>{getLanguageLabel()}</span>
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

            {
              isAuthenticated
                ? <>
                  <SquareSpacing spacing={SpacingSize.Large} />
                  <Divider />
                  <SquareSpacing spacing={SpacingSize.Large} />
                  <Button
                    id="logout"
                    onClick={() => handleLogout()}
                    fullWidth
                    sx={StyleButtonSecondary}
                  >
                    {getLogoutLabel()}
                  </Button>
                  <SquareSpacing spacing={SpacingSize.ExtraLarge} />
                </>
                : <SquareSpacing spacing={SpacingSize.ExtraLarge} />
            }
          </div>
        </div>
      </Drawer>
    </>
  )
}