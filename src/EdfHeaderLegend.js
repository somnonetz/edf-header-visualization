import React, { useMemo } from 'react';
import { staticFields, dynamicFields } from './header-data';

const getChannelNames = (edfHeader) => {
  const numberOfSignals = +edfHeader.substr(252, 4);
  return Array.from(new Array(numberOfSignals)).map((val, index) => `channel-${index + 1}`);
};

export default function EdfHeaderLegend({ edfHeader, hoveredItem, setHoveredItem }) {
  const channelNames = useMemo(() => getChannelNames(edfHeader), [edfHeader]);
  return (
    <div className={`edf-legend edf-flex ${hoveredItem}`} onMouseLeave={() => setHoveredItem('NONE')}>
      <div className="container-static">
        <h2
          onMouseOver={() => setHoveredItem('static-header')}
          className={`${hoveredItem.includes('static-header') ? 'active' : ''}`}
        >
          Static Header
        </h2>
        <ul>
          {staticFields.map(field =>
            <li
              key={field.name}
              className={`${field.name} ${hoveredItem.includes(field.name) ? 'active' : ''}`}
              onMouseOver={() => setHoveredItem(field.name)}
            >
                {field.description}
            </li>
          )}
        </ul>
      </div>
      <div className="container-dynamic">
        <h2
          onMouseOver={() => setHoveredItem('dynamic-header')}
          className={`${hoveredItem.includes('dynamic-header') ? 'active' : ''}`}
        >
          Dynamic Header
        </h2>
        <div className="edf-flex">
          <div>
            <h3>Parts</h3>
            <ul>
              {dynamicFields.map(field =>
                <li
                  key={field.name}
                  className={`${field.name} ${hoveredItem.includes(field.name) ? 'active' : ''}`}
                  onMouseOver={() => setHoveredItem(field.name)}
                >
                    {field.description}
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3>Channels</h3>
            <ul className="colorable">
              {channelNames.map((name, index) =>
                <li
                  key={name}
                  className={`${name} ${hoveredItem.includes(name) ? 'active' : ''} c${index % Math.min(channelNames.length, 10)}`}
                  onMouseOver={() => setHoveredItem(name)}
                >
                  {name} <code className="color-bubble" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
