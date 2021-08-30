import { useParams } from "react-router-dom";
import Todo from './Todo';

const CategoryTodoList = ({todos, setTodos}) => {
    const {category} = useParams();
    const thisCategory = category.replace(/[-]/g, ' ');
    const categoryTodo = todos.filter((todo) => todo.category === thisCategory);
    return ( 
        <div className="showtodo">
            <h2 class='showtodo-title'>{thisCategory}</h2>
            {categoryTodo.length==0 && <h3>Opps, to do list is empty. Let's create one!</h3>}
            <Todo todos={categoryTodo} setTodos={setTodos}/>
        </div>
     );
}
 
export default CategoryTodoList;