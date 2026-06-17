// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS  —  EDIT THIS FILE to add / change projects. Order here = order on page.
//
// FIELDS:
//   id        unique slug (anchor + react key)
//   index     two-digit string shown as telemetry label ("01")
//   title     project name
//   kicker    one-line role/type
//   period    date range (e.g. "Oct 2024 – Feb 2025")  [optional]
//   award     highlighted ribbon text (wins/recognition)  [optional]
//   role      YOUR specific contribution — honest, vs the team  [optional]
//   summary   1–2 sentence scannable pitch (the <3s read)
//   problem   the hard problem it solves (engineering framing)
//   approach  array of pipeline / method bullets (credit teammates inline if shared)
//   stack     array of tech tags
//   metrics   array of {label, value} stat chips  [optional]
//   links     { repo, live, video } — omit a key to hide that button
//   accent    'teal' | 'blue' | 'amber' — accent / glow color
//   visual    '3d' = embedded 3D scene; 'still' = image at `image`
//   image     path under /public  (only if visual === 'still')
//   model     path under /public/models to a .glb (renders instead of the planet) [optional]
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    // VENOM is listed FIRST: it's the proven, award-winning, concrete project.
    // Lead with your strongest signal. Swap order by reordering this array.
    id: 'venom',
    index: '01',
    title: 'VENOM',
    kicker: 'Gesture-controlled dual-arm EOD robot',
    period: 'Oct 2024 – Feb 2025',
    award:
      '1st place · Science & Technology · Republic Plenary Summit — Limitless India Youth Hackathon 2025 · recognized in India’s Top 30 under 30',
    role: 'Computer vision — OpenCV motion-capture / operator pose tracking. (IK by Anirudh Nautiyal.)',
    summary:
      'A dual-arm bomb-disposal manipulator controlled by the operator’s own hand motion instead of a joystick. A camera tracks the operator’s pose; inverse kinematics maps it to the arms in real time over an RTOS control loop.',
    problem:
      'Joystick teleoperation of EOD manipulators is slow and non-intuitive — high training cost and added latency in scenarios where seconds matter. Goal: make the robot move like the operator’s own hands.',
    approach: [
      'Computer-vision motion capture (OpenCV): track operator hand/arm pose from a camera and output target end-effector positions. — my part.',
      'Inverse kinematics: map captured poses to dual-arm joint angles in real time. — Anirudh Nautiyal.',
      'RTOS control loop: deterministic, low-latency, multi-threaded — concurrent vision intake, IK solve, actuator commands, and sensor feedback without task conflicts.',
      'Result: spatial tracking translated to real-time robot motion, replacing joystick teleop. Built and demoed as a working prototype.',
    ],
    stack: ['OpenCV', 'Python', 'Computer Vision', 'Inverse Kinematics', 'RTOS', 'Robotics'],
    metrics: [
      { label: 'National rank', value: '1st' },
      { label: 'Field', value: '10,000+' },
      { label: 'Recognition', value: 'Top 30 U30' },
      { label: 'Team', value: '2' },
    ],
    links: {
      repo: 'https://github.com/Sheel34', // ← link the VENOM repo specifically if public
    },
    // Inline on-page demo video (plays in place, fullscreen via controls, mobile-safe).
    // Files live in /public/videos. To swap: replace those files or change paths.
    video: '/videos/venom-demo.mp4',
    thumbnail: '/videos/venom-thumb.jpg',
    accent: 'blue',
    visual: '3d', // ignored while `video` is set; kept for fallback if you remove video
    // model: '/models/venom-arm.glb', // ← drop a Blender arm/rig export here later
  },

  {
    // ───────────────────────────────────────────────────────────────────────
    // BHUVAN — NEEDS YOUR INPUT. Left honest + minimal on purpose (no invented
    // details). Paste your BHUVAN posts / README / scope and I'll fill this the
    // same grounded way as VENOM. Replace every PLACEHOLDER below.
    // ───────────────────────────────────────────────────────────────────────
    id: 'bhuvan',
    index: '02',
    title: 'BHUVAN',
    kicker: 'PLACEHOLDER — one-line type (e.g. terrain reconstruction / geospatial)',
    period: '', // e.g. "2025 – present"
    role: '', // YOUR specific part
    summary:
      'PLACEHOLDER — short scannable pitch. What does BHUVAN do, on what data, to what end?',
    problem:
      'PLACEHOLDER — the hard engineering problem (the data, the scale, or the physics that makes it non-trivial).',
    approach: [
      'PLACEHOLDER — pipeline / method step 1.',
      'PLACEHOLDER — step 2.',
      'PLACEHOLDER — the real challenge you solved.',
    ],
    stack: ['REPLACE', 'WITH', 'REAL', 'STACK'],
    metrics: [], // add real {label, value} chips when you have them
    links: {
      repo: 'https://github.com/Sheel34', // ← BHUVAN repo
    },
    accent: 'teal',
    visual: '3d',
  },
]
