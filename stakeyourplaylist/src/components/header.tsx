import Menu from './menu';
import styles from './header.module.css';

const Header: React.FC = () => {
  return (
      <header>
          <div className="logo-container">
              {}
          </div>
          <Menu />
      </header>
  );
};

export default Header;
