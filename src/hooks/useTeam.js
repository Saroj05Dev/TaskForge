import { useEffect, useState } from "react"
import { getTeamMembersApi } from "../features/teams/team.api";

export const useTeam = () => {
    const [memberCount, setMemberCount] = useState(0);

    const teamId = "6951507a9087cb1b5d35b80e"; // temp

    useEffect(() => {
        getTeamMembersApi(teamId).then((res) => {
            const members = res.data.data.members || [];
            setMemberCount(members.length);
        })
    }, []);
    return { memberCount };

}