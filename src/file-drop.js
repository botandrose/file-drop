/**
 * File Drop Component
 *
 * A vanilla JS custom element for drag-and-drop file handling.
 * Provides drag-and-drop interface that assigns files to a target input element.
 *
 * Usage:
 *   <file-drop for="file-input">Drop files here</file-drop>
 *   <input type="file" id="file-input" multiple>
 *
 * Features:
 * - Drag and drop file handling
 * - Click to open file picker
 * - Visual feedback during drag operations
 * - Framework-agnostic vanilla JS
 */

class FileDrop extends HTMLElement {
  constructor() {
    super()
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  static get observedAttributes() {
    return ['for']
  }

  connectedCallback() {
    this.addEventListener('dragover', this.handleDragOver)
    this.addEventListener('dragleave', this.handleDragLeave)
    this.addEventListener('drop', this.handleDrop)
    this.applyDefaultStyles()
  }

  disconnectedCallback() {
    this.removeEventListener('dragover', this.handleDragOver)
    this.removeEventListener('dragleave', this.handleDragLeave)
    this.removeEventListener('drop', this.handleDrop)
  }

  get fileTarget() {
    const forValue = this.getAttribute('for')
    if (!forValue) return null
    return document.querySelector(`#${forValue}`)
  }


  handleDragOver(event) {
    event.preventDefault()
    this.classList.add('-dragover')
  }

  handleDragLeave() {
    this.classList.remove('-dragover')
  }

  handleDrop(event) {
    event.preventDefault()
    this.classList.remove('-dragover')

    const target = this.fileTarget
    if (target && event.dataTransfer.files.length > 0) {
      target.files = event.dataTransfer.files
      const changeEvent = new Event('change', { bubbles: true })
      target.dispatchEvent(changeEvent)
    }
  }

  applyDefaultStyles() {
    if (!this.hasAttribute('data-no-default-styles')) {
      const styles = `
        file-drop {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          min-height: 60px;
          outline-offset: -10px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.25);
          text-align: center;
          transition: all 0.15s ease 0s;
          outline: rgba(0, 0, 0, 0.25) dashed 2px;
          font-size: 13px;
        }

        file-drop.-dragover {
          background: rgba(0, 0, 0, 0.1);
          outline-color: rgba(0, 0, 0, 0.5);
        }
      `

      if (!document.querySelector('#file-drop-default-styles')) {
        const styleElement = document.createElement('style')
        styleElement.id = 'file-drop-default-styles'
        styleElement.textContent = styles
        document.head.appendChild(styleElement)
      }
    }
  }
}

// Auto-register the custom element
if (!customElements.get('file-drop')) {
  customElements.define('file-drop', FileDrop)
}

export { FileDrop }