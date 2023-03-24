import classNamesBinding from 'classnames/bind';

import styles from './form-group.module.scss';

const css = classNamesBinding.bind(styles);
const FormGroup = ({ field, title, type, message, value, minValue, onChange }) => {
    return (
        <div className={css('form-group')}>
            <label htmlFor={field} className={css('form-label')}>
                {title}
            </label>
            <div className={css('form-input')}>
                <input name={field} type={type} value={value} min={minValue} onChange={onChange} />
            </div>
            <span className={css('form-message')}>{message || null}</span>
        </div>
    );
};

export default FormGroup;
