# file-drop

A vanilla JS custom element for drag-and-drop file handling. Provides a drag-and-drop interface that assigns files to a target input element.

## Features

- 🎯 **Framework-agnostic** - Works with any JS framework or vanilla HTML
- 📁 **Drag & Drop** - Native browser drag-and-drop support
- 🎨 **Visual feedback** - Visual state changes during drag operations
- 🔧 **Customizable** - Easily styled with CSS

## Installation

```bash
npm install file-drop
```
or
```html
<script module src="https://unpkg.com/file-drop@latest/dist/file-drop.js"></script>
```

## Usage

### Basic HTML

```html
<file-drop for="file-input">
  Drop files here
</file-drop>
<input type="file" id="file-input" multiple>
```

### With JavaScript module

```javascript
import 'file-drop'

// The custom element is automatically registered
// Just use it in your HTML
```

### Manual registration

```javascript
import { FileDrop } from 'file-drop'

// Register with a custom name if needed
customElements.define('my-file-drop', FileDrop)
```

## Attributes

- `for` - The ID of the target input[type=file] element

## Styling

The element comes with default styles that can be overridden with CSS:

```css
file-drop {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

file-drop:hover {
  border-color: #007bff;
  background-color: #f8f9fa;
}

file-drop.-dragover {
  border-color: #28a745;
  background-color: #d4edda;
}
```

### Disable default styles

Add the `data-no-default-styles` attribute to disable the built-in styles:

```html
<file-drop for="file-input" data-no-default-styles>
  Drop files here
</file-drop>
```

## Events

The component automatically triggers a `change` event on the target input when files are dropped, which integrates seamlessly with existing form handling code.

## Browser Support

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+

## License

MIT
