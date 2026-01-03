const TeamMembersList = ({ members, onRemove }) => {
  if (!members.length) {
    return <p>No members yet</p>;
  }

  return (
    <ul style={{ marginTop: "12px" }}>
      {members.map((member) => (
        <li
          key={member._id}
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 500 }}>
              {member.fullName}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              {member.email}
            </div>
          </div>

          {onRemove && (
            <button
              onClick={() => onRemove(member)}
              style={{ fontSize: "13px" }}
            >
              Remove
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TeamMembersList;
