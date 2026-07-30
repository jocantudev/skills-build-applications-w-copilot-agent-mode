import { useEffect, useState } from 'react'
import { getResourceApiUrl, normalizeCollectionPayload } from '../config/api'

const workoutsCodespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      setStatus({ loading: true, error: '' })

      try {
        const response = await fetch(
          import.meta.env.VITE_CODESPACE_NAME
            ? workoutsCodespaceApiUrl
            : getResourceApiUrl('workouts'),
          {
          signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error('Unable to load workouts')
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload)

        setWorkouts(normalized.items)
        setCount(payload?.count ?? normalized.count)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setStatus({
          loading: false,
          error: 'Could not load workouts from the API endpoint.',
        })
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [])

  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Workouts</h2>
        <span>{count} records</span>
      </div>

      {status.loading ? <p>Loading workouts...</p> : null}
      {status.error ? <div className="error-banner">{status.error}</div> : null}

      {!status.loading && !status.error ? (
        <div className="stack">
          {workouts.map((workout) => (
            <div className="row-card" key={workout._id}>
              <div>
                <h3>{workout.title}</h3>
                <p>
                  {workout.focus} · {workout.level}
                </p>
                <p>{workout.description}</p>
              </div>
              <div className="row-meta">
                <span>{(workout.equipment ?? []).join(', ') || 'No equipment'}</span>
                <strong>{workout.durationMinutes} min</strong>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default Workouts