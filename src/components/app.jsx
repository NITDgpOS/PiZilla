import React, { Component } from 'react';
import DropZone from './dropzone';
import FilesComponent from './files';

class App extends Component {
    render() {
        return (
            <main>
                <FilesComponent path={this.props.uploads} />
                <DropZone />
            </main>
        );
    }
}

export default App;
