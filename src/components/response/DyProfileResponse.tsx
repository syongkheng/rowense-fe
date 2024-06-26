import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SquareSpacing from '../spacing/SquareSpacing';
import { SpacingSize } from '../spacing/SquareSpacing.enum';


interface IDyProfileResponse {
  copywriting: any;
  streamInfo: any;
}

export default function DyProfileResponse({
  copywriting,
  streamInfo
}: IDyProfileResponse) {

  const handleNavigateToProfile = () => {
    window.location.replace(streamInfo.profileUrl);
  }

  const handleNavigateToLivestream = () => {
    window.location.replace(streamInfo.streamUrl);
  }
  return (
    <>
      <span className='response-title'>
        {copywriting.response.title}
      </span>
      <div className='dy-response-container vertical-center'>
        <div className='avatar'>
          {
            streamInfo.avatarUrl
            && <img src={streamInfo.avatarUrl} width='100px' height='100px' />
          }
        </div>
        <div className='stat'>
          <div className='row vertical-center'>
            <span className='response hyperlink' onClick={() => handleNavigateToProfile()}>
              {streamInfo.nickname}
              <SquareSpacing spacing={SpacingSize.Medium} />
              <ExitToAppIcon />
            </span>
          </div>
          <SquareSpacing spacing={SpacingSize.Small} />
          <div className='row vertical-center'>
            <span className='response'>{copywriting.response.roomStatus}</span>
          </div>
          <div className='row vertical-center'>
            <div className='left'>
              {
                streamInfo.isStreaming === true
                  ?
                  <span className='response hyperlink' onClick={() => handleNavigateToLivestream()}>
                    {copywriting.response.online}
                    <SquareSpacing spacing={SpacingSize.Medium} />
                    <ExitToAppIcon />
                  </span>
                  : streamInfo.isStreaming === false
                    ? <span className='response'>{copywriting.response.offline}</span>
                    : null
              }
            </div>
            {
              streamInfo.isStreaming &&
              <div className='right'>
                <span className='label'>{copywriting.response.currentLikeCount}</span>
                <SquareSpacing spacing={SpacingSize.Small} />
                <span className='response'>{streamInfo.currentLikeCount}</span>
              </div>
            }
          </div>
          {
            streamInfo.isStreaming &&
            <>
              <div className='row vertical-center'>
                <div className='left'>
                  <span className='label'>{copywriting.response.totalViewerCount}</span>
                  <span className='response'>{streamInfo.totalViewership}</span>
                </div>
                <div className='right'>
                  <span className='label'>{copywriting.response.currentViewerCount}</span>
                  <span className='response'>{streamInfo.currentViewership}</span>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}