import { useEffect, useState } from 'react'
import { getResourceApiUrl, normalizeCollectionPayload } from '../config/api'

function Users() {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setStatus({ loading: true, error: '' })

      try {
        const response = await fetch(getResourceApiUrl('users'), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load users')
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload)

        setUsers(normalized.items)
        setCount(payload?.count ?? normalized.count)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setStatus({
          loading: false,
          error: 'Could not load users from the API endpoint.',
        })
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Users</h2>
        <span>{count} records</span>
      </div>

      {status.loading ? <p>Loading users...</p> : null}
      {status.error ? <div className="error-banner">{status.error}</div> : null}

      {!status.loading && !status.error ? (
        <div className="stack">
          {users.map((user) => (
            <div className="row-card" key={user._id}>
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.location}</p>
              </div>
              <div className="row-meta">
                <span>{user.fitnessLevel}</span>
                <strong>{user.weeklyActiveMinutes} min / week</strong>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default Users