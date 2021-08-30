import {Link} from 'react-router-dom';
const Aside = ({categories}) => {

    const hideAside = () => {
        const asideMenu = document.querySelector('.aside-content');
        asideMenu.style.transform = 'translateX(-1000%)';
        asideMenu.style.opacity = '0';
        setTimeout(()=>{
            asideMenu.style.display = 'none';
        }, 50);
    }

    const generateNewCategories = () => {
        let newCategoriesDiv = [];

        if(categories.length > 3){
            for (let i=3; i<categories.length; i++){
                newCategoriesDiv.push((
                    <Link to={'/' + categories[i].replace(/\s/g, '-')}><div className="aside-btn"><p><i class="icon fas fa-pencil-alt"></i> {categories[i]}</p></div> </Link>
                ));
            }
        }
        return newCategoriesDiv;
    }

    return ( 
        <aside id="asideMenu">
            <button className="hide-aside" onClick={hideAside}><i className="fas fa-times"></i></button>
            <h3>Categories</h3>
            <Link to='/'><div className="aside-btn my-day"><p><i className="icon fas fa-list"></i> All Todos</p></div></Link>
            <Link to='/myday'><div className="aside-btn my-day"><p><i className="icon far fa-sun"></i> My Day</p></div></Link>
            <Link to='/completed-todos'><div className="aside-btn completed-tasks"><p><i className="icon fas fa-check"></i> Completed Tasks</p></div></Link> 
            <Link to='/Tasks'><div className="aside-btn tasks"><p><i className="icon far fa-folder-open"></i> Tasks</p></div></Link>
            <Link to='/Planned-Tasks'><div className="aside-btn planned-tasks"><p><i className="icon far fa-calendar-alt"></i> Planned Tasks</p></div> </Link>
            <Link to='/Important-Tasks'><div className="aside-btn important-tasks"><p><i className="icon far fa-star"></i> Important Tasks</p></div> </Link>
            {generateNewCategories().map((div) => (div))}
            <Link to='/add-category'><div className="aside-btn add-categories"><p><i className="icon fas fa-plus"></i> Add Categories</p></div> </Link>
        </aside>
     );
}
 
export default Aside;