export function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

export function debounce(delay, callback) {
  let lastTime

  return function () {
    clearTimeout(lastTime)

    const [that, args] = [this, arguments]

    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

export function getPointDistance(pointOne, pointTwo) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0])

  const minusY = Math.abs(pointOne[1] - pointTwo[1])

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export const addZero = (num) => {
  if (isNaN(num)) return
  return num <= 9 ? '0' + num : num + ''
}

export const dateFormatter = (stamptime) => {
  const datetime = new Date(stamptime)
  return datetime.getFullYear() + '-' + addZero(datetime.getMonth() + 1) + '-' + addZero(datetime.getDate()) + ' ' + addZero(datetime.getHours()) + ':' + addZero(datetime.getMinutes()) + ':' + addZero(datetime.getSeconds())
}

export const toggleTime = ()=>{
  return 10000;
}

export const firstWordToUp=(str)=>{

  if(typeof str !== "string"){
      return "";
  }
  return str.slice(0,1).toUpperCase() + str.slice(1)
}
