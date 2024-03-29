import cn from "classnames";
import React, { useState } from "react";
import classes from './Paginator.module.css';

type PropsType = {
    selectedPage: number;
    totalCount: number;
    pageSize: number;
    onPageChanged: (page: number) => void;
    partChunk?: number
}

const Paginator: React.FC<PropsType> = ({ selectedPage, totalCount, pageSize, onPageChanged, partChunk = 20 }) => {

    let pagesAmount = Math.ceil(totalCount / pageSize);
    let defaultChunk = Math.floor(selectedPage / partChunk);
    let [selectedChunk, setSelectedChunk] = useState<number>(defaultChunk);

    let begin_portion = selectedChunk * partChunk;
    let end_portion = begin_portion + partChunk > pagesAmount
        ? pagesAmount
        : begin_portion + partChunk;
    let pages: number[] = [];
    for (let i = begin_portion; i < end_portion; i++) {
        pages.push(i);
    }
    const showNextChunk = () => {
        setSelectedChunk(selectedChunk + 1);
    }
    const showPreviousChunk = () => {
        setSelectedChunk(selectedChunk - 1);
    }
    return <div className={classes.pages_container}>
        <div className={classes.button_container}>
            {selectedChunk > 0 && <button onClick={showPreviousChunk}> Previous </button>}
        </div>
        <div>
            {pages.map(p => <span className={classes.page_item} key={p} onClick={(e) => onPageChanged(p)}>
                <span className={cn({ [classes.active_page]: selectedPage === p })} >{p + 1}</span>
            </span>)}
        </div>
        <div className={classes.button_container}>
            {selectedChunk < (pagesAmount / partChunk) - 1 && <button onClick={showNextChunk}> Next </button>}
        </div>
    </div>
}

export default Paginator;

