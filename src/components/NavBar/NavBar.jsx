import { Link} from 'react-router-dom';
import * as userService from "../../utilities/users-service"
import MyStudioPage from '../../pages/MyStudioPage/MyStudioPage'
import MainPage from '../../pages/MainPage/MainPage';
export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }
  return (
    <nav>
      <Link to="/mystudio" element={<MyStudioPage />}>My Studio</Link>
      &nbsp; | &nbsp;
      <Link to="/" element={<MainPage />}>Main</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name} !</span>
      &nbsp; | &nbsp;
      <Link to="" onClick={ handleLogOut }>Log Out</Link>
    </nav>
  );
}