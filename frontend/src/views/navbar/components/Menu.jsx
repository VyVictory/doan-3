import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Box, Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HomeIcon, UserGroupIcon, ChatBubbleLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';  // Updated import path
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

function MenuNavbar() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[600],
    },
  };

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <div className="w-full flex justify-center absolute h-full items-center pt-96">
      <Box sx={{ bgcolor: 'background.paper', width: 500, position: 'relative', minHeight: 200 }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab icon={<HomeIcon className="h-6 w-6 text-gray-500" />} aria-label="Home" />
            <Tab icon={<UserGroupIcon className="h-6 w-6 text-gray-500" />} aria-label="Friends" />
            <Tab icon={<ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />} aria-label="Messenger" />
            <Tab icon={<SpeakerWaveIcon className="h-6 w-6 text-gray-500" />} aria-label="Speaker" />
          </Tabs>
        </AppBar>

        {/* Render the floating action buttons with Zoom transition */}
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </Box>
    </div>
  );
}

export default MenuNavbar;
