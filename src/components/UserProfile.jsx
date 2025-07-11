function UserProfile({ name }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-green-500">👤</span>
      <p>{name} (0x...)</p>
    </div>
  );
}

export default UserProfile;