import { ArrowRight, ArrowUpRight, Award, Code2, Mail, MapPin } from 'lucide-react';
import GithubIcon from './GithubIcon';
import mePhoto from '../../assets/images/me.jpg';
import { profile } from '@/data/profile';
import { projects, selectedProjects } from '@/data/projects';

interface Props {
  onOpenProjects: () => void;
  onSelectProject: (id: string) => void;
}

export default function AboutView({ onOpenProjects, onSelectProject }: Props) {
  return (
    <div className="profile-page tk-view-enter">
      <div className="profile-eyebrow">
        <span><span className="text-tk-red">$</span> whoami</span>
        <span className="flex items-center gap-1.5"><MapPin size={11} aria-hidden="true" /> {profile.location}</span>
      </div>
      <section className="profile-hero" aria-labelledby="profile-name">
        <figure className="profile-photo">
          <div className="profile-photo-frame">
            <img src={mePhoto} alt={`Portrait of ${profile.name}`} decoding="async" />
            <span aria-hidden="true" className="photo-corner photo-corner-tl" />
            <span aria-hidden="true" className="photo-corner photo-corner-br" />
            <span className="photo-label"><span className="status-dot" /> ALWAYS BUILDING</span>
          </div>
          <figcaption>me.jpg <span>// 001</span></figcaption>
        </figure>
        <div className="profile-details">
          <div className="profile-intro">
          <p className="section-label">HELLO, WORLD. I'M</p>
          <h1 id="profile-name">{profile.name}<span className="tk-neon text-tk-red">.</span></h1>
          <p className="profile-role tk-neon">{profile.role}</p>
          </div>
          <section className="mt-6" aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="section-label mb-2.5 flex items-center gap-2"><Code2 size={12} aria-hidden="true" /> TECH STACK</h2>
            <ul className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => <li key={skill} className="stack-chip">{skill}</li>)}
            </ul>
          </section>
          <section className="mt-5" aria-labelledby="cert-heading">
            <h2 id="cert-heading" className="section-label mb-2.5">CERTIFICATES <span className="text-tk-dim/70">/ PLACEHOLDERS</span></h2>
            <ul className="certificate-list">
              {profile.certificates.map((certificate) => (
                <li key={certificate.name}>
                  <a href={certificate.url} className="certificate-link">
                    <Award size={13} aria-hidden="true" />
                    <span>{certificate.name}</span>
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="profile-actions">
          <span className="section-label">EXPLORE THE WORK</span>
          <button type="button" onClick={onOpenProjects} className="tk-action tk-action-primary group">
            <span>View projects <small>{String(projects.length).padStart(2, '0')} repositories</small></span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
          {profile.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="tk-action group">
              <span className="flex items-center gap-2"><GithubIcon size={15} aria-hidden="true" />{link.label}</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ))}
          <p className="action-note">A little curiosity.<br />A lot of building.</p>
        </div>
      </section>
      <section className="about-section" aria-labelledby="about-heading">
        <div className="section-heading"><h2 id="about-heading"><span>01 /</span> A little about me</h2><span className="section-label">BEHIND THE CODE</span></div>
        <div className="about-copy">{profile.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>
      <section className="selected-section" aria-labelledby="selected-heading">
        <div className="section-heading"><h2 id="selected-heading"><span>02 /</span> Selected work</h2><span className="section-label">BUILT WITH INTENT</span></div>
        <div className="selected-projects">
          {selectedProjects.map((project, index) => (
            <button key={project.id} type="button" onClick={() => onSelectProject(project.id)} className="project-row group">
              <span className="project-number">0{index + 1}</span>
              <span className="min-w-0"><span className="project-row-name">{project.name}</span><span className="project-row-description">{project.tagline}</span></span>
              <ArrowUpRight size={17} className="shrink-0 text-tk-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tk-red" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
      <section className="connect-section" aria-labelledby="connect-heading">
        <div className="section-heading"><h2 id="connect-heading"><span>03 /</span> Let's connect</h2><span className="section-label">START A CONVERSATION</span></div>
        <div className="connect-card">
          <div>
            <p className="connect-title">Have something in mind?</p>
            <p className="connect-copy">A project, an idea, or just a hello. My inbox is open.</p>
          </div>
          <a href={`mailto:${profile.email}`} className="connect-email group">
            <Mail size={17} aria-hidden="true" />
            <span>{profile.email}</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </section>
      <p className="profile-signoff"><span className="text-tk-red">&gt;</span> learning, building, iterating<span className="tk-blink text-tk-red" aria-hidden="true">_</span></p>
    </div>
  );
}
