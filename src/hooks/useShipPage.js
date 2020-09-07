import { useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const GET_SHIP = gql`
    query Ship($id: ID!) {
        ship(id: $id) {
            id
            image
            name
            roles
            year_built
            home_port
            missions {
                name
                flight
            }
        }
    }
`;

export const useShipPage = ({ shipId }) => {
    const [runQuery, { data, error, loading }] = useLazyQuery(GET_SHIP, {
        fetchPolicy: 'network-and-cache',
    });

    const hasShipId = typeof shipId === 'string';

    useEffect(() => {
        if(shipId) {
            runQuery({
                variables: {
                    id: shipId
                },
                skip: !hasShipId
            })
        }
    },[shipId, runQuery, hasShipId]);

    if(error) {
        console.error(error)
    }

    const ship = data?.ship;

    return {
        isLoading: loading && !error && !data,
        data: (data&&!error)?ship:null,
        name: data?ship.name:'-',
        image: data?ship.image:'-',
        roles: data?ship.roles:[],
        yearBuilt: data?ship.year_built:'-',
        homePort: data?ship.home_port:'-',
        missions: data?ship.missions:[],
    }
};
