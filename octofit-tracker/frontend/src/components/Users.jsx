import ResourceTable from './ResourceTable.jsx'
import { apiBaseUrl, parseCollectionResponse } from '../lib/api.js'

const fetchUsers = (signal) =>
  fetch(`${apiBaseUrl}/api/users/`, { signal }).then(parseCollectionResponse)

const columns = [
  { key: 'name', label: 'MEMBER', render: (user) => <span className="table-primary-value">{user.name ?? '—'}</span> },
  { key: 'email', label: 'EMAIL' },
  { key: 'team', label: 'TEAM' },
  { key: 'level', label: 'LEVEL' },
  { key: 'points', label: 'POINTS', render: (user) => <span className="table-points">{user.points ?? 0}</span> },
]

function Users() {
  return (
    <ResourceTable
      title="Members"
      description="Profiles, teams, and current points for registered athletes."
      category="COMMUNITY / MEMBERS"
      load={fetchUsers}
      columns={columns}
      emptyMessage="Members will appear here when they join."
    />
  )
}

export default Users