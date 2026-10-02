import ResourceTable from './ResourceTable.jsx'
import { apiBaseUrl, parseCollectionResponse } from '../lib/api.js'

const fetchLeaderboard = (signal) =>
  fetch(`${apiBaseUrl}/api/leaderboard/`, { signal }).then(parseCollectionResponse)

const columns = [
  { key: 'rank', label: 'RANK', render: (entry) => <span className="table-rank">{entry.rank ?? '—'}</span> },
  { key: 'name', label: 'ATHLETE', render: (entry) => <span className="table-primary-value">{entry.name ?? '—'}</span> },
  { key: 'points', label: 'POINTS', render: (entry) => <span className="table-points">{entry.points ?? 0}</span> },
]

function Leaderboard() {
  return (
    <ResourceTable
      title="Leaderboard"
      description="The standings, sorted by rank, across this fitness community."
      category="COMMUNITY / STANDINGS"
      load={fetchLeaderboard}
      columns={columns}
      emptyMessage="Rankings will appear as members earn points."
    />
  )
}

export default Leaderboard