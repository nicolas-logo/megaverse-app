import './Lobby.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import { validateCandidateId } from '../../services/megaverseService'
import { useDispatch } from 'react-redux'
import { setCandidateId } from '../../redux/generalSlice'

export const Lobby = () => {
  const dispatch = useDispatch()
  const spanInput = useRef(null)
  const [candidateIdValue, setCandidateIdValue] = useState('')
  const [validateState, setValidateState] = useState('')

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let animationFrameId = null
  let intervalId = null

  // Animation loop for the title letters
  const letterAnimation = useCallback(() => {
    let iteration = 0

    const animate = () => {
      if (spanInput.current) {
        spanInput.current.innerText = spanInput.current.dataset.value
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return spanInput.current.dataset.value[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')

        if (iteration >= spanInput.current.dataset.value.length) {
          iteration = 0 // Reset the iteration for continuous animation
        } else {
          animationFrameId = requestAnimationFrame(animate)
          iteration += 1 / 3
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }, [letters])

  // Start the animation loop on component mount
  useEffect(() => {
    intervalId = setInterval(() => {
      letterAnimation()
    }, 5000)

    return () => {
      // Clean up the animation frames and interval on component unmount
      clearInterval(intervalId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [letterAnimation])

  // checks if the user pressed Enter to validate the key
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setValidateState('Validating')
      const { error } = await validateCandidateId(candidateIdValue)

      if (error) {
        setValidateState('Error')
      } else {
        localStorage.setItem('CANDIDATE_ID', candidateIdValue)
        dispatch(setCandidateId(candidateIdValue))
      }
    }
  }

  // updates the api key whenever the user press a key
  const handleChange = (event) => {
    setCandidateIdValue(event.target.value)
  }

  return (
    <div className="lobby">
      <h1 id="title" className="centered">
        Welcome to <span className="fancy"><b>Megaverse</b></span>
      </h1>
      <div className='row'>
        <div className='col-md-8 offset-md-2 mt-5'>
          <span className='spanInput'
            ref={spanInput}
            data-value="Enter your CANDIDATE ID">Enter your CANDIDATE ID</span>
          <input
            type='text'
            className="form-control candidateInput"
            placeholder="CANDIDATE ID..."
            maxLength="50"
            value={candidateIdValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}></input>
          {validateState === 'Error' && <span className='validate-text text-danger'>Wrong CANDIDATE ID</span>}
          {validateState === 'Validating' && <span className='validate-text text-warning'>Validating...</span>}
        </div>
      </div>
    </div>
  )
}
