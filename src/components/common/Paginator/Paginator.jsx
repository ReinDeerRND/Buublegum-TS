import cn from "classnames";
import React, { useState } from "react";
import classes from './Paginator.module.css';

const Paginator = ({ selectedPage, totalCount, pageSize, onPageChanged, partChunk = 10 }) => {

    let pagesAmount = Math.ceil(totalCount / pageSize);
    let defaultChunk = Math.floor(selectedPage / partChunk);
    let [selectedChunk, setSelectedChunk] = useState(defaultChunk);

    let begin_portion = selectedChunk * partChunk;
    let end_portion = begin_portion + partChunk > pagesAmount
        ? pagesAmount
        : begin_portion + partChunk;
    let pages = [];
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
        {selectedChunk > 0 && <button onClick={showPreviousChunk}> Previous </button>}
        <div>
            {pages.map(p => <span className={classes.page_item} key={p} onClick={(e) => onPageChanged(p)}>
                <span className={cn({ [classes.active_page]: selectedPage === p })} >{p + 1}</span>
            </span>)}
        </div>
        {selectedChunk < (pagesAmount / partChunk) - 1 && <button onClick={showNextChunk}> Next </button>}
    </div>
}

export default Paginator;

