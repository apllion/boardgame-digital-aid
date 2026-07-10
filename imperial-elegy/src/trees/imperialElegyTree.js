import { POWERS, TURN_ORDER } from '../data/botRules'
import BotImpulse from '../components/BotImpulse'
import PlayerTurn from '../components/PlayerTurn'
import PrepPhaseView from '../components/PrepPhaseView'
import EndPhaseView from '../components/EndPhaseView'

export function buildImperialElegyTree(config) {
  const { bots } = config

  // Flat structure: Prep → GE → UK → FR → AU → RU → OT → End → Next Turn
  // All swipeable at the same level — no nesting needed for the main flow
  const powerNodes = TURN_ORDER.map(powerId => {
    const p = POWERS[powerId]
    const isBot = bots.has(powerId)
    return {
      id: `power-${powerId}`,
      label: p.name,
      type: 'action',
      badge: p.short,
      color: p.color,
      component: isBot ? BotImpulse : PlayerTurn,
      props: { powerId },
    }
  })

  return {
    id: 'turn',
    label: 'Turn',
    type: 'phase',
    children: [
      {
        id: 'prep',
        label: 'Prep & Diplomacy',
        type: 'phase',
        badge: 'Prep',
        color: '#4a5adb',
        component: PrepPhaseView,
      },
      ...powerNodes,
      {
        id: 'end',
        label: 'End Phase',
        type: 'phase',
        badge: 'End',
        color: '#4a5adb',
        component: EndPhaseView,
      },
      {
        id: 'next-turn',
        label: 'Next Turn',
        type: 'loop',
        badge: '>>',
        color: '#f9a825',
        loopTarget: 'root',
      },
    ],
  }
}
