import React, { Component } from 'react';
import FilesActions from '../actions/FilesActions';
import PropTypes from 'prop-types';

class File extends Component {
    static propTypes = {
        extension: PropTypes.string,
        icon: PropTypes.string,
        isDirectory: PropTypes.bool,
        mime: PropTypes.string,
        name: PropTypes.string,
        path: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.changePath = this.changeDirectory.bind(this);
        this.getDownloadLink = this.getDownloadLink.bind(this);
        this.getIconByMime = this.getIconByMime.bind(this);
    }

    changeDirectory(event) {
        event.preventDefault();
        FilesActions.changeDirectory(event.target.dataset.path);
    }

    getViewLink(path) {
        return `/view/${encodeURIComponent(path)}`;
    }

    getDownloadLink(path) {
        return `/download?path=${encodeURIComponent(path)}`;
    }

    getIconByMime(type) {
        if (type.startsWith('video/'))
            return 'film';
        if (type.startsWith('image/'))
            return 'picture-o';
        if (type.endsWith('/pdf'))
            return 'file-pdf-o';
        if (type.startsWith('audio/'))
            return 'file-audio-o';
        if (type.startsWith('text/'))
            return 'file-text-o';
        return 'file-o';
    }

    render() {
        const path = this.props.path;
        const name = this.props.name;
        const mimetype = this.props.mime;
        const isDirectory = this.props.isDirectory;
        const icon = (typeof this.props.icon !== 'undefined' ?
            `fa fa-${this.props.icon}` : 'fa fa-folder-o');
        let link = (
            <a className="tooltipped" data-position="right" data-delay="40"
                data-tooltip="Download" data-path={ path }
                href={ this.getViewLink(name) }
            >
                <i className={ `fa fa-${this.getIconByMime(mimetype)}` } />
                {name}
            </a>
        );
        if (isDirectory) {
            link = (
                <a className="tooltipped" data-position="right"
                    data-delay="40" data-tooltip="Browse"
                    data-path={ path } onClick={ this.changeDirectory }
                ><i className={ icon } />{name}
                </a>);
        }
        return <li>{link}</li>;
    }
}

export default File;
