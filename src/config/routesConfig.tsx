import {lazy} from "react";



// eslint-disable-next-line react-refresh/only-export-components
const TablePage = lazy(() =>
    new Promise(resolve => {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolve(import('../Table.tsx'));
        }, 3000);
    })
);
const routesConfig = [
    {
        path: '/',
        element: <h1>Главная </h1>,
    },
    {
        path: '/table',
        element: <TablePage/>
    }
]


export default routesConfig