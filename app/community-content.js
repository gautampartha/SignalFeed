// Fictional community fixtures. Shared announcements use the same opportunity ID.
function internship(id,title,company,sources,tags,stipend,summary){return {id,title,company,sources,tags,type:'Internships',letter:company[0].toLowerCase(),color:'blue',stipend,location:'Remote · India',duration:'3 months',deadline:'22 Nov · 6:00 PM',date:'2026-11-22T12:30:00Z',day:'22',month:'NOV',match:93,source:company,summary,detail:summary+' Work on a real project with weekly mentorship and a final presentation.',eligibility:['Open to undergraduate students','A small project or relevant experience is welcome','Available part-time for three months'],sender:'Community Careers Team',time:'10:20 AM'};}

export const extraOpportunities=[
  internship('backend','Backend Engineering Intern','CloudNest',['tech'],['Technology','Backend','Python'],'₹28,000 / month','Build Python APIs, learn database design, and ship your first production feature with a mentor.'),
  internship('visual','Visual Design Intern','Paperplane',['design'],['Design','Visual design'],'₹22,000 / month','Create visual identities and product illustrations. Bring a portfolio with two projects you are proud of.'),
  internship('operations','Business Operations Intern','Daylight',['career'],['Business','Operations'],'₹18,000 / month','Help a growing team improve its processes. Work with spreadsheets, customer insights, and weekly experiments.'),
  internship('data','Data Analytics Intern','Metric Grove',['hack'],['Technology','Data analytics','Python'],'₹26,000 / month','Turn product data into useful insights. Practice SQL, build a dashboard, and present findings to the team.'),
  internship('sports-intern','Sports Management Intern','Playfield',['sports'],['Sports','Sports management'],'₹15,000 / month','Help organize college leagues, coordinate teams, and manage matchday operations alongside event professionals.'),
  internship('fitness-intern','Community & Fitness Intern','Stride Club',['fitness'],['Sports','Fitness','Running'],'₹16,000 / month','Plan community runs, help host beginner fitness sessions, and support a welcoming local sports community.'),
];

export const communityThreads={
  tech:{
    Announcements:{ids:['forma','orbit','backend'],intro:'Your weekly campus opportunities roundup is here. All three roles are paid; check the eligibility and deadlines below.',ending:'Placement desk hours: Thursday, 2–4 PM in Block C. Bring your CV for a quick review.'},
    ProdVerse:{ids:['backend'],intro:'Product hackathon check-in: show your working prototype at 4 PM. Also sharing a backend internship for anyone who enjoyed building APIs.',ending:'Agrim: Our team is testing the demo now. Who wants to do a practice pitch at 3:30?'},
  },
  design:{
    'Design opportunities':{ids:['forma','arc','visual','fellowship'],intro:'A few good first steps for student designers: paid product, research, and visual design roles, plus a funded fellowship.',ending:'Riya: Feel free to ask about portfolios here. Please check the original role details before applying.'},
    'Portfolio reviews':{ids:['workshop','visual'],intro:'Portfolio clinic thread: post one case study and one specific question. This week we are focusing on storytelling and visual hierarchy.',ending:'Ananya: I simplified my case study intro after yesterday’s feedback. Sharing the updated version tonight ✨'},
  },
  career:{
    'Internship alerts':{ids:['forma','orbit','bloom','operations'],intro:'November internship board: four paid roles across design, engineering, marketing, and operations. Open to students.',ending:'Placement Cell: Reminder — prepare a one-page CV. Applications are individual; the college does not submit them for you.'},
    'Peer referrals':{ids:['orbit','operations'],intro:'Peer referral thread. Share your skills, preferred role, and availability. Please ask before sending someone your CV.',ending:'Rahul: Happy to do a mock interview on Friday. Drop your preferred time here.'},
  },
  hack:{
    Announcements:{ids:['workshop','data','arc'],intro:'HackVerse bulletin: a portfolio workshop, a data internship, and a research role for students who enjoy finding out why things work.',ending:'Organizers: Saturday’s build session begins at 10 AM. Bring a laptop and a small project idea.'},
    'HackVerse | Discussion':{ids:['data','workshop'],intro:'What did you build this week? Share a screenshot and one thing you learned. Also: these two opportunities might be useful.',ending:'Daksh: Looking for a teammate who enjoys SQL and dashboards. We can start with a small weekend project.'},
  },
  sports:{
    Announcements:{ids:['football','badminton','sports-intern'],intro:'Campus sports bulletin: football registrations, a doubles tournament, and a paid sports management internship.',ending:'Sports coordinator: Please register your team before the deadline. You can join the internship even if you are not competing.'},
    Matchday:{ids:['football','badminton'],intro:'Matchday planning thread ⚽ Football practice is Wednesday at 5 PM. Badminton warm-up starts Saturday at 8:30 AM.',ending:'Aarav: We have space for one more player in our five-a-side team. Beginners welcome — reply if you’re interested!'},
  },
  fitness:{
    'Sports events':{ids:['running','badminton','fitness-intern'],intro:'This weekend: a relaxed 5K, a friendly doubles tournament, and a paid community fitness role. All skill levels welcome.',ending:'Meera: Sunday run meet-up is at the park entrance at 6:45 AM. Bring water; we’ll have a coffee stop afterward.'},
  },
};
