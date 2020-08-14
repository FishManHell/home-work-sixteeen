class Model{
    constructor(){
      this.todos = [];
    }
    addTodo(text){
      const todo = {
        id: Date.now().toString(),
        text: text
      }
      this.todos.push(todo);
    }
    deleteTodo(id){
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
  
  class View{
    constructor(){
      this.root = document.getElementById("root");
      this.input = document.createElement("input");
      this.addBtn = document.createElement("button");
      this.todoList = document.createElement("ul");
      
      this.render();
    }
    render(){
      this.addBtn.innerHTML = "Add";
      this.root.append(
        this.input,
        this.addBtn,
        this.todoList
      )
    }
    renderTodos(todos){
      this.todoList.innerHTML = "";
      if(todos.length){
        todos.forEach(todo => {
          const li = document.createElement("li");
          li.dataset.id = todo.id;
          li.innerHTML = todo.text;
          const deleteBtn = document.createElement("span");
          deleteBtn.innerHTML = "&times;";
          deleteBtn.className = "deleteBtn";
          li.appendChild(deleteBtn);
          this.todoList.appendChild(li);
        })
      }
    }
  }
  
  class Controller{
    constructor(model, view){
      this.model = model;
      this.view = view;
      
      this.view.addBtn.addEventListener("click", this.handleAdd.bind(this))
    }
    
    handleAdd(){
      const value = this.view.input.value;
      if(value.trim()){
        this.model.addTodo(value);
        this.view.input.value = "";
        this.view.renderTodos(this.model.todos);
        this.view.todoList.addEventListener("click", this.handleDelete.bind(this));
      }else{
        console.log("Поле пустое")
      }
    }
    
    handleDelete(event){
      const deleteBtn = event.target.closest(".deleteBtn");
      if(deleteBtn){
        const id = deleteBtn.parentElement.dataset.id;
        this.model.deleteTodo(id);
        this.view.renderTodos(this.model.todos);
      }
    }
  }
  
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);