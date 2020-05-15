import React from 'react';
import { Link } from 'react-router-dom';
import './FooterStyles.scss';

const Footer = () => (
    <ul className="footer__list">
        <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link">
            <li>Home</li>
        </Link>
        &middot;
        <a href="https://www.paulbrady.dev" target="_blank" rel="noopener noreferrer">
            <li className="footer__list__item">My Website</li>
        </a>
        <a
            href="https://github.com/bradypp/github-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link">
            <li>GitHub Repo</li>
        </a>
        &middot;
        <li className="footer__list__item footer__list__item--built-with">Built with</li>
        <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link footer__list__item--built-with footer__list__item--built-with">
            <li>React (Context API & Hooks)</li>
        </a>
        &middot;
        <a
            href="https://developer.github.com/v3/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link footer__list__item--built-with">
            <li>GitHub API</li>
        </a>
        &middot;
        <a
            href="https://sass-lang.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link footer__list__item--built-with">
            <li>Sass</li>
        </a>
        &middot;
        <a
            href="https://www.chartjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link footer__list__item--built-with">
            <li>Charts.js</li>
        </a>
        &middot;
        <a
            href="https://github.com/joshwcomeau/react-flip-move"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__list__item footer__list__item--link footer__list__item--built-with">
            <li>React Flip Move</li>
        </a>
        <li className="footer__list__item ">and more!</li>
    </ul>
);

export default Footer;
