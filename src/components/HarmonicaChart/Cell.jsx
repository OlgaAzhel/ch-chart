
import Xarrow from "react-xarrows"



export const Cell = ({ label, isInKey, isTonic, showMarker, idForArrows, nextId }) => {
    // console.log('idForArrows', idForArrows, nextId, showMarker)
    return <>
        <span
            className={`cell ${isInKey ? 'highlighted' : ''}`}
        >
            {label}


            {showMarker && <>
                <span id={'arr' + idForArrows}>
                    {isTonic ? '🔸' : '🔹'}
                </span>
                
                {nextId && <Xarrow
                    start={'arr' + idForArrows}
                    end={'arr' + nextId}
                    showHead={false}
                    strokeWidth={2}
                    tailSize={2}

                />}
                </>
            }


        </span>
    </>
}