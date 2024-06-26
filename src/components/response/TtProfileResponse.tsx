import { DateUtil } from "../../utils/DateUtil";
import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface ITtProfileResponse {
  copywriting: any,
  streamInfo: any,
}

export default function TtProfileResponse({
  copywriting,
  streamInfo,
}: ITtProfileResponse) {

  const handleNavigateToProfile = () => {
    window.location.replace(streamInfo.profileUrl);
  }

  const handleNavigateToLivestream = () => {
    window.location.replace(streamInfo.streamUrl);
  }

  return (
    <div className='row tt-response-container vertical-center'>
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
        <div className='row follow-info'>
          <div className='following'>
            <span className='label'>{copywriting.response.followingCount}</span>
            <span className='response'>{streamInfo.followingCount}</span>
          </div>
          <div className='follower'>
            <span className='label'>{copywriting.response.followerCount}</span>
            <span className='response'>{streamInfo.followerCount}</span>
          </div>
        </div>
        <div className='row'>
          <span>{copywriting.response.streamStatus}</span>
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
            streamInfo.isStreaming === true &&
            <div className='right'>
              <span className='label'>{copywriting.response.lastStreamStartTime}</span>
              <span className='response'>{DateUtil.convertUnixToDDMMYYYYHHMM(parseInt(streamInfo.lastStreamStartTime))}</span>
            </div>
          }
        </div>
        {
          streamInfo.isStreaming === true &&
          <div className='row vertical-center'>
            <div className='left'>
              <span className='label'>{copywriting.response.lastRecordedViewers}</span>
              <span className='response'>{streamInfo.viewers}</span>
            </div>
            <div className='right'>
              <span className='label'>{copywriting.response.lastStreamTitle}</span>
              <span className='response'>{streamInfo.lastStreamTitle}</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}