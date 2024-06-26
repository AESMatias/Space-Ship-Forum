'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { getUsernameInfo } from '@/lib/getUsernameInfo';
import { logOutFromAccount } from '@/lib/logOutFromAccount';
import { useRouter } from "next/navigation";
import { getImageAverageColor } from '@/lib/getImageAverageColor';
import { UserSheet } from '@/components/UserSheet';

export default function AccountPage() {

    const [userInfo, setUserInfo] = useState({
        photoURL: '',
        uid: '',
        email: '',
        displayName: ''
    });
    const [photoAvgColor, setPhotoAvgColor] = useState('');
    const router = useRouter();

    const handleLogOut = async () => {
        const res = await logOutFromAccount();
        if (res) {
            router.push('/');
            setUserInfo({
                photoURL: '',
                uid: '',
                email: '',
                displayName: ''
            });
        }
        else {
            console.log('Error logging out');
        }
    }


    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUsernameInfo();
            const { photoURL, uid, email, displayName } = userInfo || {
                photoURL: '',
                uid: '',
                email: '',
                displayName: ''
            };
            setUserInfo(userInfo);
        };
        fetchUserInfo();

        if (!userInfo) {
            router.push('/Login');
        }

        return () => {
            // cleanup
        };
    }, []);

    useEffect(() => {

        if (!userInfo) {
            router.push('/Login');
        }

        // This cuases CORS problems. I will fix it later

        // const getColor = async () => {
        //     if (userInfo?.photoURL === '') return;
        //     const photoAvgColor: any = await getImageAverageColor(userInfo?.photoURL); //TODO: Type this
        //     console.log('Photo average color:', photoAvgColor);
        //     setPhotoAvgColor(photoAvgColor);
        // };
        // getColor();

    }

        , [userInfo]);


    return (

        <main className="justify-center items-center">

            <div className="flex flex-col sm:flex-row justify-center items-center w-full ">
                <div className="flex flex-col w-7/12 md:w-4/12  pb-10">
                    <section className={`bg-gradient-to-tr 
                    bg-sky-950/100 bg-from-blue-600 bg-via-red-500 bg-to-black
                    border-2 
                    flex flex-col text-center m-1 gap-2 py-6 my-6
                    border-solid border-white/60 rounded-xl
                    ${(photoAvgColor) !== '' ? `border-${photoAvgColor}-400` : ''}
                    `}
                        style={{
                            // backgroundColor: `${(photoAvgColor) !== '' ?
                            //     (`rgba(${photoAvgColor[0]},${photoAvgColor[1]},${photoAvgColor[2]},0.8)`)
                            //     : ''}`,
                            borderColor: `${(photoAvgColor) !== '' ?
                                (`rgba(${photoAvgColor[0]},${photoAvgColor[1]},${photoAvgColor[2]},1)`)
                                : ''}`
                        }}>

                        {(userInfo?.displayName !== '') ? (
                            <div>
                                <span 
                                className="font-bold text-xl mx-auto my-6 bg-sky-950/100
                                brightness-200 py-2
                                px-6 rounded-2xl "
                                >Welcome {userInfo?.displayName}</span>

                                <div className='h-32 w-32 flex flex-col justify-center mx-auto'>
                                    {(userInfo?.photoURL) !== '' ? (


                                        <UserSheet>
                                        </UserSheet>
                                        // <Image
                                        //     className="border-2 border-solid "
                                        //     style={{
                                        //         borderColor: `${(photoAvgColor) !== '' ?
                                        //             (`rgba(${255 - photoAvgColor[0] * 0.5},
                                        //                 ${255 - photoAvgColor[1] * 0.5},
                                        //                 ${255 - photoAvgColor[2] * 0.4},
                                        //                 1)`)
                                        //             : ''}`

                                        //     }}
                                        //     src={userInfo?.photoURL}
                                        //     alt='User Profile Picture'
                                        //     width={120} height={120}>
                                        // </Image>
                                    )

                                        :
                                        <Image
                                            className="border-2 border-solid border-white"
                                            src={'/logo.jpeg'}
                                            alt='Default profile picture'
                                            width={120} height={120}>
                                        </Image>
                                    }
                                </div>

                                <div className="flex flex-row justify-center py-4 ">
                                    <Button onClick={() => handleLogOut()}
                                        className='py-5 sm:px-24 flex font-bold text-sm' variant={"destructive"}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // <Link href="/Login">
                            //     <button className="text-gray-300 hover:bg-teal-500/70 hover:text-white px-3 py-2 
                            //     rounded-md text-sm font-medium">Login or Register</button>
                            // </Link>

                            //TODO Fix this (just me, AESMatias)
                            null

                        )

                        }


                    </section>
                </div>
            </div >

        </main >

    );
}
