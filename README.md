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

export default App;
```

or

```jsx
import React, { useState } from 'react';
import { EdfHeaderGrid, EdfHeaderLegend } from 'edf-header-visualization';
import edfHeader from './edf-header';

export default function App() {
  const [hoveredItem, setHoveredItem] = useState('NONE');
  const props = { edfHeader, hoveredItem, setHoveredItem };
  return (
    <div className="edf-header-visualization">
      <h1>EDF Header Visualization</h1>
      <EdfHeaderLegend {...props} />
      <br />
      <EdfHeaderGrid {...props} />
    </div>
  );
}
```

## Development

### Component

```sh
npm install
npm start    # start rollup watcher
npm publish  # publish to NPM
```

### Example 

```sh
cd example
npm install
npm start      # start dev server
npm run deploy # deploy to Github Pages
```

[npm-badge]: https://img.shields.io/npm/v/edf-header-visualization.svg?style=flat-square
[npm]: https://www.npmjs.com/package/edf-header-visualization
