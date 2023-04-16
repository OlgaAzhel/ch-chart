


export const Selection = ({ label, options, value, onSelect }) => {

    
    return <>

        <div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded w-25 p-3 mx-auto p-2">
            <label><h5>{label}:</h5></label>
            <select 
                className="form-select"
            name="play-scale"
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