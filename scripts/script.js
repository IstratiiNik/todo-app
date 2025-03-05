// Обработчик кликов для кнопок фильтрации задач
const splitButtonClickHandler = (target) => {
  const splitButton = document.querySelector(".split-button");
  [...splitButton.children].forEach((element) =>
    element.classList.remove("split-button__button--active")
  );
  splitButton.children[target.id].classList.toggle(
    "split-button__button--active"
  );
};

// Функция для получения задач из localStorage
const getTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  return localStorageTodos;
};

// Функция для отображения задач на странице
const renderTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    // Получаем контейнер для задач
    const container = document.querySelector("#todo-list");
    container.innerHTML = "";
    // Проходим по массиву задач и добавляем каждую в контейнер
    localStorageTodos.forEach((todo) => {
      const startDate = new Date(todo.startDate).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      });
      const id = todo.id;
      // Разметка элемента задачи
      container.insertAdjacentHTML(
        "beforeend",
        `
<li class="todo-block">
  <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
    <input type="checkbox" name="${id}" id="${id}" ${
          todo.done ? "checked" : ""
        }/>
    <span class="material-symbols-rounded checkbox__check-icon">check</span>
  </label>
  <div class="todo-block__data">
    <p class="todo-block__date">${startDate}</p>
    <h3 class="todo-block__title">${todo.description}</h3>
  </div>
  <span class="material-symbols-rounded" onclick="deleteTodo('${id}')">close</span>
</li>
`
      );
    });
  }
};

// Функция для создания новой задачи
const createTodo = (e) => {
  e.preventDefault();
  const startDate = document.querySelector("#startDate").value;
  const description = document.querySelector("#description").value;
  // Получаем текущее значение из localStorage
  const localStorageTodos = getTodos();
  // Создаем объект новой задачи
  const newTodo = {
    // Создаем случайный id для задачи
    id: "todo_" + Math.random().toString(16).slice(2),
    // Текущая дата
    createdAt: new Date(),
    startDate,
    description,
    done: false,
  };

  // Проверка на то, что localStorage содержит массив задач
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    // Добавляем новую задачу в массив и записываем в localStorage
    localStorageTodos.push(newTodo);
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  } else {
    // Если localStorage пуст, создаем новый массив с одной задачей
    localStorage.setItem("todosStorage", JSON.stringify([newTodo]));
  }
  // Обновляем список задач на странице
  renderTodos();
};

// Функция для переключения состояния выполнения задачи
const toggleTodoDone = (todoId) => {
  const localStorageTodos = getTodos();
  // Проверка на то, что localStorage содержит массив задач
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    // Находим индекс задачи и переключаем ее состояние
    const todoIndex = localStorageTodos.findIndex((todo) => todo.id === todoId);
    localStorageTodos[todoIndex].done = !localStorageTodos[todoIndex].done;
    // Записываем обновленный массив в localStorage
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  }
  // Обновляем список задач на странице
  renderTodos();
};

// Функция для удаления задачи
const deleteTodo = (todoId) => {
  // Получаем текущее значение из localStorage
  const localStorageTodos = getTodos();
  // Проверка на то, что localStorage содержит массив задач
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    // Фильтруем массив, удаляя задачу с указанным id
    const newTodos = localStorageTodos.filter((todo) => todo.id !== todoId);
    // Записываем обновленный массив в localStorage
    localStorage.setItem("todosStorage", JSON.stringify(newTodos));
  }
  // Обновляем список задач на странице
  renderTodos();
};
