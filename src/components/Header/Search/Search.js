import React, { useEffect, useState } from 'react';
import './Search.scss';
import { Search as SearchUI } from 'semantic-ui-react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user.service';
import ResultsSearch from './ResultsSearch';

const Search = () => {

    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([])

    const { data, loading } = useQuery(SEARCH, {
        variables: {
            search
        }
    });

    useEffect(() => {
        if(size(data?.search) > 0) {
            const users = [];
            data.search.forEach((user, i) => {
                users.push({
                    key: i,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar,
                });
            });

            setResults(users)
        } else {
            setResults([]);
        }
    }, [data]);


    const handleChange = (e) => {
        const { value } = e.target

        if(value) {
            setSearch(value)
        } else {
            setSearch(null)
        }
    };

    const handleResultSelect = () => {
        setSearch(null);
        setResults([]);
    };


    return (
        <SearchUI 
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: 'left'}}
            onSearchChange={handleChange}
            loading={loading}
            value={search || ''}
            results={results}
            resultRenderer={(e) => <ResultsSearch data={e} />}
            onResultSelect={handleResultSelect}
        />
    )
}

export default Search;
