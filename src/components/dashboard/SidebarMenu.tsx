// import { NavLink } from "react-router-dom";

// import { AiOutlineUserSwitch } from "react-icons/ai";
// import { SiGoogleclassroom } from "react-icons/si";

// const AdminMenu = () => {
//   return (
//     <>

//      <div>
//      <NavLink
//         to="/dashboard/add-users"
//         className={({ isActive }) =>
//           `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
//             isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
//           }`
//         }
//       >
//         <AiOutlineUserSwitch className="w-6 h-6 text-gray-500" />

//         <span className="mx-4 font-medium text-gray-500">Manage Users</span>
//       </NavLink>
//       <NavLink
//         to="/dashboard/manage-classes"
//         className={({ isActive }) =>
//           `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
//             isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
//           }`
//         }
//       >
//        <SiGoogleclassroom className="w-5 h-5" />

//        <span className="mx-4 font-medium text-gray-500">Manage Classes</span>
//       </NavLink>
//      </div>

//     </>
//   );
// };

// export default AdminMenu;

import { NavLink } from "react-router-dom";


const AdminMenu = () => {
  return (
    <div>
      <NavLink
        to="/dashboard/add-users"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "  text-gray-900 underline " : "text-gray-600"
          }`
        }
      >
        <AiOutlineUserSwitch className="w-6 h-6 text-gray-500" />
        <span className="mx-4 font-medium">Manage Users</span>
      </NavLink>
      <NavLink
        to="/dashboard/manage-classes"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "  text-gray-900 underline " : "text-gray-600"
          }`
        }
      >
        <SiGoogleclassroom className="w-5 h-5" />
        <span className="mx-4 font-medium">Manage Classes</span>
      </NavLink>
      <NavLink
        to="/dashboard/admin-profile"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "  text-gray-900 underline " : "text-gray-600"
          }`
        }
      >
        <CgProfile className="w-5 h-5" />
        <span className="mx-4 font-medium">Profile</span>
      </NavLink>
      <NavLink
        to="/dashboard/admin-home"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "  text-gray-900 underline " : "text-gray-600"
          }`
        }
      >
        <TbBrandGoogleHome className="w-5 h-5" />
        <span className="mx-4 font-medium">Dashboard Home</span>
      </NavLink>
    </div>
  );
};

export default AdminMenu;
