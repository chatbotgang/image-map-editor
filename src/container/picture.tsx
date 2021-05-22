import React from 'react'
import styled from 'styled-components'
import { Layout, Avatar } from 'antd'

const { Header, Content } = Layout


const StyledLayout = styled(Layout)`
    width: 433px;
    height: 792px;
    background-color: #E4E4E6;
    border-radius: 5px;

`
const StyledHeader = styled(Header)`
    display:flex;
    align-items: center;
    background-color: #bfc1c2;
    height:56px;
    border-radius: 5px 5px 0 0;
    
`

const StyledContent = styled(Content)`


`
const StyledAvatar = styled(Avatar)`
    height: 24px;
    width: 24px;
    // display:flex;
    
    border-radius: 50%;
    background-color: gainsboro;
    margin: 0 0 0 25px;
`


const Picture = () => {
    return (
        <StyledLayout>

            <StyledHeader>
                <StyledAvatar/>
            </StyledHeader>


            <StyledContent>
                
            </StyledContent>
        </StyledLayout>
    )
}

export default Picture
