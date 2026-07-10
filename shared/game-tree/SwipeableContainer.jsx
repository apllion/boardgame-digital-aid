import { useSwipeable } from 'react-swipeable'
import { Breadcrumbs } from './Breadcrumbs'
import { StepIndicator } from './StepIndicator'
import { TreeNodeRenderer } from './TreeNodeRenderer'

export function SwipeableContainer({
  tree,
  onBack,
  showBreadcrumbs = true,
  showStepIndicator = true,
  renderNode,
  className,
}) {
  const {
    currentNode, siblings, siblingIndex, breadcrumbs,
    next, prev, drillDown, back, jumpToSibling,
    canGoBack, canDrillDown, isLoop, confirmLoop,
  } = tree

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => {
      if (siblings.length > 1) {
        prev()
      } else if (canGoBack) {
        back()
      }
    },
    preventScrollOnSwipe: false,
    trackMouse: false,
    delta: 40,
  })

  const handleBack = () => {
    if (canGoBack) {
      back()
    } else if (onBack) {
      onBack()
    }
  }

  return (
    <div className={`gt-container ${className || ''}`} {...handlers}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 1 && (
        <Breadcrumbs
          items={breadcrumbs}
          onBack={handleBack}
          canGoBack={canGoBack || !!onBack}
        />
      )}

      {/* Step indicator */}
      {showStepIndicator && siblings.length > 1 && (
        <StepIndicator
          steps={siblings}
          activeIndex={siblingIndex}
          onJump={jumpToSibling}
        />
      )}

      {/* Content */}
      <div className="gt-content" key={currentNode.id}>
        {renderNode
          ? renderNode(currentNode, { drillDown, next, prev, back })
          : <TreeNodeRenderer
              node={currentNode}
              onDrillDown={drillDown}
              onLoop={confirmLoop}
            />
        }
      </div>

      {/* Swipe hint */}
      {siblings.length > 1 && (
        <div className="gt-swipe-hint">
          <span className="gt-swipe-arrow" onClick={prev}>&lsaquo;</span>
          <span className="gt-swipe-pos">{siblingIndex + 1} / {siblings.length}</span>
          <span className="gt-swipe-arrow" onClick={next}>&rsaquo;</span>
        </div>
      )}
    </div>
  )
}
