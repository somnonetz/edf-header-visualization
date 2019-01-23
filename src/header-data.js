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
  { name: 'recordDurationTime',    size:  8, description: 'duration of a data record (seconds)' },
  { name: 'numberOfSignals',       size:  4, description: 'number of signals in data record' },
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
  { name: 'numberOfSamples',   size:  8, description: 'number of samples in each data record' },
  { name: 'dynamicReserved',   size: 32, description: 'reserved' },
]; /* eslint-enable no-multi-spaces, key-spacing */

function parseHeader(header) {
  const numberOfSignals = +header.substr(252, 4);
  let color = 0;
  let index = 0;

  const staticHeader = staticFields.map(({ name, size }) => {
    const values = header.slice(index, index + size).split('');
    index += size;
    color = (color + 1) % 10;
    return { name, values, color };
  });

  const dynamicHeader = [];
  dynamicFields.forEach(({ name, size }) => {
    for (let channel = 1; channel <= numberOfSignals; channel++) { // starts with 1
      const values = header.slice(index, index + size).split('');
      index += size;
      color = (channel - 1) % Math.min(numberOfSignals, 10);
      dynamicHeader.push({ name , channel: `channel-${channel}`, values, color });
    }
  });

  return { staticHeader, dynamicHeader };
}

export { staticFields, dynamicFields, parseHeader };
