import React, { memo } from 'react';

const PlayerGlobal = (props) => {
    return (
        <div style={{...props, background:"black"}}>
            <video style={{width:"100%", height:"100%"}} controls>
                <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4"/>
            </video>
        </div>
    );
}

export default memo(PlayerGlobal);