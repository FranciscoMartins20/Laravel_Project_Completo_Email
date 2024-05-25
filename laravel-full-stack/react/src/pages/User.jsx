import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function User() {

    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm('Tem a certeza que deseja eliminar este utilizador ?')) {
            return
        }
        axiosClient.delete(`users/${u.id}`)
            .then(() => {
                //TODO
                getUsers();
            })
    }

    const getUsers = () => {
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data)
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Utilizadores</h1>
               
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                A carregar ...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>

                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button onClick={ev => onDelete(u)} className="btn-delete">Apagar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    );
}
