import React, { Component } from 'react'
import { getIncidentContacts } from '../../api-calls'
import { OrgDiagram } from 'basicprimitivesreact'
import { PageFitMode, GroupByType, Enabled, ItemType, AdviserPlacementType, ChildrenPlacementType } from 'basicprimitives';
import './ChartEditor.css'
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineUserSwitch, AiOutlineCluster, AiOutlineDelete, AiFillTablet } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import AssignRoleMenu from '../AssignRoleMenu/AssignRoleMenu';
import UnassignMenu from '../UnassignMenu/UnassignMenu'

export default class ChartEditor extends Component {
  constructor({ incidentID }) {
    super()
    this.state = {
      incidentID: incidentID,
      assignmentMenu: {
        isVisible: false,
        role: null
      },
      unassignMenu: {
        isVisible: false,
        role: null
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
    getIncidentContacts(this.state.incidentID)
    .then(data => {
      let workingArray = this.state.incidentContacts
      workingArray.forEach(role => {
        if (data.contacts.find(contact => contact.incident_role === role.id)) {
          role.contact = data.contacts.find(contact => contact.incident_role === role.id)
        } else {
          role.contact = null
        }
      })
      if (workingArray[0].contact) {
        workingArray.forEach(contact => contact.title !=='aggregator' ? contact.isVisible = true : null)
      }
      this.setState({ incidentContacts: workingArray })
    })
  }

  componentDidMount() {
    this.refreshContacts()
  }

  render() {

    const config = {
      pageFitMode: PageFitMode.FitToPage,
      cursorItem: 0,
      highlightItem: 0,
      arrowsDirection: GroupByType.Children,
      hasSelectorCheckbox: Enabled.False,
      hasButtons: Enabled.True,
      buttonsPanelSize: 40,
      templates: [
        {
          name: 'incident_commander',
          itemSize: { width: 220, height: 150 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className="ContactTemplate">
                <div className="ContactTitleBackground">
                  <div className="ContactTitle">{itemConfig.title}</div>
                </div>
                <div className="ContactPhotoFrame">
                  <BiUserCircle />
                </div>
                <div className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</div>
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
              {itemConfig.contact && <button onClick={() => console.log('this button will reassign the incident commander')}>
                <AiOutlineUserSwitch />
              </button>}
            </>
          }
        },
        {
          name: 'command_staff',
          itemSize: { width: 220, height: 150 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className="ContactTemplate">
                <div className="ContactTitleBackground">
                  <div className="ContactTitle">{itemConfig.title}</div>
                </div>
                <div className="ContactPhotoFrame">
                  <BiUserCircle />
                </div>
                <div className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</div>
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
              {itemConfig.contact && <button onClick={() => console.log('this button will reassign this node')}>
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
          itemSize: { width: 220, height: 150 },
          onItemRender: ({ context: itemConfig }) => {
            return (
              <div className="ContactTemplate">
                <div className="ContactTitleBackground">
                  <div className="ContactTitle">{itemConfig.title}</div>
                </div>
                <div className="ContactPhotoFrame">
                  <BiUserCircle />
                </div>
                <div className="ContactDescription">{itemConfig.contact ? itemConfig.contact.name : 'Unassigned'}</div>
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
              {itemConfig.contact && <button onClick={() => console.log('this button will reassign this node')}>
                <AiOutlineUserSwitch />
              </button>}
              {itemConfig.contact && <button onClick={() => console.log('this button will unassign this node')}>
                <AiOutlineUserDelete />
              </button>}
              {itemConfig.contact && <button onClick={() => console.log('this button will add a new node to this parent')}>
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
          incidentID={this.state.incidentID}
          onHide={() => {
            this.setState({ assignmentMenu: { isVisible: false, role: null } })
            this.refreshContacts()
          }} 
          animation={false} 
        />}
        <UnassignMenu
          show={this.state.unassignMenu.isVisible}
          role={this.state.unassignMenu.role}
          onHide={() => {
            this.setState({ unassignMenu: {isVisible: false, role: null } })
            this.refreshContacts()
          }}
          animation={false}         
        />
      </div>
    )
  }

}