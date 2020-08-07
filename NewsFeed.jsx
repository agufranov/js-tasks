import { Component } from 'react'
import api from './api' // some realtime API

/*
item: {
  id: string,
  title: string,
  text: string,
  likes: number
}
*/

const Item = props => (
  <div>
    <p>{props.title}</p>
    <p>{props.text}</p>
  </div>
)

class NewsFeed extends Component {
  state = {
    top: []
  }
  
  allItems = [];
  
  process = (itemOrId, isDelete) => {
  	const { top } = this.state;
  	const last = top[top.length - 1];
    
    // Also, we can do binary search and insert which is O(n),
    // instead of sorting which is O(n log n)
    
    this.allItems = [...this.allItems, item].sort((a, b) => b.likes - a.likes);
    if (item.likes > last.likes) {
      this.setState({
        top: this.allItems.slice(0, 100)
      });
    }
  }

  handleNewItem = item => {
  	const { top } = this.state;
  	const last = top[top.length - 1];
    
    // Also, we can do binary search and insert which is O(n),
    // instead of sorting which is O(n log n)
    // (for example, by implementing self-balanced binary search tree)
    
    this.allItems = [...this.allItems, item].sort((a, b) => b.likes - a.likes);
    if (item.likes > last.likes) {
      this.setState({
        top: this.allItems.slice(0, 100)
      });
    }
  }

  handleDeleteItem = id => {;
  	const { top } = this.state;
  	const last = top[top.length - 1];
    
    this.allItems = [...this.allItems, item].sort((a, b) => b.likes - a.likes);
    const index = top.findIndex((item) => item.id === id);
    
    if (index !== -1) {
      this.setState({
        top: this.allItems.filter(item => item.id !== id)
      })
    }
  }

  componentDidMount() {
    api.on('newItem', this.handleNewItem)
    api.on('deleteItem', this.handleDeleteItem)
  }

  componentWillUnmount() {
    api.off('newItem', this.handleNewItem)
    api.off('deleteItem', this.handleDeleteItem)
  }

  render() {
    return (
      <div>
        <p>Top 100 news:</p>
        {this.state.top.map(item =>
          <Item key={item.id} title={item.title} text={item.text} />
        )}
      </div>
    )
  }
}

export default NewsFeed
