export default function PasswordRequirements() {
  return (
    <ul className="bg-slate-700 rounded-lg p-2 mr-6 mt-2 w-3/4 text-xs">
      <span>Password should contain at least: </span>
      <li>- 6 characters</li>
      <li>- one uppercase</li>
      <li>- one lowercase letter</li>
      <li>- one digit</li>
      <li>- one special character</li>
    </ul>
  );
}
