// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { LoadingSpinner } from '../widgets/loadingSpinner';

/**
 * A page just to display how the loading spinners are displayed.
 */

export class Spinner extends Component {
    render() {
        return <LoadingSpinner />;
    }
}
