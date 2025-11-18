import {UserManagement} from "../features/components/UserManagement.tsx";
import {ProgramManagement} from "../features";

export function AdminDashboard() {
    return (
        <>
            <UserManagement />
            <ProgramManagement />
        </>
    );
}
