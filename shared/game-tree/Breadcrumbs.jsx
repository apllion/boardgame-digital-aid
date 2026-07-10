export function Breadcrumbs({ items, onBack, canGoBack }) {
  return (
    <div className="gt-breadcrumbs">
      {canGoBack && (
        <button className="gt-back-btn" onClick={onBack} aria-label="Back">
          &#x2039;
        </button>
      )}
      <div className="gt-breadcrumb-trail">
        {items.map((item, i) => (
          <span key={item.id} className="gt-breadcrumb-item">
            {i > 0 && <span className="gt-breadcrumb-sep">/</span>}
            <span className={i === items.length - 1 ? 'gt-breadcrumb-active' : ''}>
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
