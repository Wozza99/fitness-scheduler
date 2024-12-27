import React from "react";

interface TableProps {
    columns: string[];
    data: { [key: string]: any }[];
    columnNames?: { [key: string]: string };
    customColumns?: {
        header: React.ReactNode;
        render: (row: { [key: string]: any }, rowIndex: number) => React.ReactNode;
    }[];
}

const Table: React.FC<TableProps> = ({ columns, data, columnNames, customColumns }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} className="px-4 py-2">{columnNames?.[column] || column}</th>
                    ))}
                    {customColumns && customColumns.map((customColumn, index) => (
                        <th key={`custom-header-${index}`} className="px-4 py-2">{customColumn.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column} className="px-4 py-2">{row[column]}</td>
                        ))}
                        {customColumns && customColumns.map((customColumn, index) => (
                            <td key={`custom-cell-${index}`} className="px-4 py-2">{customColumn.render(row, rowIndex)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;