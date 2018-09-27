import React from 'react'

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