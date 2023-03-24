import classNamesBinding from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '../button/button.component';
import styles from './form.module.scss';

const css = classNamesBinding.bind(styles);

const Form = ({ title, description, action, fields, onSubmit }) => {
    const fieldDatasInit = new Map();
    fields.forEach((field) => {
        fieldDatasInit.set(field.fieldName, 1);
    });

    const [fieldDatas, setFieldDatas] = useState(fieldDatasInit);

    const handleFieldOnChanged = (fieldName, value) => {
        setFieldDatas(new Map(fieldDatas.set(fieldName, value)));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(fieldDatas);
    };
    return (
        <form onClick={(e) => handleOnSubmit}>
            <h3 className={css('title')}>{title}</h3>
            <p className={css('description')}>{description}</p>

            <div className={css('spacer')}></div>

            {fields.map((field) => {
                const { fieldName, label, type, message } = field;
                return (
                    <div className={css('form-group')} key={fieldName}>
                        <label
                            htmlFor={fieldName}
                            className={css('form-label')}
                        >
                            {label}
                        </label>
                        <div className={css('form-input')}>
                            <input
                                id={fieldName}
                                type={type}
                                name={fieldName}
                                value={fieldDatas.get(fieldName)}
                                onChange={(e) => {
                                    let value = Number.parseInt(e.target.value);
                                    handleFieldOnChanged(fieldName, value);
                                }}
                            />
                        </div>
                        <span className={css('form-message')}>
                            {message || null}
                        </span>
                    </div>
                );
            })}

            <Button
                className={css('form-submit')}
                primary
                onClick={handleOnSubmit}
            >
                {action}
            </Button>
        </form>
    );
};

export default Form;
