import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import FilesActions from './../actions/FilesActions';
import PropTypes from 'prop-types';

class DropZone extends Component {
    static propTypes = {
        path: PropTypes.string
    }

    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            maxFilesize: 4096, //MB
            parallelUploads: 10,
            uploadMultiple: true
        };

        this.componentConfig = {
            postUrl: '/upload',
            showFiletypeIcon: true
        };

        this.dropzone = null;
    }

    success = (file, path) => {
        FilesActions.updateFileList(path);
    }

    render = () => {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        const path = this.props.path;

        const eventHandlers = {
            init: (dz) => this.dropzone = dz,
            success: (file) => this.success(file, path)
        };

        return (
            <DropzoneComponent
                config={ config }
                djsConfig={ djsConfig }
                eventHandlers={ eventHandlers }
            />
        );
    }
}

export default DropZone;
