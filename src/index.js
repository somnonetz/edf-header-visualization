import React, { useState } from 'react';
import EdfHeaderGrid from './EdfHeaderGrid';
import EdfHeaderLegend from './EdfHeaderLegend';
import './index.css';

function EdfHeaderVisualization({ edfHeader }) {
  const [hoveredItem, setHoveredItem] = useState('NONE');
  const props = { edfHeader, hoveredItem, setHoveredItem };
  return (
    <div className="edf-header-visualization">
      <EdfHeaderGrid {...props} />
      <EdfHeaderLegend {...props} />
    </div>
  );
}

export { EdfHeaderVisualization, EdfHeaderGrid, EdfHeaderLegend };
