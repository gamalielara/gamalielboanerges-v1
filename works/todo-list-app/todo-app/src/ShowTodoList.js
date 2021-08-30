import Todo from './Todo';

const ShowTodoList = ({todos, setTodos, text}) => {

    return ( 
        <div className="showtodo">
            <h2 class='showtodo-title'>{text}</h2>
            {todos.length==0 && <h3>Opps, to do list is empty. Let's create one!</h3>}
            <Todo todos={todos} setTodos={setTodos}/>
        </div>
     );
}
 
export default ShowTodoList;