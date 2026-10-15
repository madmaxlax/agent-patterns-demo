import { Timeline } from './components/Timeline'

export default function App() {
  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">Card network history</p>
        <h1>Visa, Mastercard, and Discover</h1>
        <p className="lede">Sixty-seven years of milestones on one axis. Click a marker to read the story.</p>
      </header>
      <Timeline />
    </main>
  )
}
