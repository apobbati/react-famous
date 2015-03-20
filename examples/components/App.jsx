import isEqual from 'lodash/lang/isEqual';
import React from 'react';

import Content from './Content';
import Menu from './Menu';

const EXAMPLES = {
  modifiers: [
    'Draggable'
  ],
  surfaces: [
    'CanvasSurface',
    'ContainerSurface',
    'ImageSurface',
    'VideoSurface'
  ],
  views: [
    'Deck',
    'EdgeSwapper',
    'FlexibleLayout',
    'Flipper',
    'GridLayout',
    'HeaderFooterLayout',
    'Lightbox',
    'RenderController',
    'ScrollContainer',
    'Scrollview',
    'SequentialLayout',
    'SizeAwareView'
  ],
  test: [
    'Animations',
    'CommentBox',
    'HelloWorld',
    'HelloWorldDynamic',
    'Layout',
    'ReactNode',
    'Seed'
  ]
};

export default class extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      group: null,
      member: null
    };

    this._onHashChange = this._onHashChange.bind(this);
    this._onMenuChange = this._onMenuChange.bind(this);
  }

  _onHashChange() {
    let [group, member] = window.location.hash.slice(2).split('/');
    if (group && member) {
      this.setState({group, member});
    }
  }

  componentWillMount() {
    window.addEventListener('hashchange', this._onHashChange, false);
    this._onHashChange();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  _onMenuChange(group, member) {
    this.setState({group, member});
  }

  render() {
    return (
      <div className="app">
        <Menu examples={EXAMPLES} onMenuChange={this._onMenuChange}/>
        <Content group={this.state.group} member={this.state.member}/>
      </div>
    );
  }
};
