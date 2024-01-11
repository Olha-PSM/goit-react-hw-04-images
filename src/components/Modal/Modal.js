import { useEffect } from 'react';
import { Overlay, ModalWindow } from '../Modal/Modal.styled';

export const Modal = ({ onClose, largeImg }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalWindow>
        <img src={largeImg} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   handleClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImg } = this.props;
//     return (
//       <Overlay onClick={this.handleClick}>
//         <ModalWindow>
//           <img src={largeImg} alt="" />
//         </ModalWindow>
//       </Overlay>
//     );
//   }
// }
