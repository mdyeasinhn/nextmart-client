import React from 'react';
import CreateCategoryModal from './CreateCategoryModal';

const ManageCategories = () => {
    return (
        <div>
       <div className='flex justify-between itme-center '>
             <h1 className='text-xl font-bold'>Manage Categories</h1>
            <CreateCategoryModal/>
       </div>
        </div>
    );
};

export default ManageCategories;