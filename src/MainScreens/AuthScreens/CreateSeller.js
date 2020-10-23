import React from 'react'
import CreateSellerContainer from './CreateSellerContainer'
import { useHistory } from 'react-router-dom'

export default function CreateSeller(props) {
    const history = useHistory();
    return (
      <>
        <CreateSellerContainer history={history} props={props} />
      </>
    );
}
