function UserProfile({ address }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-green-500">👤</span>
      <p>{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
    </div>
  );
}

export default UserProfile;