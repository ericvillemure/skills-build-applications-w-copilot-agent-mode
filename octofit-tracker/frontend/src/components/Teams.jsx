import ResourceTable from './ResourceTable.jsx'
import { apiBaseUrl, parseCollectionResponse } from '../lib/api.js'

const fetchTeams = (signal) =>
  fetch(`${apiBaseUrl}/api/teams/`, { signal }).then(parseCollectionResponse)

const columns = [
  { key: 'name', label: 'TEAM', render: (team) => <span className="table-primary-value">{team.name ?? '—'}</span> },
  { key: 'captain', label: 'CAPTAIN' },
  { key: 'members', label: 'MEMBERS', render: (team) => Array.isArray(team.members) ? team.members.length : team.members ?? 0 },
  { key: 'points', label: 'POINTS', render: (team) => <span className="table-points">{team.points ?? 0}</span> },
]

function Teams() {
  return (
    <ResourceTable
      title="Teams"
      description="Team rosters and points earned through shared activity."
      category="COMMUNITY / SQUADS"
      load={fetchTeams}
      columns={columns}
      emptyMessage="Create a team to start competing together."
    />
  )
}

export default Teams