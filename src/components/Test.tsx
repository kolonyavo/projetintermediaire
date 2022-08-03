import React, { lazy, Suspense } from 'react';
import '../loading.css';

const Test2 = React.lazy(() => import('./Test2'));

export default function Test(){
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Test2/>
            </Suspense>
        </div>
    );
}