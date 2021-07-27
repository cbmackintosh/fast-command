import { AiOutlineUser, AiOutlineTeam } from 'react-icons/ai'
import { FiTruck } from 'react-icons/fi'
import { GiHelicopter, GiCrane, GiSittingDog } from 'react-icons/gi'
import { IoMdBoat } from 'react-icons/io'

export const formatDate = (datetime) => {
  return datetime.slice(0, 15)
}

export const returnContactAvatar = (contactType) => {
  switch (contactType) {
    case 'Person':
      return <AiOutlineUser />
    case 'Team':
      return <AiOutlineTeam />
    case 'Vehicle':
      return <FiTruck />
    case 'Aircraft':
      return <GiHelicopter />
    case 'Watercraft':
      return <IoMdBoat />
    case 'Machinery':
      return <GiCrane />
    case 'Animal':
      return <GiSittingDog />
  }
}