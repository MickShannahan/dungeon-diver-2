

export function generateId() {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxx'.replace(/[x]/g, () => (
    Math.random() * 16 | 0).toString(16)).toLowerCase();
}

export function createId(string = 'none-') {
  let id = string.toLowerCase().replace(/ |\./ig, '-')
  return id + '_' + generateId()
}
