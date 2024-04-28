import { AppState } from "../AppState.js"
import { logger } from "./Logger.js"

const instances = []

export function customPickup(el, binding) {
  const dragElm = binding.value.dragElm
  const data = binding.value.data
  AppState.dropStore = data
  if (!dragElm) return console.warn('No Bound elm to drag')
  if (instances.includes(binding.instance)) return
  instances.push(binding.instance)
  const pickupFn = binding.value.pickup
  const dropFn = binding.value.drop
  dragElm.ondragstart = () => false
  let elmStyle = getComputedStyle(dragElm)
  let elmRect = dragElm.getBoundingClientRect()
  let width = elmRect.width
  let height = elmRect.height

  dragElm.style.display = 'none'
  dragElm.style.position = 'fixed'
  dragElm.style.cursor = 'grabbing'
  dragElm.style.zIndex = 1000

  let screen = document.documentElement
  let startingLeft = elmStyle.left
  let startingTop = elmStyle.top
  let startingRot = elmStyle.transform
  let startingZ = elmStyle.zIndex
  let inDrop = false
  binding.value.active = false
  let droppable = null
  let dropX = startingLeft
  let dropY = startingTop
  let dropZ = startingZ
  let dropW = 0
  let dropH = 0
  let lag = 0

  function drag({ movementX, movementY, clientX, clientY }) {
    let elmBelow = document.elementFromPoint(clientX, clientY);
    droppable = elmBelow.closest('[data-drop-zone="true"]')

    //SECTION check for drop zone
    if (droppable) {
      inDrop = true
      let dropRect = droppable.getBoundingClientRect()
      let dropStyle = getComputedStyle(droppable)
      dropX = dropRect.x
      dropY = dropRect.y
      dropZ = dropStyle.zIndex
      dropH = dropRect.height
      dropW = dropRect.width
      dragElm.classList.add('cursor-over-drop')
    } else {
      dragElm.classList.remove('cursor-over-drop'); inDrop = false; droppable = null
    }

    dragElm.style.left = (clientX - (width / 2)) + 'px'
    dragElm.style.top = clientY - (height / 2) + 'px'

    // let rot = movementX > 0 ? 5 : movementX < 0 ? -5 : 0
    // dragElm.style.transform = `rotate(${rot}deg) scale(1.02)`
  }
  //SECTION Pickup
  binding.dir.pickupElm = ({ screenX, screenY }) => {
    binding.value.active = true
    dragElm.style.pointerEvents = 'none'
    dragElm.style.display = 'block'
    pickupFn(event, data)
    dragElm.classList.add('cursor-holding')
    sessionStorage.setItem('pickup', data)
    window.addEventListener('mousemove', drag)
    document.body.style.cursor = 'grabbing'
    dragElm.style.left = px(screenX - (width / 2))
    dragElm.style.top = px(screenY - (height / 2))
  }
  el.addEventListener('mousedown', binding.dir.pickupElm)

  //SECTION Drop
  binding.dir.dropElm = () => {
    if (!binding.value.active) return
    binding.value.active = false
    dropFn(event, data)
    // window.removeEventListener('mouseup', binding.dir.dropElm)
    window.removeEventListener('mousemove', drag)
    dragElm.style.display = 'none'
    document.body.style.cursor = 'unset'
    dragElm.hidden = false;
    dragElm.style.transform = `scale(1) ${startingRot}`
    dragElm.style.zIndex = startingZ
    // FIXME this snapping needs correcting
    if (binding.arg == 'anchor' && !inDrop) {
      dragElm.style.left = startingLeft
      dragElm.style.top = startingTop
    }
    if (inDrop) {
      if (droppable.drop) droppable.drop()
      if (droppable.dataset.anchor) {
        dragElm.style.left = dropX + (dropW / 2) - (elmRect.width / 2) + 'px'
        dragElm.style.top = dropY + (dropH / 2) - (elmRect.height / 2) + 'px'
      }
      dragElm.style.zIndex = dropZ + 1
      inDrop = false
    }
  }
  window.addEventListener('mouseup', binding.dir.dropElm)
}

function px(pos) {
  return pos + 'px'
}
