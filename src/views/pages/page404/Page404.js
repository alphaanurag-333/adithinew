import NotFoundImg from '../../../assets/webImage/404.svg'
import { NavLink } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'

const Page404 = () => {
  return (
    <div className="NotFoundDiv">
      <img className="" src={NotFoundImg}  alt="404 page not found"/>
      <NavLink to="/admin/dashboard">
        <h6>
          <GoArrowLeft />
          Back to Dashboard
        </h6>
      </NavLink>
    </div>
  )
}

export default Page404
