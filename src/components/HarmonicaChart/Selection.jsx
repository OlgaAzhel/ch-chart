


export const Selection = ({ label, options, value, onSelect }) => {

    
    return <>

        <div className="setting">
            <label>{label}:</label>
            <select name="play-scale"
                onChange={onSelect}
                value={value}
            >
                {
                    options.map((i, idx) => {
                        return <option key={idx}>{i}</option>
                    })
                }
            </select>
        </div>
    
    </>
}

export default Selection