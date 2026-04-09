const TeamMembersList = ({ members, onRemove, isCreator, currentUserId }) => {
  if (!members.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No members yet</p>;
  }

  return (
    <ul className="space-y-2">
      {members.map((member) => {
        const isCurrentUser = member._id === currentUserId;
        const canRemove = isCreator && !isCurrentUser;
        return (
          <li key={member._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{member.fullName}</p>
                {isCurrentUser && (
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded">You</span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{member.email}</p>
            </div>
            {canRemove && onRemove && (
              <button onClick={() => onRemove(member)} className="ml-3 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors shrink-0 cursor-pointer">
                Remove
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TeamMembersList;
