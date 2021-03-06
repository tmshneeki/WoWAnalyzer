import React from 'react';
import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import { TooltipElement } from 'common/Tooltip';
import { calculateSecondaryStatDefault } from 'common/stats';
import { formatPercentage, formatNumber } from 'common/format';
import ItemDamageDone from 'interface/others/ItemDamageDone';
import Analyzer from 'parser/core/Analyzer';

/**
 * Syringe of Bloodborne Infirmity -
 * Equip: Your attacks have a chance to cause Wasting Infection, dealing 2424 Shadow damage over 12 sec.
 * Attacking an enemy suffering from Wasting Infection grants you 89 Critical Strike for 6 sec, stacking up to 5 times.
 *
 * Example log: /report/mx1NKYzjwQncGk4J/33-Mythic+Fetid+Devourer+-+Kill+(4:47)/6-Jaelaw/
 */

class SyringeOfBloodborneInfirmity extends Analyzer {

  damage = 0;
  hits = 0;
  statBuff = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrinket(ITEMS.SYRINGE_OF_BLOODBORNE_INFIRMITY.id);
    if (this.active) {
      this.statBuff = calculateSecondaryStatDefault(355, 89, this.selectedCombatant.getItem(ITEMS.SYRINGE_OF_BLOODBORNE_INFIRMITY.id).itemLevel);
    }
  }

  on_byPlayer_applydebuff(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.WASTING_INFECTION.id) {
      this.hits += 1;
    }
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.WASTING_INFECTION.id) {
      this.damage += (event.amount || 0) + (event.absorbed || 0);
    }
  }

  averageStatGain() {
    const averageStacks = this.selectedCombatant.getStackWeightedBuffUptime(SPELLS.CRITICAL_PROWESS.id) / this.owner.fightDuration;
    return averageStacks * this.statBuff;
  }

  totalBuffUptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.CRITICAL_PROWESS.id) / this.owner.fightDuration;
  }

  buffTriggerCount() {
    return this.selectedCombatant.getBuffTriggerCount(SPELLS.CRITICAL_PROWESS.id);
  }

  item() {
    return {
      item: ITEMS.SYRINGE_OF_BLOODBORNE_INFIRMITY,
      result: (
        <TooltipElement
          content={(
            <>
              Hit <strong>{this.hits}</strong> times, causing <strong>{formatNumber(this.damage)}</strong> damage. <br />
              Buff procced <strong>{this.buffTriggerCount()}</strong> times (<strong>{formatPercentage(this.totalBuffUptime())}%</strong> uptime).
            </>
          )}
        >
          <ItemDamageDone amount={this.damage} /><br />
          {formatNumber(this.averageStatGain())} average Critical Strike
        </TooltipElement>
      ),
    };
  }
}

export default SyringeOfBloodborneInfirmity;
