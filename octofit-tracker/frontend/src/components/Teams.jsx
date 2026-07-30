import { useEffect, useState } from 'react'
import { getResourceApiUrl, normalizeCollectionPayload } from '../config/api'

const teamsCodespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      setStatus({ loading: true, error: '' })

      try {
        const response = await fetch(
          import.meta.env.VITE_CODESPACE_NAME ? teamsCodespaceApiUrl : getResourceApiUrl('teams'),
          {
          signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error('Unable to load teams')
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload)

        setTeams(normalized.items)
        setCount(payload?.count ?? normalized.count)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setStatus({
          loading: false,
          error: 'Could not load teams from the API endpoint.',
        })
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [])

  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Teams</h2>
        <span>{count} records</span>
      </div>

      {status.loading ? <p>Loading teams...</p> : null}
      {status.error ? <div className="error-banner">{status.error}</div> : null}

      {!status.loading && !status.error ? (
        <div className="stack">
          {teams.map((team) => (
            <div className="row-card" key={team._id}>
              <div>
                <h3>{team.name}</h3>
                <p>
                  {team.city} · {team.sportFocus}
                </p>
                <p>{team.motto}</p>
              </div>
              <div className="row-meta">
                <span>Captain: {team.captain?.name ?? 'Unassigned'}</span>
                <strong>{team.members?.length ?? 0} members</strong>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default Teams