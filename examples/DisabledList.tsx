import * as React from 'react';
import { List, arrayMove } from '../src/index';

const DisabledList: React.FC = () => {
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);

  return (
    <div
      style={{
        maxWidth: '300px',
        margin: '0px auto',
        backgroundColor: '#F7F7F7',
        padding: '3em'
      }}
    >
      <List
        disabled={true}
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected, isDisabled }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: '1.5em',
              margin: '0.5em 0em',
              listStyleType: 'none',
              cursor: isDragged ? 'grabbing' : isDisabled ? 'default' : 'grab',
              border: '2px solid #CCC',
              boxShadow: '3px 3px #AAA',
              color: isDisabled ? '#888' : '#333',
              borderRadius: '5px',
              outline: isDisabled ? 'none' : undefined,
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor:
                isDragged || isSelected ? '#EEE' : isDisabled ? '#EEE' : '#FFF'
            }}
          >
            {value}
          </li>
        )}
      />
    </div>
  );
};

export default DisabledList;
