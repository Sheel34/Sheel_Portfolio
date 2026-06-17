import { motion } from 'framer-motion'
import ProjectVisual from './ProjectVisual'
import VideoPlayer from './VideoPlayer'

// Renders one project. Layout alternates sides for rhythm (visual left/right).
// Content is fully scannable top-to-bottom: title → summary → problem → method.
export default function ProjectCard({ project, flip = false }) {
  const {
    index,
    title,
    kicker,
    period,
    award,
    role,
    summary,
    problem,
    approach = [],
    stack = [],
    metrics = [],
    links = {},
    accent = 'teal',
    visual = '3d',
    image,
    model = null,
    video = null,
    thumbnail = null,
  } = project

  return (
    <motion.article
      id={project.id}
      className="grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center md:gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Visual — priority: inline video > still image > embedded 3D scene. */}
      <div className={flip ? 'md:order-2' : ''}>
        {video ? (
          <VideoPlayer src={video} poster={thumbnail} label={title} />
        ) : visual === 'still' && image ? (
          <img
            src={image}
            alt={`${title} visual`}
            className="aspect-square w-full rounded-xl border border-white/10 object-cover"
          />
        ) : (
          <ProjectVisual accent={accent} model={model} />
        )}
      </div>

      {/* Content */}
      <div className={flip ? 'md:order-1' : ''}>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-sm text-signal/70">{index}</span>
          <span className="hairline flex-1" />
          {period && (
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-white/40">
              {period}
            </span>
          )}
        </div>

        <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h3>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-widest2 text-signal/80">
          {kicker}
        </p>

        {/* Award ribbon — only renders if the project has one. */}
        {award && (
          <div className="mt-4 inline-flex items-start gap-2 rounded-md border border-signal-amber/40 bg-signal-amber/10 px-3 py-2">
            <span className="text-signal-amber">🏆</span>
            <span className="font-mono text-[12px] leading-snug text-signal-amber">{award}</span>
          </div>
        )}

        <p className="mt-4 text-lg leading-relaxed text-slate-200">{summary}</p>

        {/* Honest contribution line — what *you* built vs the team. */}
        {role && (
          <p className="mt-3 font-mono text-[12px] text-slate-400">
            <span className="text-signal/80">My role:</span> {role}
          </p>
        )}

        {problem && (
          <div className="mt-5">
            <p className="eyebrow mb-1">Problem</p>
            <p className="text-sm leading-relaxed text-slate-400">{problem}</p>
          </div>
        )}

        {approach.length > 0 && (
          <div className="mt-5">
            <p className="eyebrow mb-2">Approach</p>
            <ul className="space-y-1.5">
              {approach.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal/70" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metric chips */}
        {metrics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {metrics.map((m, i) => (
              <div key={i} className="rounded border border-white/10 bg-space-700 px-3 py-2">
                <div className="font-mono text-sm font-medium text-white">{m.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest2 text-white/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack tags */}
        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-signal/40 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-signal transition-colors hover:bg-signal/10"
            >
              Repository →
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-white/80 transition-colors hover:border-signal/60 hover:text-signal"
            >
              Live →
            </a>
          )}
          {links.video && (
            <a
              href={links.video}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-white/80 transition-colors hover:border-signal/60 hover:text-signal"
            >
              ▶ Watch demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
