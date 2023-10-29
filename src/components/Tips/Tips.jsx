import spaceImage from './../../assets/space.gif'
import saturnImage from './../../assets/saturn-1-7.gif'
import cometUp from './../../assets/comet-up.gif'
import cometDown from './../../assets/comet-down.gif'
import cometLeft from './../../assets/comet-left.gif'
import cometRight from './../../assets/comet-right.gif'
import moonBlue from './../../assets/moon-blue.gif'
import moonRed from './../../assets/moon-red.gif'
import moonPurple from './../../assets/moon-purple.gif'
import moonWhite from './../../assets/moon-white.gif'

const Tips = () => {
  return (
    <div>
      <ul className='list-group'>
        <li className='list-group-item'>- You can select an <b>Astral Object</b> by clicking on any cell.</li>
        <li className='list-group-item'>- The <b>Astral Object</b> can be:</li>
        <li className='list-group-item'>
          <b>Space: <img className='astral-img' alt='spaceImage' src={spaceImage} />,
          POLYanets:<img className='astral-img' alt='saturnImage' src={saturnImage} />,
          SOLoons:
            <img className='astral-img' alt='moonBlue' src={moonBlue} />
            <img className='astral-img' alt='moonRed' src={moonRed} />
            <img className='astral-img' alt='moonPurple' src={moonPurple} />
            <img className='astral-img' alt='moonWhite' src={moonWhite} />
          or comETHs:
            <img className='astral-img' alt='cometUp' src={cometUp} />
            <img className='astral-img' alt='cometDown' src={cometDown} />
            <img className='astral-img' alt='cometLeft' src={cometLeft} />
            <img className='astral-img' alt='cometRight' src={cometRight} />
          </b>
        </li>
        <li className='list-group-item'>- <b>POLYanets</b> and <b>comETHs</b> can be put anywhere</li>
        <li className='list-group-item'>- <b>SOLoons</b> can be put only next to a <b>POLYanets</b> (UP, DOWN, LEFT or RIGHT)</li>
        <li className='list-group-item'>- If you change a <b>POLYanets</b>, all its <b>SOLoons</b> will be destroyed at least they have another <b>POLYanets</b> around</li>
      </ul>
    </div>
  )
}

export default Tips
