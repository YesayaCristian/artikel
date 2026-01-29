import { NavLink } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-blue-900">Article Web</div>
          <div className="flex gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-blue-700 hover:text-blue-900 font-medium ${isActive ? 'text-blue-900 border-b-2 border-blue-600' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/articles" 
              className={({ isActive }) => 
                `text-blue-700 hover:text-blue-900 font-medium ${isActive ? 'text-blue-900 border-b-2 border-blue-600' : ''}`
              }
            >
              Articles
            </NavLink>
            {/* <NavLink 
              to="/#categories" 
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Categories
            </NavLink>
            <NavLink 
              to="/#tags" 
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Tags
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
}