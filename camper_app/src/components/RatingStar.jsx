import { CDBRating, CDBContainer } from 'cdbreact';
import { useState } from 'react';

const RatingStar = () => {
    const [basic] = useState([
        {
            tooltip: 'Very Bad'
        },
        {
            tooltip: 'Poor'
        },
        {
            tooltip: 'Ok',
            choosed: true
        },
        {
            tooltip: 'Good'
        },
        {
            tooltip: 'Excellent'
        }
    ]);

    return (
        <CDBContainer>
            <CDBRating fillColors={["red-text", "yellow-text"]} iconRegular />

        </CDBContainer>
    );

};

export default RatingStar;