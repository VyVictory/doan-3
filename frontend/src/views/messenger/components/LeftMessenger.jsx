const LeftMessenger = ({ bt_chanetransfer }) => {
    const messages = [
        { name: 'John Doe', message: 'Hey! How are yHeyyHey! How are you?Hey! How ayHey! How are you?Hey! How ayHey! How are you?Hey! How ayHey! How are you?Hey! How a! How are you?Hey! How are you?Hey! How are you?ou?', img: 'https://placehold.co/40' },
        { name: 'Jane Smith', message: 'Hi there!', img: 'https://placehold.co/40' },
        { name: 'Alice Johnson', message: 'Good morning!', img: 'https://placehold.co/40' },
        { name: 'Bob Brown', message: 'What’s up?', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
        { name: 'Charlie Davis', message: 'Long time no see!', img: 'https://placehold.co/40' },
    ];
    return (<>
        <div className=" border-r-gray-300 border-r  h-full flex flex-col">
            <h2 className="text-lg font-semibold flex justify-center py-1 border-b border-gray-300 pt-3">List Friends</h2>
            <ul
                className='h-full flex flex-col px-2'
                style={{
                    overflowY: 'scroll',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none' // Internet Explorer and Edge
                }}
            >
                {messages.map((msg, index) => (
                    <li key={index}>
                        <button onClick={bt_chanetransfer} className="flex items-center py-2">
                            <img src={msg.img} alt="user" className="w-10 h-10 rounded-full mr-2" />
                            <div className='text-start line-clamp-3'>
                                <h3 className=" font-semibold">{msg.name}</h3>
                                <p className="text-gray-400">{msg.message}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    </>);
}

export default LeftMessenger;