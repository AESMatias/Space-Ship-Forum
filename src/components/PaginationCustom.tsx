'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import React, { useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';



interface PaginationCustomProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export const PaginationCustom: React.FC<PaginationCustomProps> = ({ currentPage, totalPages }) => {

    // const searchParams = useSearchParams();
    // let pathname = usePathname();
    // pathname = pathname.replace('/', '');
    // let pathNumber = 0
    // pathNumber = Number(pathname);
    // currentPage = pathNumber;


    return (
        <Pagination>
            <PaginationContent>


                {currentPage === 1 ? null :
                    <PaginationItem>
                        <PaginationPrevious href={currentPage > 2 ? `${currentPage - 1}` : `/`} />
                    </PaginationItem>}
                {currentPage === 1 ? null :
                    <PaginationItem>
                        <PaginationLink href={currentPage > 3 ? `${currentPage - 1}` : `/`}>
                            {currentPage > 1 ? currentPage - 1 : null}
                        </PaginationLink>
                    </PaginationItem>}


                {currentPage !== totalPages ? null :
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>}


                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>


                {(currentPage === totalPages || currentPage + 1 === totalPages) ? null :
                    <PaginationItem>
                        <PaginationLink href={`${currentPage + 1}`}>
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                }

                {currentPage === totalPages ? null :
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>}

                {(currentPage === totalPages) ? null :
                    <PaginationItem>
                        <PaginationLink href={`${totalPages}`}>
                            {currentPage === totalPages ? null : totalPages}
                        </PaginationLink>
                    </PaginationItem>
                }

                {currentPage === totalPages ? null :
                    <PaginationItem>
                        <PaginationNext href={currentPage < totalPages ? `${currentPage + 1}` : `${totalPages}`} />
                    </PaginationItem>}
            </PaginationContent>
        </Pagination>
    )
}
export default PaginationCustom;