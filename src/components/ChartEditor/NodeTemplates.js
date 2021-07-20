import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCluster, AiOutlineDelete } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { Modal, Button } from 'react-bootstrap';
import './ChartEditor.css'

export const nodeTemplates = [
  {
    name: 'incident_commander',
    itemSize: { width: 220, height: 120 },
    onItemRender: ({ context: itemConfig }) => {
      return (
        <div className="ContactTemplate">
          <div className="ContactTitleBackground">
            <div className="ContactTitle">{itemConfig.title}</div>
          </div>
          <div className="ContactPhotoFrame">
            <BiUserCircle />
          </div>
          <div className="ContactDescription">{itemConfig.name}</div>
          <div className="ContactPhone">Phone: {itemConfig.phone}</div>
          <div className="ContactEmail">Email: {itemConfig.email}</div>
        </div> 
      )
    },
    onButtonsRender: ({ context: itemConfig }) => {
      return <>
        <button onClick={() => console.log('This button assigns a contact')}>
          <AiOutlineUserAdd />
        </button>
    </>
    }
  },
  {
    name: 'command_staff',
    itemSize: { width: 220, height: 120 },
    onItemRender: ({ context: itemConfig }) => {
      return (
        <div className="ContactTemplate">
          <div className="ContactTitleBackground">
            <div className="ContactTitle">{itemConfig.title}</div>
          </div>
          <div className="ContactPhotoFrame">
            <BiUserCircle />
          </div>
          <div className="ContactDescription">{itemConfig.name}</div>
          <div className="ContactPhone">Phone: {itemConfig.phone}</div>
          <div className="ContactEmail">Email: {itemConfig.email}</div>
        </div> 
      )
    },
    onButtonsRender: ({ context: itemConfig }) => {
      return <>
        <button onClick={() => console.log('This button assigns a contact')}>
          <AiOutlineUserAdd />
        </button>
        {itemConfig.name !== 'Unassigned' && <button onClick={() => console.log('This button unassigns the contact')}>
          <AiOutlineUserDelete />
        </button>}
    </>
    }
  },
  {
    name: 'section_commander',
    itemSize: { width: 220, height: 120 },
    onItemRender: ({ context: itemConfig }) => {
      return (
        <div className="ContactTemplate">
          <div className="ContactTitleBackground">
            <div className="ContactTitle">{itemConfig.title}</div>
          </div>
          <div className="ContactPhotoFrame">
            <BiUserCircle />
          </div>
          <div className="ContactDescription">{itemConfig.name}</div>
          <div className="ContactPhone">Phone: {itemConfig.phone}</div>
          <div className="ContactEmail">Email: {itemConfig.email}</div>
        </div> 
      )
    },
    onButtonsRender: ({ context: itemConfig }) => {
      return <>
        <button 
          onClick={e => {
            e.stopPropagation()
            MyVerticallyCenteredModal(itemConfig)
          }}
        >
          <AiOutlineUserAdd />
        </button>
        <button onClick={() => console.log('This button unassigns the contact')}>
          <AiOutlineUserDelete />
        </button>
        <button onClick={() => console.log('This button adds a child node')}>
          <AiOutlineCluster />
        </button>
    </>
    }
  },

]

function MyVerticallyCenteredModal(props) {
  console.log('test')
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}