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
    const handDetailUser = async (id) => {
        window.location.href = `/user/${id}`;
    };
    return (
        <button
            onClick={() => { handDetailUser(userdata._id) }}
            className="w-full flex flex-row rounded-lg hover:bg-green-50 justify-between items-center p-2 max-h-[80px] sm:max-h-[60px] md:max-h-[70px] lg:max-h-[80px]">
            <div className="flex flex-row items-center">
                <div className="w-14 h-14 rounded-full">
                    <img src={userdata && userdata.img ? userdata.img : userImg} />
                </div>
                <div className="flex flex-col pl-2">
                    <div className='text-start'>{userdata ? (userdata.firstName ? userdata.firstName : '', userdata.lastName ? userdata.lastName : '') : 'No Name'}</div>
                    <div>number post</div>
                    {/* Friend chung */}
                </div>
            </div>
            <div className="py-5">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (userdata && userdata._id) handAddFriend(userdata._id);
                    }}
                    className="bg-blue-100 rounded-xl p-2 min-w-24 hover:bg-blue-200 hover:text-blue-600 text-blue-500"
                >
                    <strong className='text-sm'>Add Friend</strong>
                </button>
            </div>
        </button>
    );
}

export default CardUserList;