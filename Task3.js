let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-info">
                <div class="task-text">${task.text}</div>
                <div class="task-date">Added: ${task.addedDate}${task.completedDate ? ` | Completed: ${task.completedDate}` : ''}</div>
            </div>
        `;

        if (!task.isCompleted) {
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.classList.add('complete-btn');
            completeBtn.onclick = () => completeTask(task.id);
            li.appendChild(completeBtn);
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => editTask(task.id);
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);

        if (task.isCompleted) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        addedDate: new Date().toLocaleString(),
        completedDate: null,
        isCompleted: false
    };
    tasks.push(newTask);
    saveTasks();
    input.value = '';
    renderTasks();
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.isCompleted = true;
        task.completedDate = new Date().toLocaleString();
        saveTasks();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Initial render
renderTasks();