import React, { Component } from 'react';
import DropZone from './dropzone';
import FilesComponent from './files';

class App extends Component {
    render() {
        return (
            <div>
                <DropZone />
                <FilesComponent path={this.props.uploads} />
            </div>
        );
    }
}

export default App;
