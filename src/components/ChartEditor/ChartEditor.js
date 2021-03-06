import React, { Component } from 'react'
import { getIncidentContacts } from '../../api-calls'
import { OrgDiagram } from 'basicprimitivesreact'
import { PageFitMode, GroupByType, Enabled, ItemType, AdviserPlacementType, ChildrenPlacementType } from 'basicprimitives';
import './ChartEditor.css'
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineUserSwitch, AiOutlineCluster, AiOutlineDelete } from 'react-icons/ai'
import AssignRoleMenu from '../AssignRoleMenu/AssignRoleMenu';
import UnassignMenu from '../UnassignMenu/UnassignMenu'
import ReassignMenu from '../ReassignMenu/ReassignMenu'
import AddNode from '../AddNode/AddNode'
import { returnContactAvatar } from '../../utils'

export default class ChartEditor extends Component {
  constructor({ incident_id }) {
    super()
    this.state = {
      incident_id: incident_id,
      assignmentMenu: {
        isVisible: false,
        role: null
      },
      unassignMenu: {
        isVisible: false,
        role: null
      },
      reassignMenu: {
        isVisible: false,
        role: null
      },
      addNode: {
        isVisible: false,
        parent: null
      },
      incidentContacts: [
        {
          id: 0,
          parent: null,
          title: 'Incident Commander',
          contact: null,
          templateName: 'incident_commander',
        },
        {
          id: 1,
          parent: 0,
          title: 'Liaison Officer',
          contact: null,
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          templateName: 'command_staff',
          isVisible: false
        },
        {
          id: 2,
          parent: 0,
          title: 'Public Information Officer',
          contact: null,
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Left, 
          templateName: 'command_staff',
          isVisible: false 
        },
        {
          id: 3,
          parent: 0,
          isVisible: false,
          title: 'aggregator',
          description: 'Invisible aggregator',
          childrenPlacementType: ChildrenPlacementType.Horizontal
        },
        {
          id: 4,
          parent: 3,
          title: 'Safety Officer',
          contact: null,
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          hasButtons: Enabled.True,
          templateName: 'command_staff',
          isVisible: false
        },
        {
          id: 5,
          parent: 3,
          isVisible: false,
          title: 'aggregator',
          description: 'Invisible aggregator 2',
          childrenPlacementType: ChildrenPlacementType.Horizontal
        },
        {
          id: 6,
          parent: 5,
          title: 'Operations Chief',
          contact: null,
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 7,
          parent: 5,
          title: 'Logistics Chief',
          contact: null,
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 8,
          parent: 5,
          title: 'Planning Chief',
          contact: null,
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 9,
          parent: 5,
          title: 'Finance Chief',
          contact: null,
          templateName: 'section_commander',
          isVisible: false
        }
      ]
    }
  }

  refreshContacts() {
    let workingArray = [
      {
        id: 0,
        parent: null,
        title: 'Incident Commander',
        contact: null,
        templateName: 'incident_commander',
      },
      {
        id: 1,
        parent: 0,
        title: 'Liaison Officer',
        contact: null,
        itemType: ItemType.Assistant,
        adviserPlacementType: AdviserPlacementType.Right,
        templateName: 'command_staff',
        isVisible: false
      },
      {
        id: 2,
        parent: 0,
        title: 'Public Information Officer',
        contact: null,
        itemType: ItemType.Assistant,
        adviserPlacementType: AdviserPlacementType.Left, 
        templateName: 'command_staff',
        isVisible: false 
      },
      {
        id: 3,
        parent: 0,
        isVisible: false,
        title: 'aggregator',
        description: 'Invisible aggregator',
        childrenPlacementType: ChildrenPlacementType.Horizontal
      },
      {
        id: 4,
        parent: 3,
        title: 'Safety Officer',
        contact: null,
        itemType: ItemType.Assistant,
        adviserPlacementType: AdviserPlacementType.Right,
        hasButtons: Enabled.True,
        templateName: 'command_staff',
        isVisible: false
      },
      {
        id: 5,
        parent: 3,
        isVisible: false,
        title: 'aggregator',
        description: 'Invisible aggregator 2',
        childrenPlacementType: ChildrenPlacementType.Horizontal
      },
      {
        id: 6,
        parent: 5,
        title: 'Operations Chief',
        contact: null,
        templateName: 'section_commander',
        isVisible: false
      },
      {
        id: 7,
        parent: 5,
        title: 'Logistics Chief',
        contact: null,
        templateName: 'section_commander',
        isVisible: false
      },
      {
        id: 8,
        parent: 5,
        title: 'Planning Chief',
        contact: null,
        templateName: 'section_commander',
        isVisible: false
      },
      {
        id: 9,
        parent: 5,
        title: 'Finance Chief',
        contact: null,
        templateName: 'section_commander',
        isVisible: false
      }
    ]
    getIncidentContacts(this.state.incident_id)
    .then(data => data.contacts.map(contact => {
      let match = workingArray.find(role => role.id === contact.incident_role)
      if (match) {
        match.contact = contact
      } else {
        let node = {
          id: contact.incident_role,
          parent: contact.incident_parent,
          title: contact.incident_title,
          contact: contact,
          templateName: 'section_node',
          isVisible: false
        }
        workingArray.push(node)
      }
      if (workingArray[0].contact) {
        workingArray.forEach(contact => contact.title !== 'aggregator' ? contact.isVisible = true : null)
      }
      return this.setState({ incidentContacts: workingArray })
    }))
  }

