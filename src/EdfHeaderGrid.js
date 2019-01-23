import React, { useMemo } from 'react';
import { parseHeader } from './header-data';

const Header = React.memo(({ groups, name, setHoveredItem }) => (
  <div className={`header ${name}`}>
    {groups.map(({ name = '', channel = '', color = 1, values = [] }) =>
      <div key={`${name}-${channel}`} className={`group ${name} ${channel} c${color}`} onMouseOver={() => setHoveredItem(`${name} ${channel}`)}>
        {values.map((char, i) => <code key={i}>{char}</code>)}
      </div>
    )}
  </div>
));

const EdfHeaderGrid = ({ edfHeader, hoveredItem, setHoveredItem }) => {
  const parsedHeader = useMemo(() => parseHeader(edfHeader), [edfHeader]);
  return (
    <div className={`edf-grid ${hoveredItem}`} onMouseLeave={() => setHoveredItem('NONE')}>
      <Header groups={parsedHeader.staticHeader} name="static-header" setHoveredItem={setHoveredItem} />
      <Header groups={parsedHeader.dynamicHeader} name="dynamic-header" setHoveredItem={setHoveredItem} />
    </div>
  );
};

export default EdfHeaderGrid;
