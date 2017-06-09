import { Viewport, ContentBox } from './Box'

function VirtualState (viewportEl, contentEl, items, itemHeight, bufferSize) {
  this.viewport = new Viewport(viewportEl)
  this.contentBox = new ContentBox(contentEl, items, itemHeight)

  let state = {
    contentHeight: 0,
    topOffset: 0,
    items: []
  }

  this.calculate = function () {
    if (itemHeight <= 0) {
      return state
    }

    let absTopOffset = this.viewport.size().top - this.contentBox.size().top + this.viewport.getScrollTop()
    let visibleHeight = Math.min(this.viewport.size().height, this.viewport.size().height + absTopOffset)

    let visibleItemsCount = Math.ceil(visibleHeight / itemHeight) + 1
    let startIdx = Math.max(0, Math.floor(absTopOffset / itemHeight))
    let endIdx = startIdx + visibleItemsCount

    if (bufferSize) {
      startIdx = Math.max(0, startIdx - bufferSize)
      endIdx = endIdx + bufferSize
    }

    state.contentHeight = this.contentBox.size().height
    state.topOffset = startIdx * itemHeight
    state.items = items.slice(startIdx, endIdx)

    return state
  }

  this.reset = function () {
    this.viewport.reset()
    this.contentBox.reset()
  }
}

export default VirtualState
