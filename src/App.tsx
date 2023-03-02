import React, {
    BaseSyntheticEvent,
    useCallback,
    useEffect,
    useState
} from 'react';
import {Octokit} from 'octokit';
import {Repo, Nav} from './components';
import {PREV} from './constants';
import {IRepo} from './types';

const octocat = new Octokit({
    auth: process.env.TOKEN
});

const styles = {
    alignItems: 'center',
    display: 'flex',
    'flex-direction': 'column'
};

function App() {
    const [repos, setRepos] = useState<IRepo[]>([]);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const fetchGH = useCallback(async () => {
        const {data: {items}} = await octocat.request('GET /search/repositories', {
            q: 'language:typescript',
            sort:'stars',
            order: 'desc',
            page: page,
            per_page: 100
        });

        setRepos(items.map(({name, stargazers_count}) => ({
            name,
            stargazersCount: stargazers_count
        })));
    }, [page]);

    useEffect(() => {
        fetchGH();
    }, [fetchGH]);

    const updatePage = (page: number) => {
        setRepos(() => []);
        setPage(() => page);
        setOffset(() => 0);
    }

    const handleNav = async (event: BaseSyntheticEvent) => {
        const target = event?.target?.getAttribute('data-nav');

        if (!target || target === PREV && !offset && page === 1) {
            return;
        }

        let newOffset = target === PREV ? offset - 1 : offset + 1;

        if (newOffset > repos.length -1) {
            updatePage(page + 1);
        } else if (page > 1 && newOffset < 0) {
            updatePage(page - 1);
        } else  {
            setOffset(newOffset);
        }
    };
    const btnDisabled = offset || page > 1 ? '' : 'disabled';

    return (
        <div className="container" style={styles}>
            {
                repos.length ?
                    <>
                        <Repo repo={repos[offset]} />
                        <Nav handleNav={handleNav} btnDisabled={btnDisabled} />
                    </>
                    : 'Loading...'
            }
        </div>
    );
}

export default App;
