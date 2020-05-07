/**
 * @class ExampleComponent
 */

import * as React from 'react'

import styles from './styles.css'
import Button from '@material-ui/core/Button';

import * as MUICore from '@material-ui/core';

// @ts-ignore
document.libMuiCore = MUICore;

export type Props = {}

export default class ExampleComponent extends React.Component<Props> {
  render() {
    // @ts-ignore
    const typeofLibMuiCore = typeof document.libMuiCore;
    // @ts-ignore
    const typeofAppMuiCore = typeof document.appMuiCore;
    // @ts-ignore
    const areModulesEqual = document.libMuiCore === document.appMuiCore

    return (
      <div className={styles.test}>
        <Button color="primary" variant="contained">I should be green!</Button>
        <br/>
        LIB MUI Core: {typeofLibMuiCore}<br/>
        APP MUI Core: {typeofAppMuiCore}<br/>
        {areModulesEqual ? "LIB MUI Core == APP MUI Core" : "LIB MUI Core != APP MUI Core"}
      </div>
    )
  }
}
