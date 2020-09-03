import { useLazyQuery } from '@apollo/client';

export const useLaunch = ({query, launchType}) => {

    const [runQuery, { data, error, loading }] = useLazyQuery(query, {
        fetchPolicy: 'network-and-cache'
    });

    if(error) {
        console.log(error)
    }

    return {
        isLoading: loading && !error,
        data: (data&&!error)?data[launchType]:null,
        runQuery
    }

};
