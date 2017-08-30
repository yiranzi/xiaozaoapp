import React from 'react';
import {FormCell, CellBody, CellFooter, Radio} from 'react-weui';

export default class Layout extends React.Component {
    render() {
        const {name, label, value, onChange} = this.props;
        return (
            <FormCell radio>
                <CellFooter>
                    <Radio name={name} value={value} onClick={()=>{onChange(value);}}/>
                </CellFooter>
                <CellBody>{value}.{label}</CellBody>
            </FormCell>
        );
    }
}