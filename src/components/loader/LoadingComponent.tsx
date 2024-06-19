import React from 'react';
import '../../css/components/LoadingComponent.css';
import { Modal } from '@mui/material';

interface ILoadingComponent {
  show: boolean;
}

export default function LoadingComponent({ show }: ILoadingComponent) {
  React.useEffect(() => {
    console.log("Load: ", show)
  }, [])

  return (
    <Modal open={show}>
      <div className="lds-dual-ring"></div>
    </Modal>
  )
}