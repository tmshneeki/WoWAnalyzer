import React from 'react';
import PropTypes from 'prop-types';
import { RadialChart } from 'react-vis';

import { formatPercentage } from 'common/format';
import SpellLink from 'common/SpellLink';
import { TooltipElement } from 'common/Tooltip';

import './style.scss';

class DonutChart extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      tooltip: PropTypes.node,
      spellId: PropTypes.number,
      valueTooltip: PropTypes.node,
    })).isRequired,
    // While you could change the chart size, I strongly recommend you do not for consistency and to avoid breaking whenever this component is modified. Do you really need to adjust the size?
    chartSize: PropTypes.number,
    innerRadiusFactor: PropTypes.number,
  };
  static defaultProps = {
    chartSize: 90,
    innerRadiusFactor: 0.28,
  };

  renderLegend(items) {
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="legend">
        {items.map(({ color, label, tooltip, value, spellId, valueTooltip }, index) => {
          label = tooltip ? (
            <TooltipElement content={tooltip}>{label}</TooltipElement>
          ) : label;
          label = spellId ? (
            <SpellLink id={spellId}>{label}</SpellLink>
          ) : label;
          return (
            <div key={index} className="flex">
              <div className="flex-sub">
                <div className="circle" style={{ background: color }} />
              </div>
              <div className="flex-main">
                {label}
              </div>
              <div className="flex-sub">
                <TooltipElement content={valueTooltip ? valueTooltip : value}>
                  {formatPercentage(value / total, 0)}%
                </TooltipElement>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  renderChart(items, chartSize, innerRadiusFactor) {
    return (
      <div className="chart">
        <RadialChart
          colorType="literal"
          data={items.map(item => ({
            ...item,
            angle: item.value,
          }))}
          width={chartSize}
          height={chartSize}
          radius={chartSize / 2 - 1} // a 1px padding avoids straight edges
          innerRadius={chartSize * innerRadiusFactor}
        />
      </div>
    );
  }
  render() {
    const { items, chartSize, innerRadiusFactor } = this.props;

    return (
      <div className="donut-chart">
        {this.renderLegend(items)}
        {this.renderChart(items, chartSize, innerRadiusFactor)}
      </div>
    );
  }
}

export default DonutChart;
