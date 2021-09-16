import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/png/avatar.png';
import './ResultSearch.scss';

const ResultsSearch = ({ data }) => {
    return (
        <Link className="search-users-item" to={`/${data.username}`} >
            <Image src={data.avatar || ImageNotFound} />

            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
};

export default ResultsSearch;
