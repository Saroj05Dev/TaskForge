const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "border-blue-500 bg-blue-50 text-blue-600",
    orange: "border-orange-500 bg-orange-50 text-orange-600",
    green: "border-green-500 bg-green-50 text-green-600",
    purple: "border-purple-500 bg-purple-50 text-purple-600",
  };

  const iconBgClasses = {
    blue: "bg-blue-100",
    orange: "bg-orange-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
  };

  return (
    <div className="rounded-xl p-5 bg-white border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">No tasks yet</p>
        </div>
        {Icon && (
          <div
            className={`p-2.5 rounded-lg ${iconBgClasses[color]} group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon className={colorClasses[color]} size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
