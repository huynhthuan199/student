import classNamesBinding from 'classnames/bind';

import styles from './header.module.scss';
import logo from '../../../assets/images/rongviet-icon.jpg';
const css = classNamesBinding.bind(styles);

const Header = () => {
    return (
        <div className={css('wrapper')}>
            <div className={css('inner')}>
                <div className={css('logo')}>
                    <img src={logo} alt="Rong Viet Logo" />
                </div>
            </div>
        </div>
    );
};

export default Header;
