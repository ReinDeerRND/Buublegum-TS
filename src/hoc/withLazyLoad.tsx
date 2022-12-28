import React, { Suspense, SuspenseProps } from "react";
import Preloader from '../components/common/Preloader/Preloader';

export function withLazyLoad<T extends SuspenseProps = SuspenseProps>(Component: React.ComponentType<T>) {
    const ComponentWithLazyLoad =  (props: Omit<T, keyof SuspenseProps>) => {
        return <Suspense fallback= {< Preloader />} >
            <Component { ...(props as T) } />
         </Suspense>;
    };
    return ComponentWithLazyLoad;
}