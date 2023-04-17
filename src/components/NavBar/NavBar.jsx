import { Link } from 'react-router-dom';
import * as userService from "../../utilities/users-service"
import MyStudioPage from '../../pages/MyStudioPage/MyStudioPage'
import MainPage from '../../pages/MainPage/MainPage';
import harmonicaIcon from '../../icon-harmonica.png'

export default function NavBar({ user, setUser }) {
  function renderImg(imgpath) {
    return (
      <img src={imgpath} alt="small harmonica logo" />
    )
  }
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center">
      <a className="navbar-brand" href="/">{renderImg(harmonicaIcon)}</a>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active link-dark" aria-current="page" to="/mystudio" element={<MyStudioPage />}>My Studio</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active link-dark" aria-current="page" to="/" element={<MainPage />}>Main</Link>

        </li>
        <li className="nav-item">
          <Link className="nav-link active link-dark" aria-current="page" to="" onClick={handleLogOut}>Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}
