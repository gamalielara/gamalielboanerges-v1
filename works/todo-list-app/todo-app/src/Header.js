import Aside from './Aside';

const Header = () => {
    const showAside = (e) => {
        const asideMenu = document.querySelector('.aside-content');
        console.log(asideMenu);
        asideMenu.style.display = 'flex';
        setTimeout(()=>{
            asideMenu.style.opacity = '1';
            asideMenu.style.transform = 'translateX(0)';
        }, 50);
    }
    return ( 
        <header className="App-header">
            <div className="menu-toggle">
                <button className="menu open" id="menu" onClick = {showAside}><i className="fas fa-bars"></i></button>
            </div>

            <div className="title">
            <h2 class="title"><i class="icon fas fa-check-double"></i>toDo</h2>
            </div>

            <div className="profile">
                <div className="my-profile">
                    <button className="help"><i class="far fa-question-circle"></i></button>
                    <button className="notification"><i class="far fa-bell"></i></button>
                    <h4 class="user-name">Ara Gamaliel </h4>
                    <div className="dropdown-button">
                        <button className="dropdown"><i class="fas fa-chevron-down"></i></button>
                        <div className="profile-options">
                            <ul>
                                <li><a href="#">My Profile</a></li>
                                <li><a href="#">Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <i class="user-icon fas fa-user-circle"></i>
            </div>
        </header>
     );
}
 
export default Header;