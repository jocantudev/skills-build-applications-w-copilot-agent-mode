import { useEffect, useState } from 'react'
import { getResourceApiUrl, normalizeCollectionPayload } from '../config/api'

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

function Activities() {
  const [activities, setActivities] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      setStatus({ loading: true, error: '' })

      try {
        const response = await fetch(getResourceApiUrl('activities'), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load activities')
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload)

        setActivities(normalized.items)
        setCount(payload?.count ?? normalized.count)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setStatus({
          loading: false,
          error: 'Could not load activities from the API endpoint.',
        })
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [])

  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Activities</h2>
        <span>{count} records</span>
      </div>

      {status.loading ? <p>Loading activities...</p> : null}
      {status.error ? <div className="error-banner">{status.error}</div> : null}

      {!status.loading && !status.error ? (
        <div className="stack">
          {activities.map((activity) => (
            <div className="row-card" key={activity._id}>
              <div>
                <h3>{activity.type}</h3>
                <p>
                  {activity.user?.name ?? 'Unknown user'} · {activity.team?.name ?? 'Solo'}
                </p>
                <p>{dateFormatter.format(new Date(activity.completedAt))}</p>
              </div>
              <div className="row-meta">
                <span>{activity.distanceKm} km</span>
                <strong>{activity.durationMinutes} min</strong>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default Activities