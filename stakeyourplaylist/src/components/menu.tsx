// components/Menu.tsx
import Link from 'next/link';
import styles from './menu.module.css';


const Menu: React.FC = () => {
    return (
        <nav className={styles.menu}>
            <ul>
                <li><Link href="/about">ABOUT</Link></li>
                <li><a href="https://github.com/ganmany5288/stakeyourplaylist/">GitHub</a></li>
                <li><Link href="/login">LOG IN</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
