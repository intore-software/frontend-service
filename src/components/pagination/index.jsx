import React, { useEffect, useState } from 'react';


export default function Pagination({ currentPage, totalPages,onChangePage }) {
    const width = totalPages * 3;
    const activeTab = {
        width: '25px',
        heigh: '25px',
        borderRadius: '50%',
        backgroundColor: '#1D5FAD',
        textAlign: 'center',
        color: 'white',
        cursor: 'pointer',
        padding: '5px',


    }
    const tab = {
        width: '28px',
        heigh: '28px',
        borderRadius: '50%',
        backgroundColor: '#EAEAEA',
        color: '#868585',
        textAlign: 'center',
        cursor: 'pointer',
        padding: '5px'
    }
    const pagContainer = {
        minWidth: `${width}%`,
        display: 'flex',
        justifyContent: 'space-between',
        heigh: '300px'

    }
    const container = {
        // marginTop: '2em',
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        fontSize: '11px',
        fontWeight: 'bold',
        paddingBottom: '10em'
    }

    const [arr, setArr] = useState([]);

    const [current, setCurrent] = useState(currentPage);
    useEffect(() => {
        setCurrent(currentPage)
    },[currentPage])
    const onPaginate = (index) => {
        setCurrent(index);
        onChangePage(index)
    }
    useEffect(() => {
        const temp = [];
        for (let i = 1; i <= totalPages; i++) {
            temp.push(i);
        }
        setArr(temp)

    }, [totalPages])

    return (
        <div style={container}>
            <div style={pagContainer}>
                {
                    arr.map((el, index) => (
                        <div  key={el} onClick={() => onPaginate(index)} style={(index  === current) ? activeTab : tab}>
                            {index + 1}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}