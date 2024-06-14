import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable, getPaginationRowModel,
} from '@tanstack/react-table'
import './App.css'
import {columnDef} from './components/column/columns'
import {data} from '../data'
import {useState} from 'react'
import {Data} from "./type/type.ts";

function App() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowData, setRowData] = useState<Data[]>(data);

    const handleUpdateData = (rowIndex: number, columnId: string, value: string | number) => {
        setRowData((prevData) =>
            prevData.map((row, index) =>
                index === rowIndex ? {...row, [columnId]: value} : row
            )
        );
    };

    const tableInstance = useReactTable({
        columns: columnDef,
        data: rowData,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        columnResizeMode: "onChange",
        state: {
            sorting,
        },
        meta: {
            updateData: handleUpdateData
        }
    })

    return (
        <>
            <table style={{width: tableInstance.getTotalSize()}}>
                <thead>
                {tableInstance.getHeaderGroups().map(({id, headers}) => {
                    return (
                        <tr key={id}>
                            {headers.map(({getSize, column, id, getContext, isPlaceholder, getResizeHandler}) => {
                                return (
                                    <th key={id} style={{width: getSize()}} onClick={column.getToggleSortingHandler()}>
                                        {column.getIsSorted() &&
                                            (column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽')}
                                        {isPlaceholder
                                            ? null
                                            : flexRender(column.columnDef.header, getContext())}
                                        <span onMouseDown={getResizeHandler()}
                                              onTouchStart={getResizeHandler()}
                                              className={`resizer ${column.getIsResizing() ? "isResizing" : ""}`}
                                        ></span>
                                    </th>
                                )
                            })}
                        </tr>
                    )
                })}
                </thead>
                <tbody>
                {tableInstance.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                Page {tableInstance.getState().pagination.pageIndex + 1} of{" "}
                {tableInstance.getPageCount()}
            </div>
            <div>
                <button onClick={() => tableInstance.previousPage()}
                        disabled={!tableInstance.getCanPreviousPage()}>{"<"}</button>
                <button
                    onClick={() => tableInstance.nextPage()}
                    disabled={!tableInstance.getCanNextPage()}
                >
                    {">"}
                </button>
            </div>

        </>
    )
}

export default App
