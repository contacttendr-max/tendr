import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import MovieIcon from '@mui/icons-material/Movie';
import { useNavigate } from 'react-router-dom';
import tendrLogo from '../assets/logos/tendr.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const actions = [
  { icon: <TimelineIcon />, name: 'Timeline', path: '/timeline-picker' },
  { icon: <CheckBoxIcon />, name: 'Checklist', path: '/checklist-picker' },
  { icon: <InsertInvitationIcon />, name: 'Invitation Flyers', path: '/invitation' },
  { icon: <MovieIcon />, name: 'Aftermovie', path: '/aftermovie' },
  {icon: <GroupAddIcon/>, name: 'Budget Allocator', path: '/budget-picker' },
];


export default function BasicSpeedDial() {
  const navigate = useNavigate();

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic"
       sx={{ position: 'fixed', bottom: 90, right: 40,'& .MuiFab-primary': { backgroundColor: 'white', color:'black',             boxShadow: '0 4px 8px rgba(0,0,0,0.2)','&:hover': {backgroundColor: '#f0f0f0',},'&:focus': {outline: 'none',},},}}
      icon={<img src={tendrLogo} alt="logo" className="w-10 h-10" />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}  
          tooltipTitle={action.name}
          onClick={() => navigate(action.path)}
        />
      ))}
    </SpeedDial>
  );
}
