import styles from './main-layout.module.scss';
import classNamesBinding from 'classnames/bind';
import Header from '../components/header/header.component';

const css = classNamesBinding.bind(styles);
const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className={css('content')}>{children}</div>
        </div>
    );
};

export default MainLayout;
