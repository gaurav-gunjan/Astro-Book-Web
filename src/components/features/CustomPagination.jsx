import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LeftArrowHeadSvg, RightArrowHeadSvg } from "../../assets/svg";

const CustomPagination = ({ count = 5, totalDocuments }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page') || 1;
    const search = searchParams.get('search') || '';

    const rowPerPage = count;
    const totalPages = Math.ceil(totalDocuments / rowPerPage);

    const [activePage, setActivePage] = useState(Number(page));

    useEffect(() => {
        setActivePage(Number(page));
    }, [page]);

    const handlePageChange = (newPage) => {
        setActivePage(newPage);
    };

    return (
        <div className="flex gap-5 justify-center py-16">
            <Link
                to={`${location.pathname}?page=${activePage === 1 ? activePage : activePage - 1}&search=${search}`}
                onClick={() => {
                    if (activePage !== 1) {
                        handlePageChange(activePage - 1);
                    }
                }}
                className={`${activePage === 1 ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary'} text-white p-2 rounded-full`}
            >
                <LeftArrowHeadSvg />
            </Link>

            {activePage == 1 && (<div className="text-slate-400 h-10 w-10 rounded-full font-bold flex items-center justify-center cursor-not-allowed">{activePage - 1}</div>)}

            {activePage > 1 && (
                <Link
                    to={`${location.pathname}?page=${activePage - 1}&search=${search}`}
                    className={`${activePage - 1 === activePage ? 'bg-primary' : 'bg-white'} ${activePage - 1 !== activePage ? 'text-primary' : 'text-white'} h-10 w-10 rounded-full font-bold flex items-center justify-center`}
                    onClick={() => handlePageChange(activePage - 1)}
                >
                    {activePage - 1}
                </Link>
            )}

            <Link
                to={`${location.pathname}?page=${activePage}&search=${search}`}
                className={`${activePage === activePage ? 'bg-primary' : 'bg-white'} ${activePage !== activePage ? 'text-primary' : 'text-white'} h-10 w-10 rounded-full font-bold flex items-center justify-center`}
                onClick={() => handlePageChange(activePage)}
            >
                {activePage}
            </Link>

            {activePage < totalPages && (
                <Link
                    to={`${location.pathname}?page=${activePage + 1}&search=${search}`}
                    className={`${activePage + 1 === activePage ? 'bg-primary' : 'bg-white'} ${activePage + 1 !== activePage ? 'text-primary' : 'text-white'} h-10 w-10 rounded-full font-bold flex items-center justify-center`}
                    onClick={() => handlePageChange(activePage + 1)}
                >
                    {activePage + 1}
                </Link>
            )}

            {activePage == totalPages && (<div className="text-slate-400 h-10 w-10 rounded-full font-bold flex items-center justify-center cursor-not-allowed">{activePage + 1}</div>)}

            <Link
                to={`${location.pathname}?page=${activePage === totalPages ? activePage : activePage + 1}&search=${search}`}
                onClick={() => {
                    if (activePage !== totalPages) {
                        handlePageChange(activePage + 1);
                    }
                }}
                className={`${activePage === totalPages ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary'} text-white p-2 rounded-full`}
            >
                <RightArrowHeadSvg />
            </Link>
        </div>
    );
};

export default CustomPagination;
