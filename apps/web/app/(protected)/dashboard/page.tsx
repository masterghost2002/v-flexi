'use client';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import  { Video, Status } from "../../../types";
export default function DashBoardPage() {

    const [videos, setVideos] = useState<Array<Video>>([]);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const uploadInputRef = useRef<HTMLInputElement | null>(null)
    const getVideos = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('signin');
            return;
        }
        const parsedUser = JSON.parse(user);
        if (!parsedUser.access_token) {
            router.push('signin');
            return;
        }
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${parsedUser.access_token}`
            },
        }
        const url = process.env.NEXT_PUBLIC_SERVER_URL + '/videos';

        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error('Failed to get vidoes');
            const data = await res.json();
            console.log(data);
            setVideos(data);
        } catch (error) {
            console.log(error)
            alert('Failed to  get videos');
        }
    }
    const onClickUpload = () => {
        if (!uploadInputRef.current) return;
        uploadInputRef.current.click();
    }
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        if (!file?.type.startsWith('video/')) {
            alert('Only video accepted');
            return;
        }
        setFile(file);
    }
    const uploadFile = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('signin');
            return;
        }
        const parsedUser = JSON.parse(user);
        if (!parsedUser.access_token) {
            router.push('signin');
            return;
        }
        const newTask = {
            id: -1,
            status: Status.UPLOADING,
            video_1080_mp4:'',
            video_720_mp4:'',
            video_480_mp4:'',
            userId: 'temp',
            createdAt: (new Date()).toDateString(),
            updatedAt: (new Date()).toDateString()
        };
        setVideos([newTask, ...videos]);
        const formData = new FormData();
        if(!file) return;
        formData.append('file', file);
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${parsedUser.access_token}`
            },
            body:formData
        }
        const url = process.env.NEXT_PUBLIC_SERVER_URL + '/upload/file';
        setIsUploading(true);
        try {
            await fetch(url, options);
            const latestVideo = videos[0];
            if(latestVideo){
                latestVideo.status = Status.PROCESSING;
                const _videos = [...videos];
                _videos[0] = latestVideo;
                setVideos(_videos);
            }
        } catch (error) {
            alert('failed to upload');
        }finally{
            setIsUploading(false);
        }
    }
    const onClickPreview = (index:number, videoId:number)=>{
        const selectedvideo = videos[index];
        if(!selectedvideo) return;
        localStorage.setItem('currentVideo', JSON.stringify(selectedvideo));
        router.push(`/player/${videoId}`)
    }
    useEffect(() => {
        getVideos();
    }, [])
    return (
        <main className="flex p-24 flex-col gap-5">
            <div className="flex gap-5">
                <button disabled={isUploading} className="bg-blue-400 rounded-lg p-2 text-white w-[200px] " onClick={onClickUpload}>
                    Upload
                </button>
                <input
                    type="file"
                    className="hidden"
                    ref={uploadInputRef}
                    onChange={onFileChange}
                />
                {
                    file && <button disabled={isUploading} className="bg-green-400 rounded-lg p-2 text-white w-[200px] " onClick={uploadFile}>
                        Process
                    </button>
                }
            </div>

            <div className="flex flex-col gap-5 border-1 border-gray-200 rounded-full w-full">
                {
                    videos.map((video: Video, index:number) => {
                        return (
                            <div key={video.id + video.userId} className="bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                                <span className="font-[500]">Video id: {video.id}</span>
                                <div className="flex items-center gap-5">
                                    <span
                                        className={`font-[500] 
                                    ${video.status === 'AVAILABLE' && 'bg-green-100 text-green-700'} 
                                    ${video.status === 'PROCESSING' && 'bg-yellow-100 text-yellow-700'}
                                    ${video.status === 'FAILED' && 'bg-red-100 text-red-700'}
                                    ${video.status === 'UPLOADING' && 'bg-blue-100 text-blue-700'}
                                    rounded-lg p-2 text-sm`}
                                    >{video.status}</span>
                                    {
                                        video.status === 'AVAILABLE' &&
                                        <button
                                        onClick={()=>onClickPreview(index, video.id)} 
                                        className="p-2 border-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500">
                                            Preview
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </main>
    )
}