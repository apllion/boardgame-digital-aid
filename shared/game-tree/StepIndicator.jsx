export function StepIndicator({ steps, activeIndex, onJump }) {
  return (
    <div className="gt-steps">
      {steps.map((step, i) => (
        <div
          key={step.id}
          className={`gt-step ${i === activeIndex ? 'active' : ''}`}
          style={step.color ? {
            background: i === activeIndex ? step.color : `${step.color}33`,
            color: i === activeIndex ? '#fff' : '#999',
            borderColor: i === activeIndex ? step.color : 'transparent',
          } : undefined}
          onClick={() => onJump && onJump(i)}
          title={step.label}
        >
          <span className="gt-step-badge">{step.badge || step.label}</span>
        </div>
      ))}
    </div>
  )
}
