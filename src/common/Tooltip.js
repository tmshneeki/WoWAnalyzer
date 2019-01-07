import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from '@wowanalyzer/react-tooltip-lite';

import './Tooltip.css';

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * REQUIRED: Content of the tooltip
     */
    content: PropTypes.node.isRequired,
    /**
     * REQUIRED: The text/element that triggers the tooltip
     */
    children: PropTypes.node.isRequired,
    /**
     * Additional class names that are added to the tooltip (wrapper of the tooltip and arrow)
     * Default: ''
     */
    className: PropTypes.string,
    /**
     * Boolean which states, if a person can access the tooltip contents (and click links, select and copy text etc.)
     * Default: false
     */
    hoverable: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    hoverable: false,
  };

  render() {
    const {
      content,
      children,
      className,
      hoverable,
      ...others
    } = this.props;
    return (
      <ReactTooltip
        className={className}
        direction="down"
        tipContentHover={hoverable}
        content={content}
        {...others}
      >
        {children}
      </ReactTooltip>
    );
  }
}

class TooltipElement extends React.Component {
  static propTypes = {
    /**
     * REQUIRED: Content of the tooltip
     */
    content: PropTypes.node.isRequired,
    /**
     * REQUIRED: The text/element that triggers the tooltip
     */
    children: PropTypes.node.isRequired,
    /**
     * Additional class names that are appended to the wrapper element
     * Default: ''
     */
    className: PropTypes.string,
    /**
     * Additional inline styles that are appended to the wrapper element
     * Default: {}
     */
    style: PropTypes.object,
    /**
     * Additional class names that are added to the tooltip (wrapper of the tooltip and arrow)
     * Default: ''
     */
    tooltipClassName: PropTypes.string,
    /**
     * Boolean which states, if a person can access the tooltip contents (and click links, select and copy text etc.)
     * Default: false
     */
    hoverable: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    style: {},
    tooltipClassName: '',
    hoverable: false,
  };

  render() {
    const {
      content,
      children,
      className,
      style,
      tooltipClassName,
      hoverable,
      ...others
    } = this.props;
    return (
      <ReactTooltip
        content={content}
        className={tooltipClassName}
        direction="down"
        tipContentHover={hoverable}
        {...others}
      >
        <dfn className={className} style={style}>
          {children}
        </dfn>
      </ReactTooltip>
    );
  }
}

export { Tooltip, TooltipElement };
