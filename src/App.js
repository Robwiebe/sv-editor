import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import './App.css'
import Toolbar from './components/Toolbar'
import SVLogo from './images/SVReader.png'
import Html from 'slate-html-serializer'

//----------------------------------------
//--------------- RULES ------------------
//----------------------------------------
// Add a dictionary of Block tags.
const BLOCK_TAGS = {
  p: 'paragraph',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  pre: 'code',
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
  strong: 'bold',
  u: 'underline',
}

const rules = [
  // Add our first rule with a deserializing function.
  {
    deserialize(el, next) {
      if (el.tagName.toLowerCase() == 'p') {
        return {
          object: 'block',
          type: 'paragraph',
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    // Add a serializing function property to our rule...
    // Switch serialize to handle more blocks...
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'p':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'h1':
            return <h1>{children}</h1>
          case 'h2':
            return <h2>{children}</h2>
          case 'h3':
            return <h3>{children}</h3>
          case 'h4':
            return <h4>{children}</h4>
          case 'h5':
            return <h5>{children}</h5>
          case 'h6':
            return <h6>{children}</h6>
        }
      }
    },
  },
  // Add a new rule that handles marks...
  {
      deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
          return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
          }
      }
      },
      serialize(obj, children) {
      if (obj.object == 'mark') {
          switch (obj.type) {
          case 'bold':
              return <strong>{children}</strong>
          case 'underline':
              return <u>{children}</u>
          }
      }
      },
  },
]

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules })

// Load the initial value from Local Storage or a default.
const initialValue = localStorage.getItem('content') || '<p></p>'

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
      <img style={{
        marginLeft: '40%',
        width: '20%',
        height: 'auto'
      }} src={SVLogo} alt='SourceView Reader' />
      <p 
            style={{
                color: 'Black',
                fontSize: '20px',
                textAlign:'center'
            }}>EDITOR<br/><br />Commands:<br /><br />CTRL + B  =  Chapter<br />CTRL + U  =  Verse<br />CTRL + 1  =  Source<br />CTRL + P  =  Black Text<br />CTRL + 2  =  Red Speech Bubble<br />CTRL + 3  =  Green Speech Bubble<br />CTRL + 4  =  Blue Speech Bubble<br />CTRL + 5  =  Footnote<br />CTRL + 6  =  Subtitle<br />CTRL + ENTER  =  Paragraph break (within the same colored text)</p><br />
      <Toolbar />
      {children}
    </div>
  )
}

// Define our app...
class App extends React.Component {
  state = {
    value: html.deserialize(initialValue),
  }

  onChange = ({ value }) => {
    // When the document changes, save the serialized HTML to Local Storage.
    if (value.document != this.state.value.document) {
      const string = html.serialize(value)
      localStorage.setItem('content', string)
    }

    this.setState({ value })
  }

  // applyFormat = (id, change ) => {
  //   if (id === 'Chapter') {
  //     change.toggleMark('bold')
  //     return true
  //   }
  // }
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
 