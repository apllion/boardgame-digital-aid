import { useState, useEffect } from 'react';

// phases: eventDecision | eventExecute | question | operation | specialActivity | done

export function Flowchart({ factionId, game, onBack, onStateChange, externalState }) {
  const faction = game.factions[factionId];
  const CARDS = game.cards;
  const EVENT_INSTRUCTIONS = game.eventInstructions;
  const FACTION_EVENT_SIDE = game.factionEventSide;
  const [phase, setPhase] = useState('eventDecision');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOp, setSelectedOp] = useState(null);
  const [selectedSA, setSelectedSA] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [eligibility, setEligibility] = useState('1st'); // '1st' or '2nd'
  const [playedEvent, setPlayedEvent] = useState(false);

  // Sync from external state (viewer mode)
  useEffect(() => {
    if (externalState && externalState.factionId === factionId) {
      setPhase(externalState.phase);
      setQuestionIndex(externalState.questionIndex);
      setSelectedOp(externalState.selectedOp);
      setSelectedSA(externalState.selectedSA);
      setHistory(externalState.history);
      setSelectedCard(externalState.selectedCard);
      setEligibility(externalState.eligibility);
      setPlayedEvent(externalState.playedEvent);
    }
  }, [externalState, factionId]);

  // Broadcast state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        factionId, phase, questionIndex, selectedOp, selectedSA,
        history, selectedCard, eligibility, playedEvent,
      });
    }
  }, [phase, questionIndex, selectedOp, selectedSA, history, selectedCard, eligibility, playedEvent]);

  function selectCard(card) {
    setSelectedCard(card);
  }

  function chooseEvent() {
    setPlayedEvent(true);
    setPhase('eventExecute');
    setHistory([...history, { question: `Event or Ops?`, answer: 'EVENT' }]);
  }

  function chooseOps() {
    setPlayedEvent(false);
    setPhase('question');
    setHistory([...history, { question: `Event or Ops?`, answer: 'OPS' }]);
  }

  function finishEvent() {
    setPhase('done');
  }

  function answerQuestion(answer) {
    const question = faction.questions[questionIndex];
    const newHistory = [...history, { question: question.text, answer }];
    setHistory(newHistory);

    if (answer && question.yes) {
      setSelectedOp(question.yes);
      setPhase('operation');
    } else if (!answer && question.no) {
      setSelectedOp(question.no);
      setPhase('operation');
    } else if (questionIndex < faction.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setPhase('done'); // Pass
    }
  }

  function proceedToSpecialActivity() {
    const op = faction.operations[selectedOp];
    if (op.specialActivity) {
      setSelectedSA(op.specialActivity);
      setPhase('specialActivity');
    } else {
      setPhase('done');
    }
  }

  function tryFallback() {
    const sa = faction.specialActivities[selectedSA];
    if (sa.fallback) {
      setSelectedSA(sa.fallback);
    } else {
      setPhase('done');
    }
  }

  function reset() {
    setPhase('eventDecision');
    setQuestionIndex(0);
    setSelectedOp(null);
    setSelectedSA(null);
    setHistory([]);
    setSelectedCard(null);
    setEligibility('1st');
    setPlayedEvent(false);
  }

  const isViewer = !!externalState;

  const hasCards = CARDS && CARDS.length > 0;

  // Determine which side the bot would use for this card
  const eventSide = FACTION_EVENT_SIDE?.[factionId]; // 'shaded' or 'unshaded'
  const card = selectedCard;
  const cardEventText = card && EVENT_INSTRUCTIONS
    ? (EVENT_INSTRUCTIONS[card.id]?.[factionId] === 'ops'
      ? null // forced to Ops
      : card[eventSide] || card.unshaded) // use faction's preferred side, fallback to unshaded
    : card ? (card[eventSide] || card.unshaded) : null;

  // Check if bot is forced to Ops by event instructions
  const forcedToOps = card && EVENT_INSTRUCTIONS && EVENT_INSTRUCTIONS[card.id]?.[factionId] === 'ops';

  return (
    <div className="flowchart">
      <div className="breadcrumb">
        <button className="btn btn-back" onClick={onBack}>← Back</button>
        <span className="faction-name" style={{ color: faction.color }}>{faction.name}</span>
        <span>Bot Flowchart</span>
      </div>

      {/* Phase: Event Decision — no cards database */}
      {phase === 'eventDecision' && !hasCards && (
        <div className="step-card question">
          <div className="step-label">Step 1 — Event or Operations?</div>
          <div className="step-text">Check the current event card. Would the bot play it?</div>
          <div className="step-details">
            <p><strong>Non-player event rules (8.1):</strong></p>
            <ul>
              <li>{faction.name} uses the <strong>{eventSide}</strong> text of dual-use events.</li>
              <li>Only play if the event would actually change the game state.</li>
              <li>Momentum events: only if next card is NOT Propaganda.</li>
              <li>Check Special Event Instructions if faction symbol has gray halo.</li>
            </ul>
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-yes" onClick={chooseEvent}>Play Event</button>
              <button className="btn btn-no" onClick={chooseOps}>Do Ops</button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Event Decision — with cards database */}
      {phase === 'eventDecision' && hasCards && !card && (
        <div className="step-card question">
          <div className="step-label">Step 1 — Select Current Card</div>
          <div className="step-text">Which event card is currently active?</div>
          <div className="card-search">
            <CardSelector cards={CARDS} onSelect={selectCard} />
          </div>
          {!isViewer && (
            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className="btn btn-back" onClick={() => { setPhase('question'); setHistory([...history, { question: 'Event or Ops?', answer: 'SKIP' }]); }}>
                Skip to Ops (no event)
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'eventDecision' && hasCards && card && (
        <div className="step-card question">
          <div className="step-label">Step 1 — Event or Operations?</div>
          <div className="card-display">
            <div className="card-name">{card.name} <span className="card-id">#{card.id}</span></div>
            <div className="card-order">
              Order: {card.factionOrder.join(' → ')}
            </div>
          </div>

          {forcedToOps ? (
            <div className="step-details">
              <p><strong>Event Instructions (8.4.1):</strong> {faction.name} skips this event — proceed to Operations.</p>
            </div>
          ) : (
            <div className="step-details">
              <p><strong>Bot would use the {eventSide} text:</strong></p>
              {cardEventText && (
                <>
                  <p style={{ fontStyle: 'italic', marginTop: 8 }}>{cardEventText.title}</p>
                  <p style={{ marginTop: 4 }}>{cardEventText.text}</p>
                </>
              )}
              <ul style={{ marginTop: 12 }}>
                <li>Is {faction.name} 1st or 2nd Eligible?</li>
                <li>Would this event actually change the game state? (If not → Ops)</li>
                {eventSide === 'shaded' && card.shaded?.momentum && (
                  <li>This is a Momentum event — only play if next card is NOT Propaganda.</li>
                )}
              </ul>
            </div>
          )}

          {!isViewer && (
            <div className="btn-row">
              {!forcedToOps && (
                <button className="btn btn-yes" onClick={chooseEvent}>
                  Play Event
                </button>
              )}
              <button className="btn btn-no" onClick={chooseOps}>
                {forcedToOps ? 'Proceed to Ops' : 'Do Ops Instead'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Event Execution — generic (no card DB) */}
      {phase === 'eventExecute' && !card && (
        <div className="step-card special-activity">
          <div className="step-label">Execute Event</div>
          <div className="step-text">Execute the event card per its text.</div>
          <div className="step-details">
            <p><strong>Non-player execution rules:</strong></p>
            <ul>
              <li>Place/remove pieces per priorities in faction flowchart.</li>
              <li>Select spaces per Operation priorities (highest population first, etc.).</li>
              <li>If "a Faction" or "your": the executing non-player faction.</li>
            </ul>
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-next" onClick={finishEvent}>Done</button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Event Execution — with card data */}
      {phase === 'eventExecute' && card && (
        <div className="step-card special-activity">
          <div className="step-label">Execute Event</div>
          <div className="card-display">
            <div className="card-name">{card.name} <span className="card-id">#{card.id}</span></div>
          </div>
          <div className="step-details">
            <p><strong>{cardEventText?.title}</strong></p>
            <p style={{ marginTop: 8 }}>{cardEventText?.text}</p>
            {card.type === 'capability' && (
              <p style={{ marginTop: 8, color: '#f0ad4e' }}>
                Place the Capability marker as a reminder.
              </p>
            )}
            {(card.shaded?.momentum || card.unshaded?.momentum) && (
              <p style={{ marginTop: 8, color: '#f0ad4e' }}>
                Momentum: This effect lasts until next Propaganda.
              </p>
            )}
          </div>
          <div className="step-details" style={{ marginTop: 8 }}>
            <p><strong>Non-player execution rules (8.4.3–8.4.4):</strong></p>
            <ul>
              <li>Place pieces per priorities in faction flowchart.</li>
              <li>Select spaces per Operation priorities (highest population first, etc.).</li>
              <li>If "a Faction" or "your": the executing non-player faction.</li>
              <li>If "an Insurgent Faction": 26July if non-player, else Directorio.</li>
            </ul>
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-next" onClick={finishEvent}>Done</button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Operation Questions */}
      {phase === 'question' && (
        <div className="step-card question">
          <div className="step-label">Operation Question {questionIndex + 1} of {faction.questions.length}</div>
          <div className="step-text">{faction.questions[questionIndex].text}</div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-yes" onClick={() => answerQuestion(true)}>Yes</button>
              <button className="btn btn-no" onClick={() => answerQuestion(false)}>No</button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Operation Details */}
      {phase === 'operation' && selectedOp && (
        <div className="step-card operation">
          <div className="step-label">Operation Selected</div>
          <div className="step-text">{faction.operations[selectedOp].name}</div>
          <div className="step-details">
            <p><strong>{faction.operations[selectedOp].description}</strong></p>
            <ul>
              {faction.operations[selectedOp].steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-next" onClick={proceedToSpecialActivity}>
                Continue to Special Activity →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Phase: Special Activity */}
      {phase === 'specialActivity' && selectedSA && (
        <div className="step-card special-activity">
          <div className="step-label">Special Activity</div>
          <div className="step-text">{faction.specialActivities[selectedSA].name}</div>
          <div className="step-details">
            <p><strong>{faction.specialActivities[selectedSA].description}</strong></p>
            <ul>
              {faction.specialActivities[selectedSA].steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-next" onClick={() => setPhase('done')}>
                Done
              </button>
              {faction.specialActivities[selectedSA].fallback && (
                <button className="btn btn-no" onClick={tryFallback}>
                  Not Possible → Try Fallback
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Phase: Done */}
      {phase === 'done' && (
        <div className={`step-card ${selectedOp || playedEvent ? 'operation' : 'pass'}`}>
          <div className="step-label">{selectedOp || playedEvent ? 'Turn Complete' : 'Pass'}</div>
          <div className="step-text">
            {playedEvent
              ? `${faction.name} plays the Event: ${card?.name}.`
              : selectedOp
                ? `${faction.name} performs ${faction.operations[selectedOp].name}${selectedSA ? ' + ' + faction.specialActivities[selectedSA].name : ''}.`
                : `${faction.name} passes (no conditions met).`
            }
          </div>
          {!isViewer && (
            <div className="btn-row">
              <button className="btn btn-reset" onClick={reset}>Start New Turn</button>
              <button className="btn btn-back" onClick={onBack}>Change Faction</button>
            </div>
          )}
        </div>
      )}

      {/* Decision History */}
      {history.length > 0 && (
        <div className="history">
          <h4>Decision History</h4>
          {history.map((item, i) => (
            <div key={i} className="history-item">
              <span>{item.question}</span>{' '}
              <span className={`answer ${item.answer === true || item.answer === 'YES' || item.answer === 'EVENT' ? 'yes' : 'no'}`}>
                {typeof item.answer === 'boolean' ? (item.answer ? 'YES' : 'NO') : item.answer}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Card selector with search
function CardSelector({ cards, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? cards.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toString() === search.trim()
      )
    : cards;

  return (
    <div className="card-selector">
      <input
        type="text"
        className="card-search-input"
        placeholder="Search by name or number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="card-list">
        {filtered.map(card => (
          <button
            key={card.id}
            className="card-option"
            onClick={() => onSelect(card)}
          >
            <span className="card-num">#{card.id}</span>
            <span className="card-title">{card.name}</span>
            <span className="card-type-badge">{card.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
