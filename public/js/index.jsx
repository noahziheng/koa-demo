const Icon = ({
  type,
  onClick
}) => {
  if (type === 'todo') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1DFaGlNvbeK8jSZPfXXariXXa-200-200.png" onClick={onClick} />;
  } else if (type === 'done') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1yWk11.Y1gK0jSZFCXXcwqXXa-200-200.png" onClick={onClick} />;
  } else if (type === 'delete') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1UEaio3gP7K4jSZFqXXamhVXa-200-200.png" onClick={onClick} />;
  }
  return null;
};

const App = () => {
  const [inputVal, setInputVal] = React.useState('');
  const [itemList, setItemList] = React.useState([
    {
      text: '测试Todo1',
      completed: false
    },
    {
      text: '测试Todo2',
      completed: true
    }
  ]);

  const handleAdd = () => {
    if (!inputVal) {
      alert('Empty input!');
    }
    const newList = itemList.concat([{
      text: inputVal,
      completed: false
    }]);
    setItemList(newList);
    setInputVal('');
  };

  const handleDelete = (i) => {
    setItemList(itemList.filter((_item, j) => i !== j));
  };

  const handleSwitchCompleted = (i) => {
    setItemList(itemList.map((item, j) => i === j ? {
      ...item,
      completed: !item.completed
    } : item));
  };

  return <div className="todoContainer">
    <span className="title">Simple Todo</span>
    <div className="inputView">
      <input type="text" value={inputVal} onChange={(e) => setInputVal(event.target.value)} />
      <button onClick={() => handleAdd()}>Add</button>
    </div>
    <div className="listView">
      {itemList.length ? itemList.map((listItem, i) => {
        return <div className="listItem" key={`listItem${i}`}>
          {listItem.completed ?
            <Icon type="done" onClick={() => handleSwitchCompleted(i)} /> : 
            <Icon type="todo" onClick={() => handleSwitchCompleted(i)} />
          }
          {listItem.completed ? 
            <span className="text-done">{listItem.text}</span> : 
            <span className="text">{listItem.text}</span>
          }
          <Icon type="delete" onClick={() => handleDelete(i)} />
        </div>;
      }) : <span>No Item Data</span>}
    </div>
  </div>;
};

const domContainer = document.querySelector('#app');
console.log('HelloWorld')
ReactDOM.render(<App />, domContainer);