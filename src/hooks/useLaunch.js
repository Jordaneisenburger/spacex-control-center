import { useLazyQuery } from '@apollo/client';

export const useLaunch = ({query, launchType}) => {

    const [runQuery, { data, error, loading }] = useLazyQuery(query, {
        fetchPolicy: 'network-and-cache'
    });

    if(error) {
        console.error(error)
    }

    const launchTypeData = data?data[launchType]:null;

    return {
        isLoading: loading && !error && !data,
        data: (data&&!error)?data[launchType]:null,
        runQuery,
        rocketName: launchTypeData?launchTypeData.rocket.rocket_name:'-',
        launchSuccess: launchTypeData?launchTypeData.launch_success:null,
        missionName: launchTypeData?launchTypeData.mission_name:'-',
        launchDate: launchTypeData?launchTypeData.launch_date_local:'-',
        rocketType: launchTypeData?launchTypeData.rocket.rocket_type:'-',
        launchSite: launchTypeData?launchTypeData.launch_site.site_name:'-',
        recoveryShip: launchTypeData?launchTypeData.rocket.fairings?.ship:null
    }

};
