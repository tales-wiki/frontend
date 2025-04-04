import { memo } from "react";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
  onClose: () => void;
}

const MobileMenu = memo(
  ({ isOpen, isAuthenticated, onLogout, onClose }: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3">
          <SearchBar isMobile onSearchClose={onClose} />
        </div>
        <Navigation
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          isMobile
          onItemClick={onClose}
        />
      </div>
    );
  }
);

export default MobileMenu;
