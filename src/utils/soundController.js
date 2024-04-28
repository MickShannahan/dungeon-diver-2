const loc = 'src/assets/sounds/'

export class SFX {
  static destroyCard = loc + 'destroyCard.wav'
  static drawCard = loc + 'drawCard.wav'
  static explosion = loc + 'explosion.wav'
  static fail = loc + 'fail.wav'
  static flyaway = loc + 'flyaway.wav'
  static heal = loc + 'heal.wav'
  static hurt = loc + 'hurt.wav'
  static playerHurt = loc + 'playerHurt.wav'
  static powerup = loc + 'powerup.wav'
}



export function playSFX(file, volume = .5) {
  const audioAnchor = document.getElementById('sound-effect')
  const audio = document.createElement('audio')
  audio.src = file
  audio.volume = volume
  audioAnchor.appendChild(audio)
  audio.play()
  audio.addEventListener('ended', () => {
    audio.remove()
  }
  )
}
