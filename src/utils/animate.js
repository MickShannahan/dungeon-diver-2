
/**
 *
 * @param {HTMLElement} elm
 * @param {Number| string} duration seconds
 * @param {('ease' | 'linear' | 'ease-out' | 'cubic-bezier(0.175, 0.885, 0.32, 1.5)')} timing
 */
export function animate(elm, animation, duration, timing) {
  elm.style.animation = `${animation} ${duration}s ${timing || 'linear'} 1 forwards`
  elm.addEventListener('animationend', () => {
    elm.style.animation = 'none'
    elm.removeEventListener('animationend', this)
  })
}
