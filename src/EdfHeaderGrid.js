import React from 'react';

export default function EdfHeaderGrid({ parsedHeader, hoveredItem, setHoveredItem }) {
  return (
    <div className="edf-grid colorable" onMouseLeave={() => setHoveredItem('NONE')}>
      {parsedHeader.map(({ className, value }, index) =>
        <code
          key={index}
          className={`${className} ${className.includes(hoveredItem) ? 'active' : ''}`}
          onMouseOver={() => setHoveredItem(className)}
        >
          {value}
        </code>
      )}
    </div>
  );
}
