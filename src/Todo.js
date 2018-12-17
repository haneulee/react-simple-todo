// import cx from "classnames";
import React, { Component } from "react";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: { text: "", key: "", done: false },
      allNum: 0,
      comNum: 0
    };
  }
  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now(), done: false };
    this.setState({
      currentItem
    });
  };
  addItem = e => {
    e.preventDefault();

    const newItem = this.state.currentItem;

    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];

      this.setState({
        items: items,
        currentItem: { text: "", key: "", done: false },
        allNum: this.state.items.length + 1
      });
    }
  };
  completeItem = keyVal => {
    let temp = 0;
    let items = this.state.items;
    items.forEach(item => {
      if (item.key === keyVal) {
        item.done = !item.done;
      }

      if (item.done) {
        temp++;
      }
    });
    this.setState({
      items: items,
      comNum: temp
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Todo List</h2>
          <ToDoItem
            addItem={this.addItem}
            inputEl={this.inputEl}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
          />
          <h2 className="task-counter">{`${
            this.state.comNum
          } remaining out of ${this.state.allNum} tasks`}</h2>
          <ToDos items={this.state.items} completeItem={this.completeItem} />
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </React.Fragment>
    );
  }
}

class ToDos extends Component {
  createTasks(item, props) {
    const { completeItem } = props;
    return (
      <li
        key={item.key}
        onClick={() => completeItem(item.key)}
        className={!!item.done ? "is-done" : ""}
      >
        {item.text}
      </li>
    );
  }
  render() {
    const { items } = this.props;
    const listItems = items.map(item => this.createTasks(item, this.props));

    return <ul>{listItems}</ul>;
  }
}

class ToDoItem extends Component {
  render() {
    const { addItem, inputEl, currentItem, handleInput } = this.props;
    return (
      <form onSubmit={addItem}>
        <input ref={inputEl} value={currentItem.text} onChange={handleInput} />
        <button type="submit">add</button>
      </form>
    );
  }
}
