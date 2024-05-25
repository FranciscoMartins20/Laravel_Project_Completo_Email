import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Tasks.css";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]); // Estado para os usuários
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTasks();
        getUsers();
    }, []);

    const getTasks = () => {
        setLoading(true);
        axiosClient.get('/tasks')
            .then(({ data }) => {
                setLoading(false);
                setTasks(data.data);
            })
            .catch(err => {
                console.error("Failed to fetch tasks:", err);
                setLoading(false);
            });
    };

    const getUsers = () => {
        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data.data);
            })
            .catch(err => {
                console.error("Failed to fetch users:", err);
            });
    };

    const onDelete = (task) => {
        if (!window.confirm('Tem a certeza que deseja eliminar esta tarefa?')) {
            return;
        }
        axiosClient.delete(`/tasks/${task.id}`)
            .then(() => {
                getTasks();
            })
            .catch(err => {
                console.error("Failed to delete task:", err);
            });
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.status = result.destination.droppableId;
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);

        axiosClient.put(`/tasks/${movedTask.id}`, movedTask)
            .catch(err => {
                console.error("Failed to update task status:", err);
            });
    };

    const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

    const getUserNameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Desconhecido';
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Tarefas</h1>
                <Link to="/tasks/new" className="task-btn-add">Adicionar nova tarefa</Link>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {['Pendente', 'Em Progresso', 'Finalizado'].map(status => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        width: '30%',
                                        minHeight: '400px',
                                        backgroundColor: '#f4f4f4',
                                        padding: '10px',
                                        margin: '10px'
                                    }}
                                >
                                    <h2>{status}</h2>
                                    {loading && <p>A carregar...</p>}
                                    {!loading && getTasksByStatus(status).map((task, index) => (
                                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        padding: '10px',
                                                        margin: '0 0 10px 0',
                                                        backgroundColor: 'white',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    <p><strong>{task.name}</strong></p>
                                                    <p>{task.description}</p>
                                                    <p>Atribuído a: {getUserNameById(task.user_id)}</p>
                                                    <p>
                                                        <Link to={`/tasks/${task.id}`} className="task-btn-edit">Editar</Link>
                                                        <button onClick={() => onDelete(task)} className="task-btn-delete">Apagar</button>
                                                    </p>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
