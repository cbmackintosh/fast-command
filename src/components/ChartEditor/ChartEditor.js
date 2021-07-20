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
          templateName: 'incident_commander',
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
          templateName: 'command_staff',
          isVisible: false
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
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
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
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 7,
          parent: 5,
          title: 'Logistics Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 8,
          parent: 5,
          title: 'Planning Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander',
          isVisible: false
        },
        {
          id: 9,
          parent: 5,
          title: 'Finance Chief',
          name: 'Unassigned',
          email: '',
          phone: '',
          contact_type: 'Person',
          templateName: 'section_commander',
          isVisible: false
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
      if (updateRole.id === 0) {
        workingArray.forEach(contact => contact.title !=='aggregator' ? contact.isVisible = true : null)
      }
      this.setState({ incidentContacts: workingArray })
    }))
  }

  render() {
    console.log(this.state)
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