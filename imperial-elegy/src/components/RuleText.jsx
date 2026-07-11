// Parse text for [section.number] references and make them tappable
export default function RuleText({ text, onRuleLink }) {
  if (!onRuleLink) return text
  const parts = text.split(/(\[\d+\.\d+(?:\.\d+)?\])/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[(\d+\.\d+(?:\.\d+)?)\]$/)
    if (match) {
      return (
        <span
          key={i}
          className="rule-link"
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onRuleLink(match[1]) }}
        >
          {part}
        </span>
      )
    }
    return part
  })
}
