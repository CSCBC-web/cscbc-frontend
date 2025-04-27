// @ts-nocheck
"use client";

import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export default function AudioPlayerComponent(props: { 
    src: string, 
    title: string,
    className?: string,
}) {
    const tracks = [
        {
            url: props.src,
            title: props.title,
            tags: []
        }
    ]

    const colors = {
        tagsBackground: "#3e32e4",
        tagsText: "#ffffff",
        tagsBackgroundHoverActive: "#6e65f1",
        tagsTextHoverActive: "#ffffff",
        searchBackground: "#18191f",
        searchText: "#ffffff",
        searchPlaceHolder: "#575a77",
        playerBackground: "#18191f",
        titleColor: "#ffffff",
        timeColor: "#ffffff",
        progressSlider: "#3e32e4",
        progressUsed: "#ffffff",
        progressLeft: "#151616",
        bufferLoaded: "#1f212b",
        volumeSlider: "#3e32e4",
        volumeUsed: "#ffffff",
        volumeLeft: "#151616",
        playlistBackground: "#18191f",
        playlistText: "#575a77",
        playlistBackgroundHoverActive: "#18191f",
        playlistTextHoverActive: "#ffffff",
    }

    return (
        <div className={props.className}> {/* 包裹 div 并应用 className */}
            <Player 
                trackList={tracks}
                includeTags={false}
                includeSearch={false}
                showPlaylist={false}
                sortTracks={false}
                autoPlayNextTrack={false}
                customColorScheme={colors}
            />
        </div>
    );
}