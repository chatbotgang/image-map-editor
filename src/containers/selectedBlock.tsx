import React from 'react'
import styled from 'styled-components'
import { useImg, Box } from '../hooks/useImg'

const Blocks = styled.div`
    display: flex;
    background-color: #5B5B70;
    width: 548px;
    height: 703px;
    border-radius: 5px;
    z-index:1;
`

const StyledData = styled.div`
    z-index:2;
    color: white;
    display: block;
`

const SelectedBlocks = () => {

    const { boxes } = useImg()
    
    return (
        <Blocks>
            { boxes.length !== 0 && (<StyledData>
                                        {JSON.stringify(boxes, null, '\t')}
                                    </StyledData>)}
        </Blocks>
    )
}

export default SelectedBlocks