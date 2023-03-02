import React, {BaseSyntheticEvent} from 'react';

type Props = {
    btnDisabled: string;
    handleNav(event: BaseSyntheticEvent): void;
};

const styles = {
    marginTop: '10px'
};

export function Nav({handleNav, btnDisabled}: Props) {
    return (
        <nav aria-label="..." style={styles}>
            <ul className="pagination" onClick={handleNav}>
                <li className={`page-item ${btnDisabled}`} key="prev">
                    <a className="page-link" href="#" data-nav="prev">Назад</a>
                </li>
                <li className="page-item" key="next">
                    <a className="page-link" href="#" data-nav="next">Вперед</a>
                </li>
            </ul>
        </nav>
    );
}