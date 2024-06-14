import {FC, MouseEvent, useEffect, useState} from "react";
import {CellContext} from "@tanstack/react-table";
import {Data} from "../../type/type.ts";
import {TableMeta} from "../column/columns.tsx";

interface EditCellProps<T> {
    cell: CellContext<T, unknown>;
    row: { index: number };
    column: { id: string };
}

const EditeCell: FC<EditCellProps<Data>> = ({cell, row, column}) => {
    const initialValue = cell.getValue() as string | number
    const [value, setValue] = useState(initialValue)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const onBlur = () => {
        (cell.table.options.meta as TableMeta)?.updateData(row.index, column.id, value);

    }

    const handleEdit = (e:MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        setIsEdit(prevState => !prevState)
    }

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div onClick={handleEdit}>
            {!isEdit ? <p>{value}</p> :
                <div>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur}/>
                    <span onClick={handleEdit} style={{display: 'inline-block', cursor: 'pointer'}}>X</span>
                </div>
            }
        </div>
    );
};

export default EditeCell