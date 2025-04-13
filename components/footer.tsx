import * as React from 'react';
import {Image} from "@heroui/image";

import { Link } from "@heroui/link";
import { GoogleMapsEmbed } from '@next/third-parties/google';

export default function Footer({ locale }: { locale: string }) {
    return (
        <div className='pt-10 pb-10'>
            <footer className='w-full flex flex-col items-center justify-center py-3'>

            <div className="w-full bg-base-100 flex items-center justify-center p-4 space-x-2">
                        <div className='w-full flex flex-col items-center justify-center '>
                            <Image
                                src='/images/logo_black.png'
                                alt='logo_black'
                                width={120}
                                height={120}
                            />
                        </div>
                        <div className='w-full flex items-centr justify-center space-x-4'>
                            <div className='w-full flex flex-col justify-center content-center place-items-start space-y-2'>
                                <h5 className='footer-title text-base-content'> Contacts </h5>
                                <p className='text-base-content'>708 Eisenhower Street</p>
                                <p className='text-base-content'>College Station, TX 77840</p>
                                <a className='text-base-content' href='tel:9796962317'>979-696-2317</a>
                                <a className='text-base-content' href='mailto:cscbclist@gmail.com'>cscbclist@gmail.com</a>
                            </div>
                            <div className='w-full flex flex-col justify-center content-center place-items-start space-y-2'>
                                <h5 className='footer-title text-base-content'> Resources </h5>
                                <Link href={`/${locale}/sermons`}>
                                    <p className='text-base-content hover:text-info'>Sermons</p>
                                </Link>
                                <Link href={`/${locale}/events`}>
                                    <p className='text-base-content hover:text-info'>Events</p>
                                </Link>
                                <Link href={`/${locale}/classes`}>
                                    <p className='text-base-content hover:text-info'>Classes</p>
                                </Link>
                                <Link href={`/${locale}/ministries`}>
                                    <p className='text-base-content hover:text-info'>Ministries</p>
                                </Link>
                            </div>
                            
                        </div>
                        <div className='w-full flex flex-col items-center justify-center '>
                            <GoogleMapsEmbed
                                apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`}
                                height="250"
                                width="400"
                                mode="place"
                                q="College+Statio+Chinese+Bible+Church,College+Station,TX"
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center pt-1 pb-1">
                        <div className="grid grid-flow-col gap-4">
                            <a href='https://twitter.com/CSCBC2021'>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a href='https://www.facebook.com/%E5%A4%A7%E5%AD%B8%E5%9F%8E%E8%8F%AF%E4%BA%BA%E8%81%96%E7%B6%93%E6%95%99%E6%9C%83-College-Station-Chinese-Bible-Church-92771349084'>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center pt-1 pb-1">
                        <p className="text-base-content">© 2024 College Station Chinese Bible Church - All rights reserved.</p>
                    </div>
                
            </footer>
        </div>
    );
}