import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { EdfHeaderGrid, EdfHeaderLegend } from 'edf-header-visualization';
import FileResource from './FileResource';
import defaultHeader from './edf-header';

export default function EdfHeaderVisualization() {
  const [hoveredItem, setHoveredItem] = useState('NONE');
  const [edfHeader, seEdftHeader] = useState(defaultHeader);
  const props = { edfHeader, hoveredItem, setHoveredItem };

  const onDrop = async (files = []) => {
    const resource = new FileResource(files[0]);
    const staticHeader = await resource.read({ from: 0, till: 256 });
    const numberOfSignals = +staticHeader.substr(252, 4);
    const dynamicHeader = await resource.read({ from: 256, till: 256 + numberOfSignals * 256 });
    seEdftHeader(staticHeader + dynamicHeader);
  };

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
            <input {...getInputProps()} />
            This tools aims to help you understand EDFs static and dynamic header.<br />
            You can inspect own files by <strong>clicking this area</strong> or <strong>dropping them onto it</strong>.
          </div>
        )}
      </Dropzone>
      <div className="edf-header-visualization flex">
        <EdfHeaderGrid {...props} />
        <EdfHeaderLegend {...props} />
      </div>
    </>
  );
}
