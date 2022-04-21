import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPage = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={["column", "row"]}
      mt={8}
      justify="space-between"
      align={"center"}
      spacing={6}
    >
      <Box>
        <strong>
          {currentPage * registersPerPage - registersPerPage + 1}
        </strong> - <strong>
          {currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage}
        </strong> de <strong>
          {totalCountOfRegisters}
        </strong>
      </Box>

      <Stack direction={"row"} spacing={2}>

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} key={1} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text alignSelf={"end"} color="gray.300" width={6} textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} key={currentPage} />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text alignSelf={"end"} color="gray.300" width={6} textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} key={lastPage} number={lastPage} />
          </>

        )}


      </Stack>
    </Stack>
  );
}
