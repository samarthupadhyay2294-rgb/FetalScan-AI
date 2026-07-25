import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function PredictionCard({ riskBreakdown, measurements }) {
  const labels = Object.keys(riskBreakdown || {});
  const values = Object.values(riskBreakdown || {});

  const doughnutData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: ['#2563EB', '#06B6D4', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: ['BPD', 'OFD', 'CI'],
    datasets: [{
      label: 'Measurements',
      data: [measurements?.bpd_mm, measurements?.ofd_mm, measurements?.cephalic_index],
      backgroundColor: ['#2563EB', '#06B6D4', '#14B8A6'],
      borderRadius: 8,
    }],
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-slate-900">Disease Risk Distribution</h3>
        <Doughnut data={doughnutData} options={{ plugins: { legend: { position: 'bottom' } } }} />
      </div>
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-slate-900">Biometric Values</h3>
        <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
}
