import React from 'react'

export default function Meme({ data, handleImageClick }) {
    return (
        <img
            key={data.id}
            src={data.url}
            alt={data.name}
            onClick={handleImageClick}
        />
    )
}
