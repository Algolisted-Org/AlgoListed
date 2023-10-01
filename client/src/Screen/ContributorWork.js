import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import VerifyUser from '../Components/VerifyUser'

const ContributorWork = () => {
    useEffect(() => {
        document.title = "Contributor Work | Organisation Information - Algolisted";
    }, []);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>Contributor Work</h1>
            <p className="heading-supporter">
                This page will contain information about all the people who have contributed, their name, username, first commit, last commit merged. 
                And the agenda for each PR. 
            </p>
            {/* <VerifyUser /> */}
        </Container>
    )
}

export default ContributorWork


const Container = styled.div`
    width: 100%;
`