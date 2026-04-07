/**
 * AnalytiX Dashboard — Dashboard Component
 * Author: Shebin S Illikkal | Shebinsillikkal@gmail.com
 */
import MetricCard from './MetricCard'
import RevenueChart from './RevenueChart'
import TrafficChart from './TrafficChart'
import TopProducts from './TopProducts'
import ActiveUsers from './ActiveUsers'

export default function Dashboard({ view, data }) {
  if (!data) return <div className="loading"><div className="spinner" /><p>Loading data...</p></div>

  const { metrics, revenue, traffic, products, activeUsers } = data

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <MetricCard label="Total Revenue" value={`₹${metrics.revenue.toLocaleString()}`}
          change={metrics.revenueChange} icon="💰" color="#6366f1" />
        <MetricCard label="Active Users" value={metrics.users.toLocaleString()}
          change={metrics.usersChange} icon="👥" color="#10b981" />
        <MetricCard label="Orders Today" value={metrics.orders.toLocaleString()}
          change={metrics.ordersChange} icon="📦" color="#f59e0b" />
        <MetricCard label="Avg Order Value" value={`₹${metrics.avgOrder.toLocaleString()}`}
          change={metrics.avgOrderChange} icon="📈" color="#ef4444" />
      </div>

      <div className="charts-row">
        <RevenueChart data={revenue} />
        <TrafficChart data={traffic} />
      </div>

      <div className="bottom-row">
        <TopProducts products={products} />
        <ActiveUsers users={activeUsers} />
      </div>
    </div>
  )
}
