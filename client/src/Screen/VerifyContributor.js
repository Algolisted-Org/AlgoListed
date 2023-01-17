import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import VerifyUser from '../Components/VerifyUser'

const VerifyContributor = () => {
    useEffect(() => {
        document.title = "Verify Contributor | Organisation Information - Algolisted";
    }, []);

    return (
        <Container>
            {/* The below classes are being used from the parent */}
            <h1 className='main-heading'>Verify Contributor</h1>
            <p className="heading-supporter">
                The core team makes this page for those users who have contributed to the website, and
                also writes down the work they have done. It helpful for contributor to have a kind
                of e-certificate of their work which they later can put on linkedin and resume.
            </p>
            <p className="heading-supporter">
                This will be starting soon.
            </p>
            {/* <VerifyUser /> */}
        </Container>
    )
}

export default VerifyContributor


const Container = styled.div`
    width: 100%;
`