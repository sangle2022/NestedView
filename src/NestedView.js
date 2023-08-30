import React, { useState } from 'react';

function TagView({ tag, setTag }) {
  const [collapsed, setCollapsed] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(tag.name);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleAddChild = () => {
    const newChild = { name: 'New Child', data: 'Data' };
    if (!tag.children) {
      setTag({ ...tag, children: [newChild] });
    } else {
      setTag({ ...tag, children: [...tag.children, newChild] });
    }
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameEnter = (event) => {
    if (event.key === 'Enter') {
      setTag({ ...tag, name: newName });
      setEditingName(false);
    }
  };

  const handleDataChange = (event) => {
    setTag({ ...tag, data: event.target.value });
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={toggleCollapse}>{collapsed ? '>' : 'v'}</button>
        {editingName ? (
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            onKeyDown={handleNameEnter}
            onBlur={() => setEditingName(false)}
          />
        ) : (
          <span onClick={handleEditName} className="tag-name">
            {tag.name}
          </span>
        )}
      </div>
      {!collapsed && (
        <div className="tag-content">
          {tag.data !== undefined && (
            <input type="text" value={tag.data} onChange={handleDataChange} />
          )}
          {tag.children &&
            tag.children.map((child, index) => (
              <TagView key={index} tag={child} setTag={(newChild) => setTag({ ...tag, children: tag.children.map((c, i) => (i === index ? newChild : c)) })} />
            ))}
        </div>
      )}
      <button className="add-child" onClick={handleAddChild}>
        Add Child
      </button>
    </div>
  );
}

export default TagView;
