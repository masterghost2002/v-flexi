'use client';
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { Video } from "../../../../types";
import ReactPlayer from 'react-player';
const VideoPlayer = dynamic(() => import('react-player'));
const PlayerPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<Video | undefined>();
    const [currentUrl, setCurrentUrl] = useState('');
    const player = useRef<ReactPlayer>();
    const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedQuality = e.target.value;
        setCurrentUrl(selectedQuality);
        if (!player.current) return;
        player.current.seekTo(player.current.getCurrentTime(), 'seconds');
        player.current.getInternalPlayer().setPlaybackQuality(selectedQuality);
    };
    // quick fix for hydration issue
    useEffect(() => {
        const currentOpenVideo: string | null = localStorage.getItem('currentVideo');
        if (!currentOpenVideo) return;
        const parsedVideo: Video = JSON.parse(currentOpenVideo);
        console.log(parsedVideo);
        setCurrentVideo(parsedVideo);
        setCurrentUrl(parsedVideo.video_1080_mp4);
        setIsLoaded(true);
    }, []);
    if (!isLoaded) return <div>
        Player
    </div>
    return (<div>
        <VideoPlayer
            url={currentUrl}
            controls={true}
            playing={true}
            ref={player}
        />
       {currentVideo && <select value={currentVideo.video_1080_mp4} onChange={handleQualityChange}>
                <option  value={currentVideo.video_1080_mp4}>
                    Full HD
                </option>
                <option  value={currentVideo.video_720_mp4}>
                    HD
                </option>
                <option  value={currentVideo.video_480_mp4}>
                    SD
                </option>
        </select>}
    </div>
    )
};
export default PlayerPage;