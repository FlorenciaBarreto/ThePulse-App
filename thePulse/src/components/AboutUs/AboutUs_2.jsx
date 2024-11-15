import React from 'react';
import '../../assets/styles/AboutUs.css';


import TeamPhoto from '../../assets/images/team.png';
import Marco from '../../assets/images/Marco.jpeg';
import Margarita from '../../assets/images/Margarita Spoerer.png';
import Cristobal from '../../assets/images/CristobalAuger.png';
import Pablo from '../../assets/images/Pablo.jpg';
import Salomon from '../../assets/images/SalomoNzoNsue.jpg';
import Jose from '../../assets/images/Jose.png';

const teamMembers = [
  { name: 'Margarita Spoerer Ochagavia', role: '', image: Margarita},
  { name: 'Cristóbal Auger Hinrichsen', role: '', image: Cristobal },
  { name: 'Marco Besteiro', role: '', image: Marco},
  { name: 'Jose Valenciano ', role: '', image: Jose },
  { name: 'Salomón Nzo Nsue', role: '', image: Salomon },
  { name: 'Pablo Atela', role: '', image: Pablo },

];

const TeamMember = ({ member }) => {
  return (
    <div className="team-member">
      <img className="team-members-img" src={member.image} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </div>
  );
};

const AboutUs_2 = () => {
  return (
    <div className="team-container">
      <h2>Team</h2>
      <p>Meet the people behind our magical product</p>
      <div className="team-members">
        {teamMembers.map(member => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs_2;
