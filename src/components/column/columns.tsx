import {ColumnDef} from '@tanstack/react-table'
import {Data} from '../../type/type'
import moment from 'moment'
import EditeCell from "../EditeCell/EditeCell.tsx";

export interface TableMeta {
    updateData: (rowIndex: number, columnId: string, value: string | number) => void;
}

export const columnDef: ColumnDef<Data, TableMeta>[] = [
    {
        accessorKey: 'id',
        header: 'id',
        cell: (info) => <EditeCell cell={info} row={info.row} column={info.column}/>,
        size: 225
    },
    {
        accessorKey: 'first_name',
        header: 'First Name',
        cell: (info) => <strong>{info.getValue() as unknown as string | number}</strong>,
    },
    {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: (info) => <EditeCell cell={info} row={info.row} column={info.column}/>
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) =>
            moment(new Date(info.getValue() as unknown as Date)).format('MMMM Do YYYY'),
    },
]
