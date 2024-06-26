'use client'

import React, { useState } from 'react';
import Image from 'next/image';


interface UserAvatarButtonProps {
    photoURL: string;
    onLogout: () => void;
}

export const UserAvatarButton: React.FC<UserAvatarButtonProps> = ({ photoURL, onLogout }) => {



    const [imageLoaded, setImageLoaded] = useState(false);
1


    const imageLoadedFunction = () => {
        setImageLoaded(true);
        // console.log('Image loaded:');
        // console.log(photoURL)
    }
    return (
        <div className='select-none'>
            <span
                onClick={() => console.log('Avatar clicked')}
            >
                <Image
                    src={`${photoURL || '/logo.jpeg'}`}
                    alt="Profile Picture Image (Avatar)"
                    width={120}
                    height={120}
                    className={`${imageLoaded ? '' : `hidden`} 
                    rounded-full object-cover w-24 h-24
                    self-center border-2 border-white/0 border-solid
                    transition duration-150 ease-in-out hover:border-white
                     
                    hover:scale-110 hover:brightness-110 active:scale-95
                    `}
                    priority // Does not work without this
                    onLoad={() => imageLoadedFunction()}
                />

                {(imageLoaded === false) ?
                    (<div className="animate-spin rounded-full h-12 w-12
                                    border-t-2 border-cyan-500">
                    </div>) :
                    (null)}
            </span >



        </div>

    )
}

export default UserAvatarButton;