import React from 'react';
import '../../assets/styles/Dashboard.css'; // Asegúrate de que este archivo esté actualizado con los estilos adecuados

const CircularProgressBar = ({ progress }) => {
    const [completadas, total] = progress.split('/').map(Number);
    const percentage = total > 0 ? Math.round((completadas / total) * 100) : 0;

    const radius = 30; // Tamaño del radio del círculo
    const strokeWidth = 4; // Ancho de la línea del trazo aumentado para un trazo más grueso
    const normalizedRadius = radius - strokeWidth * 2; // Radio normalizado para el trazo
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // El viewBox se expande para incluir el grosor del trazo
    const viewBox = `0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`;

    return (
        <svg
            width={radius * 2}
            height={radius * 2}
            viewBox={viewBox}
            className="circular-progress-bar"
        >
            <circle
                stroke="lightgray"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={normalizedRadius}
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
            />
            <circle
                className="progress-ring__circle"
                stroke="#7b1fa2" // Color morado en lugar de deepskyblue
                strokeWidth={strokeWidth}
                fill="transparent"
                r={normalizedRadius}
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset,
                }}
            />
            <text
                x="50%"
                y="45%"
                textAnchor="middle"
                stroke="#000"
                dy=".3em"
                fontSize="12"
                alignmentBaseline="middle" // Asegurarse de que el texto esté alineado verticalmente
            >
                {total > 0 ? `${percentage}%` : '-'}
            </text>
        </svg>
    );
};

export default CircularProgressBar;
