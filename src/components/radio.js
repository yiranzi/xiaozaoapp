import React from 'react';
import {FormCell, CellBody, CellFooter, Radio} from 'react-weui';

export default class Layout extends React.Component {
    render() {
        const {params, onChange} = this.props;
        const {name, value, defaultValue, label} = params;
        return (
            <FormCell radio>
                <CellFooter>
                    {defaultValue === value ?
                        <Radio name={name} value={value} defaultChecked onClick={()=>{onChange(value);}}/>:
                        <Radio name={name} value={value} onClick={()=>{onChange(value);}}/>
                    }

                </CellFooter>
                <CellBody>{label}</CellBody>
            </FormCell>
        );
    }
}