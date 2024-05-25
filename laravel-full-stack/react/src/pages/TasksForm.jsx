import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

export default function TasksForm() {
    const [task, setTask] = useState({
        name: '',
        description: '',
        user_id: '' ,
        status: 'Pendente'
    });
    const [users, setUsers] = useState([]); // Estado para os usuários
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/tasks/${id}`)
                .then(({ data }) => {
                    setTask(data.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch task:", err);
                    setLoading(false);
                });
        }

        // Buscar a lista de usuários
        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data.data);
            })
            .catch(err => {
                console.error("Failed to fetch users:", err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axiosClient.put(`/tasks/${id}`, task)
                .then(() => {
                    navigate('/tasks');
                })
                .catch(err => {
                    console.error("Failed to update task:", err);
                });
        } else {
            axiosClient.post('/tasks', task)
                .then(() => {
                    navigate('/tasks');
                })
                .catch(err => {
                    console.error("Failed to create task:", err);
                });
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h1>
            {loading && <p>A carregar...</p>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Utilizador:</label>
                        <select
                            name="user_id"
                            value={task.user_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um usuário</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
                    </div>
                </form>
            )}
        </div>
    );
}
