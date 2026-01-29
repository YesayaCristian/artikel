import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-6 space-y-2">
        <NavLink 
          to="/admin/dashboard" 
          className={({isActive}) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive 
                ? "bg-blue-800 text-white" 
                : "text-blue-100 hover:bg-blue-800/50"
            }`
          }
        >
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/admin/articles" 
          className={({isActive}) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive 
                ? "bg-blue-800 text-white" 
                : "text-blue-100 hover:bg-blue-800/50"
            }`
          }
        >
          Articles
        </NavLink>
        
        <NavLink 
          to="/admin/categories" 
          className={({isActive}) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive 
                ? "bg-blue-800 text-white" 
                : "text-blue-100 hover:bg-blue-800/50"
            }`
          }
        >
          Categories
        </NavLink>
        
        <NavLink 
          to="/admin/tags" 
          className={({isActive}) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive 
                ? "bg-blue-800 text-white" 
                : "text-blue-100 hover:bg-blue-800/50"
            }`
          }
        >
          Tags
        </NavLink>
      </nav>
      
      <div className="p-6 border-t border-blue-800 text-blue-200 text-sm">
        My Article Web © 2024
      </div>
    </aside>
  );
}