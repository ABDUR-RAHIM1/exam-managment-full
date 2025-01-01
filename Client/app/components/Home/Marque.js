import React from 'react'

export default function Marque() {
    return (
        <div className='w-full h-[65px] bg-blue-300 text-white flex items-center justify-between'>
            <div className='w-auto px-5 text-3xl font-bold bg-blue-600 h-full flex items-center justify-center'>
            ঘোষণা 
            </div>
            <div className='flex-1 px-3'>
                <marquee width="100%" direction="left" height="100%">
                    <p className='font-bold text-2xl'>
                        স্বাগতম! আমাদের অনলাইন পরীক্ষা অ্যাপ্লিকেশনে প্রবেশ করেছেন। আপনি শীঘ্রই পরীক্ষায় অংশগ্রহণ করতে পারবেন এবং চাকরি প্রস্তুতিও নিতে পারবেন। আপনার সফলতার পথে আমরা সবসময় পাশে আছি।
                    </p>
                </marquee>
            </div>
        </div>
    )
}
