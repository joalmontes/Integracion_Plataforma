import React from 'react';
import PropTypes from 'prop-types';
import { Container, Section } from 'react-bulma-components';

const Header = ({ title }) => {
    return (
        <Section className='section is-primary'>
            <Container>
                <div data-glitch={title} className="glitch">{title}</div>
            </Container>
            <style jsx>{`
                .glitch {
                    position: relative;
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 1.2;
                    color: #fff;
                    letter-spacing: 5px;
                    z-index: 1;
                    animation: shift 1s ease-in-out infinite alternate;
                }

                .glitch:before,
                .glitch:after {
                    display: block;
                    content: attr(data-glitch);
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.8;
                }

                .glitch:before {
                    animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
                    color: #8b00ff;
                    z-index: -1;
                }

                .glitch:after {
                    animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
                    color: #00e571;
                    z-index: -2;
                }

                @keyframes glitch {
                    0% {
                        transform: translate(0);
                    }
                    20% {
                        transform: translate(-3px, 3px);
                    }
                    40% {
                        transform: translate(-3px, -3px);
                    }
                    60% {
                        transform: translate(3px, 3px);
                    }
                    80% {
                        transform: translate(3px, -3px);
                    }
                    to {
                        transform: translate(0);
                    }
                }

            `}</style>
        </Section>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