  componentDidMount() {
    this.refreshContacts()
  }

  render() {
    const config = {
      pageFitMode: PageFitMode.None,
      cursorItem: 0,
      highlightItem: 0,
      arrowsDirection: GroupByType.Children,
      hasSelectorCheckbox: Enabled.False,
      hasButtons: Enabled.True,
      buttonsPanelSize: 40,
      templates: [
        {
          name: 'incident_commander',
          itemSize: { width: 300, height: 140 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className="ContactTemplate">
                <div className="ContactTitleBackground">
                  <h4 className="ContactTitle">{itemConfig.title}</h4>
                  {itemConfig.contact ? returnContactAvatar(itemConfig.contact.contact_type) : null}
                </div>
                <h5 className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</h5>
                <div className="ContactJob">{itemConfig.contact ? `${itemConfig.contact.jobtitle} - ${itemConfig.contact.organization}` : ''}</div>
                <div className="ContactPhone">Phone: {itemConfig.contact ? itemConfig.contact.phone : ''}</div>
                <div className="ContactEmail">Email: {itemConfig.contact ? itemConfig.contact.email : ''}</div>
              </div> 
            )
          },
          onButtonsRender: ({ context: itemConfig }) => {
            return <>
              {!itemConfig.contact && <button onClick={() => this.setState({ assignmentMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserAdd />
              </button>}
              {itemConfig.contact && <button onClick={() => this.setState({ reassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserSwitch />
              </button>}
            </>
          }
        },
        {
          name: 'command_staff',
          itemSize: { width: 300, height: 140 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className={itemConfig.contact ? 'ContactTemplate' : 'UnassignedContactTemplate'}>
                <div className="ContactTitleBackground">
                  <h4 className="ContactTitle">{itemConfig.title}</h4>
                  {itemConfig.contact ? returnContactAvatar(itemConfig.contact.contact_type) : null}
                </div>
                <h5 className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</h5>
                <div className="ContactJob">{itemConfig.contact ? `${itemConfig.contact.jobtitle} - ${itemConfig.contact.organization}` : ''}</div>
                <div className="ContactPhone">Phone: {itemConfig.contact ? itemConfig.contact.phone : ''}</div>
                <div className="ContactEmail">Email: {itemConfig.contact ? itemConfig.contact.email : ''}</div>
              </div> 
            )
          },
          onButtonsRender: ({ context: itemConfig }) => {
            return <>
              {!itemConfig.contact && <button onClick={() => this.setState({ assignmentMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserAdd />
              </button>}
              {itemConfig.contact && <button onClick={() => this.setState({ reassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserSwitch />
              </button>}
              {itemConfig.contact  && <button onClick={() => this.setState({ unassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserDelete />
              </button>}
            </>
          }
        },
        {
          name: 'section_commander',
          itemSize: { width: 300, height: 170 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className={itemConfig.contact ? 'ContactTemplate' : 'UnassignedContactTemplate'}>
                <div className="ContactTitleBackground">
                  <h4 className="ContactTitle">{itemConfig.title}</h4> 
                  {itemConfig.contact ? returnContactAvatar(itemConfig.contact.contact_type) : null}
              </div>                  
                <h5 className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</h5>
                <div className="ContactJob">{itemConfig.contact ? `${itemConfig.contact.jobtitle} - ${itemConfig.contact.organization}` : ''}</div>
                <div className="ContactPhone">Phone: {itemConfig.contact ? itemConfig.contact.phone : ''}</div>
                <div className="ContactEmail">Email: {itemConfig.contact ? itemConfig.contact.email : ''}</div>
              </div> 
            )
          },
          onButtonsRender: ({ context: itemConfig }) => {
            return <>
              {!itemConfig.contact && <button onClick={() => this.setState({ assignmentMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserAdd />
              </button>}
              {itemConfig.contact && <button onClick={() => this.setState({ reassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserSwitch />
              </button>}
              {itemConfig.contact && !this.state.incidentContacts.find(contact => contact.parent === itemConfig.id) ? <button onClick={() => this.setState({ unassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserDelete />
              </button> : null}
              {itemConfig.contact && <button onClick={() => this.setState({ addNode: { isVisible: true, parent: itemConfig } })}>
                <AiOutlineCluster />
              </button>}
            </>
          }
        },
        {
          name: 'section_node',
          itemSize: { width: 300, height: 170 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className={itemConfig.contact ? 'ContactTemplate' : 'UnassignedContactTemplate'}>
                <div className="ContactTitleBackground">
                  <h4 className="ContactTitle">{itemConfig.title}</h4>
                  {itemConfig.contact ? returnContactAvatar(itemConfig.contact.contact_type) : null}
                </div>
                <h5 className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</h5>
                {itemConfig.contact && <div className="ContactJob">{itemConfig.contact.contact_type === 'Person' ? `${itemConfig.contact.jobtitle} - ${itemConfig.contact.organization}` : `${itemConfig.contact.point_of_contact} - ${itemConfig.contact.point_of_contact_title}, ${itemConfig.contact.organization}`}</div>}
                <div className="ContactPhone">Phone: {itemConfig.contact ? itemConfig.contact.phone : ''}</div>
                <div className="ContactEmail">Email: {itemConfig.contact ? itemConfig.contact.email : ''}</div>
              </div> 
            )
          },
          onButtonsRender: ({ context: itemConfig }) => {
            return <>
              {!itemConfig.contact && <button onClick={() => this.setState({ assignmentMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserAdd />
              </button>}
              {itemConfig.contact && <button onClick={() => this.setState({ reassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineUserSwitch />
              </button>}
              {itemConfig.contact && !this.state.incidentContacts.find(contact => contact.parent === itemConfig.id) ? <button onClick={() => this.setState({ unassignMenu: { isVisible: true, role: itemConfig } })}>
                <AiOutlineDelete />
              </button> : null}
              {itemConfig.contact && <button onClick={() => this.setState({ addNode: { isVisible: true, parent: itemConfig } })}>
                <AiOutlineCluster />
              </button>}
            </>
          }
        }
      ],
      items: this.state.incidentContacts
    }

    return (
      <div className='chart-editor'>
        <OrgDiagram centerOnCursor={true} config={config} />
        {this.state.assignmentMenu.isVisible && <AssignRoleMenu 
          show={this.state.assignmentMenu.isVisible} 
          role={this.state.assignmentMenu.role}
          incident_id={this.state.incident_id}
          onHide={() => {
            this.setState({ assignmentMenu: { isVisible: false, role: null } })
            this.refreshContacts()
          }} 
          animation={false} 
        />}
        {this.state.unassignMenu.isVisible && <UnassignMenu
          show={this.state.unassignMenu.isVisible}
          role={this.state.unassignMenu.role}
          onHide={() => {
            this.setState({ unassignMenu: { isVisible: false, role: null } })
            this.refreshContacts()
          }}
          animation={false}         
        />}
        {this.state.reassignMenu.isVisible && <ReassignMenu
          show={this.state.reassignMenu.isVisible}
          role={this.state.reassignMenu.role}
          incident_id={this.state.incident_id}
          onHide={() => {
            this.setState({ reassignMenu: { isVisible: false, role: null } })
            this.refreshContacts()
          }}
          animation={false}
        />}
        {this.state.addNode.isVisible && <AddNode
          show={this.state.addNode.isVisible}
          onHide={() => {
            this.setState({ addNode: { isVisible: false, parent: null } })
            this.refreshContacts()
          }}
          parent={this.state.addNode.parent}
          incident_id={this.state.incident_id}
          animation={false}
        />}
      </div>
    )
  }

}