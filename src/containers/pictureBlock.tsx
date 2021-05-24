import React from 'react'
import styled from 'styled-components'
import { Layout, Avatar } from 'antd'
import ImgContent from '../components/ImgContent'

const { Header } = Layout

const StyledLayout = styled(Layout)`
    width: 433px;
    height: 792px;
    background-color: #E4E4E6;
    border-radius: 5px;
    display: flex;
`

const StyledHeader = styled(Header)`
    display:flex;
    align-items: center;
    background-color: #bfc1c2;
    height:56px;
    border-radius: 5px 5px 0 0;
`

const StyledAvatar = styled(Avatar)`
    height: 24px;
    width: 24px;
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
            <ImgContent />
        </StyledLayout>
    )
}

export default Picture
