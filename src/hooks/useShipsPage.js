import { useCallback, useState} from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_SHIPS = gql`
    query Ships($sort: String, $order: String) {
        ships(sort: $sort, order: $order) {
            id
            image
            name
        }
    }
`;

export const useShipsPage = () => {
    const [sort, setSort] = useState('');
    const [order, setOrder] = useState('ASC');

    const handleSetSort = useCallback((sortValue) => {
        //I'm aware this can become a cyclomatic complexity issue
        if(sortValue === sort) {
            if(order === 'DESC') {
                setOrder('ASC')
            } else {
                setOrder('DESC')
            }
        }
        setSort(sortValue);
    },[sort, order]);

    const { data, error, loading } = useQuery(GET_SHIPS, {
        fetchPolicy: 'network-and-cache',
        variables: {
            sort: sort,
            order: order
        }
    });

    if(error) {
        console.error(error)
    }

    return {
        isLoading: loading && !error && !data,
        ships: data?data.ships:[],
        handleSetSort
    }
};
