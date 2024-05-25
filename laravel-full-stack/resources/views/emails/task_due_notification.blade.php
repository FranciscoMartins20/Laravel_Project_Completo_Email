<!DOCTYPE html>
<html>
<head>
    <title>Notificação de Tarefa Finalizada</title>
</head>
<body>
    <h1>Notificação de Tarefa Finalizada</h1>
    <p>Olá, {{ $user->name }}!</p>
    <p>Esta é uma notificação para informá-lo que a seguinte tarefa foi finalizada:</p>

    <p><strong>Nome da Tarefa:</strong> {{ $task->name }}</p>
    <p><strong>Descrição:</strong> {{ $task->description }}</p>

    <p>Obrigado,</p>
    <p>Sua equipe de gestão de tarefas</p>
</body>
</html>
