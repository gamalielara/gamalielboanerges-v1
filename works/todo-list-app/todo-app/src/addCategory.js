import { useState } from "react";

const AddCategory = ({setCategories, categories}) => {
    const[category, setCategoryInput] = useState('');

    const addCategoryHandler = (e) => {
        e.preventDefault();
        setCategories([...categories, category]);
        setCategoryInput('');
    }

    const categoryInputHandler = (e) => {
        setCategoryInput(e.target.value);
    }

    return ( 
        <div className="add-category">
            <h3>Add New Category</h3>
            <form>
                <label htmlFor="title">Category Name: </label>
                <input type="text" placeholder="Category Name" id="title" value={category} onChange={categoryInputHandler}/>
                <br />
                <button class="add-category" type="submit" onClick={addCategoryHandler}><p>Add Category</p></button>
            </form>
        </div>
     );
}
 
export default AddCategory;