import React from 'react';
import { Link } from 'react-router-dom';

import Analyzer from 'parser/core/Analyzer';
import ResourceBreakdown from 'parser/shared/modules/resourcetracker/ResourceBreakdown';

import Panel from 'interface/others/Panel';
import StatisticBox, { STATISTIC_ORDER } from 'interface/others/StatisticBox';
import { Tooltip, TooltipElement } from 'common/Tooltip';


import WastedShardsIcon from 'parser/warlock/shared/images/warlock_soulshard_bw.jpg';
import SoulShardTracker from './SoulShardTracker';

const SOUL_SHARD_ICON = 'inv_misc_gem_amethyst_02';

class TestComp extends React.Component {
  render() {
    const { innerRef, ...others } = this.props;
    return (
      <div ref={innerRef} {...others}>hello</div>
    );
  }
}
class SoulShardDetails extends Analyzer {
  static dependencies = {
    soulShardTracker: SoulShardTracker,
  };

  get suggestionThresholds() {
    const shardsWasted = this.soulShardTracker.wasted;
    const shardsWastedPerMinute = (shardsWasted / this.owner.fightDuration) * 1000 * 60;
    return {
      actual: shardsWastedPerMinute,
      isGreaterThan: {
        minor: 5 / 10, // 5 shards in 10 minute fight
        average: 5 / 3, // 5 shards in 3 minute fight
        major: 10 / 3, // 10 shards in 3 minute fight
      },
      style: 'number', // TODO: not sure about this yet
    };
  }

  suggestions(when) {
    const shardsWasted = this.soulShardTracker.wasted;
    when(this.suggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest('You are wasting Soul Shards. Try to use them and not let them cap and go to waste unless you\'re preparing for bursting adds etc.')
          .icon(SOUL_SHARD_ICON)
          .actual(`${shardsWasted} Soul Shards wasted (${actual.toFixed(2)} per minute)`)
          .recommended(`< ${recommended.toFixed(2)} Soul Shards per minute wasted are recommended`);
      });
  }

  statistic() {
    const shardsWasted = this.soulShardTracker.wasted;
    return (
      <StatisticBox
        icon={(
          <img
            src={WastedShardsIcon}
            alt="Wasted Soul Shards"
          />
        )}
        value={(
          <>
            {shardsWasted}
            <TooltipElement content="Something">
              Wrapper element
            </TooltipElement>
            <br />
            <Tooltip content="Something else">
              <Link to="/premium">
                Link
              </Link>
            </Tooltip>
            <Tooltip content="blah">
              <Link to="/premium">Frag</Link>
            </Tooltip>
            <Tooltip content="blahblah">
              <TestComp />
            </Tooltip>
          </>
        )}
        label="Wasted Soul Shards"
      />
    );
  }

  tab() {
    return {
      title: 'Soul Shard usage',
      url: 'soul-shards',
      render: () => (
        <Panel>
          <ResourceBreakdown
            tracker={this.soulShardTracker}
            showSpenders
          />
        </Panel>
      ),
    };
  }

  statisticOrder = STATISTIC_ORDER.CORE(2);
}

export default SoulShardDetails;
