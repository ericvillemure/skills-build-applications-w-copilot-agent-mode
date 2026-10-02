import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function HomePage() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary-subtle text-primary mb-3">OctoFit Tracker</span>
          <h1 className="display-4 fw-bold mb-3">Stay active, compete, and improve together.</h1>
          <p className="lead text-body-secondary mb-4">
            Track workouts, join teams, and keep your students motivated with a modern fitness dashboard.
          </p>
          <div className="d-flex gap-3">
            <Link to="/dashboard" className="btn btn-primary btn-lg">Open dashboard</Link>
            <Link to="/teams" className="btn btn-outline-secondary btn-lg">View teams</Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 mb-3">Weekly highlights</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">12 workouts logged this week</li>
                <li className="list-group-item px-0">Team “Storm Riders” leads leaderboard</li>
                <li className="list-group-item px-0">4 students hit personal goals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function DashboardPage() {
  return (
    <main className="container py-5">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Active users</p>
              <h2 className="display-6 mb-0">128</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Avg. workouts</p>
              <h2 className="display-6 mb-0">4.7</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">Challenges</p>
              <h2 className="display-6 mb-0">09</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function TeamsPage() {
  return (
    <main className="container py-5">
      <h1 className="mb-4">Teams</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="h5 mb-1">Storm Riders</h2>
              <small className="text-muted">Leaderboard leaders</small>
            </div>
            <span className="badge text-bg-success">+180 pts</span>
          </div>
        </div>
        <div className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="h5 mb-1">Peak Performers</h2>
              <small className="text-muted">Most consistent this month</small>
            </div>
            <span className="badge text-bg-primary">+135 pts</span>
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">OctoFit</Link>
          <div className="navbar-nav ms-auto gap-3">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/teams" element={<TeamsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
