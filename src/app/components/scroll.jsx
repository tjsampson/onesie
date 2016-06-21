 import _ from 'lodash';
import React from 'react';
import ScrollArea from 'react-scrollbar';
import Assembly from './assembly.jsx';

const assemblyStyles = {
      width: '100%',
      padding: '0px 10px 25% 10px',
      fontSize: '18px',
      boxSizing: 'border-box',
      position: 'relative',
      color: '#d1d1e0'
    };

const assemblyInnerStyles = {
      position: 'absolute',
      left: '10px',
      right: '10px',
      top: '10px',
      bottom: '10px',
      background: '#f0f0f5',
      border: '1px solid gray',
      boxShadow: '0 2px 4px rgba(0, 0, 0, .48)'
    };

const paragraphStyles = {
      fontFamily: 'Helvetica Neue',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111',
      paddingLeft: '20px'
    };

class Scroll extends React.Component {

  constructor(props) {
    super(props);
    this.renderAssembies = this.renderAssembies.bind(this);
  }

  renderAssembies (item, index) {
    //<Assembly key={index} item={item} organization={this.props.assemblies.organization}></Assembly>
    return (
          <div key={index} className="assembly" style={assemblyStyles}>
            <div className="assembly-inner" style={assemblyInnerStyles}>
              <p style={paragraphStyles}>{item.ciName}</p>
              Assembly goes here
            </div>
          </div>
          );
  }

  render() {
    
    return (
        <div>
            <ScrollArea
              className="area"
              contentClassName="content"
              smoothScrolling= {true}
              minScrollSize={40}
              onScroll={this.handleScroll} >
              {
                _.map(this.props.assemblies.items, (item, index) => {
                  return this.renderAssembies(item, index);
                })
              }
            </ScrollArea>
        </div>
    );
  }
}

Scroll.propTypes = {
  assemblies: React.PropTypes.object.isRequired
};

export default Scroll;
