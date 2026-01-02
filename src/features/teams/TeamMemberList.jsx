const TeamMembersList = ({ members, loading }) => {
  if (loading) return <p>Loading members...</p>;

  if (!members.length) {
    return <p>No members yet</p>;
  }

  return (
    <ul style={{ marginTop: "12px" }}>
      {members.map((member) => (
        <li
          key={member._id}
          style={{
            padding: "6px 0",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontWeight: 500 }}>
            {member.fullName}
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            {member.email}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TeamMembersList;
