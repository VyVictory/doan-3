import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Files from "./component/files";
import PictureAndVideo from "./component/pictureAndVideo";
import ListMemberGroup from './component/listMemberGroup';
import group from '../../../../service/group';
import { IconButton, Button } from '@mui/material';
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ToolGroup = () => {
    const [groups, setGroups] = useState([]);
    const [groupdt, setGroupDT] = useState({});
    const [idgr, setIdgr] = useState([]);
    const location = useLocation();
    const [idgroupExists, setIdgroupExists] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const idgroup = queryParams.get('idgroup');

        if (idgroup) {
            setIdgroupExists(true);
            setIdgr(idgroup)
        } else {
            setIdgroupExists(false);
        }
    }, [location.search]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await group.getMyListChat()
                // console.log(res)
                const matchedGroup = res.data.Group.find(group => group._id == idgr);
                // console.log(matchedGroup)
                if (matchedGroup) {
                    setGroupDT([matchedGroup]); // Set only the matched group
                }
                setGroups(res.data.Group);

            } catch (error) {
                console.error("Error fetching friend list:", error);
                setGroups([]);
            }
        };
        fetchData();
    }, []);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConfirmKick = async () => {
        // setSelectedUser(user); // Set the selected user for the kick action
        // setOpenDialog(true); // Open the confirmation dialog
        // handleClose(); // Close the dropdown menu
    };
    // setOpenDialog(true);
    const handleRemoveGroup = async () => {

        // setSelectedUser(user); // Set the selected user for the kick action
        setOpenDialog(true); // Open the confirmation dialog
        // handleClose(); // Close the dropdown menu
    };
    const handleCancelKick = () => {
        setOpenDialog(false);
    };
    return (
        <div className="flex flex-col h-full">
            <div className="bg-white border-b border-l-2 flex justify-between items-center h-[56px]">
                <strong className="text-center w-full">Thông tin nhóm</strong>

                {/* Dropdown Button (More options) */}
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                    <MenuItem
                        onClick={handleRemoveGroup}
                    >xóa nhóm</MenuItem>

                </Menu>


                {/* Confirmation Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCancelKick}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa nhóm không?"}</DialogTitle>
                    <DialogContent>
                        <p>{`Bạn có chắc chắn muốn xóa nhóm không?`}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelKick} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleConfirmKick} color="primary" autoFocus>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {
                idgroupExists ? (
                    <div className="overflow-y-scroll flex-1 custom-scroll">
                        <ListMemberGroup />
                        <PictureAndVideo />
                        <Files />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-gray-500">Nhóm không tồn tại hoặc không tìm thấy.</p>
                    </div>
                )
            }
        </div >
    );
};

export default ToolGroup;
