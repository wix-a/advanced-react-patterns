// Build Accordion

import React from 'react'
import useId from '../use-id'

function AccordionItem({openIndex, expand, itemIndex, id, item}) {
  const isExpanded = openIndex === itemIndex
  const labelId = `accordion-control-${id}-${itemIndex}`
  const contentId = `content-${id}-${itemIndex}`

  return (
    <React.Fragment>
      <AccordionButton
        expand={expand}
        isExpanded={isExpanded}
        labelId={labelId}
        contentId={contentId}
      >
        {item.title}
      </AccordionButton>
      <AccordionContents
        isExpanded={isExpanded}
        labelId={labelId}
        contentId={contentId}
      >
        {item.content}
      </AccordionContents>
    </React.Fragment>
  )
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

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          item={item}
          itemIndex={index}
          expand={() => setOpenIndex(index)}
          id={id}
          openIndex={openIndex}
        />
      ))}
    </div>
  )
}

function Usage() {
  const items = [
    {
      title: 'useState',
      content: (
        <p>{`Returns a stateful value, and a function to update it.`}</p>
      ),
    },
    {
      title: 'useEffect',
      content: (
        <p>{`Accepts a function that contains imperative, possibly effectful code.`}</p>
      ),
    },
    {
      title: 'useContext',
      content: (
        <p>{`Accepts a context object (the value returned from React.createContext) and returns the current context value for that context.`}</p>
      ),
    },
  ]
  return (
    <div className="accordion-wrapper">
      <Accordion items={items} />
    </div>
  )
}
Usage.title = 'Build Accordion'

export default Usage
