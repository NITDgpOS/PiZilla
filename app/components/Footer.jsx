import React, { Component } from 'react';
import { Icon } from 'react-fa';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <p className="teal-text center">
                    <Icon Component="i" name="copyright" /> 2017&nbsp;
                    <a href="https://github.com/nit-dgp/PiZilla">NITDgpOS</a>
                </p>
            </footer>
        );
    };
}

export default Footer;
