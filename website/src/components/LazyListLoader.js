import React, { Component } from "react";
import { Waypoint } from "react-waypoint";

class LazyListLoader extends Component {
  state = {
    loadedIndex: (this.props.firstChunkSize || this.props.chunkSize || 1) - 1
  };
  getLoadedObjects = () => {
    const { items, offset = 1 } = this.props;
    const { loadedIndex } = this.state;
    const res = [];
    for (let i = 0; i < loadedIndex + 1 && i < items.length; i++) {
      res.push({ type: "ITEM", item: items[i], index: i });
    }
    if (loadedIndex < items.length) {
      res.push({ type: "WAYPOINT" });
    }
    for (
      let i = loadedIndex + 1;
      i < loadedIndex + offset && i < items.length;
      i++
    ) {
      res.push({ type: "ITEM", item: items[i], index: i });
    }
    return res;
  };
  loadNext = () => {
    this.setState({
      loadedIndex: this.state.loadedIndex + (this.props.chunkSize || 1)
    });
  };
  render() {
    const { renderItem } = this.props;
    const { loadedIndex } = this.state;
    const objects = this.getLoadedObjects();
    return (
      <React.Fragment>
        {objects.map(({ type, item, index }) => {
          if (type === "ITEM") {
            return renderItem(item, index);
          } else {
            return (
              <Waypoint
                key={`__lazylistloader_waypoint_${loadedIndex}`}
                onEnter={this.loadNext}
              />
            );
          }
        })}
      </React.Fragment>
    );
  }
}

export default LazyListLoader;
