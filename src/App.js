import React, { useState } from 'react';
import TagView from './NestedView';

function App() {
  const [tree, setTree] = useState({
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' },
        ],
      },
      { name: 'child2', data: 'c2 World' },
    ],
  });

  const handleExport = () => {
    const exportedData = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    console.log(exportedData); 
  };

  return (
    <div className="App">
      <TagView tag={tree} setTag={setTree} />
      <button onClick={handleExport}>Export</button>
    </div>
  );
}

export default App;
