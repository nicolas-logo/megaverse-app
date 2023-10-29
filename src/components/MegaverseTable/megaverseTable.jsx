/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react'
import { AstralObjects, AstralObjectsKeys, directions } from '../../utils/configData'
import { cloneDeep } from 'lodash'

const MegaverseTable = ({ megaverse, saveMegaverse, forgetCandidateId, loading }) => {
  const [megaverseUpdated, setMegaverseUpdated] = useState(cloneDeep(megaverse))

  // function to delete the adjacent moons if a planet is changed
  const deleteAdjacentMoons = (x, y) => {
    for (const [dx, dy] of directions) { // check in all directions
      const newX = x + dx
      const newY = y + dy

      // Check if the neighboring cell are not walls
      if (
        newX >= 0 && newX < megaverseUpdated.contentMap.length &&
        newY >= 0 && newY < megaverseUpdated.contentMap[0].length
      ) {
        // Check if the neighboring cell is a moon and check if that moon has no other planet around
        if (megaverseUpdated.contentMap[newX][newY]?.type === AstralObjectsKeys.SOLOON && !hasAdjacentPlanet(newX, newY)) {
          megaverseUpdated.contentMap[newX][newY] = AstralObjects.null // destroy adjacent moon
        }
      }
    }
  }

  // function to manage te value of cells
  const handleCellClick = useCallback((rowIndex, cellIndex) => {
    const newContentMap = [...megaverseUpdated.contentMap]
    const keys = Object.keys(AstralObjects)

    const currentObject = cloneDeep(newContentMap[rowIndex][cellIndex])
    // this is to set the next astralObject on the list, if the current is the last, it sets the first
    const previousIndex = keys.indexOf(currentObject?.type?.toString())

    if (previousIndex === -1 || previousIndex === keys.length - 1) { // is the last astral object? (Comet right)
      newContentMap[rowIndex][cellIndex] = AstralObjects[0]
    } else if (currentObject?.type === AstralObjectsKeys.SOLOON && !currentObject.isLast()) { // is not the last moon (white)? change the color
      currentObject.changeColor()
      newContentMap[rowIndex][cellIndex] = currentObject
    } else if (hasAdjacentPlanet(rowIndex, cellIndex)) { // the space got planets around (UP, DOWN, LEFT or RIGHT)? change to moon
      newContentMap[rowIndex][cellIndex] = AstralObjects[previousIndex + 1]
    } else newContentMap[rowIndex][cellIndex] = AstralObjects[previousIndex + 2] // if not, jumps directly to Comet

    if (currentObject?.type === AstralObjectsKeys.COMETH && !currentObject.isLast()) { // is not the last comet (RIGHT)? change the color
      currentObject.changeDirection()
      newContentMap[rowIndex][cellIndex] = currentObject
    }

    setMegaverseUpdated({ ...megaverseUpdated, newContentMap })
    if (currentObject?.type === AstralObjectsKeys.POLYANET) { // if you changed a planet, it destroys its moons
      deleteAdjacentMoons(rowIndex, cellIndex)
    }
  }, [])

  const hasAdjacentPlanet = (x, y) => {
    for (const [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy

      // Check if the neighboring cell are not walls
      if (
        newX >= 0 && newX < megaverseUpdated.contentMap.length &&
        newY >= 0 && newY < megaverseUpdated.contentMap[0].length
      ) {
        // Check if the neighboring cell is a planet
        if (megaverseUpdated.contentMap[newX][newY]?.type === AstralObjectsKeys.POLYANET) {
          return true // Found an adjacent planet cell
        }
      }
    }
  }

  const reset = async () => {
    const resetMegaverse = { ...megaverseUpdated }

    resetMegaverse.contentMap = resetMegaverse.contentMap.map(row => row.map(cell => { cell = null; return cell }))
    await saveMegaverse({ megaverseUpdated: resetMegaverse })
  }

  return (
    <div className='container'>
      { !loading &&
        <div>
          <div className='row '>
            <div className='btn-container'>
              <button name='save-megaverse' className='btn btn-success' onClick={() => saveMegaverse({ megaverseUpdated }) }>Save Megaverse</button>
              <button name='reset-megaverse' className='btn btn-danger' onClick={() => reset()}>Reset Megaverse</button>
              <button name='change-candidate' className='btn btn-danger' onClick={() => forgetCandidateId()}>Change Candidate Id</button>
            </div>
          </div>
          <table className='table table-bordered table-hover'>
            <tbody>
              {megaverseUpdated?.contentMap.length > 0 && megaverseUpdated.contentMap.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td className='hover-highlight' onClick={() => handleCellClick(rowIndex, cellIndex)} key={cellIndex}><img className='astral-img' src={cell ? cell.image : AstralObjects.null.image}></img></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
export default MegaverseTable
