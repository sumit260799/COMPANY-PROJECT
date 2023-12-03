import { useUserContext } from "../../mnf_context/userContext";
import { Link } from "react-router-dom";
function Logout() {
  const { handleLogout } = useUserContext();
  return (
    <div className="my-44 w-full">
      <Link
        to="/"
        onClick={handleLogout}
        className="text-white bg-black p-2 rounded-md mx-auto "
      >
        Logout
      </Link>
    </div>
  );
}

export default Logout;
