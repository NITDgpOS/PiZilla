import * as React from 'react';
import { Icon } from 'react-fa';

export class Footer extends React.Component {
    public render(): JSX.Element {
        return (
            <footer>
                <p className='teal-text center'>
                    <Icon Component='i' name='copyright' /> 2017&nbsp;
                    <a href='https://github.com/nit-dgp/PiZilla'>NITDgpOS</a>
                </p>
            </footer>
        );
    }
}
