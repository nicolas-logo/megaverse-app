import Megaverse from './components/Megaverse/Megaverse'
import { useSelector, useDispatch } from 'react-redux'
import { Lobby } from './components/Lobby/Lobby'
import { setCandidateId } from './redux/generalSlice'

function App () {
  const dispatch = useDispatch()
  const CANDIDATE_ID = localStorage.getItem('CANDIDATE_ID')
  dispatch(setCandidateId(CANDIDATE_ID))

  const general = useSelector((state) => state.general)

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {
        general.CANDIDATE_ID
          ? <Megaverse />
          : <Lobby />
      }

    </div>
  )
}

export default App
