document.addEventListener('DOMContentLoaded', () => {
    // Toggle Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Task Management
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', event => {
            event.preventDefault();
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            const deadline = document.getElementById('task-deadline').value;
            const category = document.getElementById('task-category').value;
            addTask(title, description, deadline, category);
        });
    }

    const taskSearch = document.getElementById('task-search');
    if (taskSearch) {
        taskSearch.addEventListener('input', () => {
            loadTasks(taskSearch.value);
        });
    }

    // Note Management
    const noteForm = document.getElementById('note-form');
    if (noteForm) {
        noteForm.addEventListener('submit', event => {
            event.preventDefault();
            const title = document.getElementById('note-title').value;
            const content = document.getElementById('note-content').value;
            const category = document.getElementById('note-category').value;
            addNote(title, content, category);
        });
    }

    const noteSearch = document.getElementById('note-search');
    if (noteSearch) {
        noteSearch.addEventListener('input', () => {
            loadNotes(noteSearch.value);
        });
    }

    // Load tasks and notes
    if (document.getElementById('task-list')) {
        loadTasks();
    }
    if (document.getElementById('note-list')) {
        loadNotes();
    }

    // Functions for managing tasks and notes
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    function addTask(title, description, deadline, category) {
        const tasks = getTasks();
        tasks.push({ title, description, deadline, category, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function addNote(title, content, category) {
        const notes = getNotes();
        notes.push({ title, content, category });
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    function loadTasks(filter = '') {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()));
        document.getElementById('task-list').innerHTML = filteredTasks.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Category: ${task.category}</p>
                <p>Deadline: ${task.deadline}</p>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `).join('');
    }

    function loadNotes(filter = '') {
        const notes = getNotes();
        const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()));
        document.getElementById('note-list').innerHTML = filteredNotes.map((note, index) => `
            <li>
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <p>Category: ${note.category}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            </li>
        `).join('');
    }

    window.toggleTask = function (index) {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    window.deleteTask = function (index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    window.deleteNote = function (index) {
        const notes = getNotes();
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
});
