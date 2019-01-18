import React, { useState, useMemo } from 'react';
import { parseHeader } from './header-data';
import EdfHeaderGrid from './EdfHeaderGrid';
import EdfHeaderLegend from './EdfHeaderLegend';
import './index.css';

const getChannelNames = (edfHeader) => {
  const numberOfSignals = +edfHeader.substr(252, 4);
  return Array.from(new Array(numberOfSignals)).map((val, index) => `channel-${index + 1}`);
};

function EdfHeaderVisualization({ edfHeader }) {
  const parsedHeader = useMemo(() => parseHeader(edfHeader), [edfHeader]);
  const channelNames = useMemo(() => getChannelNames(edfHeader), [edfHeader]);
  const [hoveredItem, setHoveredItem] = useState('NONE');
  const props = { hoveredItem, setHoveredItem };

  return (
    <div className="edf-header-visualization">
      <EdfHeaderGrid parsedHeader={parsedHeader} {...props} />
      <EdfHeaderLegend channelNames={channelNames} {...props} />
    </div>
  );
}

export { EdfHeaderVisualization, EdfHeaderGrid, EdfHeaderLegend, parseHeader };
