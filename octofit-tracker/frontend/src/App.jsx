import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './lib/api.js'

const navigation = [
  { label: 'Activities', path: '/activities', marker: '01' },
  { label: 'Leaderboard', path: '/leaderboard', marker: '02' },
  { label: 'Teams', path: '/teams', marker: '03' },
  { label: 'Users', path: '/users', marker: '04' },
  { label: 'Workouts', path: '/workouts', marker: '05' },
]

function Workspace() {
  const isCodespace = Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim())

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="" className="brand-logo" />
          <span className="brand-name">OCTOFIT<span>TRACKER</span></span>
        </Link>
        <div className="sidebar-label">TRAINING HUB</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-marker">{item.marker}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" />
          <span>{isCodespace ? 'CODESPACES API' : 'LOCAL API'}</span>
          <span className="sidebar-port">:8000</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">OCTOFIT / PERFORMANCE</p>
            <p className="topbar-host">{apiBaseUrl}</p>
          </div>
          <div className="topbar-date">
            <span className="status-dot" />
            <span>LIVE DATA</span>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </div>
        <footer className="page-footer">
          <span>OCTOFIT TRACKER</span>
          <span>API endpoint <code>{apiBaseUrl}</code></span>
        </footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Workspace />
    </BrowserRouter>
  )
}

export default App