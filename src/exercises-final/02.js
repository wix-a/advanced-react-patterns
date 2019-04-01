// Compound Components with an Accordion

import React from 'react'
import useId from '../use-id'

function AccordionItem({openIndex, expand, itemIndex, id, children}) {
  const isExpanded = openIndex === itemIndex
  const labelId = `accordion-control-${id}-${itemIndex}`
  const contentId = `content-${id}-${itemIndex}`

  const newChildren = React.Children.map(children, child => {
    if (child.type === AccordionButton) {
      return React.cloneElement(child, {
        expand,
        isExpanded,
        labelId,
        contentId,
      })
    } else if (child.type === AccordionContents) {
      return React.cloneElement(child, {
        isExpanded,
        labelId,
        contentId,
      })
    }
    return child
  })
  return newChildren
}

function AccordionButton({
  openIndex,
  expand,
  isExpanded,
  contentId,
  labelId,
  ...props
}) {
  return (
    <button
      className="accordion-control"
      aria-controls={contentId}
      aria-expanded={isExpanded}
      id={labelId}
      onClick={expand}
      {...props}
    />
  )
}

function AccordionContents({isExpanded, labelId, contentId, ...props}) {
  return (
    <div
      className="accordion-contents"
      role="region"
      aria-hidden={!isExpanded}
      aria-labelledby={labelId}
      id={contentId}
      {...props}
    />
  )
}

function Accordion({items, children}) {
  const [openIndex, setOpenIndex] = React.useState(-1)
  const id = useId()

  const newChildren = React.Children.map(children, (child, index) => {
    if (child.type === AccordionItem) {
      return React.cloneElement(child, {
        openIndex,
        expand: () => setOpenIndex(index),
        itemIndex: index,
        id,
      })
    }
    return child
  })

  return <div className="accordion">{newChildren}</div>
}

function Usage() {
  return (
    <div className="accordion-wrapper">
      <Accordion>
        <AccordionItem>
          <AccordionButton style={{color: 'red'}}>useState</AccordionButton>
          <AccordionContents>
            <p>{`Returns a stateful value, and a function to update it.`}</p>
          </AccordionContents>
        </AccordionItem>
        <AccordionItem>
          <AccordionContents>
            <p>{`Accepts a function that contains imperative, possibly effectful code.`}</p>
          </AccordionContents>
          <AccordionButton>useEffect</AccordionButton>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>useContext</AccordionButton>
          <span>{`(This one is special)`}</span>
          <AccordionContents>
            <p>{`Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.`}</p>
          </AccordionContents>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
Usage.title = 'Build Accordion'

export default Usage
