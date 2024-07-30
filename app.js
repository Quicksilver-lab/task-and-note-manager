document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const noteForm = document.getElementById('note-form');
    const taskList = document.getElementById('task-list');
    const noteList = document.getElementById('note-list');
    const taskSearch = document.getElementById('task-search');
    const noteSearch = document.getElementById('note-search');
    const themeToggle = document.getElementById('theme-toggle');

    // Load tasks and notes from LocalStorage
    loadTasks();
    loadNotes();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const deadline = document.getElementById('task-deadline').value;
        const category = document.getElementById('task-category').value;
        addTask(title, description, deadline, category);
        taskForm.reset();
    });

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const category = document.getElementById('note-category').value;
        addNote(title, content, category);
        noteForm.reset();
    });

    taskSearch.addEventListener('input', () => {
        loadTasks(taskSearch.value);
    });

    noteSearch.addEventListener('input', () => {
        loadNotes(noteSearch.value);
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
    });

    function addTask(title, description, deadline, category) {
        const tasks = getTasks();
        const task = { title, description, deadline, category, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function addNote(title, content, category) {
        const notes = getNotes();
        const note = { title, content, category };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    function loadTasks(searchText = '') {
        const tasks = getTasks().filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()));
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Deadline: ${task.deadline}</p>
                <p>Category: ${task.category}</p>
                <button onclick="toggleTask(${index})">Toggle Complete</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `).join('');
    }

    function loadNotes(searchText = '') {
        const notes = getNotes().filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()));
        noteList.innerHTML = notes.map((note, index) => `
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
