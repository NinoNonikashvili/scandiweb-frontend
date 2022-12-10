import React from "react";

const ProdDesc = (props) => {
    const hints= [
        'Please, provide dimension in Mb',
        'Please, provide dimensions in HxWxLx format.',
        'Please, provide dimension in Kg'
    ]

    return (
        <>
        { props.type==='DVD' && (
            <>
                <label>Size (MB)
                    <input />
                </label>
                <p>{hints[0]}</p>
            </>
        )}
        { props.type==='Furniture' && (
            <>
                <label>Height (CM)
                    <input />
                </label>
                <label>Width (CM)
                    <input />
                </label>
                <label>Length (CM)
                    <input />
                </label>
                <p>{hints[1]}</p>
            </>
        )}
        { props.type==='Book' && (
            <>
                <label>Size (KG)
                    <input />
                </label>
                <p>{hints[2]}</p>
            </>
        )

        }        
        </>
    )

}

export default ProdDesc
