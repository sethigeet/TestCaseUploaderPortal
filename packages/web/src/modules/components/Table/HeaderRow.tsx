/* eslint-disable react/jsx-key */
import { FC } from "react";

import { HeaderGroup } from "react-table";

import { Th, Tr } from "@chakra-ui/react";

import { SortIcon } from "./SortIcon";

interface HeaderProps {
  headerGroups: HeaderGroup[];
  showLink?: boolean;
  initialRoute?: string;
}

export const Header: FC<HeaderProps> = ({
  headerGroups,
  showLink,
  initialRoute,
}) => {
  return (
    <>
      {headerGroups.map((headerGroup, hi) => (
        <Tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((header, hgi, arr) => {
            const borderTopLeftRadius = hi === 0 ? (hgi === 0 ? 15 : 0) : 0;
            const borderTopRightRadius =
              hi === 0 ? (hgi === arr.length - 1 ? 15 : 0) : 0;
            return (
              <Th
                {...header.getHeaderProps(header.getSortByToggleProps())}
                textAlign="center"
                color="white"
                fontSize={13}
                borderTopLeftRadius={borderTopLeftRadius}
                borderTopRightRadius={borderTopRightRadius}
              >
                {showLink && initialRoute && header.Header === "ID" ? null : (
                  <>
                    {header.render("Header")}
                    <span>
                      <SortIcon header={header} />
                    </span>
                  </>
                )}
              </Th>
            );
          })}
        </Tr>
      ))}
    </>
  );
};
