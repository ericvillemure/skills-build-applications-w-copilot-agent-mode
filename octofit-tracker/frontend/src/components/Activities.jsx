import ResourceTable from './ResourceTable.jsx'
import { apiBaseUrl, parseCollectionResponse } from '../lib/api.js'

const fetchActivities = (signal) =>
  fetch(`${apiBaseUrl}/api/activities/`, { signal }).then(parseCollectionResponse)

const columns = [
  { key: 'date', label: 'DATE', render: (activity) => activity.date ? new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
  { key: 'user', label: 'ATHLETE', render: (activity) => <span className="table-primary-value">{activity.user ?? '—'}</span> },
  { key: 'type', label: 'ACTIVITY', render: (activity) => <span className="table-primary-value">{activity.type ?? '—'}</span> },
  { key: 'minutes', label: 'DURATION', render: (activity) => `${activity.minutes ?? '—'} min` },
  { key: 'calories', label: 'CALORIES', render: (activity) => <span className="table-points">{activity.calories ?? '—'} kcal</span> },
]

function Activities() {
  return (
    <ResourceTable
      title="Activity log"
      description="Recent movement recorded across your OctoFit community."
      category="MOVEMENT / JOURNAL"
      load={fetchActivities}
      columns={columns}
      emptyMessage="Logged activities will appear here."
    />
  )
}

export default Activities