/**
 * AnalytiX — Metric Card Component
 * Author: Shebin S Illikkal | Shebinsillikkal@gmail.com
 */
export default function MetricCard({ label, value, change, icon, color }) {
  const isPositive = change >= 0

  return (
    <div className="metric-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="metric-header">
        <span className="metric-icon">{icon}</span>
        <span className={
          `metric-change ${isPositive ? 'positive' : 'negative'}`
        }>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  )
}
