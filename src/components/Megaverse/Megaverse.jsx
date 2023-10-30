/* eslint-disable no-fallthrough */
import { useState, useEffect, useCallback } from 'react'
import { GetRequestToken, CancelRequestToken, GetMegaverse, SavePolyanet, DeletePolyanet, SaveSoloon, DeleteSoloon, SaveCometh, DeleteCometh } from '../../services/megaverseService'
import { useSelector, useDispatch } from 'react-redux'
import { InfoMessages } from '../InfoMessages/InfoMessages'
import MegaverseTable from '../MegaverseTable/megaverseTable'
import { AstralObjectsKeys } from '../../utils/configData'
import { setCandidateId } from './../../redux/generalSlice'
import { countDifferentCells } from '../../utils/utilFuctions'

import './Megaverse.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Tips from '../Tips/Tips'

let requestToken

const Megaverse = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [megaverse, setMegaverse] = useState({})
  const general = useSelector((state) => state.general)
  const [totalRequest, SetTotalRequest] = useState(0)
  const [requestCount, SetRequestCount] = useState(0)

  // when the component is rendered, ask for a token for the requests
  // and gets the megaverse
  useEffect(() => {
    requestToken = GetRequestToken()
    fetchMegaverse()

    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  // get megaverse from the api
  const fetchMegaverse = async () => {
    setLoading(true)
    setMegaverse({})
    try {
      const response = await GetMegaverse({
        requestToken,
        CANDIDATE_ID: general.CANDIDATE_ID
      })
      // the api could throw an error, so we handle that
      if (!response.error) {
        setApiErrorMessage('')

        setMegaverse(response)
      } else {
        setApiErrorMessage(response.message)
      }
    } catch (error) {
      setApiErrorMessage('An error occurred while fetching the megaverse.')
    } finally {
      setLoading(false)
    }
  }

  // this function looks for the differences between the saved megaverse and the updated one to just update the necessary
  const saveMegaverse = async ({ megaverseUpdated }) => {
    try {
      SetTotalRequest(0)
      const differenceCount = countDifferentCells(megaverse.contentMap, megaverseUpdated.contentMap)

      SetTotalRequest(differenceCount)

      setLoading(true)
      setApiErrorMessage('')
      window.scrollTo(0, 0)

      // it will only update the changes respecting the current Megaverse, not the whole
      for (let row = 0; row < megaverseUpdated.contentMap.length; row++) {
        for (let column = 0; column < megaverseUpdated.contentMap[row].length; column++) {
          const oldType = megaverse.contentMap[row][column] ? megaverse.contentMap[row][column].type : null
          const newType = megaverseUpdated.contentMap[row][column] ? megaverseUpdated.contentMap[row][column].type : null

          const oldColor = megaverse.contentMap[row][column] ? megaverse.contentMap[row][column]?.color : null
          const newColor = megaverseUpdated.contentMap[row][column] ? megaverseUpdated.contentMap[row][column]?.color : null

          const oldDirection = megaverse.contentMap[row][column] ? megaverse.contentMap[row][column]?.direction : null
          const newDirection = megaverseUpdated.contentMap[row][column] ? megaverseUpdated.contentMap[row][column]?.direction : null

          if (oldType !== newType || oldColor !== newColor || oldDirection !== newDirection) {
            const promises = []
            switch (newType) {
              case AstralObjectsKeys.SPACE: // if new type is Space, it will delete the old type on that cell
                switch (oldType) {
                  case AstralObjectsKeys.POLYANET: {
                    promises.push(DeletePolyanet({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID }))
                    SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                    break
                  }
                  case AstralObjectsKeys.SOLOON:
                    promises.push(DeleteSoloon({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID }))
                    SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                    break
                  case AstralObjectsKeys.COMETH:
                    promises.push(DeleteCometh({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID }))
                    SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                    break
                  default:
                    break
                }
                break
              case AstralObjectsKeys.POLYANET:
                promises.push(SavePolyanet({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID }))
                SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                break
              case AstralObjectsKeys.SOLOON:
                promises.push(SaveSoloon({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID, color: megaverseUpdated.contentMap[row][column].color }))
                SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                break
              case AstralObjectsKeys.COMETH:
                promises.push(SaveCometh({ requestToken: CancelRequestToken, row, column, candidateId: general.CANDIDATE_ID, direction: megaverseUpdated.contentMap[row][column].direction }))
                SetRequestCount((prevRequestCount) => prevRequestCount + 1)
                break
              default:
                break
            }
            const response = await Promise.all(promises)
            if (response.error) throw new Error(response.message)
          }
        }
      }
      SetRequestCount(0)
      fetchMegaverse()
    } catch (error) {
      setApiErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  // resets the saved api key
  const forgetCandidateId = useCallback(() => {
    localStorage.removeItem('CANDIDATE_ID')
    dispatch(setCandidateId(null))
  }, [dispatch])

  return (
    <div className='table-container'>
        <div className='table-responsive'>
          <h1>Your Megaverse</h1>
          <Tips></Tips>
          {megaverse.contentMap?.length > 0 &&
            <MegaverseTable
            megaverse={megaverse}
            saveMegaverse={saveMegaverse}
            forgetCandidateId={forgetCandidateId}
            loading={loading} />}
        </div>
        <InfoMessages apiErrorMessage={apiErrorMessage} megaverse={megaverse} loading={loading} />
        <div>
        { requestCount !== 0 &&
          <div>
            <span>{requestCount} / {totalRequest}</span>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow={requestCount}
                  aria-valuemin="0"
                  aria-valuemax={totalRequest}
                  style={{ width: `${(requestCount * 100) / totalRequest}%` }}></div>
            </div>
          </div>
          }
        </div>
    </div>
  )
}

export default Megaverse
