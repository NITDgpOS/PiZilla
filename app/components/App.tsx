import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from './../reducers/files';
import { DropZone } from './Dropzone';
import { Footer } from './Footer';
import { SideBarComponent } from './SideBar';

interface IProps {
    store: IAppState;
}

class App extends React.Component<IProps> {
    public render(): JSX.Element {
        const store = this.props.store;
        return (
            <main>
                <SideBarComponent { ...store } />
                <DropZone path={ store.path } />
                <Footer />
            </main>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return { store: { ...state } };
};

export default connect(mapStateToProps)(App);
