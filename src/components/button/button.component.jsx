import classNamesBinding from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './button.module.scss';

const css = classNamesBinding.bind(styles);

const Button = ({
    to,
    href,
    primary = false,
    outline = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...props
}) => {
    let Button = 'button';
    const _props = {
        onClick,
        props,
    };

    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on')) {
                delete _props[key];
            }
        });
    }

    if (to) {
        Button = Link;
    } else if (href) {
        Button = 'a';
    }

    const classes = css('wrapper', {
        [className]: className,
        primary,
        outline,
        disabled,
        small,
        large,
        className,
    });
    return (
        <Button className={classes} {..._props}>
            {leftIcon && <span className={css('icon')}>{leftIcon}</span>}
              <span className={css('title')}>{children}</span>
            {rightIcon && <span className={css('icon')}>{rightIcon}</span>}
        </Button>
    );
};

export default Button;
