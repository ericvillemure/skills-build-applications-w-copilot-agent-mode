import ResourceTable from './ResourceTable.jsx'
import { apiBaseUrl, parseCollectionResponse } from '../lib/api.js'

const fetchWorkouts = (signal) =>
  fetch(`${apiBaseUrl}/api/workouts/`, { signal }).then(parseCollectionResponse)

const columns = [
  { key: 'title', label: 'WORKOUT', render: (workout) => <span className="table-primary-value">{workout.title ?? '—'}</span> },
  { key: 'category', label: 'CATEGORY' },
  { key: 'difficulty', label: 'DIFFICULTY' },
  { key: 'durationMinutes', label: 'DURATION', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
]

function Workouts() {
  return (
    <ResourceTable
      title="Workouts"
      description="Browse training sessions by focus, difficulty, and duration."
      category="TRAINING / LIBRARY"
      load={fetchWorkouts}
      columns={columns}
      emptyMessage="Workout suggestions will appear here."
    />
  )
}

export default Workouts