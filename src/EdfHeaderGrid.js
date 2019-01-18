import React, { useMemo } from 'react';
import { parseHeader } from './header-data';

export default function EdfHeaderGrid({ edfHeader, hoveredItem, setHoveredItem }) {
  const parsedHeader = useMemo(() => parseHeader(edfHeader), [edfHeader]);
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
