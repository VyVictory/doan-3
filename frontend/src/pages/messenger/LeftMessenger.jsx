
const LeftMessenger = ({bt_chanetransfer}) => {
    const messages = [
        { name: 'John Doe', message: 'Hey! How are you?', img: 'https://placehold.co/40' },
        { name: 'Jane Smith', message: 'Hi there!', img: 'https://placehold.co/40' },
        { name: 'Alice Johnson', message: 'Good morning!', img: 'https://placehold.co/40' },
        { name: 'Bob Brown', message: 'What’s up?', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Diana Prince', message: 'Let’s catch up!', img: 'https://placehold.co/40' },
        { name: 'Ethan Hunt', message: 'Ready for the mission!', img: 'https://placehold.co/40' },

    ];
    return (<>
            <div class="w-full md:w-1/4   border-r-gray-400 border-r-2 text-white float-end">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Chat History</h2>
                    <ul className=''>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                <button onClick={bt_chanetransfer} className="flex items-center py-2">
                                    <img src={msg.img} alt="user" className="w-10 h-10 rounded-full mr-2" />
                                    <div className='text-start'>
                                        <h3 className="text-primary font-semibold">{msg.name}</h3>
                                        <p className="text-secondary">{msg.message}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

    </>);
}

export default LeftMessenger;