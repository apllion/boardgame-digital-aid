# Modern Tactics: Afghanistan — Combat Resolver

## Project Goal
Web app game aid for VUCA Simulations' "Modern Tactics: Afghanistan" wargame.
Starting with a **combat resolver**, then expanding to turn tracker, dice roller, etc.

## Tech Choice
Vanilla HTML/CSS/JS — no build step, works on phones at the table.

## Source Materials
- Rules PDF: `/Users/droste/Library/CloudStorage/Dropbox/Brettspiele/MT-Afghanistan_Core Rules 1.0 .pdf`
- Playbook PDF: `/Users/droste/Library/CloudStorage/Dropbox/Brettspiele/MT-Afghanistan_Playbook-upload.pdf`
- Corrected Index PDF: `/Users/droste/Library/CloudStorage/Dropbox/Brettspiele/MT-Afghanistan_Corrected_Index.pdf`
- VASSAL module: `/Users/droste/Downloads/ModTac1-Afghan.vmod`

## Combat System (from rules extraction)

### Infantry Combat (ICT)
1. Calculate **Firepower (FP)** of attacker
2. Calculate **Defense** of defender (base + terrain)
3. **Attack Value (AV)** = FP - Defense → determines column on ICT
4. Roll **2D6**, cross-reference AV column × dice roll for result
5. Results: X (destroyed), C (casualties), B (broken/MC), S (shaken/MC), blank, or combos (C-S, C-B)

### Vehicle Combat (VCT)
1. **To-hit roll** first
2. Then AT value - Defense = AV → column on VCT
3. Similar result types + D (damage, with sub-table)

### Helicopter Combat (HCT)
- Separate table, details TBD from player aid

### FP Modifiers
| Condition | Modifier |
|-----------|----------|
| Adjacent hex | +1 FP |
| Degraded LOS | -1 FP per hex (max -2) |
| Melee | +2 FP |
| Shaken/Suppressed attacker | halve FP |

### Defense Modifiers (Terrain)
| Terrain | Modifier |
|---------|----------|
| Structure | +2 |
| Grape (vineyard) | +2 |
| Wadi | +2 |
| Mixed Woods | +2 |
| Marijuana/Crops | +1 |
| Rough | +1 |
| Irrigation Ditch (foot only) | +1 |
| Low Walls | +2 |
| Bridge | -1 |

### Dice Roll Modifiers (DRMs)
| Condition | DRM |
|-----------|-----|
| Moving Fire | -1 |
| Leader present | +1 |
| Height Advantage | +1 |
| Height Disadvantage | -1 |
| Ambush | +1 |
| Critical Hit | +1 |
| Intensive Fire | -2 |
| Shaken/Suppressed in Melee | -1 |
| Elite in Melee | +1 |

## STILL NEEDED
**The actual ICT/VCT/HCT table grid data** — what result appears at each AV column × dice roll intersection.
These are on the physical player aid card (not in the PDFs or VASSAL module).
User needs to photograph the player aid card.

## VASSAL Module Notes
- Tables are NOT in the VASSAL module as extractable data
- `images/AT.png` (1.2MB) was a weapon data card, not combat tables
- Tracker images are just VP/Impulse tracks
- `buildFile.xml` has module config but no table data

## Future Features (from initial brainstorm)
- Turn/Impulse tracker
- Unit status tracker (suppression, morale, casualties)
- OBA/Air support tracker
- Scenario setup helper
- Dice roller with auto-lookup
- Morale check resolver
- Searchable quick-reference
- Insurgent AI/bot helper for solo play
