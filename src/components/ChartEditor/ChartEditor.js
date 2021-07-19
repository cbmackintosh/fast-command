import React, { Component } from 'react'
import { OrgDiagram } from 'basicprimitivesreact'
import { PageFitMode, GroupByType, Enabled, ItemType, AdviserPlacementType, ChildrenPlacementType, Colors } from 'basicprimitives';
import './ChartEditor.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiUserCircle } from 'react-icons/bi'



class ChartEditor extends Component {
  render() {
    const config = {
      pageFitMode: PageFitMode.FitToPage,
      cursorItem: 0,
      highlightItem: 0,
      arrowsDirection: GroupByType.Children,
      hasSelectorCheckbox: Enabled.False,
      hasButtons: Enabled.True,
      buttonsPanelSize: 40,
      onButtonsRender: (({ context: itemConfig }) => {
        if (itemConfig.id > 5) {
          return <>
            <button onClick={() => console.log('button clicked!')}>
              <GiHamburgerMenu />
            </button>
          </>
        }
      }),
      templates: [{
        name: 'contactTemplate',
        itemSize: { width: 220, height: 120 },
        onItemRender: ({ context: itemConfig }) => {
          return <div className="ContactTemplate">
            <div className="ContactTitleBackground">
              <div className="ContactTitle">{itemConfig.title}</div>
            </div>
            <div className="ContactPhotoFrame">
              <BiUserCircle />
            </div>
            <div className="ContactDescription">{itemConfig.description}</div>
            <div className="ContactPhone">Phone: {itemConfig.phone}</div>
            <div className="ContactEmail">Email: {itemConfig.email}</div>
          </div>; 
        }
      }],
      items: [
        {
          id: 0,
          parent: null,
          title: 'Incident Commander',
          description: 'Unassigned',
          image: '/api/images/photos/a.png',
          email: 'test@test.org',
          phone: '',
          templateName: 'contactTemplate'
        },
        {
          id: 1,
          parent: 0,
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          title: 'Liaison Officer',
          description: 'Unassigned',
          image: '/api/images/photos/b.png'
        },
        {
          id: 2,
          parent: 0,
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Left,
          title: 'Public Information Officer',
          description: 'Unassigned',
          image: '/api/images/photos/c.png'
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
          description: 'Unassigned',
          image: '/api/images/photos/c.png',
          itemType: ItemType.Assistant,
          adviserPlacementType: AdviserPlacementType.Right,
          hasButtons: Enabled.True
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
          description: 'Unassigned',
          image: '/api/images/photos/c.png'
        },
        {
          id: 7,
          parent: 5,
          title: 'Logistics Chief',
          description: 'Unassigned',
          image: '/api/images/photos/c.png'
        },
        {
          id: 8,
          parent: 5,
          title: 'Planning Chief',
          description: 'Unassigned',
          image: '/api/images/photos/c.png'
        },
        {
          id: 9,
          parent: 5,
          title: 'Finance Chief',
          description: 'Unassigned',
          image: '/api/images/photos/c.png'
        }
      ]
    };

    return <div className="placeholder">
      <OrgDiagram centerOnCursor={true} config={config} />
    </div>
  }
}

export default ChartEditor;