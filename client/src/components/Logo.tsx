import { memo } from "react";
import { Link } from "react-router-dom";

const Logo = memo(() => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="text-2xl font-bold text-slate-100">
        테일즈위키
      </Link>
    </div>
  );
});

export default Logo;
