import {SyntheticEvent} from 'react';

export interface IRepo {
    name: string;
    stargazersCount: number;
}

export interface IDto {
    incomplete_results: boolean;
    total_count: number;
    items: IRepo[];
}