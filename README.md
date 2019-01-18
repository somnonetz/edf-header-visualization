# edf-header-visualization [![npm package][npm-badge]][npm]

> Interactively visualize the structure of the static and dynamic header of an EDF file

[![Screenshot](https://raw.githubusercontent.com/edfplus/edf-header-visualization/master/screenshot.png)](https://edfplus.github.io/edf-header-visualization/)

## Install

```sh
npm install edf-header-visualization
```

## Usage

```jsx
import React from 'react';
import { EdfHeaderVisualization } from 'edf-header-visualization';
import edfHeader from './edf-header';

const App = () => <EdfHeaderVisualization edfHeader={edfHeader} />;
```

```jsx
import React from 'react';
import { EdfHeaderGrid, EdfHeaderLegend, parseHeader } from 'edf-header-visualization';
import edfHeader from './edf-header';

/*
  ... your code for `parsedHeader` and `channelNames` ...
 */

const [hoveredItem, setHoveredItem] = useState('NONE');
const props = { hoveredItem, setHoveredItem };

const App = () => (
  <div className="edf-header-visualization">
    <EdfHeaderGrid parsedHeader={parsedHeader} {...props} />
    <EdfHeaderLegend channelNames={channelNames} {...props} />
  </div>
);
```

## Development

### Component

```sh
npm install
npm start
```

### Example 

```sh
cd example
npm start
```

[npm-badge]: https://img.shields.io/npm/v/edf-header-visualization.svg?style=flat-square
[npm]: https://www.npmjs.com/package/edf-header-visualization
