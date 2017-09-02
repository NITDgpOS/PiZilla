import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

const componentConfig = {
    showFileTypeIcon: true,
    postUrl: '/upload'
};

class DropZone extends Component {
    render() {
        return (
            <DropzoneComponent
                config={componentConfig} />
        );
    }
}

export default DropZone;
