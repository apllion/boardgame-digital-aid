import { useGameContext } from './GameTreeContext'

export function TreeNodeRenderer({ node, onDrillDown, onLoop }) {
  const gameCtx = useGameContext()

  // Loop node
  if (node.type === 'loop') {
    return (
      <div className="gt-loop-card">
        <div className="gt-loop-title">{node.label}</div>
        <button className="gt-loop-btn" onClick={onLoop}>
          {node.label} &rarr;
        </button>
      </div>
    )
  }

  // Custom component
  if (node.component) {
    const Component = node.component
    return <Component {...(node.props || {})} />
  }

  // Children list (tappable drill-down)
  if (node.children?.length) {
    const filtered = node.children.filter(c => !c.condition || c.condition(gameCtx))
    return (
      <div className="gt-children-list">
        {filtered.map(child => (
          <button
            key={child.id}
            className="gt-child-item"
            onClick={() => onDrillDown(child.id)}
            style={child.color ? { borderLeftColor: child.color } : undefined}
          >
            {child.badge && <span className="gt-child-badge" style={child.color ? { background: child.color } : undefined}>{child.badge}</span>}
            <span className="gt-child-label">{child.label}</span>
            <span className="gt-child-arrow">&rsaquo;</span>
          </button>
        ))}
      </div>
    )
  }

  // Plain leaf
  return (
    <div className="gt-leaf-card">
      <div className="gt-leaf-title">{node.label}</div>
    </div>
  )
}
