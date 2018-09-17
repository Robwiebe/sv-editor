import React from 'react'
import { Editor } from 'slate-react'
// import { Value } from 'slate'
import './App.css'
import Toolbar from './components/Toolbar'
import Inputs1 from './components/Inputs1'
import Inputs2 from './components/Inputs2'
// import SVLogo from './images/SVReader.png'
import Html from 'slate-html-serializer'
import Data from './data/English.json'
import Language from './components/LanguageInput'
import SaveButton from './components/SaveButton'
import axios from 'axios'

const DEFAULT_NODE = 'paragraph'

const initialValue = localStorage.getItem('html') || '<p></p>'
//----------------------------------------
//--------------- RULES ------------------
//----------------------------------------
// Add a dictionary of Block tags.
const BLOCK_TAGS = {
  p: 'paragraph',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
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
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
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
      if (obj.object === 'block') {
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
      if (obj.object === 'mark') {
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
//----------------------------------------
//----- SERIALIZING & LOCALSTORAGE -------
//----------------------------------------
// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules })

// Load the initial value from Local Storage or a default.
// const initialValue = this.state.savedData.html || `<p></p>`

//----------------------------------------
//----------- RENDERING JSX --------------
//----------------------------------------
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

//----------------------------------------
//-------------- HOTKEYS -----------------
//----------------------------------------
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

//----------------------------------------
//---------------- APP -------------------
//----------------------------------------
// Define our app...
class App extends React.Component {
  state = {
    value: html.deserialize(initialValue),
    data: Data[132],
    savedData: ""
  }

//----------------------------------------
//----------- INPUT FIELDS ---------------
//----------------------------------------
  

  onChange = ({ value }) => {
    // When the document changes, save the serialized HTML to Local Storage.
    if (value.document !== this.state.value.document) {
      const string = html.serialize(value)
      this.setState({html: string})
    }

    this.setState({ value })
    console.log(this.state)
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
  
  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type == type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type == type)
  }

    // Function to set state and local storage when story selected from dropdown menu
  handleChange = async e => {
    const storyNum = parseInt(e.target.value) + 300;
    this.setState({data: Data[parseInt(e.target.value)]})
    await axios.get(`https://sourceview-reader.firebaseio.com/${this.state.language}/${storyNum}.json`)
      .then(response => {
        this.setState({
          savedData: response.data
        });
      }) 
    console.log(this.state)
    this.setState({
        value: html.deserialize(this.state.savedData.html)
      })
    
    };
      
  
    // this.setState({
    //   story: storyNum,
    //   data: Data[e.target.value],
    // })
    // if (this.state.savedData === undefined) {
    //   console.log('No data saved for this story yet')
    // } else {
    //   console.log(this.state.savedData);
    // }
    // localStorage.setItem('story', storyNum)
    // localStorage.setItem('title', this.state.savedData.title || null)
    // localStorage.setItem('bookId', this.state.savedData.bookId)
    // localStorage.setItem('bookName', Data[e.target.value].bookName)
    // localStorage.setItem('ref', Data[e.target.value].ref)
    // localStorage.setItem('prevPath', Data[e.target.value].prevPath)
    // localStorage.setItem('path', Data[e.target.value].path)
    // localStorage.setItem('nextPath', Data[e.target.value].nextPath)
    // localStorage.setItem('display', Data[e.target.value].display)
    // localStorage.setItem('questionsTitle', Data[e.target.value].questionsTitle)
    // localStorage.setItem('Question1', Data[e.target.value].Question1)
    // localStorage.setItem('Question2', Data[e.target.value].Question2)
    // localStorage.setItem('Question3', Data[e.target.value].Question3)
    // localStorage.setItem('Question4', Data[e.target.value].Question4)
// };

  languageChange = e => {
    this.setState({language: e.target.value})
    // localStorage.setItem('language', e.target.value)
  }

  // Render the editor.
  render() {
    // localStorage.clear();
    return (
    <div style={{
      margin: '0',
      paddingTop: '0px'}}>
      <p 
        style={{
            color: 'Black',
            fontSize: '20px',
            textAlign:'center',
            marginTop: '150px'
        }}>Commands:</p>
      <hr style={{width: '120px', margin: '0 auto'}}/>
      <p
        style={{
          color: 'Black',
          fontSize: '20px',
          textAlign:'center',
      }}><span style={{color: 'darkblue'}}>CTRL + ENTER</span>  =  Paragraph break (within the same colored text)</p><br />
      <hr  style={{width: '420px', margin: '0 auto', border: 'solid 2px'}}/>
      <br />
      <Toolbar
          chapter={event => this.onClickMark(event, 'bold')}
          verse={event => this.onClickMark(event, 'underline')}
          black={event => this.onClickBlock(event, 'p')}
          source={event => this.onClickBlock(event, 'h1')}
          red={event => this.onClickBlock(event, 'h2')}
          green={event => this.onClickBlock(event, 'h3')}
          blue={event => this.onClickBlock(event, 'h4')}
          footnote={event => this.onClickBlock(event, 'h5')}
          subtitle={event => this.onClickBlock(event, 'h6')}
      />
      <div style={{
        margin: '0 auto 20px auto',
        textAlign: 'center'
      }}>
        <Language 
          languageChange={this.languageChange}
        />
        <Inputs1 
          storyNum={this.state.data.story}
          display={this.state.data.display}
          reference={this.state.data.ref}
          title={this.state.data.title}
          bookName={this.state.data.bookName}
          handleChange={this.handleChange}
        />
      </div>
      <Editor 
        style={{
          width: '80%',
          height: 'fit-content',
          minHeight: '300px',
          border: '2px solid',
          margin: '0 auto 0 auto',
          marginBottom: '50px',
          padding: '5px'
        }}
        placeholder="Paste Your Bible text here..."
        plugins={plugins}
        value={this.state.value} 
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        renderNode={this.renderNode}
        renderMark={this.renderMark} />
        <div style={{
          width: '80%',
          margin: '0 auto 20px auto',
          textAlign: 'left'
        }}>
          <Inputs2 
            display={this.state.data.display}
            questionsTitle={this.state.data.questionsTitle}
            Question1={this.state.data.Question1}
            Question2={this.state.data.Question2}
            Question3={this.state.data.Question3}
            Question4={this.state.data.Question4}
          />
          <hr />
          <SaveButton 
            currentState={this.state.savedData}
            language={localStorage.getItem('language')}
            story={localStorage.getItem('story')}
            display={localStorage.getItem('display')}
            bookId={localStorage.getItem('bookId')}
            bookName={localStorage.getItem('bookName')}
            reference={localStorage.getItem('ref')}
            prevPath={localStorage.getItem('prevPath')}
            nextPath={localStorage.getItem('nextPath')}
            path={localStorage.getItem('path')}
            html={localStorage.getItem('html')}
            questionsTitle={localStorage.getItem('questionsTitle')}
            Q1={localStorage.getItem('Question1')}
            Q2={localStorage.getItem('Question2')}
            Q3={localStorage.getItem('Question3')}
            Q4={localStorage.getItem('Question4')}
            />
        </div>
    </div>
    )}

    /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(
            type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        change.setBlocks('list-item').wrapBlock(type)
      }
    }

    this.onChange(change)
  }

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
 