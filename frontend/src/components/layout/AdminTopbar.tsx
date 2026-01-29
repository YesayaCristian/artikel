export default function AdminTopbar() {
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div className="text-blue-900 font-semibold text-lg">Admin Dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-blue-700">Welcome, Admin!</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
          Logout
        </button>
      </div>
    </div>
  );
}