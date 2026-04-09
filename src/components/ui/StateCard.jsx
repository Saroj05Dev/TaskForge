const colorMap = {
  blue:   { icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",   border: "hover:border-blue-200 dark:hover:border-blue-800", accent: "bg-blue-600" },
  orange: { icon: "bg-orange-100 dark:bg-orange-900/30 text-orange-600", border: "hover:border-orange-200 dark:hover:border-orange-800", accent: "bg-orange-500" },
  green:  { icon: "bg-green-100 dark:bg-green-900/30 text-green-600",  border: "hover:border-green-200 dark:hover:border-green-800", accent: "bg-green-500" },
  purple: { icon: "bg-purple-100 dark:bg-purple-900/30 text-purple-600", border: "hover:border-purple-200 dark:hover:border-purple-800", accent: "bg-purple-500" },
};

const StatCard = ({ title, value, icon: Icon, color = "blue", subtitle }) => {
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-default ${c.border}`}>
      {/* Subtle top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 tabular-nums leading-none">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${c.icon} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
