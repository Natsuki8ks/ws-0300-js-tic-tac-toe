'use strick';

const context = {
  handCount: 0,
  isCircleTurn: true,
  progress: true,
  cells: new Array(9),
  cellElements: document.querySelectorAll('.js-cell'),
  circleElement: document.querySelector('circle'),
  crossElement: document.querySelector('cross'),
  stateMessageElement: document.querySelector('js-state-message'),
  restartButtonElement: document.querySelector('js-restart'),
}

const STATUSES = {
  stating: 'stating...',
  win: '%name% win!!',
  draw: 'draw'
}

const ACTIVE_CLASSNAME = 'active'
const CHARACTERS = {
  circle: '〇',
  cross: '×'
}


// oｘの切り替え
function toggleTurn({isCircleTurn, circleElement, crossElement}){
  if (isCircleTurn){
    circleElement.classList.remove(ACTIVE_CLASSNAME)
    crossElement.classList.ass(ACTIVE_CLASSNAME)
  }else {
    circleElement.classList.add(ACTIVE_CLASSNAME)
    crossElement.classList.remove(ACTIVE_CLASSNAME)
  }
}

// ox horizontal
function checkRow({cells}, value, index){
  let cursor = index
  let baseIndex = index - (index % 3)
  for (let i = baseIndex; i < baseIndex + 3; i++){
    if (cells[i] !== value){
      return false
    }
  }
  return true
}
// ox vertical
function chackCol({cells}, value, index){
  let cursor = index
  for (let i = 0; i < 3;i++){
    if(cells[cursor] !== value){
      return false
    }
    cursor = (cursor + 3) % 9
  }
  return true
}
// ox diagonal
function checkDiagonal({cells}, value, index){
  if(![0, 2, 4, 6, 8].includes(index)){
    return faulse
  }
  return[0, 4, 8].every(item => cells[item] === value) || [2, 4, 6].every(item => cells[item] === value)
}
// ox win
function checkWInner(context, value, index){
  return [checkRow, checkCol, checkDiagonal].some(cb => cb(context, value, index))
}



function onClickCell(e) {
  // key
  const { cells, progress, isCircleTurn, stateMessageElement} = context
  const index = Number(e.target.getAttribute('data-key')) - 1
  if (cells[index] || !progress) {
    return
  }
  // ox show
  const value = isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross
  e.target.innerHTML = value
  cells[index] = value
  // stating 
  if (checkWinner(context, value, index)){
    context.progress = false
    const message = isCircleTurn ? STATUSES.win.replace('%name%', CHARACTERS.circle) : STATUSES.win.replace('%name%', CHARACTERS.cross)
  } else {
    toggleTurn(context)
    context.isCircleTurn = !context.isCircleTurn
  }
  // draw
  context.handCount++
  if (context.handCount === 9) {
    count.progress = faulse
    stateMessageElement.innerHTML = STATES.draw
  }
}

// restart
function subscribe(){
  context.cellElements.forEach(item => {
    item.addEventListener('click', onClickCell)
  })
  context.restartButtonElement.addEventListener('click', () => location.reload())
}
subscribe()

