import React from 'react';
import PropTypes from 'prop-types';

import { TooltipElement } from 'common/Tooltip';
import { formatDuration } from '../../../../../../../common/format';

class DeathEvents extends React.PureComponent {
  static propTypes = {
    start: PropTypes.number.isRequired,
    secondWidth: PropTypes.number.isRequired,
    deaths: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
    resurrections: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
  };

  render() {
    const { start, secondWidth, deaths, resurrections } = this.props;

    return (
      <>
        {deaths.map(event => {
          const eventStart = event.start || event.timestamp;
          const fightDuration = (eventStart - start) / 1000;
          const left = (eventStart - start) / 1000 * secondWidth;
          return (
            <TooltipElement
              key={`death-${event.timestamp}`}
              tagName="div"
              className="death"
              style={{
                left,
                position: 'absolute',
              }}
              content={`${formatDuration(fightDuration, 3)}: You died`}
            />
          );
        })}
        {resurrections.map(event => {
          const eventStart = event.start || event.timestamp;
          const fightDuration = (eventStart - start) / 1000;
          const left = (eventStart - start) / 1000 * secondWidth;
          return (
            <TooltipElement
              key={`resurrection-${event.timestamp}`}
              tagName="div"
              className="resurrection"
              style={{
                left,
                position: 'absolute',
              }}
              content={`${formatDuration(fightDuration, 3)}: You were resurrected`}
            />
          );
        })}
      </>
    );
  }
}

export default DeathEvents;
