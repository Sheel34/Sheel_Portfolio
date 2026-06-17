import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

// Projects section — sits immediately after the hero (most-scanned real estate).
export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:py-32">
      <div className="mb-14">
        <p className="eyebrow mb-3">Selected work</p>
        <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Projects</h2>
        <p className="mt-3 max-w-xl text-slate-400">
          Systems built end to end — real-time control, computer vision, and
          reconstruction over real, messy data.
        </p>
      </div>

      <div className="space-y-24 sm:space-y-32">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
