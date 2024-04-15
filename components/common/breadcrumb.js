import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function Breadcrumb(props){
    const { heading, title, titleLink= "", subtitle, subtitleLink="" } = props;
    return(
        <section className="breadcrumb-area">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="breadcrumb-content">
                            <h1 className="breadcrumb-heading">{ heading }</h1>
                            <ul className="breadcrumb-links">
                                <li><Link href={"/"}>Home</Link></li>
                               
                                {
                                    title && titleLink && (
                                        <li><Link href={titleLink}>{ title }</Link></li>
                                    )
                                }
                            
                                {
                                    title && titleLink === "" && (
                                        <li>{ title }</li>
                                    )
                                }

                                {
                                    subtitle && subtitleLink && (
                                        <li><Link href={subtitleLink}>{ subtitle }</Link></li>
                                    )
                                }
                                
                                {
                                    subtitle && subtitleLink === "" && (
                                        <li>{ subtitle }</li>
                                    )
                                }
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};
