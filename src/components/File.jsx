import React, { Component } from 'react';
import FilesActions from '../actions/FilesActions';
import PropTypes from 'prop-types';

class File extends Component {
    static propTypes = {
        extension: PropTypes.string,
        isDirectory: PropTypes.bool,
        name: PropTypes.string,
        path: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.changePath = this.changeDirectory.bind(this);
        this.getDownloadLink = this.getDownloadLink.bind(this);
    }

    changeDirectory(event) {
        event.preventDefault();
        FilesActions.changeDirectory(event.target.dataset.path);
    }

    getDownloadLink(path) {
        return `/download?path=${encodeURIComponent(path)}`;
    }

    render() {
        const path = this.props.path;
        const name = this.props.name;
        const isDirectory = this.props.isDirectory;
        const downloadLink = this.getDownloadLink(path);
        let link = (
            <a className="tooltipped" data-position="right" data-delay="40"
                data-tooltip="Download" data-path={ path }
                href={ downloadLink }
            ><i className="fa fa-file" />{name}
            </a>
        );
        if (isDirectory) {
            link = (
                <a className="tooltipped" data-position="right"
                    data-delay="40" data-tooltip="Browse"
                    data-path={ path } onClick={ this.changeDirectory }
                ><i className="fa fa-folder" />{name}
                </a>);
        }
        return <li>{link}</li>;
    }
}

export default File;
