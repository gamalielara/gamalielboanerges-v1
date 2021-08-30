import { useState } from "react";

const AddTodo = ({categories, todos, addTodo}) => {
    const [inputTodo, setInputTodo] = useState('');
    const [inputDeadline, setInputDeadline] = useState('');
    const [inputCategory, setInputCategory] = useState('Tasks');

    const submitHandler = () => {
        const todo = {
            title: inputTodo,
            deadline: inputDeadline.split(' ').splice(0, 4).join(' '),
            category: inputCategory,
            completed: false,
            id: Date.now()
        }
        addTodo([
            ...todos,
            todo
        ]);
        setInputTodo('');
        setInputDeadline('01-01-0001');
        setInputCategory('My Day');
    }

    const inputTodoHandler = (e) => {
        setInputTodo(e.target.value);
    }
    const inputDeadlineHandler = (e) => {
        const date = e.target.value.split('-');
        const deadlineDate = new Date(date[0], date[1]-1, date[2]).toString();
        setInputDeadline(deadlineDate);
    }
    const inputCategoryHandler = (e) => {
        setInputCategory(e.target.value);
    }

    return ( 
        <div className="add-to-do">
            <input type="text" className='add-todo-input' placeholder="Add Todo" value={inputTodo} onChange={inputTodoHandler}/>
            <input type="date" className='add-deadline-input' placeholder="Add Deadline" onChange={inputDeadlineHandler}/>
            <select name="Categories" className='select-categories' onChange={inputCategoryHandler}>
                {categories.map((category) => (
                    <option className="category-option" value={category}>{category}</option>
                ))}
            </select>
            <button className="add-todo-btn" type="submit" onClick={submitHandler}><i className="fas fa-plus-square"></i></button>
        </div>
     );
}
 
export default AddTodo;