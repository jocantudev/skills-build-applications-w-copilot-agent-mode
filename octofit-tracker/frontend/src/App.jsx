import { useEffect, useState } from 'react'
import { getApiBaseUrl } from './config/api'
import './App.css'

function App() {
  const [data, setData] = useState({ users: [], activities: [] })
  const [status, setStatus] = useState({ loading: true, error: '' })
  const [baseUrl] = useState(getApiBaseUrl())

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      setStatus({ loading: true, error: '' })

      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetch(`${baseUrl}/api/users/`, { signal: controller.signal }),
          fetch(`${baseUrl}/api/activities/`, { signal: controller.signal }),
        ])

        if (!usersResponse.ok || !activitiesResponse.ok) {
          throw new Error('Unable to load OctoFit data')
        }

        const [usersPayload, activitiesPayload] = await Promise.all([
          usersResponse.json(),
          activitiesResponse.json(),
        ])

        setData({
          users: usersPayload.items ?? [],
          activities: activitiesPayload.items ?? [],
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus({
            loading: false,
            error: 'Could not reach the API. Check that the backend is running on port 8000.',
          })
          return
        }
      }

      setStatus({ loading: false, error: '' })
    }

    loadData()

    return () => controller.abort()
  }, [baseUrl])

  const totalWeeklyMinutes = data.users.reduce(
    (sum, user) => sum + (user.weeklyActiveMinutes ?? 0),
    0,
  )

  const latestActivity = data.activities[0]

  const currencyDate = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <h1>Live API dashboard</h1>
          <p className="lede">
            The frontend reads from the Node.js API using the current host, so
            it works on localhost and in Codespaces.
          </p>
        </div>

        <div className="status-chip">
          <span className="status-dot" />
          <span>{status.loading ? 'Loading data' : 'API connected'}</span>
        </div>

        <div className="base-url">API base: {baseUrl}</div>
      </section>

      {status.error ? <div className="error-banner">{status.error}</div> : null}

      <section className="metrics-grid">
        <article className="metric-card">
          <span>Users</span>
          <strong>{data.users.length}</strong>
        </article>
        <article className="metric-card">
          <span>Activities</span>
          <strong>{data.activities.length}</strong>
        </article>
        <article className="metric-card">
          <span>Total weekly minutes</span>
          <strong>{totalWeeklyMinutes}</strong>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <h2>Team members</h2>
            <span>{data.users.length} records</span>
          </div>

          <div className="stack">
            {data.users.map((user) => (
              <div className="row-card" key={user._id}>
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.location}</p>
                </div>
                <div className="row-meta">
                  <span>{user.fitnessLevel}</span>
                  <strong>{user.weeklyActiveMinutes} min</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Recent activity</h2>
            <span>{data.activities.length} records</span>
          </div>

          <div className="stack">
            {data.activities.map((activity) => (
              <div className="row-card" key={activity._id}>
                <div>
                  <h3>{activity.type}</h3>
                  <p>
                    {activity.user?.name} · {activity.team?.name ?? 'Solo'}
                  </p>
                </div>
                <div className="row-meta">
                  <span>{currencyDate.format(new Date(activity.completedAt))}</span>
                  <strong>{activity.durationMinutes} min</strong>
                </div>
              </div>
            ))}
          </div>

          {latestActivity ? (
            <div className="summary-box">
              Latest completion: {latestActivity.type} on{' '}
              {currencyDate.format(new Date(latestActivity.completedAt))}
            </div>
          ) : null}
        </article>
      </section>
    </main>
  )
}

export default App
