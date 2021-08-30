const Todo = ({todos, setTodos}) => {

    const completedTodoHandler = (todo) => {
        setTodos(todos.map((item) => {
            if(item.id === todo.id){
                return{
                    ...item,
                    completed: !item.completed
                }
            }
            return item;
        }))
    }

    const changeButton = (e) => {
        e.target.classList.toggle('fas');
        e.target.classList.toggle('far');
    }

    const deleteTodo = (todo) => {
        setTodos(todos.filter((t) => t.id !== todo.id));
    }

    return ( 
        todos.map((todo) => (
            <div className="to-do-container">
            <button className="check-button"><i className={todo.completed? "button-icon fas fa-check-circle" : "button-icon far fa-circle"} id='unchecked' onClick={(e) => {
                e.target.classList.toggle('fas');
                e.target.classList.toggle('far');
                completedTodoHandler(todo);
            }}></i></button>
            <div className="to-do-details">
                <h3>{todo.title}</h3>
                <p className="deadline">{todo.deadline}</p>
                <p className="categories">{todo.category}</p>
            </div>
            <button className="edit-button"><i className="button-icon far fa-edit" onMouseEnter={changeButton} onMouseLeave={changeButton}></i></button>
            <button className="delete-button"><i className="button-icon far fa-trash-alt" onMouseEnter={changeButton} onMouseLeave={changeButton} onClick={() => deleteTodo(todo)}></i></button>
        </div>
        ))
     );
}
 
export default Todo;