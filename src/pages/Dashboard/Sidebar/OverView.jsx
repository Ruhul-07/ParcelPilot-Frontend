import React from 'react';
import MyProfile from '../User/MyProfile/MyProfile';

const OverView = () => {
    return (
        <div>
            <h1 className='text-center font-bold text-3xl my-10'>Welcome To Dashboard</h1>
            <MyProfile></MyProfile>
        </div>
    );
};

export default OverView;