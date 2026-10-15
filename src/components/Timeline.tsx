import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import raw from '../data/timeline.json'
import type { Brand, TimelineEvent } from '../types'

const events = raw as TimelineEvent[]
const BRANDS: { id: Brand; label: string }[] = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'discover', label: 'Discover' },
]
const PX_PER_YEAR = 34
const LANE_HEIGHT = 120
const GUTTER = 120
const PAD = 60

export function Timeline() {
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState<Set<Brand>>(new Set())
  const [selected, setSelected] = useState<TimelineEvent>(events[0])

  const { minYear, maxYear } = useMemo(() => {
    const years = events.map((e) => e.year)
    return {
      minYear: Math.floor((Math.min(...years) - 1) / 5) * 5,
      maxYear: Math.ceil((Math.max(...years) + 1) / 5) * 5,
    }
  }, [])

  const width = (maxYear - minYear) * PX_PER_YEAR + PAD * 2
  const x = (year: number) => PAD + (year - minYear) * PX_PER_YEAR
  const ticks = Array.from({ length: (maxYear - minYear) / 5 + 1 }, (_, i) => minYear + i * 5)
  const visibleBrands = BRANDS.filter((b) => !hidden.has(b.id))

  const toggle = (id: Brand) =>
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="timeline" aria-label="Card network history timeline">
      <div className="toggles" role="group" aria-label="Show or hide brands">
        {BRANDS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`toggle toggle--${b.id}`}
            aria-pressed={!hidden.has(b.id)}
            onClick={() => toggle(b.id)}
          >
            <span className="dot" />
            {b.label}
          </button>
        ))}
      </div>

      <div className="scroller" tabIndex={0} aria-label="Scrollable timeline">
        <div className="canvas" style={{ width: width + GUTTER }}>
          <div className="axis" style={{ marginLeft: GUTTER }}>
            {ticks.map((t) => (
              <span key={t} className="tick" style={{ left: x(t) }}>
                {t}
              </span>
            ))}
          </div>

          {visibleBrands.map((b) => (
            <div key={b.id} className={`lane lane--${b.id}`} style={{ height: LANE_HEIGHT }}>
              <div className="lane-label">{b.label}</div>
              <div className="rail" style={{ left: GUTTER, width }} />
              {events
                .filter((e) => e.brand === b.id)
                .map((e, i) => {
                  const active = selected.id === e.id
                  return (
                    <motion.button
                      key={e.id}
                      type="button"
                      className={`marker${active ? ' marker--active' : ''}`}
                      style={{ left: GUTTER + x(e.year) }}
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: reduce ? 0 : i * 0.04, type: 'spring', stiffness: 380, damping: 22 }}
                      onClick={() => setSelected(e)}
                      onFocus={() => setSelected(e)}
                      aria-label={`${e.year}: ${e.title}`}
                      aria-current={active}
                    >
                      <span className="marker-year">{e.year}</span>
                    </motion.button>
                  )
                })}
            </div>
          ))}
          {visibleBrands.length === 0 && <p className="empty">Turn a brand back on to see its milestones.</p>}
        </div>
      </div>

      <div className="detail" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            className={`card card--${selected.brand}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <p className="card-meta">
              <span className="card-year">{selected.year}</span>
              <span className="card-brand">{BRANDS.find((b) => b.id === selected.brand)?.label}</span>
            </p>
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            <a href={selected.source} target="_blank" rel="noreferrer">
              Source
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
