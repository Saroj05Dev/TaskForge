const StatCard = ({ title, value }) => {
  return (
    <div className="rounded-xl p-4 bg-card">
      <p className="text-sm text-muted">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;
