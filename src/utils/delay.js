export async function delay(time, fn) {

  if (fn) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        resolve(await fn())
      }, time)
    })
  }

  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
