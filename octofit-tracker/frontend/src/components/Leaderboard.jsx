import { useEffect, useState } from 'react'
import { getResourceApiUrl, normalizeCollectionPayload } from '../config/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      setStatus({ loading: true, error: '' })

      try {
        const response = await fetch(getResourceApiUrl('leaderboard'), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload, {
          keys: ['entries', 'items', 'results', 'docs', 'data'],
        })

        setEntries(normalized.items)
        setCount(payload?.count ?? normalized.count)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setStatus({
          loading: false,
          error: 'Could not load leaderboard from the API endpoint.',
        })
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [])

  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Leaderboard</h2>
        <span>{count} entries</span>
      </div>

      {status.loading ? <p>Loading leaderboard...</p> : null}
      {status.error ? <div className="error-banner">{status.error}</div> : null}

      {!status.loading && !status.error ? (
        <div className="stack">
          {entries.map((entry) => (
            <div className="row-card" key={entry._id}>
              <div>
                <h3>
                  #{entry.rank} {entry.user?.name ?? 'Unknown user'}
                </h3>
                <p>{entry.team?.name ?? 'No team'}</p>
                <p>{entry.period}</p>
              </div>
              <div className="row-meta">
                <span>{entry.activityCount} activities</span>
                <strong>{entry.totalPoints} pts</strong>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default Leaderboard