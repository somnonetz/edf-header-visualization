import React, { useState } from 'react';
import edfHeader from './edf-header';
// import './open-color.css';
import './App.css';

/*
  == EDF Structure ==

  STATIC HEADER RECORD
  --------------------
  8 ascii  : version of this data format (0)
  80 ascii : local patient identification
  80 ascii : local recording identification
  8 ascii  : startdate of recording (dd.mm.yy)
  8 ascii  : starttime of recording (hh.mm.ss)
  8 ascii  : number of bytes in header record
  44 ascii : reserved
  8 ascii  : number of data records
  8 ascii  : duration of a data record, in seconds
  4 ascii  : number of signals (ns) in data record

  DYNAMIC HEADER RECORD
  ---------------------
  ns * 16 ascii : ns * label (e.g. EEG Fpz-Cz or Body temp)
  ns * 80 ascii : ns * transducer type (e.g. AgAgCl electrode)
  ns * 8 ascii  : ns * physical dimension (e.g. uV or degreeC)
  ns * 8 ascii  : ns * physical minimum (e.g. -500 or 34)
  ns * 8 ascii  : ns * physical maximum (e.g. 500 or 40)
  ns * 8 ascii  : ns * digital minimum (e.g. -2048)
  ns * 8 ascii  : ns * digital maximum (e.g. 2047)
  ns * 80 ascii : ns * prefiltering (e.g. HP:0.1Hz LP:75Hz)
  ns * 8 ascii  : ns * nr of samples in each data record
  ns * 32 ascii : ns * reserved

  DATA RECORD
  -----------
  nr of samples[1] * integer : first signal in the data record
  nr of samples[2] * integer : second signal
  ..
  nr of samples[ns] * integer : last signal
*/

const staticFields = [ /* eslint-disable no-multi-spaces, key-spacing */
  { name: 'version',               size:  8, description: 'version of this data format' },
  { name: 'patientIdentification', size: 80, description: 'local patient identification' },
  { name: 'recordIdentification',  size: 80, description: 'local recording identification' },
  { name: 'startDate',             size:  8, description: 'startdate of recording (dd.mm.yy)' },
  { name: 'startTime',             size:  8, description: 'starttime of recording (hh.mm.ss)' },
  { name: 'recordHeaderByteSize',  size:  8, description: 'number of bytes in header record' },
  { name: 'staticReserved',        size: 44, description: 'reserved' },
  { name: 'numberOfDataRecords',   size:  8, description: 'number of data records' },
  { name: 'recordDurationTime',    size:  8, description: 'duration of a data record, in seconds' },
  { name: 'numberOfSignals',       size:  4, description: 'number of signals (ns) in data record' },
]; /* eslint-enable no-multi-spaces, key-spacing */

const dynamicFields = [ /* eslint-disable no-multi-spaces, key-spacing */
  { name: 'label',             size: 16, description: 'label' },
  { name: 'transducerType',    size: 80, description: 'transducer type' },
  { name: 'physicalDimension', size:  8, description: 'physical dimension' },
  { name: 'physicalMinimum',   size:  8, description: 'physical minimum' },
  { name: 'physicalMaximum',   size:  8, description: 'physical maximum' },
  { name: 'digitalMinimum',    size:  8, description: 'digital minimum' },
  { name: 'digitalMaximum',    size:  8, description: 'digital maximum' },
  { name: 'preFiltering',      size: 80, description: 'prefiltering' },
  { name: 'numberOfSamples',   size:  8, description: 'nr of samples in each data record' },
  { name: 'dynamicReserved',   size: 32, description: 'reserved' },
]; /* eslint-enable no-multi-spaces, key-spacing */

const numberOfSignals = +edfHeader.substr(252,4);
const channelNames = Array.from(new Array(numberOfSignals)).map((val, index) => `channel-${index + 1}`);
const parsedHeader = parseHeader(edfHeader);

function parseHeader(header) {
  let currentColor = 0;
  let index = 0;
  let result = [];

  staticFields.forEach((field) => {
    for (let i = 0; i < field.size; i++) {
      const className = `static-header ${field.name} c${currentColor}`;
      const value = header[index];
      result.push({ className, value });
      index += 1;
    }
    currentColor = (currentColor + 1) % 10;
  });

  dynamicFields.forEach((field) => {
    for (let channel = 1; channel <= numberOfSignals; channel++) { // starts with 1
      for (let i = 0; i < field.size; i++) {
        const className = `dynamic-header channel-${channel} ${field.name} c${currentColor}`;
        const value = header[index];
        result.push({ className, value });
        index += 1;
      }
      currentColor = (currentColor + 1) % Math.min(numberOfSignals, 10);
    }
  });

  return result;
}

function App() {
  const [hoveredItem, setHoveredItem] = useState('NONE');
  return (
    <div className="App">
      <h1>EDF Structure</h1>
      <Grid hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
      <Legend hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
    </div>
  );
}

function Grid({ hoveredItem, setHoveredItem }) {
  return (
    <div className="edf-grid colorable" onMouseLeave={() => setHoveredItem('NONE')}>
      {parsedHeader.map(({ className, value }, index) =>
        <span
          key={index}
          className={`${className} ${className.includes(hoveredItem) ? 'active' : ''}`}
          onMouseOver={() => setHoveredItem(className)}
        >
          {value}
        </span>
      )}
    </div>
  );
}

function Legend({ hoveredItem, setHoveredItem }) {
  return (
    <div className={`legend flex ${hoveredItem}`} onMouseLeave={() => setHoveredItem('NONE')}>
      <div>
        <h2
          onMouseOver={() => setHoveredItem('static-header')}
          className={`${hoveredItem.includes('static-header') ? 'active' : ''}`}
        >
          static header
        </h2>
        <h3>&nbsp;</h3>
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
      <div style={{ flex: 2 }}>
        <h2
          onMouseOver={() => setHoveredItem('dynamic-header')}
          className={`${hoveredItem.includes('dynamic-header') ? 'active' : ''}`}
        >
          dynamic header
        </h2>
        <div className="flex">
          <div>
            <h3>part</h3>
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
            <h3>channels</h3>
            <ul className="colorable">
              {channelNames.map((name, index) =>
                <li
                  key={name}
                  className={`${name} ${hoveredItem.includes(name) ? 'active' : ''}`}
                  onMouseOver={() => setHoveredItem(name)}
                >
                  {name} <span className={`color-bubble c${index % numberOfSignals}`} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
