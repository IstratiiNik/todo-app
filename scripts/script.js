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
