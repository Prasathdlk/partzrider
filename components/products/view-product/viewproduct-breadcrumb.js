import React from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

const BreadCrumb = () => {
    return(
        <section className="breadcrumb-area">
            <Container>
                <div className="breadcrumb-content">
                    {/* <h1 className="breadcrumb-hrading">Page</h1> */}
                    <ul className="breadcrumb-links">
                        <li><Link href={"/"}>Home</Link></li>
                        <li>List</li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}
export default BreadCrumb