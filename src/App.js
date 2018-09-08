import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './App.css'
import Toolbar from './components/Toolbar'

const existingValue = JSON.parse(localStorage.getItem('content'))
const initialValue = Value.fromJSON(
  existingValue || {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  }
)

// Define a React component renderer for our h1 blocks.
function Heading1Node(props) {
  return (
    <pre {...props.attributes}>
      <h1>{props.children}</h1>
    </pre>
  )
}

// Define a React component renderer for our h2 blocks.
function Heading2Node(props) {
  return (
    <pre {...props.attributes}>
      <h2>{props.children}</h2>
    </pre>
  )
}

// Define a React component renderer for our h3 blocks.
function Heading3Node(props) {
  return (
    <pre {...props.attributes}>
      <h3>{props.children}</h3>
    </pre>
  )
}

// Define a React component renderer for our h4 blocks.
function Heading4Node(props) {
  return (
    <pre {...props.attributes}>
      <h4>{props.children}</h4>
    </pre>
  )
}

// Define a React component renderer for our h5 blocks.
function Heading5Node(props) {
  return (
    <pre {...props.attributes}>
      <h5>{props.children}</h5>
    </pre>
  )
}

// Define a React component renderer for our h6 blocks.
function Heading6Node(props) {
  return (
    <pre {...props.attributes}>
      <h6>{props.children}</h6>
    </pre>
  )
}
// Define a React component renderer for our p blocks.
function ParagraphNode(props) {
  return (
    <pre {...props.attributes}>
      <p>{props.children}</p>
    </pre>
  )
}

function MarkHotkey(options) {
  const { type, key } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) return

      // Prevent the default characters from being inserted.
      event.preventDefault()

      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    },
  }
}

// Create an array of plugins.
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
];

// Rendering the Editor design
function renderEditor(props) {
  const { children } = props
  return (
    <div>
      <p 
            style={{
                color: 'Black',
                fontSize: '20px',
                textAlign:'center'
            }}>SourceView Bible<br />Editor</p>
      <Toolbar />
      {children}
    </div>
  )
}

// Define our app...
class App extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue,
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
    }

    this.setState({ value })
  }

  // Define a new handler which prints the key that was pressed.
  onKeyDown = (event, change) => {
    if (!event.ctrlKey) {
      // Return with no changes if the keypress is not 'Tab'
      if (event.key === 'Tab') {

      // Prevent the ampersand character from being inserted.
      event.preventDefault()

      // Change the value by inserting '   ' at the cursor's position.
      change.insertText('   ')
      return true
      } return
    }

    // Decide what to do based on the key code...
    switch (event.key) {
      // When "b" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        change.toggleMark('bold')
        return true
      }
      // When "p" is pressed, keep our existing code block logic.
      case 'p': {
        const isP = change.value.blocks.some(block => block.type === 'p')
        event.preventDefault()
        change.setBlocks(isP ? 'paragraph' : 'p')
        return true
      }
      // When "1" is pressed, keep our existing H1 block logic.
      case '1': {
        const isH1 = change.value.blocks.some(block => block.type === 'h1')
        event.preventDefault()
        change.setBlocks(isH1 ? 'paragraph' : 'h1')
        return true
      }
      // When "2" is pressed, keep our existing H2 block logic.
      case '2': {
        const isH2 = change.value.blocks.some(block => block.type === 'h2')
        event.preventDefault()
        change.setBlocks(isH2 ? 'paragraph' : 'h2')
        return true
      }
      // When "3" is pressed, keep our existing H3 block logic.
      case '3': {
        const isH3 = change.value.blocks.some(block => block.type === 'h3')
        event.preventDefault()
        change.setBlocks(isH3 ? 'paragraph' : 'h3')
        return true
      }
      // When "4" is pressed, keep our existing H4 block logic.
      case '4': {
        const isH4 = change.value.blocks.some(block => block.type === 'h4')
        event.preventDefault()
        change.setBlocks(isH4 ? 'paragraph' : 'h4')
        return true
      }
      // When "5" is pressed, keep our existing H5 block logic.
      case '5': {
        const isH5 = change.value.blocks.some(block => block.type === 'h5')
        event.preventDefault()
        change.setBlocks(isH5 ? 'paragraph' : 'h5')
        return true
      }
      // When "6" is pressed, keep our existing H6 block logic.
      case '6': {
        const isH6 = change.value.blocks.some(block => block.type === 'h6')
        event.preventDefault()
        change.setBlocks(isH6 ? 'paragraph' : 'h6')
        return true
      }
      // When "Enter" is pressed, keep our existing H6 block logic.
      case 'Enter': {
        // Prevent the ampersand character from being inserted.
        event.preventDefault()

        // Change the value by inserting '<br />' at the cursor's position.
        change.insertText('\n')
        return true
      }
    }
  }
  
  // Render the editor.
  render() {
    return (
    <div style={{
      margin: '0',
      paddingTop: '0px'}}>
      <Editor 
        style={{
          width: '80%',
          height: 'fit-content',
          minHeight: '300px',
          border: '2px solid',
          margin: '-2px auto 0 auto',
          padding: '5px'
        }}
        renderEditor={renderEditor}
        plugins={plugins}
        value={this.state.value} 
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        renderNode={this.renderNode}
        renderMark={this.renderMark} />
    </div>
    )}

  // Add a `renderNode` method to render blocks.
  renderNode = props => {
    switch (props.node.type) {
      case 'p':
        return <ParagraphNode {...props} />;
      case 'h1':
        return <Heading1Node {...props} />;
      case 'h2':
        return <Heading2Node {...props} />;
      case 'h3':
        return <Heading3Node {...props} />;
      case 'h4':
        return <Heading4Node {...props} />;
      case 'h5':
        return <Heading5Node {...props} />;
      case 'h6':
        return <Heading6Node {...props} />;
    }
  }

  // Add a `renderMark` method to render marks.
  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
    }
  }
}

export default App;
 