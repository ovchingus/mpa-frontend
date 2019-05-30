import React, {Component} from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';
import {connect} from 'react-redux';
import { Icon, Modal } from 'semantic-ui-react';
import popper from 'cytoscape-popper';

cytoscape.use(popper);

export class Graph extends Component {
  cyRefs = {};
  tooltip = null;
  previousTappedNodes = {};

  constructor(props) {
    super(props);

    this.tooltip = document.createElement('div');

    this.tooltip.style = `z-index: 9999;border-radius: 5px; max-width: 200px; border: 1px solid #ccc; background: #fff; padding: 10px;`;
  }


  setCY = (refName) => (cy) => {
    this.cyRefs[refName] = cy;

    this.cyRefs[refName].on('tap', (evt) => {
      if (evt.target !== this.cyRefs[refName]) {
        return;
      }
      this.tooltip.remove();

      if (this.previousTappedNodes[refName]) {
        this.previousTappedNodes[refName].removeListener('position');
        this.cyRefs[refName].removeListener('pan zoom resize');
      }
    });

    this.cyRefs[refName].nodes().on('tap', (evt) => {
      if (this.previousTappedNodes[refName]) {
        this.previousTappedNodes[refName].removeListener('position');
        this.cyRefs[refName].removeListener('pan zoom resize');
      }

      this.previousTappedNodes[refName] = evt.target;

      const id = +evt.target.id();

      const state = this.props.graph.states.find(state => state.id === id);

      const popper = evt.target.popper({
        content: () => {
          const name = document.createElement('h3');

          name.textContent = state.name;

          const description = document.createElement('p');

          description.textContent = state.description;

          Array.from(this.tooltip.children).forEach(child => child.remove());

          this.tooltip.appendChild(name);
          this.tooltip.appendChild(description);

          document.body.appendChild(this.tooltip);

          evt.target.on('position', () => {
            popper.scheduleUpdate();
          });

          this.cyRefs[refName].on('pan zoom resize', () => {
            popper.scheduleUpdate();
          });

          return this.tooltip;
        }
      })
    });

    console.log(this.cyRefs);
  };

  render () {
    const {status, graph} = this.props;

    const nodes = graph.states.map(state => {
      return {
        data: {id: state.id, label: state.name},
        selected: state.id === status.state.id,
        grabbable: true
      }
    });
    const edges = graph.transitions.map(transition => ({data: {source: transition.from, target: transition.to}}));
    const layout = {name: 'breadthfirst'};
    const style = [
      {
        selector: 'node',
        style: {
          'background-color': 'black',
          label: 'data(label)',
          'source-arrow-shape': 'triangle-backcurve'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': 'green'
        }
      },
      {
        selector: 'edge',
        style: {
          width: 1,
          'curve-style': 'bezier',
          'line-color': '#ccc',
          'mid-target-arrow-color': '#ccc',
          'mid-target-arrow-shape': 'triangle-backcurve',
        }
      }
    ];

    const styleContainer={
      background: '#fff',
      borderRadius: '5px'
    };

    return (
      <div style={{height: '100%', paddingTop: '15px'}}>
        <Modal trigger={<Icon name='expand arrows alternate' style={{position: 'absolute', zIndex: 1}} />} size='fullscreen'>
          <Modal.Content>
            <ReactCytoscape
              elements={{nodes, edges}}
              layout={layout}
              style={style}
              styleContainer={{
                height: '70vh',
                width: '100%',
                ...styleContainer
              }}
              cyRef={this.setCY('modal')}
            />
          </Modal.Content>
        </Modal>
        <ReactCytoscape
          elements={{nodes, edges}}
          cyRef={this.setCY('block')}
          layout={layout}
          style={style}
          styleContainer={styleContainer}
        />
      </div>
    )
  }
}

export default connect(
  store => ({
    graph: store.graph,
    status: store.patient.status,
  })
)(Graph)
