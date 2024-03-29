'use client'

import React, { useRef, useState, useEffect } from 'react';
import { UserAvatarButton } from './UserAvatarButton';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';
import { revalidatePath } from 'next/cache';
import { TypingText } from '@/components/TypingText';
import { ExpandingImage } from '@/components/ExpandingImage';
import { getUsernameInfo } from '@/lib/getUsernameInfo';
import { FirebaseUploadAvatar, FirebaseDownloadAvatar } from '@/lib/FirebaseAvatar';

interface CustomSheetProps {
    data?: any;
}

export const UserSheet: React.FC<CustomSheetProps> = ({ data }) => {

    const [avatar, setAvatar] = useState('');
    const [userInfo, setUserInfo] = useState({
        photoURL: '',
        uid: '',
        email: '',
        displayName: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            const urlImageFirebase = await FirebaseUploadAvatar(userInfo, imageUrl); // Upload the image, then return the URL or null
        }
    };

    // revalidatePath('/'); // To revalidate the current path without the previous CACHE

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUsernameInfo();
            let { photoURL, uid, email, displayName } = userInfo || {
                photoURL: '',
                uid: '',
                email: '',
                displayName: ''
            }
            setUserInfo(userInfo);
        };
        fetchUserInfo();
        return () => {
            // cleanup
        };
    }, []);


    return (
        <div className="flex flex-col justify-center items-center h-40">
            <Sheet>
                <SheetTrigger>

                    {(userInfo?.photoURL) !== '' ? (
                        <UserAvatarButton
                            photoURL={userInfo?.photoURL}
                            onLogout={() => console.log('FIX THIS 1 Logout')} />
                    ) :
                        <UserAvatarButton
                            photoURL='/logo.jpeg'
                            onLogout={() => console.log('FIX THIS 2 Logout')} />

                    }

                </SheetTrigger>
                <SheetContent className="w-[320px] sm:w-[400px]">
                    <SheetHeader>
                        <span onClick={handleImageSelect}
                            className='mx-auto cursor-pointer'>

                            <div className='h-32 '>
                                {(userInfo?.photoURL) !== '' ? (
                                    <ExpandingImage
                                        src={userInfo?.photoURL}
                                        alt='User Profile Picture'
                                        width={120} height={120} expandSpeed={12}>
                                    </ExpandingImage>)
                                    :
                                    <ExpandingImage
                                        src={userInfo?.photoURL}
                                        alt='Default profile picture'
                                        width={120} height={120} expandSpeed={12}>
                                    </ExpandingImage>
                                }
                            </div>

                        </span>
                        <SheetTitle className='self-center pb-6'>
                            <TypingText text={`${userInfo?.displayName || 'Anonymous'}`}
                                typingSpeed={100}>
                            </TypingText>
                        </SheetTitle>
                        <SheetDescription className='self-center'>
                            Here you can change your user settings,
                            profile avatar, check your stats, and more!
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <input
                //This is the hidden file input to select the new image avatar
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div >
    );
};

export default UserSheet;