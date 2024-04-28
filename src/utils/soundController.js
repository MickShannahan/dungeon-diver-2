
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
