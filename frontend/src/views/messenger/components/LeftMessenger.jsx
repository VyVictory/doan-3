import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const LeftMessenger = ({ bt_chanetransfer }) => {
    const [alignment, setAlignment] = React.useState('web');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

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
    return (
        <>
            <div className=" border-r-gray-300 border-r  h-full flex flex-col">
                <div className="w-full flex justify-center">
                    <ToggleButtonGroup
                        className="flex justify-center rounded-lg shadow-md bg-white z-10 w-full max-w-lg"
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton
                            value="web"
                            className="flex-1 py-2 rounded-md font-medium transition-all hover:bg-blue-50"
                        >
                            Web
                        </ToggleButton>
                        <ToggleButton
                            value="android"
                            className="flex-1 py-2 rounded-md font-medium transition-all hover:bg-blue-50"
                        >
                            Android
                        </ToggleButton>
                        <ToggleButton
                            value="ios"
                            className="flex-1 py-2 rounded-md font-medium transition-all hover:bg-blue-50"
                        >
                            iOS
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <ul
                    className='h-full flex flex-col px-2'
                    style={{
                        overflowY: 'scroll',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none' // Internet Explorer and Edge
                    }}>
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