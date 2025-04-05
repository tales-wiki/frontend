import React from "react";

interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContents[];
  onItemClick: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  onItemClick,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-10 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm max-w-md ml-0">
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-300">
        목차
      </h2>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.id}
            className={`cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
              item.level === 1
                ? "pl-0 font-medium text-base lg:text-base"
                : item.level === 2
                ? "pl-4 text-gray-700 text-sm lg:text-base"
                : item.level === 3
                ? "pl-8 text-gray-600 text-xs lg:text-sm"
                : "pl-12 text-gray-500 text-xs lg:text-sm"
            }`}
            onClick={() => onItemClick(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
