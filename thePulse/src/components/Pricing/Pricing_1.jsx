// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

// const PricingTable = () => {
//   const plans = [
//     {
//       name: 'Basic',
//       features: [
//         'Process Analysis',
//         'Task Management',
//         'Time Tracking',
//         'Performance Metrics',
//         'Customizable Reports',
//         'Email Integration',
//       ],
//     },
//     {
//       name: 'Pro',
//       features: [
//         'Process Analysis',
//         'Task Management',
//         'Time Tracking',
//         'Performance Metrics',
//         'Customizable Reports',
//         'Email Integration',
//         'Real-time Collaboration',
//         'Automated Workflows',
//       ],
//     },
//     {
//       name: 'Business',
//       features: [
//         'Process Analysis',
//         'Task Management',
//         'Time Tracking',
//         'Performance Metrics',
//         'Customizable Reports',
//         'Email Integration',
//         'Real-time Collaboration',
//         'Automated Workflows',
//         'Analytics Dashboard',
//         'SLA Management',
//       ],
//     },
//   ];

//   return (
//     <div className="pricing-table">
//       {plans.map((plan) => (
//         <div key={plan.name} className="plan">
//           <div className="plan-name">{plan.name}</div>
//           <ul className="features-list">
//             {plan.features.map((feature) => (
              
//               <li key={feature}>
//                 <FontAwesomeIcon icon={faCircleCheck} /> {feature}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PricingTable;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PricingTable = () => {
  // La información de los planes y las características
  const features = [
    'Preguntas abiertas',
    'Preguntas cerradas',
    'Preguntas ranking',
    'Diagnósticos escritos',
    'Diagnósticos de audio',
    'Lectura de expresión facial',
    'Reportes de uso básicos',
    'Reportes de uso detallados',
    'Avisos automatizados',
    'Control del tiempo',
    'Soporte prioritario y personalizado',
    'Métricas de rendimiento',
    'Modificación de aspecto',
    'Análisis de procesos',
    'Task Management',
    'API Telegram',
    'API WhatsApp',
    'Usuarios ilimitados'
    // ... (continuar con todas las características)
  ];

  const plans = [
    {
      name: 'Free',
      includes: [
        true,  // Preguntas abiertas
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false 
        
      ],
    },
    {
      name: 'Basic',
      includes: [
        true,  // Preguntas abiertas
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false 
        
      ],
    },
    {
      name: 'Pro',
      includes: [
        true,  // Preguntas abiertas
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false 
        
      ],
    },
    {
      name: 'Business',
      includes: [
        true,  // Preguntas abiertas
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true 
        
      ],
    }
  ];

  // Generar una fila para cada característica
  const featureRows = features.map((feature, index) => (
    <tr key={feature}>
      <th scope="row">{feature}</th> {/* Cambiado a 'th' con un 'scope' de 'row' */}
      {plans.map((plan) => (
        <td key={plan.name}>
          {plan.includes[index] ? (
            <FontAwesomeIcon icon={faCircleCheck} />
          ) : (
            ' '
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="pricing-table">
      <h3 class="pricing-table-title">Comparativa</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {plans.map((plan) => (
              <th key={plan.name}>{plan.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{featureRows}</tbody>
      </table>
    </div>
  );
};

export default PricingTable;
