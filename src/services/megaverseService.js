import axios from 'axios'
import ContentMapType from '../contentTypes/contentMap'
import { awaitEndpointTime } from '../utils/configData'

const ROOT_API_URL = 'https://challenge.crossmint.io/api'

const GetRequestToken = () => {
  const requestToken = axios.CancelToken.source()
  return requestToken
}

// this is to not overuse the API and get a 429
const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const validateCandidateId = async (CANDIDATE_ID) => {
  try {
    const response = await axios.get(`${ROOT_API_URL}/map/${CANDIDATE_ID}`)
    return response
  } catch (error) {
    return { error: true }
  }
}

const CancelRequestToken = ({ requestToken }) => {
  try {
    requestToken.cancel()
  } catch (error) {
    console.log('CancelRequestToken error:', error)
  }
}

const GetMegaverse = async ({ requestToken, CANDIDATE_ID }) => {
  try {
    const url = `${ROOT_API_URL}/map/${CANDIDATE_ID}`
    const response = await axios.get(url, {
      cancelToken: requestToken.token
    })
    if (response.data.map === null) {
      throw new Error('This candidate already finished the challenge')
    }
    const responseMapped = ContentMapType(response)
    return responseMapped
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const SavePolyanet = async ({ requestToken, row, column, candidateId }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/polyanets`
    const response = await axios.post(url, {
      cancelToken: requestToken.token,
      row,
      column,
      candidateId
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const DeletePolyanet = async ({ requestToken, row, column, candidateId }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/polyanets`
    const response = await axios.delete(url, {
      cancelToken: requestToken.token,
      data: {
        row,
        column,
        candidateId
      }
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const SaveSoloon = async ({ requestToken, row, column, candidateId, color }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/soloons`
    const response = await axios.post(url, {
      cancelToken: requestToken.token,
      row,
      column,
      candidateId,
      color
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const DeleteSoloon = async ({ requestToken, row, column, candidateId }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/soloons`
    const response = await axios.delete(url, {
      cancelToken: requestToken.token,
      data: {
        row,
        column,
        candidateId
      }
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const SaveCometh = async ({ requestToken, row, column, candidateId, direction }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/comeths`
    const response = await axios.post(url, {
      cancelToken: requestToken.token,
      row,
      column,
      candidateId,
      direction
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const DeleteCometh = async ({ requestToken, row, column, candidateId }) => {
  await timeout(awaitEndpointTime)
  try {
    const url = `${ROOT_API_URL}/comeths`
    const response = await axios.delete(url, {
      cancelToken: requestToken.token,
      data: {
        row,
        column,
        candidateId
      }
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error) : ErrorHandler(error)
  }
}

const ErrorHandler = (error) => {
  switch (error.code) {
    case 'ERR_CANCELED':
      return {
        error: true,
        message: 'Request canceled'
      }
    case 'ERR_BAD_REQUEST':
      return {
        error: true,
        message: error.response.data.message
      }
    default: return { error: true, message: error.message }
  }
}

export { GetRequestToken, CancelRequestToken, GetMegaverse, validateCandidateId, SavePolyanet, DeletePolyanet, SaveSoloon, DeleteSoloon, SaveCometh, DeleteCometh }
