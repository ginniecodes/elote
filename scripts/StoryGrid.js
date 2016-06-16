import React from 'react';
import Story from './Story';

const StoryGrid = React.createClass({
  render() {
    return (
      <div className="story-grid">
      <pre>
      {this.props.posts.map((story, i) => <Story />)}
      </pre>
      </div>
    )
  }
});

export default StoryGrid;
