const getTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  return localStorageTodos;
};

const createTodo = (e) => {
  e.preventDefault();
  const startDate = document.querySelector("#startDate").value;
  const description = document.querySelector("#description").value;
  // Получаем значение из localStorage
  const localStorageTodos = getTodos();
  // Создаем новый объект
  const newTodo = {
    // Создаем уникальный id
    id: "todo_" + Math.random().toString(12).slice(2),
    // Текущая дата
    createAt: new Date(),
    startDate,
    description,
    done: false,
  };

  //   Проверка на то, что в localStorage имеет такой объект и он является массивом
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    localStorageTodos.push(newTodo);
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  } else {
    localStorage.setItem("todosStorage", JSON.stringify([newTodo]));
  }
  renderTodos();
};

const renderTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    // Получаем контейнер элементов
    const container = document.querySelector("#todo-list ");
    // Обнуляем содержимое
    container.innerHTML = "";
    //  Проходим по массиву элементов и по одному добавляем в контейнер
    localStorageTodos.forEach((todo) => {
      const startDate = new Date(todo.startDate).toLocaleTimeString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      });
      const id = todo.id;
      //разметка элемента
      container.insertAdjacentHTML(
        "beforeend",
        `
<li class="todo-block">
<label class="checkbox" for="${id}"
onclick="toggleTodoDone('${id}')">
<input type="checkbox" name="${id}" id="${id}" ${todo.done ? "checked" : ""}/>
<span class="material-symbols-rounded checkbox__check-icon">
check
</span>
</label>
<div class="todo-block__data">
<p class="todo-block__date">${startDate}</p>
<h3 class="todo-block__title">${todo.description}</h3>
</div>
</li>
`
      );
    });
  }
};
