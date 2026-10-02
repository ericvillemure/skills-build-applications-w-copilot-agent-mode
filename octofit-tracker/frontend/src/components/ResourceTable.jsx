import { useResource } from '../lib/useResource.js'

function ResourceTable({ title, description, category, load, columns, emptyMessage }) {
  const { items, loading, error } = useResource(load)

  return (
    <section className="resource-view" aria-labelledby="resource-title">
      <header className="resource-heading">
        <div>
          <p className="resource-kicker">{category}</p>
          <h1 className="resource-title" id="resource-title">{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        <div className="record-count" aria-label={`${items.length} records`}>
          <strong>{String(items.length).padStart(2, '0')}</strong>
          <span>records</span>
        </div>
      </header>
      {error && <div className="alert resource-error" role="alert">{error}</div>}
      <div className="resource-table-wrap">
        {loading ? (
          <div className="loading-state" role="status">
            <span className="spinner-border" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <strong>{error ? 'Data unavailable' : 'No records yet'}</strong>
            <span>{error ? 'Check the API connection and try again.' : emptyMessage}</span>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table resource-table align-middle">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render ? column.render(item) : item[column.key] ?? '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceTable