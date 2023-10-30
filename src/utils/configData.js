import spaceImage from './../assets/space.gif'
import saturnImage from './../assets/saturn-1-7.gif'
import cometUp from './../assets/comet-up.gif'
import cometDown from './../assets/comet-down.gif'
import cometLeft from './../assets/comet-left.gif'
import cometRight from './../assets/comet-right.gif'
import moonBlue from './../assets/moon-blue.gif'
import moonRed from './../assets/moon-red.gif'
import moonPurple from './../assets/moon-purple.gif'
import moonWhite from './../assets/moon-white.gif'

export const moonColors = {
  BLUE: 'blue',
  RED: 'red',
  PURPLE: 'purple',
  WHITE: 'white'
}

export const cometDirections = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
}

export const AstralObjects = {
  null: {
    name: 'SPACE',
    type: null,
    image: spaceImage
  },
  0: {
    name: 'POLYANET',
    type: 0,
    image: saturnImage
  },
  1: {
    name: 'SOLOON',
    type: 1,
    image: moonBlue,
    color: moonColors.BLUE,
    changeColor: function () {
      switch (this.color) {
        case moonColors.BLUE:
          this.color = moonColors.RED
          this.image = moonRed
          break
        case moonColors.RED:
          this.color = moonColors.PURPLE
          this.image = moonPurple
          break
        case moonColors.PURPLE:
          this.color = moonColors.WHITE
          this.image = moonWhite
          break
        default:
          break
      }
    },
    setImage: function () {
      switch (this.color) {
        case moonColors.BLUE:
          this.image = moonBlue
          break
        case moonColors.RED:
          this.image = moonRed
          break
        case moonColors.PURPLE:
          this.image = moonPurple
          break
        case moonColors.WHITE:
          this.image = moonWhite
          break
        default:
          break
      }
    },
    isLast: function () {
      return this.color === moonColors.WHITE
    }
  },
  2: {
    name: 'COMETH',
    type: 2,
    image: cometUp,
    direction: cometDirections.UP,
    changeDirection: function () {
      switch (this.direction) {
        case cometDirections.UP:
          this.direction = cometDirections.DOWN
          this.image = cometDown
          break
        case cometDirections.DOWN:
          this.direction = cometDirections.LEFT
          this.image = cometLeft
          break
        case cometDirections.LEFT:
          this.direction = cometDirections.RIGHT
          this.image = cometRight
          break
        default:
          break
      }
    },
    setImage: function () {
      switch (this.direction) {
        case cometDirections.UP:
          this.image = cometUp
          break
        case cometDirections.DOWN:
          this.image = cometDown
          break
        case cometDirections.LEFT:
          this.image = cometLeft
          break
        case cometDirections.RIGHT:
          this.image = cometRight
          break
        default:
          break
      }
    },
    isLast: function () {
      return this.direction === cometDirections.RIGHT
    }
  }
}

export const AstralObjectsKeys = {
  SPACE: null,
  POLYANET: 0,
  SOLOON: 1,
  COMETH: 2
}

export const DefaultAstralObject = 0

export const directions = [
  [-1, 0], // Up
  [1, 0], // Down
  [0, -1], // Left
  [0, 1] // Right
]

export const awaitEndpointTime = 1500

export const errorTypes = {
  ERR_CANCELED: 'ERR_CANCELED',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
  CANDIDATE_SUBMITTED: 'CANDIDATE_SUBMITTED'

}
