import React from 'react';
import {IRepo} from '../types';

type Props = {
    repo: IRepo
};

const styles = {
    color: '#FFD700'
};

export function Repo({repo}: Props) {
    return (
        <>
            <div><h3>Название репозитория</h3></div>
            <div>{repo.name}</div>
            <div className="stars-info">
                <i className="bi bi-star-fill" style={styles}></i> <span>{repo.stargazersCount}</span>
            </div>
        </>
    );
}