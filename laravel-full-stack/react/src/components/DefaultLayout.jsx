import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();
        try {
 
            setUser(null);
            setToken(null);
            localStorage.removeItem('ACCESS_TOKEN');
        } catch (err) {
            console.error("Failed to logout", err);
        }
    };

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/tasks">Tarefas</Link>
                <Link to="/users">Utilizadores</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
