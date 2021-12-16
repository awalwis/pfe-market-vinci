import { ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DeleteIcon from '@mui/icons-material/Delete';
import { notificationService } from 'services/notifications.service';
import { authService } from 'services/auth.service';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
// utils
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

function renderContent(notification) {
  const message = (
    <Typography variant="subtitle2">
      {notification.message}
    </Typography>
  );

  if (!notification.isSeen) {
    return {
      avatar: <NotificationsIcon sx={{ color: 'black' }} />,
      message
    };
  }
  if (notification.isSeen) {
    return {
      avatar: <NotificationsNoneIcon sx={{ color: 'black' }} />,
      message
    };
  }
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification, handleDelete }) {
  const { avatar, message } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isSeen && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar >{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={message}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {notification.date.replace("-", " ")}
          </Typography>
        }
      />
      <ListItemIcon className={"TrashButton"}>
        <DeleteIcon data-id={notification.id_notification} onClick={handleDelete} />
      </ListItemIcon>
    </ListItemButton >
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const totalIsSen = notifications.filter((item) => !item.isSeen).length;
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const retrievedNotification = await notificationService.getAllNotificationsByUserId(currentUser.id_user);
      setNotifications(retrievedNotification.data.notifications);
    }
    const interval = setInterval(() => {
      if (currentUser) {
        fetchData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    let id = e.target.parentNode.dataset.id;
    let index = 0;
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].id_notification == id) {
        index = i;
        break;
      }
    }
    notifications.splice(index, 1);
    notificationService.deleteNotification(id);
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isSeen: true
      }))
    );
    notifications.filter(notif => !notif.isSeen).map(async (notif) => {
      let newNotif = {
        isSeen: true,
        date: notif.date,
        message: notif.message.replaceAll("'", "''"),
        id_user: notif.id_user
      }
      console.log(newNotif)
      await notificationService.updateNotification(notif.id_notification, newNotif)
    })
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
        className='notification'
      >
        <Badge badgeContent={totalIsSen} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Vous avez {totalIsSen} messages non lu
            </Typography>
          </Box>

          {totalIsSen > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Nouveau
              </ListSubheader>
            }
          >
            {notifications.filter(notif => !notif.isSeen).map((notification) => (
              <NotificationItem key={notification.id_notification} notification={notification} handleDelete={handleDelete} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Ancien
              </ListSubheader>
            }
          >
            {notifications.filter(notif => notif.isSeen).map((notification) => (
              <NotificationItem key={notification.id_notification} notification={notification} handleDelete={handleDelete} />
            ))}
          </List>
        </Scrollbar>

        <Divider />
      </MenuPopover>
    </>
  );
}
