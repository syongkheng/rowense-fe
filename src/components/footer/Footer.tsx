import SquareSpacing from "../spacing/SquareSpacing";
import { SpacingSize } from "../spacing/SquareSpacing.enum";
import "../../css/components/Footer.css";

export default function Footer() {

  const VERSION = 'Beta';
  const LAST_UPDATED_DATE = '2024-06-19';
  const DISCORD_INVITE_LINK = 'https://discord.gg/SWYvkQNtmp';

  return (
    <>
      <div className='footer'>
        <div className='content'>
          <div className='primary'>
            <span className='content'> Support:  </span>
            <span className='content'> <a href={DISCORD_INVITE_LINK}> Discord </a> </span>
          </div>
          <SquareSpacing spacing={SpacingSize.ExtraSmall} />
          <div className='secondary'>
            <span className='content'>
              Version: {VERSION}
            </span>
            <SquareSpacing spacing={SpacingSize.Medium} />
            <span className='content'> Last Updated Date: {LAST_UPDATED_DATE} </span>
          </div>
        </div>
      </div>
    </>
  )
}