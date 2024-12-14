import userImg from '../../../img/user.png'
import friend from '../../../service/friend';
const CardUserList = ({ userdata }) => {
    const handAddFriend = async (id) => {
        try {
            const rs = await friend.AddFriend(id)
            if (rs.success) {
                alert(rs.message);
            } else {
                alert(rs.message);
            }
            // console.log(rs);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="w-full flex flex-row  justify-between items-center p-2 max-h-[80px] sm:max-h-[60px] md:max-h-[70px] lg:max-h-[80px]">
            <div className="flex flex-row items-center">
                <div className="w-14 h-14 rounded-full">
                    <img src={userdata && userdata.img ? userdata.img : userImg} />
                </div>
                <div className="flex flex-col pl-2">
                    <div>{userdata ? (userdata.firstName ? userdata.firstName : '', userdata.lastName ? userdata.lastName : '') : 'No Name'}</div>
                    <div>number post</div>
                    {/* Friend chung */}
                </div>
            </div>
            <div className="py-5">
                <button
                    onClick={userdata && userdata._id ? () => handAddFriend(userdata._id) : undefined}
                    className="bg-blue-200 rounded-xl p-2 min-w-24"
                >
                    Kết bạn
                </button>
            </div>
        </div>
    );
}

export default CardUserList;