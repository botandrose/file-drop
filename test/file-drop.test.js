import { expect } from '@esm-bundle/chai'
import '../src/file-drop.js'

describe('FileDrop', () => {
  let fileDrop
  let fileInput
  let container

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <file-drop for="test-input">Drop files here</file-drop>
      <input type="file" id="test-input" multiple>
    `
    document.body.appendChild(container)
    fileDrop = container.querySelector('file-drop')
    fileInput = container.querySelector('#test-input')
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('initialization', () => {
    it('should be defined as a custom element', () => {
      expect(customElements.get('file-drop')).to.exist
    })

    it('should create file-drop elements', () => {
      expect(fileDrop).to.be.an.instanceof(HTMLElement)
      expect(fileDrop.tagName.toLowerCase()).to.equal('file-drop')
    })

    it('should find the target input element', () => {
      expect(fileDrop.fileTarget).to.equal(fileInput)
    })

    it('should return null if no target input found', () => {
      fileDrop.setAttribute('for', 'nonexistent')
      expect(fileDrop.fileTarget).to.be.null
    })
  })


  describe('drag and drop', () => {
    let dragOverEvent
    let dragLeaveEvent
    let dropEvent
    let mockFiles

    beforeEach(() => {
      mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' })
      ]

      dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer()
      })

      dragLeaveEvent = new DragEvent('dragleave', {
        bubbles: true,
        cancelable: true
      })

      dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer()
      })

      // Add files to drop event
      mockFiles.forEach(file => {
        dropEvent.dataTransfer.items.add(file)
      })
    })

    it('should add dragover class on dragover', () => {
      fileDrop.dispatchEvent(dragOverEvent)
      expect(fileDrop.classList.contains('-dragover')).to.be.true
    })

    it('should prevent default on dragover', () => {
      let defaultPrevented = false
      dragOverEvent.preventDefault = () => { defaultPrevented = true }

      fileDrop.dispatchEvent(dragOverEvent)
      expect(defaultPrevented).to.be.true
    })

    it('should remove dragover class on dragleave', () => {
      fileDrop.classList.add('-dragover')
      fileDrop.dispatchEvent(dragLeaveEvent)
      expect(fileDrop.classList.contains('-dragover')).to.be.false
    })

    it('should remove dragover class on drop', () => {
      fileDrop.classList.add('-dragover')
      fileDrop.dispatchEvent(dropEvent)
      expect(fileDrop.classList.contains('-dragover')).to.be.false
    })

    it('should prevent default on drop', () => {
      let defaultPrevented = false
      dropEvent.preventDefault = () => { defaultPrevented = true }

      fileDrop.dispatchEvent(dropEvent)
      expect(defaultPrevented).to.be.true
    })

    it('should assign files to target input on drop', () => {
      fileDrop.dispatchEvent(dropEvent)
      expect(fileInput.files.length).to.equal(mockFiles.length)
    })

    it('should dispatch change event on target input after drop', (done) => {
      fileInput.addEventListener('change', (e) => {
        expect(e.bubbles).to.be.true
        done()
      })

      fileDrop.dispatchEvent(dropEvent)
    })
  })

  describe('styling', () => {
    it('should inject default styles by default', () => {
      const styleElement = document.querySelector('#file-drop-default-styles')
      expect(styleElement).to.exist
      expect(styleElement.textContent).to.include('file-drop')
    })

    it('should not inject styles when data-no-default-styles is present', () => {
      // Remove existing styles first
      const existingStyles = document.querySelector('#file-drop-default-styles')
      if (existingStyles) {
        existingStyles.remove()
      }

      const customFileDrop = document.createElement('file-drop')
      customFileDrop.setAttribute('data-no-default-styles', '')
      customFileDrop.setAttribute('for', 'test-input')
      container.appendChild(customFileDrop)

      const styleElement = document.querySelector('#file-drop-default-styles')
      expect(styleElement).to.not.exist
    })
  })

  describe('attribute changes', () => {
    it('should observe for attribute changes', () => {
      expect(fileDrop.constructor.observedAttributes).to.include('for')
    })
  })

  describe('cleanup', () => {
    it('should disconnect properly', () => {
      fileDrop.remove()
      expect(fileDrop.isConnected).to.be.false
    })
  })
})