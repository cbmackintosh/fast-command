import React, { Component } from 'react'
import { getIncidentContacts } from '../../api-calls'
import { OrgDiagram } from 'basicprimitivesreact'
import { PageFitMode, GroupByType, Enabled, ItemType, AdviserPlacementType, ChildrenPlacementType, Colors } from 'basicprimitives';
import './ChartEditor.css'

import { render } from '@testing-library/react';
import { nodeTemplates } from './NodeTemplates';

export default class ChartEditor extends Component {
  constructor({ incidentID }) {
    super()
    this.state = {
      incidentID: incidentID,
      incidentContacts: [
        {
          id: 0,
          parent: null,
          title: 'Incident Commander',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'incident_commander'
        },
        {
          id: 1,
          parent: 0,
          title: 'Liaison Officer',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          templateName: 'command_staff'
        },
        {
          id: 2,
          parent: 0,
          title: 'Public Information Officer',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Left, 
          templateName: 'command_staff' 
        },
        {
          id: 3,
          parent: 0,
          isVisible: false,
          title: 'Aggregator',
          description: 'Invisible aggregator',
          childrenPlacementType: ChildrenPlacementType.Horizontal
        },
        {
          id: 4,
          parent: 3,
          title: 'Safety Officer',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          hasButtons: Enabled.True,
          templateName: 'command_staff'
        },
        {
          id: 5,
          parent: 3,
          isVisible: false,
          title: 'Aggregator2',
          description: 'Invisible aggregator 2',
          childrenPlacementType: ChildrenPlacementType.Horizontal
        },
        {
          id: 6,
          parent: 5,
          title: 'Operations Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander'
        },
        {
          id: 7,
          parent: 5,
          title: 'Logistics Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander'
        },
        {
          id: 8,
          parent: 5,
          title: 'Planning Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander'
        },
        {
          id: 9,
          parent: 5,
          title: 'Finance Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander'
        }
      ]
    }
  }

  componentDidMount() {
    getIncidentContacts(this.state.incidentID)
    .then(data => data.contacts.forEach(contact => {
      let workingArray = this.state.incidentContacts
      let updateRole = workingArray.find(role => role.id === contact.incident_role)
      updateRole.name = contact.name
      updateRole.email = contact.email
      updateRole.phone = contact.phone
      this.setState({ incidentContacts: workingArray })
    }))
  }

  compileChartNodes() {
    return this.state.incidentContacts.map(contact => {
      return {
        id: contact.incident_role,
        parent: contact.incident_parent,

      }
    })
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
      templates: nodeTemplates,
      items: this.state.incidentContacts
    }

    return (
      <div className='chart-editor'>
        <OrgDiagram centerOnCursor={true} config={config} />
      </div>
    )
  }

}