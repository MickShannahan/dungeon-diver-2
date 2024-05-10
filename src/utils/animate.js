import { Animation } from "../models/Animation.js"

/**
 *
 * @param {string | number} [duration]
 * @param {('ease' | 'linear' | 'ease-out' | 'cubic-bezier(0.175, 0.885, 0.32, 1.5)' )| string} [timing]
 * @param {string| number} [delay]
 * @param {()=>{}} [onEnd]
 */
export async function animate(elm, animation, duration = '.5s', timing = 'linear', delay = '0s', onEnd) {
  return await playAnimation(elm, new Animation(animation, duration, timing, delay, onEnd))
}
/**
 * @param {HTMLElement} elm
 * @param {Animation} anime
 * @returns
 */
export function playAnimation(elm, anime) {
  return new Promise((resolve, reject) => {
    elm.classList.add(anime.name + '-end')
    elm.style.animation = `${anime.name} ${anime.duration} ${anime.delay} ${anime.timing} 1 forwards`
    elm.addEventListener('animationend', () => {
      elm.style.animation = 'none'
      elm.removeEventListener('animationend', this)
      if (anime.onEnd) resolve(anime.onEnd())
      resolve()
    })
  })
}
