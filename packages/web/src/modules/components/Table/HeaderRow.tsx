/* eslint-disable react/jsx-key */
import { FC } from "react";

import { HeaderGroup } from "react-table";

import { Th, Tr } from "@chakra-ui/react";

import { SortIcon } from "./SortIcon";

interface HeaderProps {
  headerGroup: HeaderGroup;
  headerGroupIdx: number;
  showLink?: boolean;
  initialRoute?: string;
}

export const HeaderRow: FC<HeaderProps> = ({
  headerGroup,
  headerGroupIdx,
  showLink,
  initialRoute,
}) => {
  return (
    <Tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((header, headerIdx, arr) => {
        const borderTopLeftRadius =
          headerGroupIdx === 0 ? (headerIdx === 0 ? 15 : 0) : 0;
        const borderTopRightRadius =
          headerGroupIdx === 0 ? (headerIdx === arr.length - 1 ? 15 : 0) : 0;
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
  );
};
