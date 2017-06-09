export default function rafDebounce (fn) {
  let rafScheduled = false

  let fnWrapper = () => {
    fn()
    rafScheduled = false
  }

  return {
    request () {
      if (!rafScheduled) {
        requestAnimationFrame(fnWrapper)
        rafScheduled = true
      }
    }
  }
}
